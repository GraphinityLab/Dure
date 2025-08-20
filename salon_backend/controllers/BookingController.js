// salon-backend/controllers/bookingController.js
// This controller handles all logic for creating a new appointment booking.
// It now works with a dynamic timeslots table.

import pool from '../utils/db.js'; // Import the database connection pool
import { transporter, adminEmail } from '../utils/email.js'; // Import email transporter and admin email
import moment from 'moment'; // Import moment.js for date handling

/**
 * Controller function to handle a new appointment booking.
 * It ensures data integrity by using a database transaction.
 */
export const createBooking = async (req, res) => {
    // Destructure all client and booking fields from the request body.
    // client_first_name and client_last_name are now included.
    const { client_first_name, client_last_name, client_email, client_phone, service_name, appointment_time, notes, address, city, postal_code } = req.body;

    // Basic input validation: Ensure all mandatory fields are provided.
    if (!client_first_name || !client_last_name || !client_email || !client_phone || !service_name || !appointment_time) {
        return res.status(400).json({ message: 'Missing required booking information: client_first_name, client_last_name, client_email, client_phone, service_name, appointment_time.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Find or Create Client
        // Check if a client with this email already exists.
        let [clientRows] = await connection.execute('SELECT client_id FROM clients WHERE email = ?', [client_email]);
        let clientId;

        if (clientRows.length > 0) {
            // If client exists, get their ID and update their information.
            clientId = clientRows[0].client_id;
            await connection.execute(
                'UPDATE clients SET first_name = ?, last_name = ?, phone_number = ?, address = ?, city = ?, postal_code = ? WHERE client_id = ?',
                [client_first_name, client_last_name, client_phone, address || null, city || null, postal_code || null, clientId]
            );
        } else {
            // If not, create a new client and get the new ID.
            const [clientResult] = await connection.execute(
                'INSERT INTO clients (first_name, last_name, email, phone_number, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [client_first_name, client_last_name, client_email, client_phone, address || null, city || null, postal_code || null]
            );
            clientId = clientResult.insertId;
        }

        // 2. Find Service ID and Duration
        const [serviceRows] = await connection.execute('SELECT service_id, duration_minutes FROM services WHERE name = ?', [service_name]);
        if (serviceRows.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Invalid service name provided.' });
        }
        const serviceId = serviceRows[0].service_id;
        const durationMinutes = serviceRows[0].duration_minutes;

        // 3. Calculate End Time
        const startDate = new Date(appointment_time);
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
        
        const formattedStartTime = startDate.toTimeString().slice(0, 5);
        const formattedEndTime = endDate.toTimeString().slice(0, 5);
        
        const formattedAppointmentDate = startDate.toISOString().split('T')[0];

        // 4. Insert the new appointment
        const sql = `
            INSERT INTO appointments (client_id, service_id, appointment_date, start_time, end_time, notes, status)
            VALUES (?, ?, ?, ?, ?, ?, 'pending')
        `;
        const values = [clientId, serviceId, formattedAppointmentDate, formattedStartTime, formattedEndTime, notes];
        const [result] = await connection.execute(sql, values);
        const newAppointmentId = result.insertId;

        await connection.commit();

        // --- Send Email Notification to Admin ---
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            subject: 'New Appointment Booking Request!',
            html: `
                <p>Hello Admin,</p>
                <p>A new appointment has been requested:</p>
                <ul>
                    <li><strong>Client Name:</strong> ${client_first_name} ${client_last_name}</li>
                    <li><strong>Client Email:</strong> ${client_email}</li>
                    <li><strong>Client Phone:</strong> ${client_phone}</li>
                    <li><strong>Client Address:</strong> ${address || 'N/A'}</li>
                    <li><strong>City:</strong> ${city || 'N/A'}</li>
                    <li><strong>Postal Code:</strong> ${postal_code || 'N/A'}</li>
                    <li><strong>Service:</strong> ${service_name}</li>
                    <li><strong>Date:</strong> ${formattedAppointmentDate}</li>
                    <li><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</li>
                    <li><strong>Notes:</strong> ${notes || 'N/A'}</li>
                    <li><strong>Status:</strong> Pending</li>
                </ul>
                <p>Please log in to the admin panel to confirm or decline this booking.</p>
                <p>Thank you,</p>
                <p>Your Salon Booking System</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email notification:', error);
            } else {
                console.log('Admin notification email sent: ' + info.response);
            }
        });

        res.status(201).json({
            message: 'Appointment booked successfully and is pending admin approval. Admin notified.',
            appointmentId: newAppointmentId
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ message: 'Internal server error during booking.' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Function to calculate and return available time slots for a specific date
 */
export const getAvailability = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date is required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        const dayOfWeek = moment(date).format('dddd');

        const [allSlots] = await connection.execute('SELECT time_slot FROM timeslots WHERE day_of_week = ?', [dayOfWeek]);
        const allAvailableSlots = allSlots.map(slot => slot.time_slot.substring(0, 5));

        const [existingAppointments] = await connection.execute(
            'SELECT start_time FROM appointments WHERE appointment_date = ?',
            [date]
        );

        const bookedTimes = existingAppointments.map(app => app.start_time.substring(0, 5));

        const availableSlots = allAvailableSlots.filter(
            slot => !bookedTimes.includes(slot)
        );

        res.status(200).json({ date, slots: availableSlots });
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        if (connection) connection.release();
    }
};


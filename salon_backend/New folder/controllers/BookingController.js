// salon-backend/controllers/bookingController.js
// This file contains the business logic for handling appointment booking requests using ES Modules.
// UPDATED to store service_name directly instead of service_id.

import pool from '../utils/db.js';      // Import the database connection pool
import { transporter, adminEmail } from '../utils/email.js'; // Import email transporter and admin email

// Controller function to create a new appointment booking.
const createBooking = async (req, res) => {
    // Destructure required fields from the request body.
    // Now expecting 'service_name' directly from the frontend.
    const { client_name, client_email, service_name, appointment_time, notes } = req.body; // <--- CHANGED HERE

    // Basic input validation: Ensure all mandatory fields are provided.
    if (!client_name || !client_email || !service_name || !appointment_time) { // <--- CHANGED HERE
        return res.status(400).json({ message: 'All required fields are missing: client_name, client_email, service_name, appointment_time.' }); // <--- CHANGED HERE
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Format the appointment_time string to a MariaDB DATETIME compatible format.
        const formattedAppointmentTime = new Date(appointment_time).toISOString().slice(0, 19).replace('T', ' ');

        // Removed the SELECT service name query, as service_name is directly provided by frontend.
        // const [serviceRows] = await connection.execute('SELECT name FROM services WHERE service_id = ?', [service_id]);
        // if (serviceRows.length === 0) {
        //     await connection.rollback();
        //     return res.status(400).json({ message: 'Invalid service_id provided.' });
        // }
        // const serviceName = serviceRows[0].name; // This is now service_name from req.body

        // SQL query to insert the new appointment into the 'appointments' table.
        // Now inserting 'service_name' directly.
        const sql = `
            INSERT INTO appointments (client_name, client_email, service_name, appointment_time, status, notes)
            VALUES (?, ?, ?, ?, 'pending', ?)
        `;
        // Pass service_name directly to the values array.
        const values = [client_name, client_email, service_name, formattedAppointmentTime, notes]; // <--- CHANGED HERE

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
                    <li><strong>Client Name:</strong> ${client_name}</li>
                    <li><strong>Client Email:</strong> ${client_email}</li>
                    <li><strong>Service:</strong> ${service_name}</li> {/* Use service_name here */}
                    <li><strong>Date & Time:</strong> ${new Date(appointment_time).toLocaleString()}</li>
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

export default createBooking;
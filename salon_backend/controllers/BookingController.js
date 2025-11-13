// salon-backend/controllers/bookingController.js
// This controller handles all logic for creating a new appointment booking.
// It now works with a dynamic timeslots table and properly checks for overlaps.

import pool from '../utils/db.js'; // Import the database connection pool
import { transporter, adminEmail } from '../utils/email.js'; // Import email transporter and admin email
import moment from 'moment'; // Import moment.js for date handling

/**
 * Save a snapshot into AppointmentHistory with denormalized details
 */
async function saveHistory(connection, appointment_id, changed_by = "client") {
    const [rows] = await connection.execute(
        `SELECT a.appointment_id, a.appointment_date, a.start_time, a.end_time,
                a.notes, a.status, a.staff_id,
                CONCAT(c.first_name, ' ', c.last_name) AS client_name,
                s.name AS service_name, s.price AS service_price,
                s.category AS service_category, s.description AS service_description
         FROM appointments a
         JOIN clients c ON a.client_id = c.client_id
         JOIN services s ON a.service_id = s.service_id
         WHERE a.appointment_id = ?`,
        [appointment_id]
    );

    if (rows.length > 0) {
        const appt = rows[0];
        await connection.execute(
            `INSERT INTO AppointmentHistory 
                (appointment_id, client_name, service_name, service_price, service_category, service_description,
                 appointment_date, start_time, end_time, notes, status, staff_id, changed_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                appt.appointment_id,
                appt.client_name,
                appt.service_name,
                appt.service_price,
                appt.service_category,
                appt.service_description,
                appt.appointment_date,
                appt.start_time,
                appt.end_time,
                appt.notes,
                appt.status,
                appt.staff_id,
                changed_by
            ]
        );
    }
}

/**
 * Controller function to handle a new appointment booking.
 * It ensures data integrity by using a database transaction and
 * now includes a crucial check for timeslot availability.
 */
export const createBooking = async (req, res) => {
    // Destructure all client and booking fields from the request body.
    const { client_first_name, client_last_name, client_email, client_phone, service_name, appointment_time, notes, address, city, postal_code } = req.body;

    // Basic input validation: Ensure all mandatory fields are provided.
    if (!client_first_name || !client_last_name || !client_email || !client_phone || !service_name || !appointment_time) {
        return res.status(400).json({ message: 'Missing required booking information.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Find Service ID and Duration
        const [serviceRows] = await connection.execute(
            'SELECT service_id, duration_minutes, price, category, description FROM services WHERE name = ?',
            [service_name]
        );
        if (serviceRows.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Invalid service name provided.' });
        }
        const serviceId = serviceRows[0].service_id;
        const durationMinutes = serviceRows[0].duration_minutes;

        // 2. Calculate End Time for the requested appointment
        const startDate = new Date(appointment_time);
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

        const formattedAppointmentDate = moment(startDate).format('YYYY-MM-DD');
        const formattedStartTime = moment(startDate).format('HH:mm');
        const formattedEndTime = moment(endDate).format('HH:mm');

        // 3. CRITICAL AVAILABILITY CHECK: Look for any appointments that overlap with the requested time slot.
        const overlapCheckSql = `
            SELECT COUNT(*) AS count
            FROM appointments
            WHERE appointment_date = ?
            AND (
                (start_time <= ? AND end_time > ?) OR
                (start_time < ? AND end_time >= ?)
            )
        `;
        const [overlapResult] = await connection.execute(overlapCheckSql, [
            formattedAppointmentDate,
            formattedStartTime,
            formattedStartTime,
            formattedEndTime,
            formattedEndTime
        ]);

        if (overlapResult[0].count > 0) {
            await connection.rollback();
            return res.status(409).json({ message: 'The selected time slot is no longer available. Please select a different time.' });
        }

        // 4. Find or Create Client
        let [clientRows] = await connection.execute('SELECT client_id FROM clients WHERE email = ?', [client_email]);
        let clientId;

        if (clientRows.length > 0) {
            clientId = clientRows[0].client_id;
            await connection.execute(
                'UPDATE clients SET first_name = ?, last_name = ?, phone_number = ?, address = ?, city = ?, postal_code = ? WHERE client_id = ?',
                [client_first_name, client_last_name, client_phone, address || null, city || null, postal_code || null, clientId]
            );
        } else {
            const [clientResult] = await connection.execute(
                'INSERT INTO clients (first_name, last_name, email, phone_number, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [client_first_name, client_last_name, client_email, client_phone, address || null, city || null, postal_code || null]
            );
            clientId = clientResult.insertId;
        }

        // 5. Insert the new appointment
        const insertSql = `
            INSERT INTO appointments (client_id, service_id, appointment_date, start_time, end_time, notes, status)
            VALUES (?, ?, ?, ?, ?, ?, 'pending')
        `;
        const insertValues = [clientId, serviceId, formattedAppointmentDate, formattedStartTime, formattedEndTime, notes];
        const [result] = await connection.execute(insertSql, insertValues);
        const newAppointmentId = result.insertId;

        // 6. Save snapshot into AppointmentHistory
        await saveHistory(connection, newAppointmentId, "client");

        await connection.commit();

        // --- Send Email Notification to Admin ---
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            subject: "📅 New Appointment Booking Request!",
            html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa; }
          h2 { color: #444; margin-bottom: 10px; }
          ul { list-style: none; padding: 0; margin: 0; }
          li { margin: 6px 0; }
          strong { color: #000; }
          .footer { margin-top: 20px; font-size: 0.9em; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Appointment Request</h2>
          <p>Hello Admin,</p>
          <p>A new appointment has been requested with the following details:</p>
          <ul>
            <li><strong>Client Name:</strong> ${client_first_name} ${client_last_name}</li>
            <li><strong>Email:</strong> ${client_email}</li>
            <li><strong>Phone:</strong> ${client_phone}</li>
            <li><strong>Address:</strong> ${address || "N/A"}</li>
            <li><strong>City:</strong> ${city || "N/A"}</li>
            <li><strong>Postal Code:</strong> ${postal_code || "N/A"}</li>
            <li><strong>Service:</strong> ${service_name}</li>
            <li><strong>Date:</strong> ${formattedAppointmentDate}</li>
            <li><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</li>
            <li><strong>Notes:</strong> ${notes || "N/A"}</li>
            <li><strong>Status:</strong> Pending</li>
          </ul>
          <p class="footer">
            Please log in to the admin panel to confirm or decline this booking.
            <br/><br/>
            Thank you,<br/>
            <em>Your Salon Booking System</em>
          </p>
        </div>
      </body>
    </html>
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
 * Uses the timeslots table from the database to get available slots for the day of week
 */
export const getAvailability = async (req, res) => {
    const { date, service_name } = req.query;

    if (!date || !service_name) {
        return res.status(400).json({ message: 'Date and service_name are required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // Get service duration
        const [serviceRows] = await connection.execute(
            'SELECT duration_minutes FROM services WHERE name = ?',
            [service_name]
        );
        if (serviceRows.length === 0) {
            return res.status(400).json({ message: 'Invalid service name provided.' });
        }
        const serviceDuration = serviceRows[0].duration_minutes;

        // Get day of week from the date (e.g., 'Monday', 'Tuesday', etc.)
        const dateObj = moment(date);
        const dayOfWeek = dateObj.format('dddd'); // Returns full day name like 'Monday', 'Tuesday', etc.

        // Get available time slots from the timeslots table for this day of week
        const [timeslotRows] = await connection.execute(
            'SELECT time_slot FROM timeslots WHERE day_of_week = ? ORDER BY time_slot ASC',
            [dayOfWeek]
        );

        if (timeslotRows.length === 0) {
            // No timeslots configured for this day - return empty array
            return res.status(200).json({ date, slots: [] });
        }

        // Convert database time_slot format (HH:mm:ss) to HH:mm format
        const allSlots = timeslotRows.map(row => {
            const timeStr = row.time_slot;
            // Handle both 'HH:mm:ss' and 'HH:mm' formats
            return timeStr.includes(':') ? timeStr.substring(0, 5) : timeStr;
        });

        // Get confirmed appointments for this date
        const [confirmedAppointments] = await connection.execute(
            'SELECT start_time, end_time FROM appointments WHERE appointment_date = ? AND status = "confirmed"',
            [date]
        );

        const bookedIntervals = confirmedAppointments.map(app => ({
            start: moment(app.start_time, 'HH:mm:ss').toDate(),
            end: moment(app.end_time, 'HH:mm:ss').toDate()
        }));

        // Filter available slots - check if service can fit and doesn't overlap with confirmed appointments
        const availableSlots = allSlots.filter((slot) => {
            const slotStart = moment(`${date}T${slot}:00`).toDate();
            const slotEnd = moment(slotStart).add(serviceDuration, 'minutes').toDate();

            // Check if service can complete - ensure it doesn't extend too far past the last available slot
            // Get the last available slot time
            const lastSlot = allSlots[allSlots.length - 1];
            const lastSlotTime = moment(`${date}T${lastSlot}:00`).toDate();
            
            // Allow services that can start at this slot and complete within a reasonable time
            // We'll allow services that end up to 2 hours after the last slot (for longer services)
            const maxAllowedEndTime = moment(lastSlotTime).add(120, 'minutes').toDate();
            if (slotEnd > maxAllowedEndTime) {
                return false;
            }
            
            // Exclude overlaps with confirmed appointments
            const hasOverlap = bookedIntervals.some(b => slotStart < b.end && slotEnd > b.start);
            
            return !hasOverlap;
        });

        res.status(200).json({ date, slots: availableSlots });
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        if (connection) connection.release();
    }
};

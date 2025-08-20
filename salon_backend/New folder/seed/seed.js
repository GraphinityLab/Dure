// salon_backend/seed/seed.js
// This script is used to populate the database with default time slots for the next 5 years.

import pool from '../utils/db.js'; // Import the database connection pool
import dotenv from 'dotenv';       // For loading environment variables

dotenv.config(); // Load environment variables from .env

async function seedTimeSlots() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Connected to database for seeding...');

        // Clear existing time slots (optional, useful for fresh seeding)
        console.log('Clearing existing time slots...');
        await connection.execute('DELETE FROM time_slots');
        console.log('Existing time slots cleared.');

        // Define time slots for the next 5 years
        const startDate = new Date(); // Start from today
        startDate.setHours(9, 0, 0, 0); // Set to 9 AM (start of day for slot generation)

        // Calculate number of days in 5 years (accounting for leap years roughly)
        // 365.25 days/year * 5 years = 1826.25 days. Let's use 1827 to be safe.
        const numDays = 365 * 5 + Math.floor(5 / 4); // 5 years + approx 1 leap day per 4 years

        const slotsToInsert = [];

        console.log(`Generating time slots for the next ${numDays} days (approx. 5 years)...`);

        for (let i = 0; i < numDays; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            // Add slots from 9 AM to 5 PM (adjust hours as needed)
            // This loop generates a slot for every hour from 9:00 to 17:00 (5 PM) inclusive.
            for (let hour = 9; hour <= 17; hour++) {
                const slotDateTime = new Date(currentDate);
                slotDateTime.setHours(hour, 0, 0, 0); // Set hour, minute, second, millisecond

                // Format to MariaDB DATETIME string
                const formattedSlot = slotDateTime.toISOString().slice(0, 19).replace('T', ' ');
                slotsToInsert.push([formattedSlot, true]); // true for is_available by default
            }
        }

        // Insert all generated slots
        if (slotsToInsert.length > 0) {
            console.log(`Inserting ${slotsToInsert.length} new time slots... This may take a moment.`);
            const insertSql = 'INSERT INTO time_slots (slot_datetime, is_available) VALUES (?, ?)';

            // Using a loop for individual inserts to avoid extremely large single query
            // For truly massive inserts (millions), batching into chunks would be better.
            for (const slot of slotsToInsert) {
                await connection.execute(insertSql, slot);
            }
            console.log('Time slots seeded successfully!');
        } else {
            console.log('No time slots generated for seeding.');
        }

    } catch (error) {
        console.error('Error during time slot seeding:', error);
    } finally {
        if (connection) {
            connection.release();
        }
        process.exit(0); // Exit the script
    }
}

// Execute the seeding function
seedTimeSlots();
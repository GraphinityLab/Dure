// salon-backend/utils/email.js
// This file sets up and exports the Nodemailer transporter for sending emails.

import nodemailer from 'nodemailer'; // Import Nodemailer library
import dotenv from 'dotenv'      // Import dotenv to load environment variables

// Load environment variables from the .env file.
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;

// Create a Nodemailer transporter.
// This object will be used to send emails using the specified service and authentication.
// Ensure EMAIL_USER and EMAIL_PASS are correctly set in your .env file.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Specify the email service provider (e.g., 'gmail', 'outlook', 'smtp')
    auth: {
        user: process.env.EMAIL_USER, // Your email address for sending (from .env)
        pass: process.env.EMAIL_PASS  // Your email's App Password (for Gmail, from .env)
    }
});

// Export the transporter and the admin email address so they can be used by controllers.
export {
    transporter,
    adminEmail // The admin's email to send notifications to
};
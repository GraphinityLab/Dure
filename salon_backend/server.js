// salon-backend/server.js
// This is the main entry point for the Node.js Express backend server.
// It is configured for ES Modules and uses a modular structure for routes and utilities.

// --- Module Imports ---
import express from 'express';        // Express.js framework for building web applications
import bodyParser from 'body-parser'; // Middleware to parse incoming request bodies (JSON)
import cors from 'cors';              // Middleware to enable Cross-Origin Resource Sharing
import dotenv from 'dotenv';          // Library to load environment variables from a .env file

// Import the main API router that aggregates all specific route modules.
// The '.js' extension is necessary for local ES Module imports.
import apiRoutes from './routes/routes.js';
// Import the database connection pool utility.
// This import also triggers the initial database connection test.
import pool from './utils/db.js';
// Import bcrypt for password hashing, used in the admin user creation utility.
import bcrypt from 'bcryptjs';

// --- Environment Variable Configuration ---
// Load environment variables from the .env file into Node.js's process.env object.
dotenv.config();

// --- Express Application Initialization ---
const app = express();
// Define the port on which the server will listen.
// It uses the PORT variable from the .env file, or defaults to 5000 if not specified.
const PORT = process.env.PORT || 5000;

// --- Global Middleware Configuration ---
// Configure CORS (Cross-Origin Resource Sharing) to allow requests from your frontend.
// For development, '*' allows all origins. In production, it's highly recommended
// to restrict this to your specific frontend domain(s) for security.
app.use(cors({
    origin: '*', // Allows requests from any origin (e.g., your React app on a different port/domain)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed request headers
}));
// Use body-parser to parse incoming JSON request bodies.
// This allows you to access JSON data sent from the frontend via `req.body`.
app.use(bodyParser.json());

// --- API Route Mounting ---
// Mount the main API router. All requests starting with '/api' will be
// directed to the `apiRoutes` module, which then dispatches them to
// the appropriate specific route handlers (e.g., /api/services, /api/book).
app.use('/api', apiRoutes);

// --- Utility Function: createInitialAdminUser ---
// This asynchronous function is a helper for initial setup.
// Its purpose is to create the very first admin user account in the 'admins' table.
// This function should ONLY be executed ONCE during the application's initial deployment/setup.
async function createInitialAdminUser(username, password, email) {
    let connection; // Declare connection variable to ensure it's properly released.
    try {
        connection = await pool.getConnection(); // Obtain a database connection from the pool.
        // Hash the provided plain-text password using bcryptjs before storing it.
        // Hashing is crucial for security; it prevents storing passwords in plain text.
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is a good default for salt rounds.
        const sql = `
            INSERT INTO admins (username, password_hash, email)
            VALUES (?, ?, ?)
        `;
        const values = [username, hashedPassword, email];
        await connection.execute(sql, values); // Execute the SQL insert query.
        console.log(`Admin user '${username}' created successfully.`);
    } catch (error) {
        // Handle specific error case: if a user with the same username or email already exists.
        if (error.code === 'ER_DUP_ENTRY') {
            console.warn(`Admin user '${username}' or email '${email}' already exists.`);
        } else {
            console.error('Error creating initial admin user:', error);
        }
    } finally {
        // Ensure the database connection is always released back to the pool,
        // even if an error occurred, to prevent connection leaks.
        if (connection) {
            connection.release();
        }
    }
}

// --- Initial Admin User Creation (IMPORTANT SECURITY NOTE) ---
// !!! DANGER ZONE: This line below is for ONE-TIME initial setup only.
// !!! To use it:
// !!! 1. Uncomment the line.
// !!! 2. Replace 'your_admin_username', 'your_very_strong_password', and 'your_admin_email@example.com'
// !!!    with your desired credentials.
// !!! 3. Save server.js.
// !!! 4. Run the server (`node server.js`) ONCE.
// !!! 5. After you see the "Admin user created successfully" message in the console,
// !!!    IMMEDIATELY COMMENT THIS LINE OUT AGAIN and save server.js.
// !!! Leaving this uncommented in a production environment is a severe security vulnerability.
//createInitialAdminUser('your_admin_username', 'your_very_strong_password', 'your_admin_email@example.com');


// --- Start the Express Server ---
// Make the Express application listen for incoming HTTP requests on the specified PORT.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access APIs at http://localhost:${PORT}/api`);
    console.log(`(e.g., http://localhost:${PORT}/api/services for services)`);
});
// salon-backend/utils/db.js
// This file sets up and exports the MariaDB connection pool.

import mysql from 'mysql2/promise'; // Import the mysql2 library with promise support
import dotenv from 'dotenv'       // Import dotenv to load environment variables

// Load environment variables from the .env file.
dotenv.config();

// Create a MariaDB connection pool.
// A connection pool efficiently manages database connections, reusing them
// to reduce overhead and improve performance.
const pool = mysql.createPool({
    host: process.env.DB_HOST,         // Database host (e.g., 'localhost', '127.0.0.1')
    user: process.env.DB_USER,         // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME,     // Name of the database to connect to
    waitForConnections: true,          // If true, the pool will queue requests when no connections are available
    connectionLimit: 10,               // Maximum number of connections in the pool
    queueLimit: 0                      // Maximum number of requests the pool will queue (0 means unlimited)
});

// Test the database connection when this module is loaded.
// This ensures that the application can connect to the database at startup.
pool.getConnection()
    .then(connection => {
        console.log('MariaDB connection pool successfully established.');
        connection.release(); // Release the connection back to the pool immediately after testing.
    })
    .catch(err => {
        console.error('Error connecting to MariaDB:', err.message);
        // If the database connection fails, log the error and exit the Node.js process.
        // The application cannot function without a database connection.
        process.exit(1);
    });

// Export the connection pool so it can be used by other parts of the application (e.g., controllers).
export default pool;
// salon-backend/controllers/serviceController.js
// This file contains the business logic for handling service-related requests.

import pool  from '../utils/db.js' // Import the database connection pool

// Controller function to get all services.
// This function will be called when a GET request is made to the /api/services endpoint.
const getAllServices = async (req, res) => {
    let connection; // Declare connection variable for proper scope in finally block.
    try {
        connection = await pool.getConnection(); // Get a connection from the pool.
        // Execute a SQL query to select all service details from the 'services' table.
        // We include 'category' now that it's in the database.
        const [rows] = await connection.execute('SELECT service_id, name, duration_minutes, price, description, category FROM services ORDER BY name');
        // Send a 200 OK response with the services data as JSON.
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error in getAllServices:', error);
        // If an error occurs, send a 500 Internal Server Error response.
        res.status(500).json({ message: 'Internal server error while fetching services.' });
    } finally {
        // Always release the database connection back to the pool.
        if (connection) {
            connection.release();
        }
    }
};

// Export the controller function so it can be used by the routes.
export default getAllServices;
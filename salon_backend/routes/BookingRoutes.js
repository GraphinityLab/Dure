// salon-backend/routes/bookingRoutes.js
// This file defines API routes specifically for appointment bookings.

import express from 'express'; // Import Express to create a router
const router = express.Router();    // Create a new router instance

// Import the booking controller which contains the logic for booking operations.
import  createBooking  from '../controllers/BookingController.js';

// Define the POST route for creating a new booking.
// When a POST request is made to the root of this router (e.g., /api/book),
// the createBooking function from bookingController will be executed.
router.post('/', createBooking);

// Export the router as the default export for this module.
// This allows it to be imported and used by other route files (like api.js).
export default router;
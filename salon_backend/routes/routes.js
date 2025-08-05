// salon-backend/routes/api.js
// This is the main API router file. It aggregates and mounts
// specific route modules (like serviceRoutes and bookingRoutes).

import express from 'express'; // Import Express to create a router
const router = express.Router();    // Create a new router instance

// Import the specific route modules.
// Remember to add .js extension for local module imports.
import serviceRoutes from './ServiceRoutes.js'; // Import default export from serviceRoutes.js
import bookingRoutes from './BookingRoutes.js'; // Import default export from bookingRoutes.js

// Mount the service routes under the '/services' path.
// Any request to /api/services will be handled by serviceRoutes.
router.use('/services', serviceRoutes);

// Mount the booking routes under the '/book' path.
// Any request to /api/book will be handled by bookingRoutes.
router.use('/book', bookingRoutes);

// Export the main API router as the default export.
// This router will be used by server.js to handle all '/api' requests.
export default router;
// salon-backend/routes/serviceRoutes.js
// This file defines API routes specifically for salon services.

import express from 'express'; // Import Express to create a router
const router = express.Router();    // Create a new router instance

// Import the service controller which contains the logic for service operations.
import  getAllServices  from '../controllers/ServiceController.js'

// Define the GET route for fetching all services.
// When a GET request is made to the root of this router (e.g., /api/services),
// the getAllServices function from serviceController will be executed.
router.get('/', getAllServices);

// Export the router as the default export for this module.
// This allows it to be imported and used by other route files (like api.js).
export default router;
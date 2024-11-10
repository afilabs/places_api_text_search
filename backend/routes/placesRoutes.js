const express = require("express");
const router = express.Router();
const placesController = require("../controllers/placesController");

// Route for fetching places using the Google Places API
router.get("/", placesController.getPlacesWithDetails);

module.exports = router;

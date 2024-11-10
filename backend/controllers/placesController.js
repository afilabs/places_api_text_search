const axios = require("axios");

exports.getPlacesWithDetails = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    // Step 1: Perform a text search to get a list of places
    const textSearchResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query,
          key: apiKey,
        },
      }
    );

    const places = textSearchResponse.data.results;

    // Step 2: Fetch additional details for each place
    const detailedPlaces = await Promise.all(
      places.map(async (place) => {

        // Combine basic info with additional details
        return {
          id: place.reference,
          name: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          rating: place.rating,
          reviewsCount: place.user_ratings_total,
          imageUrl: place.photos
            ? getPhotoUrl(place.photos[0].photo_reference, apiKey)
            : "",
        };
      })
    );

    res.status(200).json(detailedPlaces);
  } catch (error) {
    console.error("Error fetching places with details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPhotoUrl = (photoReference, apiKey) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
};

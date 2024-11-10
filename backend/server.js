require("dotenv").config();
const express = require("express");
const cors = require("cors");
const placesRoutes = require("./routes/placesRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: [/\.afi\.dev$/, "http://localhost:3000"],
  credentials: true, // Enable if you need to send cookies with the requests
};

app.use(cors(corsOptions));

// Use the places routes for all /api/places requests
app.use("/api/places", placesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

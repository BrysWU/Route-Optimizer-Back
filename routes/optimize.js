import express from "express";
import { geocodeAddress } from "../services/geocode.js";
import { optimizeRoute } from "../services/optimizeRoute.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { start, stops, end } = req.body;
    if (!start || !end || !stops || !Array.isArray(stops) || stops.length === 0) {
      return res.status(400).json({ error: "Missing start, end, or stops." });
    }

    // Geocode all addresses
    const allAddresses = [start, ...stops, end];
    const geocoded = await Promise.all(allAddresses.map(geocodeAddress));

    // Prepare jobs (stops)
    const jobs = stops.map((stop, idx) => ({
      id: idx + 1,
      location: geocoded[idx + 1]
    }));

    // Prepare vehicle (start/end)
    const vehicle = {
      id: 1,
      start: geocoded[0],
      end: geocoded[geocoded.length - 1]
    };

    // Optimize route
    const optimizedIndexes = await optimizeRoute(jobs, vehicle);

    // Map back to original stops
    const optimizedStops = optimizedIndexes.map(i => stops[i]);

    res.json({ start, stops: optimizedStops, end });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

export default router;
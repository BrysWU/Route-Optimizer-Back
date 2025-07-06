import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRouter from "./routes/optimize.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();

// Explicit CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Local React dev
  "https://bryswu.github.io", // GitHub Pages (update if you deploy there)
  "https://route-optimizer-front.bryswu.com" // Example custom domain, update as needed
];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Route optimizer backend is running.");
});

// API Routes
app.use("/api/optimize", optimizeRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

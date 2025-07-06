import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRouter from "./routes/optimize.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(cors());
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
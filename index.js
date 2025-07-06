import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRouter from "./routes/optimize.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bryswu.github.io",
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Route optimizer backend is running.");
});

app.use("/api/optimize", optimizeRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/index.js";
import connectToDatabase from "./config/database.js";

dotenv.config();
const app = express();
app.use(
  cors({
    url: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

// Use Helmet for security headers
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Connect to Database
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    console.log("Connected to Database");
    
    const server = app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = (signal) => {
      console.log(`${signal} signal received: closing HTTP server`);
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
      
      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("Forced server shutdown");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (err) {
    console.error("Database connection error:", err);
    console.error("Failed to connect to MongoDB. Terminating application...");
    process.exit(1);
  }
};

startServer();
// Routes

app.use('/api/v1', apiRouter);


export default app;

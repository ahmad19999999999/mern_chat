import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/bd.js";
import userRouter from "./routes/userrouter.js";
import messageRouter from "./routes/messagerouter.js";
import errorMiddleware from "./midelware/ErrorMidelware.js";
import cookieParser from 'cookie-parser';
import { app, server } from "./utils/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", messageRouter);

// Error Middleware
app.use(errorMiddleware);

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.stack || err);
  server.close(() => process.exit(1));
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error("DB Connection Error:", err.stack || err);
    process.exit(1);
  }
};

startServer();

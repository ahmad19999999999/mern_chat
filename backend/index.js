import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/bd.js"
import userRouter from "./routes/userrouter.js";
import messageRouter from "./routes/messagerouter.js";
import errorMiddleware from "./midelware/ErrorMidelware.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

app.use(cors());app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", messageRouter);

// Error Middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

// Connect DB first, then start server
connectDB().then(() => {
  const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
});

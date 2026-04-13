// Import the packages we need
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

// Load environment variables from the .env file
dotenv.config();

// Create the Express app
const app = express();

// Choose a port from the environment, or use 5000 by default
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route so we can confirm the server is working
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

// Health route for quick checks and Docker-friendly monitoring
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Task API routes
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

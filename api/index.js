// api/index.js
const express = require("express");
const app = express();

// Simple user data collection
const users = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", role: "editor" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "viewer",
  },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "admin" },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins (for public access)
// In a real application, you might restrict this to specific origins.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Define the root API endpoint
// Anyone visiting the URL (e.g., your-vercel-url.vercel.app/api)
// will get this JSON data.
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the Serverless User Data API!",
    data: users,
    timestamp: new Date().toISOString(),
  });
});

// You can also add a specific endpoint for just users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// For local testing purposes (Vercel will ignore this for deployment)
// If you run 'npm start' or 'node api/index.js' locally, it will listen.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    "Access data at http://localhost:3000/api or http://localhost:3000/api/users"
  );
});

// Export the app for Vercel (crucial for serverless deployment)
module.exports = app;

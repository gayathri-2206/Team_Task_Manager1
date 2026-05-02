const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express(); // ✅ FIRST create app

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// Default route (important)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});
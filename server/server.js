const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ ADD THIS123
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

// serve frontend
app.use(express.static(path.join(__dirname, "../client"))); // now works

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

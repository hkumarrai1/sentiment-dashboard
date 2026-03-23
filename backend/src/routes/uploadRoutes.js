const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const { uploadCSV } = require("../controllers/uploadController");

// Route: Upload CSV
router.post("/upload", upload.single("file"), uploadCSV);

module.exports = router;

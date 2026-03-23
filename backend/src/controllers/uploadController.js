const fs = require("fs");
const csv = require("csv-parser");
const { analyzeSentiment } = require("../services/aiService");

const uploadCSV = (req, res) => {
  try {
    const results = [];

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Expecting column name 'text'
        if (data.text) {
          results.push({
            text: data.text,
          });
        }
      })
      .on("end", async () => {
        try {
          const analyzedResults = [];

          for (let item of results) {
            const sentiment = await analyzeSentiment(item.text);

            analyzedResults.push({
              text: item.text,
              sentiment: sentiment,
            });
          }

          return res.json({
            message: "CSV analyzed successfully",
            data: analyzedResults,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "AI processing failed" });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file" });
  }
};

module.exports = { uploadCSV };

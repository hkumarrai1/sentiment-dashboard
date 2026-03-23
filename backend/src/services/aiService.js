const { exec } = require("child_process");
const path = require("path");

const analyzeSentiment = (text) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      __dirname,
      "../../../ai-model/scripts/analyze.py",
    );

    // Escape quotes in text
    const safeText = text.replace(/"/g, '\\"');

    exec(`python3 "${scriptPath}" "${safeText}"`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      const result = stdout.trim();
      resolve(result);
    });
  });
};

module.exports = { analyzeSentiment };

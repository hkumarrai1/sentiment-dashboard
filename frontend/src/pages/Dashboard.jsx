import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SentimentPie from "../components/charts/SentimentPie";
import StatsCard from "../components/ui/StatsCard";
import UploadBox from "../components/ui/UploadBox";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
      );

      setData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    let positive = 0,
      negative = 0,
      neutral = 0;

    data.forEach((item) => {
      if (item.sentiment === "Positive") positive++;
      else if (item.sentiment === "Negative") negative++;
      else neutral++;
    });

    return { positive, negative, neutral };
  };

  const stats = getStats();

  return (
    <div className="container">
      {/* 🔥 HEADER */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🚀 Sentiment Analyzer Dashboard
      </h1>

      {/* 🔥 UPLOAD SECTION */}
      <motion.div
        className="card"
        style={{ maxWidth: "500px", margin: "0 auto" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 style={{ textAlign: "center" }}>📂 Upload CSV File</h2>

        <UploadBox onFileSelect={setFile} />

        <br />

        <div style={{ textAlign: "center" }}>
          <button onClick={handleUpload}>Upload & Analyze</button>
        </div>

        {loading && <p style={{ textAlign: "center" }}>⏳ Processing...</p>}
      </motion.div>

      <br />

      {/* 🔥 RESULTS SECTION */}
      {data.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <StatsCard
              title="Positive 😊"
              value={stats.positive}
              color="#22c55e"
            />
            <StatsCard
              title="Negative 😡"
              value={stats.negative}
              color="#ef4444"
            />
            <StatsCard
              title="Neutral 😐"
              value={stats.neutral}
              color="#eab308"
            />
          </div>

          <br />

          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SentimentPie data={data} />
          </div>

          <br />

          <div className="card">
            <h3>📄 Detailed Results</h3>

            {data.map((item, index) => (
              <p key={index}>
                {item.text} → <b>{item.sentiment}</b>
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

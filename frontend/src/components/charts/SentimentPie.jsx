import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#eab308"]; // green, red, yellow

const SentimentPie = ({ data }) => {
  const count = {
    Positive: 0,
    Negative: 0,
    Neutral: 0,
  };

  data.forEach((item) => {
    count[item.sentiment]++;
  });

  const chartData = [
    { name: "Positive", value: count.Positive },
    { name: "Negative", value: count.Negative },
    { name: "Neutral", value: count.Neutral },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SentimentPie;

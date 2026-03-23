import React from "react";

const StatsCard = ({ title, value, color }) => {
  return (
    <div
      className="card"
      style={{
        borderLeft: `5px solid ${color}`,
        minWidth: "150px",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatsCard;

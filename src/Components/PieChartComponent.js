import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#125370", "#808080", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {`${data[index]?.name || ""} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = ({ data }) => {
  let safeData = [];

  // If `data` is an object, convert it to an array
  if (data && typeof data === "object" && !Array.isArray(data)) {
    safeData = Object.entries(data).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
      value,
    }));
  } else if (Array.isArray(data)) {
    safeData = data;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <PieChart width={150} height={150}>
        <Pie
          data={safeData}
          cx="50%"
          cy="50%"
          outerRadius={75}
          label={(props) => renderCustomizedLabel({ ...props, data: safeData })}
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >
          {safeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;

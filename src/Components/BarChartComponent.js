import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const BarChartComponent = ({ data }) => (
  <BarChart width={300} height={150}  data={data}>
    <XAxis dataKey="status" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#125370" />
  </BarChart>
);

export default BarChartComponent;

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const LineChartComponent = ({ data }) => (
  <LineChart width={300} height={150} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
  </LineChart>
);

export default LineChartComponent;

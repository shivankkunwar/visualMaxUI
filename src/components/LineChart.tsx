import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush
} from 'recharts';

interface TimeDataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: TimeDataPoint[];
}

const CustomLineChart: React.FC<LineChartProps> = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="line-chart">
      <h2>Time Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3498db" activeDot={{ r: 8 }} />
          <Brush dataKey="date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
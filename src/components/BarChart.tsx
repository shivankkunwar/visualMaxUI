import React from 'react';
import './styles/BarChart.css'; // Ensure you have this CSS file for styling

interface DataPoint {
  feature: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  onBarClick: (feature: string) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, onBarClick }) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bar-chart">
      <h2>Total Time Spent by Feature</h2>
      <div className="chart-container">
        <div className="bars">
          {data.map((item, index) => (
            <div key={index} className="bar-container" onClick={() => onBarClick(item.feature)}>
              <div className="bar-label">{item.feature}</div>
            
              <div className="bar" style={{ width: `${(item.value / maxValue) * 100}%` }}>
               
              </div>
                         </div>
          ))}
        </div>
      </div>
      
      <div className="x-axis">
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className="x-tick" style={{ left: `${i * 10}%` }}>
            {i * 100}
          </div>
        ))}
        
      </div>
      <span>Total Time Spent</span>
    </div>
  );
};

export default BarChart;
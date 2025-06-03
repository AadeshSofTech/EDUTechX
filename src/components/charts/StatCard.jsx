import React from 'react';
import './StatCard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const StatCard = ({ title, value, icon, data, color }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = '';
            if (title.toLowerCase().includes('income')) {
              label = `$${context.parsed.y.toLocaleString()}`;
            } else if (title.toLowerCase().includes('attendance')) {
              label = `${context.parsed.y}%`;
            } else {
              label = context.parsed.y.toLocaleString();
            }
            return label;
          },
          title: function(context) {
            return `${context[0].label}: ${title}`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: Math.min(...data) * 0.95, // Add 5% padding to min
        max: Math.max(...data) * 1.05  // Add 5% padding to max
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    hover: {
      mode: 'index',
      intersect: false
    }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        data: data,
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: 'white',
      },
    ],
  };

  // Calculate trend percentage
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const trendPercentage = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
  const isPositive = trendPercentage > 0;

  return (
    <div className='card'>
      <div className="flex justify-between items-start mb-2">
        <div>
          <img src={icon} alt={title} className="w-12 h-12 object-contain mb-1" />
          {trendPercentage !== '0.0' && (
            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {isPositive ? '↑' : '↓'} {Math.abs(trendPercentage)}%
            </span>
          )}
        </div>
        <div className="h-16 w-24">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>
      <h3 className="text-gray-700 font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard; 
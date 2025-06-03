import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './DashboardChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Enhanced Chart options with animations
const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart',
    delay: (context) => context.dataIndex * 100,
    animateScale: true,
    animateRotate: true
  },
  interaction: {
    mode: 'index',
    intersect: false,
    axis: 'x'
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        padding: 20,
        font: {
          size: 13,
          weight: 'bold',
          family: "'Poppins', sans-serif"
        },
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    title: {
      display: true,
      text: 'School Statistics',
      padding: {
        top: 10,
        bottom: 30
      },
      font: {
        size: 20,
        weight: 'bold',
        family: "'Poppins', sans-serif"
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 13,
        weight: 'bold',
        family: "'Poppins', sans-serif"
      },
      bodyFont: {
        size: 12,
        family: "'Poppins', sans-serif"
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      usePointStyle: true,
      animation: {
        duration: 150
      },
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y + (label.includes('%') ? '%' : '');
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
        color: 'rgba(0, 0, 0, 0.05)',
        drawTicks: false
      },
      ticks: {
        font: {
          size: 12,
          weight: '500',
          family: "'Poppins', sans-serif"
        },
        padding: 10,
        callback: function(value) {
          return value + (this.chart.data.datasets[0].label.includes('%') ? '%' : '');
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12,
          weight: '500',
          family: "'Poppins', sans-serif"
        },
        padding: 8
      }
    }
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 3,
      fill: true
    },
    point: {
      radius: 6,
      hoverRadius: 9,
      borderWidth: 3,
      hoverBorderWidth: 3,
      backgroundColor: 'white'
    },
    bar: {
      borderRadius: 10,
      borderSkipped: false,
      borderWidth: 2
    }
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  }
};

const DashboardChart = ({ chartType = 'line' }) => {
  // Attendance Data with gradient
  const attendanceData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Student Attendance (%)',
        data: [25, 88, 62, 87, 90, 95],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0.0)');
          return gradient;
        },
        yAxisID: 'y',
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(75, 192, 192)',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 9,
        fill: true
      },
      {
        label: 'Faculty Attendance (%)',
        data: [95, 70, 94, 16, 93, 47],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(53, 162, 235, 0.5)');
          gradient.addColorStop(1, 'rgba(53, 162, 235, 0.0)');
          return gradient;
        },
        yAxisID: 'y',
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(53, 162, 235)',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 9,
        fill: true
      }
    ],
  };

  // Academic Performance Data with enhanced design
  const performanceData = {
    labels: ['Science', 'Mathematics', 'English', 'History', 'Computer', 'Physics'],
    datasets: [
      {
        label: 'Class Average Score',
        data: [75, 68, 82, 78, 85, 72],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverOffset: 4,
        borderSkipped: false
      },
    ],
  };

  // Department Distribution Data with enhanced design
  const departmentData = {
    labels: ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical'],
    datasets: [
      {
        label: 'Students per Department',
        data: [300, 250, 200, 180, 150],
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 15,
        offset: 5,
      },
    ],
  };

  const getChartData = (type) => {
    switch (type) {
      case 'line':
        return attendanceData;
      case 'bar':
        return performanceData;
      case 'pie':
        return departmentData;
      default:
        return attendanceData;
    }
  };

  const getChartOptions = (type) => {
    const baseOptions = { ...options };
    if (type === 'pie') {
      baseOptions.plugins.legend.position = 'right';
      baseOptions.plugins.legend.labels.padding = 15;
    }
    return baseOptions;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line options={getChartOptions('line')} data={getChartData('line')} />;
      case 'bar':
        return <Bar options={getChartOptions('bar')} data={getChartData('bar')} />;
      case 'pie':
        return <Pie options={getChartOptions('pie')} data={getChartData('pie')} />;
      default:
        return <Line options={getChartOptions('line')} data={getChartData('line')} />;
    }
  };

  return (
    <div className="dashboard-chart">
      {renderChart()}
    </div>
  );
};

export default DashboardChart; 
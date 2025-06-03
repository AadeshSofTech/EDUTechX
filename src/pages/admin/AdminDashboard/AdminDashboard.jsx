import React, { useState } from "react";
import "./AdminDashboard.css";
import Adminsidebar from "../../../components/AdminSidebar/Adminsidebar";
import { Link } from "react-router-dom";
import DashboardChart from "../../../components/charts/DashboardChart";
import StatCard from "../../../components/charts/StatCard";

function AdminDashboard() {
  const [chartType, setChartType] = useState('line');

  const cardData = [
    {
      title: "Total Students",
      value: "35,000",
      icon: "/students-icon.png",
      data: [32000, 33500, 34200, 34800, 35000, 35200],
      color: "#4F46E5"
    },
    {
      title: "Students Attendance",
      value: "92%",
      icon: "/attendance.png",
      data: [88, 85, 90, 89, 92, 93],
      color: "#10B981"
    },
    {
      title: "Total Departments",
      value: "19,050",
      icon: "/department.png",
      data: [18200, 18500, 18800, 19000, 19050, 19100],
      color: "#F59E0B"
    },
    {
      title: "Graduate Students",
      value: "23,890",
      icon: "/graduate-icon.jpg",
      data: [21000, 22000, 22500, 23000, 23500, 23890],
      color: "#EC4899"
    },
    {
      title: "Total Income",
      value: "$2,102,050",
      icon: "/income-icon.png",
      data: [1800000, 1900000, 2000000, 2050000, 2080000, 2102050],
      color: "#8B5CF6"
    }
  ];

  return (
    <div className='admin-dashboard'>
      {/* Sidebar */}
      <Adminsidebar />

      <main className='dashboard-content'>
        <header className='dashboard-header'>
          {/* Profile */}
          <div className='user-info'>
            <Link to='/profile'>
              <img src='/user.jpg' alt='User' className='user-avatar' />
            </Link>
          </div>

          {/* admin details */}
          <div className='user-info'>
            <span>Admin ID: 2124UDSM2076</span>
          </div>
        </header>

        <section className='summary-cards'>
          {cardData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              data={card.data}
              color={card.color}
            />
          ))}
        </section>

        <section className='data-section'>
          <div className='chart-area'>
            <div className="chart-controls mb-4">
              <button 
                className={`mr-2 px-4 py-2 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setChartType('line')}
              >
                Attendance Trends
              </button>
              <button 
                className={`px-4 py-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setChartType('bar')}
              >
                Bar Chart
              </button>
            </div>
            <DashboardChart chartType={chartType} />
          </div>
          {/* <div className='notification-area'>
            <h4>Notifications</h4>
            <ul>
              <li>
                <span className='tag green'>Academic</span> New exam room added.
              </li>
              <li>
                <span className='tag yellow'>Printing</span> School name printed.
              </li>
              <li>
                <span className='tag pink'>Notice</span> School notice delivered.
              </li>
            </ul>
          </div> */}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;

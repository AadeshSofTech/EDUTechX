import React from 'react';
import './ManagementDashboard.css';
import { useNavigate } from 'react-router-dom';

const modules = [
  { name: 'Student Profiles', icon: '👨‍🎓', path: '/management/students' },
  { name: 'Admissions', icon: '🎓', path: '/management/admission' },
  { name: 'Fee Management', icon: '💰', path: '/management/fees' },
  { name: 'Bus Fees', icon: '🚌', path: '/management/busfees' },
  { name: 'Transport', icon: '🚐', path: '/management/transport' },
  { name: 'Hostel', icon: '🏠', path: '/management/hostel' },
  { name: 'Scholarships', icon: '🎖️', path: '/management/scholarship' },
  { name: 'ID Card Generation', icon: '🪪', path: '/management/idcard' },
  { name: 'Reports', icon: '📊', path: '/management/reports' },
  { name: 'Settings', icon: '⚙️', path: '/management/settings' }
];

function ManagementDashboard() {
  const navigate = useNavigate(); // ✅ Move inside component

  return (
    <div className="management-dashboard">
      {/* Top Info */}
      <div className="topbar">
        <div className="left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h2>Abhinav Primary & Secondary School</h2>
        </div>
        <div className="center">
          <span><strong>Management ID:</strong> MGMT2025-01</span>
          <span><strong>Role:</strong> Finance & Administration</span>
        </div>
        <div className="right">
          <span>🕒 Last Login: 16 May 2025</span>
          <img src="/user.jpg" className="user-img" alt="Management" />
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input type="text" placeholder="Search Feature" />
      </div>

      {/* Module Grid */}
      {modules.map((mod, index) => (
        <div
          key={mod.name}
          className="card"
          onClick={() => navigate(mod.path)}
          style={{ animationDelay: `${index * 0.05}s`, cursor: 'pointer' }}
        >
          <div className="card-icon">{mod.icon}</div>
          <div className="card-name">{mod.name}</div>
        </div>
      ))}

      {/* Support */}
      <button className="support-btn">🛟 Support</button>
    </div>
  );
}

export default ManagementDashboard;

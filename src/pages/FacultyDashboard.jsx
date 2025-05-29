import React from 'react';
import './FacultyDashboard.css';
import { Link } from 'react-router-dom';


const modules = [
  { name: 'Take Attendance', icon: '🗓️', path: '/faculty/attendance' },
  { name: 'Enter Marks', icon: '✏️', path: '/faculty/marks' },
  { name: 'Post Notice', icon: '📢', path: '/faculty/notice' },
  { name: 'My Subjects', icon: '📚', path: '/faculty/subjects' },
  { name: 'Student List', icon: '👨‍🎓', path: '/faculty/students' },
  { name: 'Exam Schedule', icon: '🧪', path: '/faculty/exams' },
  { name: 'Assignments', icon: '📝', path: '/faculty/assignments' },
  { name: 'Leave Application', icon: '📄', path: '/faculty/leave' },
  { name: 'Upload Syllabus', icon: '📂', path: '/faculty/syllabus' },
  { name: 'Lesson Plan', icon: '🧾', path: '/faculty/lesson-plan' },
  { name: 'Faculty Time Table', icon: '📆', path: '/faculty/timetable' },
  { name: 'My Profile', icon: '👤', path: '/faculty/profile' },
  
];

function FacultyDashboard() {
  return (
    <div className="faculty-dashboard">
      {/* Top Bar */}
      <div className="topbar">
        <div className="left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h2>Abhinav Primary & Secondary School</h2>
        </div>
        <div className="center">
          <span><strong>Faculty ID:</strong> FAC20250401</span>
          <span><strong>Department:</strong> Mathematics</span>
        </div>
        <div className="right">
          <span>🕒 Last Login: 16 May 2025</span>
          <img src="/user.jpg" className="user-img" alt="Faculty" />
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input type="text" placeholder="Search Feature" />
      </div>

      {/* Module Grid */}
      <div className="grid">
  {modules.map((mod, index) => (
    <Link
      key={mod.name}
      to={mod.path}
      className="card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-icon">{mod.icon}</div>
      <div className="card-name">{mod.name}</div>
    </Link>
  ))}
</div>

      {/* Support Button */}
      <button className="support-btn">🛟 Support</button>
    </div>
  );
}

export default FacultyDashboard;

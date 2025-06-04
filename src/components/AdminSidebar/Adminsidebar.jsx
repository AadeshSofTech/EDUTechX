import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Adminsidebar.css";

const Adminsidebar = () => {
  const modules = [
    // Dashboard & Profile
    { name: "Dashboard", icon: "🏠", path: "/admin" },
    { name: "My Profile", icon: "👤", path: "/admin/profile" },
    
    // Student Management
    { name: "Admission", icon: "🎓", path: "/admin/admission" },
    { name: "Registration", icon: "📝", path: "/admin/registration" },
    { name: "Student List", icon: "👨‍🎓", path: "/admin/students" },
    { name: "ID Card Generator", icon: "🪪", path: "/admin/idcard" },
    
    // Academic Management
    { name: "Academics", icon: "📚", path: "/admin/academics" },
    { name: "Study Material", icon: "📘", path: "/admin/material" },
    { name: "Assignments", icon: "📝", path: "/admin/assignment" },
    { name: "Quiz", icon: "❓", path: "/admin/quiz" },
    { name: "Project Monitoring", icon: "📈", path: "/admin/project" },
    { name: "Lesson Plan", icon: "🧾", path: "/admin/lesson-plan" },
    { name: "Upload Syllabus", icon: "📂", path: "/admin/syllabus" },
    
    // Examination
    { name: "Examination", icon: "🧪", path: "/admin/examination" },
    { name: "Programming Lab Exam", icon: "💻", path: "/admin/labexam" },
    { name: "Exam Schedule", icon: "🧪", path: "/admin/exams" },
    { name: "Enter Marks", icon: "✏️", path: "/admin/marks" },
    
    // Schedule Management
    { name: "Academic Calendar", icon: "📅", path: "/admin/academic-calendar" },
    { name: "Time Table", icon: "📆", path: "/admin/timetable" },
    { name: "Faculty Time Table", icon: "📆", path: "/admin/faculty/timetable" },
    
    // Attendance & Leave
    { name: "Attendance", icon: "🧾", path: "/admin/attendance" },
    { name: "Take Attendance", icon: "🗓️", path: "/admin/faculty/attendance" },
    { name: "Leave Application", icon: "📄", path: "/admin/leave" },
    
    // Communication
    { name: "Post Notice", icon: "📢", path: "/admin/notice" },
    { name: "Feedback", icon: "🗣️", path: "/admin/feedback" },
    { name: "Grievance", icon: "📢", path: "/admin/grievance" },
    
    // Student Services
    { name: "Clearance", icon: "✅", path: "/admin/clearance" },
    { name: "Certificate", icon: "📄", path: "/admin/certificate" },
    { name: "Career", icon: "💼", path: "/admin/career" },
    { name: "Mentor-Mentee", icon: "👥", path: "/admin/mentorship" },
    
    // Campus Management
    { name: "Hostel", icon: "🏠", path: "/admin/hostel" },
    { name: "Transport", icon: "🚌", path: "/admin/transport" },
    { name: "Event", icon: "📅", path: "/admin/event" },
    { name: "Meeting Management", icon: "📋", path: "/admin/meetings" },
    
    // Finance
    { name: "Accounts", icon: "💳", path: "/admin/accounts" },
    { name: "Fee Management", icon: "💰", path: "/admin/fees" },
    { name: "Bus Fees", icon: "🚌", path: "/admin/busfees" },
    { name: "Scholarships", icon: "🎖️", path: "/admin/scholarship" },
    { name: "Staff Payroll", icon: "💵", path: "/admin/payroll" },
    
    // Faculty Management
    { name: "Add Faculty", icon: "➕", path: "/admin/faculty/add" },
    { name: "My Subjects", icon: "📚", path: "/admin/faculty/subjects" },
    
    // Administration
    { name: "NBA", icon: "🏆", path: "/admin/nba" },
    { name: "System Settings", icon: "⚙️", path: "/admin/settings" },
    { name: "Backup & Restore", icon: "🧩", path: "/admin/backup" },
    { name: "Logs & Audit", icon: "📑", path: "/admin/logs" },
    { name: "Reports", icon: "📊", path: "/admin/reports" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button className='hamburger' onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className='logo-area'>
          <Link to='/admin'>
            <img src='/logo.jpg' alt='Logo' className='logo' />
          </Link>
          <h3 className='title'>EDU TechX</h3>
        </div>

        <nav className='nav-links'>
          {modules.map((mod) => (
            <NavLink
              key={mod.name}
              to={mod.path}
              className={({ isActive }) =>
                `nav-item${isActive ? " active-tab" : ""}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className='icon'>{mod.icon}</span>
              <span className='label'>{mod.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Adminsidebar;

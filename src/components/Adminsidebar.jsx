import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Adminsidebar.css";

const Adminsidebar = () => {
  const modules = [
    { name: "Dashboard", icon: "🏠", path: "/admin" },
    { name: "Admission", icon: "🎓", path: "/admission" },
    { name: "Registration", icon: "🪪", path: "/registration" },
    { name: "ID Card Generator", icon: "🪪", path: "/management/idcard" },
    { name: "Academics", icon: "📚", path: "/academics" },
    { name: "Study Material", icon: "📘", path: "/material" },
    { name: "Assignments", icon: "📝", path: "/faculty/assignments" },
    { name: "Quiz", icon: "❓", path: "/quiz" },
    { name: "Project Monitoring", icon: "📈", path: "/project" },
    { name: "Lesson Plan", icon: "🧾", path: "/faculty/lesson-plan" },
    { name: "Upload Syllabus", icon: "📂", path: "/faculty/syllabus" },
    { name: "Examination", icon: "🧪", path: "/examination" },
    { name: "Programming Lab Exam", icon: "💻", path: "/labexam" },
    { name: "Exam Schedule", icon: "🧪", path: "/faculty/exams" },
    { name: "Enter Marks", icon: "✏️", path: "/faculty/marks" },
    { name: "Academic Calendar", icon: "📅", path: "/calendar" },
    { name: "Time Table", icon: "📆", path: "/timetable" },
    { name: "Faculty Time Table", icon: "📆", path: "/faculty/timetable" },
    { name: "My Subjects", icon: "📚", path: "/faculty/subjects" },
    { name: "Student List", icon: "👨‍🎓", path: "/students-Details" },
    { name: "Take Attendance", icon: "🗓️", path: "/faculty/attendance" },
    { name: "Leave Application", icon: "📄", path: "/faculty/leave" },
    { name: "Post Notice", icon: "📢", path: "/faculty/notice" },
    { name: "My Profile", icon: "👤", path: "/profile" },
    { name: "Clearance", icon: "✅", path: "/clearance" },
    { name: "Certificate", icon: "📄", path: "/certificate" },
    { name: "Attendance", icon: "🧾", path: "/attendance" },
    { name: "Feedback", icon: "🗣️", path: "/feedback" },
    { name: "Grievance", icon: "📢", path: "/grievance" },
    { name: "Career", icon: "💼", path: "/career" },
    { name: "Mentor-Mentee", icon: "👥", path: "/mentorship" },
    { name: "NBA", icon: "🏆", path: "/nba" },
    { name: "Event", icon: "📅", path: "/event" },
    { name: "Meeting Management", icon: "📋", path: "/meetings" },
    { name: "Hostel", icon: "🏠", path: "/hostel" },
    { name: "Transport", icon: "🚌", path: "/transport" },
    { name: "Accounts", icon: "💳", path: "/accounts" },
    { name: "Fee Management", icon: "💰", path: "/management/fees" },
    { name: "Bus Fees", icon: "🚌", path: "/management/busfees" },
    { name: "Scholarships", icon: "🎖️", path: "/management/scholarship" },
    { name: "Add Faculty", icon: "➕", path: "/admin/addfaculty" },
    { name: "Staff Payroll", icon: "💵", path: "/admin/payroll" },
    { name: "System Settings", icon: "⚙️", path: "/admin/settings" },
    { name: "Backup & Restore", icon: "🧩", path: "/admin/backup" },
    { name: "Logs & Audit", icon: "📑", path: "/admin/logs" },
    { name: "Reports", icon: "📊", path: "/management/reports" },
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
            <img src='/logo.png' alt='Logo' className='logo' />
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

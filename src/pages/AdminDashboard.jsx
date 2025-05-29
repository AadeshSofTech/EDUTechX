import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';



const modules = [
  { name: 'ASPORTAL', icon: '📝', path: '/asportal' },
  { name: 'Academic Calendar', icon: '📅', path: '/calendar' },
  { name: 'Academics', icon: '📚', path: '/academics' },
  { name: 'Accounts', icon: '💳', path: '/accounts' },
  { name: 'Admission', icon: '🎓', path: '/admission' },
  { name: 'Attendance', icon: '🧾', path: '/attendance' },
  { name: 'Career', icon: '💼', path: '/career' },
  { name: 'Certificate', icon: '📄', path: '/certificate' },
  { name: 'Clearance', icon: '✅', path: '/clearance' },
  { name: 'Event', icon: '📅', path: '/event' },
  { name: 'Examination', icon: '🧪', path: '/examination' },
  { name: 'Feedback', icon: '🗣️', path: '/feedback' },
  { name: 'Grievance', icon: '📢', path: '/grievance' },
  { name: 'Hostel', icon: '🏠', path: '/hostel' },
  { name: 'Meeting Management', icon: '📋', path: '/meetings' },
  { name: 'Mentor-Mentee', icon: '👥', path: '/mentorship' },
  { name: 'NBA', icon: '🏆', path: '/nba' },
  { name: 'Notification', icon: '🔔', path: '/notifications' },
  { name: 'Programming Lab Exam', icon: '💻', path: '/labexam' },
  { name: 'Project Monitoring', icon: '📈', path: '/project' },
  { name: 'Quiz', icon: '❓', path: '/quiz' },
  { name: 'Registration', icon: '🪪', path: '/registration' },
  { name: 'Study Material', icon: '📘', path: '/material' },
  { name: 'Time Table', icon: '📆', path: '/timetable' },
  { name: 'Transport', icon: '🚌', path: '/transport' },
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
  { name: 'Fee Management', icon: '💰', path: '/management/fees' },
  { name: 'Bus Fees', icon: '🚌', path: '/management/busfees' },
  { name: 'Scholarships', icon: '🎖️', path: '/management/scholarship' },
  { name: 'ID Card Generator', icon: '🪪', path: '/management/idcard' },
  { name: 'Reports', icon: '📊', path: '/management/reports' },
  { name: 'Add Faculty', icon: '➕', path: '/admin/addfaculty' },
  { name: 'Staff Payroll', icon: '💵', path: '/admin/payroll' },
  { name: 'System Settings', icon: '⚙️', path: '/admin/settings' },
  { name: 'Backup & Restore', icon: '🧩', path: '/admin/backup' },
  { name: 'Logs & Audit', icon: '📑', path: '/admin/logs' }
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="logo-area">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h3>ABHINAV SCHOOL</h3>
        </div>
        <nav className="nav-links">
          {modules.slice(0, 10).map((mod) => (
            <Link key={mod.name} to={mod.path} className="nav-item">
              <span>{mod.icon}</span> <span>{mod.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <input type="text" placeholder="Search here..." className="search-input" />
          <div className="user-info">
            <span>Admin ID: 2124UDSM2076</span>
            <img src="/user.jpg" alt="User" className="user-avatar" />
          </div>
        </header>

        <section className="summary-cards">
          <div className="card"> <h3>Total Students</h3><p>35,000</p> </div>
          <div className="card"> <h3>Total Exams</h3><p>19,050</p> </div>
          <div className="card"> <h3>Graduate Students</h3><p>23,890</p> </div>
          <div className="card"> <h3>Total Income</h3><p>$2,102,050</p> </div>
        </section>

        <section className="data-section">
          <div className="chart-area">[Chart Placeholder]</div>
          <div className="notification-area">
            <h4>Notifications</h4>
            <ul>
              <li><span className="tag green">Academic</span> New exam room added.</li>
              <li><span className="tag yellow">Printing</span> School name printed.</li>
              <li><span className="tag pink">Notice</span> School notice delivered.</li>
            </ul>
          </div>
        </section>

        <section className="table-section">
          <h4>My Students</h4>
          <table>
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Gender</th><th>Class</th><th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td><td>Jack Sparrow</td><td>Male</td><td>5-A</td><td>jack@email.com</td>
              </tr>
              <tr>
                <td>2</td><td>Harry Potter</td><td>Male</td><td>6-B</td><td>harry@email.com</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;

import React from "react";
import "./AdminDashboard.css";
import Adminsidebar from "../../components/Adminsidebar";
import { Link } from "react-router-dom";

function AdminDashboard() {
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
          <div className='card'>
            <img src='/students-icon.png' alt='students' />
            <h3>Total Students</h3>
            <p>35,000</p>
          </div>
          <div className='card'>
            <img src='/attendance.png' alt='attendance' />
            <h3>Students Attendance</h3>
            <p>35,000</p>
          </div>
          <div className='card'>
            <img src='/department.png' alt='department' />
            <h3>Total Departments</h3>
            <p>19,050</p>
          </div>
          <div className='card'>
            <img src='/graduate-icon.jpg' className='small-icon' alt='graduates' />
            <h3>Graduate Students</h3>
            <p>23,890</p>
          </div>
          <div className='card'>
            <img src='/income-icon.png' className='small-icon' alt='Income Icon' />
            <h3>Total Income</h3>
            <p>$2,102,050</p>
          </div>
        </section>

        <section className='data-section'>
          <div className='chart-area'>[Chart Placeholder]</div>
          <div className='notification-area'>
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
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;

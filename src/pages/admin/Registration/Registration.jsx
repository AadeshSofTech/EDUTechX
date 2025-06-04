import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Adminsidebar from '../../../components/AdminSidebar/Adminsidebar';
import { FaUserGraduate, FaUserPlus, FaHistory } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import ViewRegistration from '../../../components/Registration/ViewRegistration';
import EditRegistration from '../../../components/Registration/EditRegistration';
import './Registration.css';

const Registration = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Dummy data - Replace with actual API calls
  const stats = {
    totalRegistrations: 450,
    pendingAdmissions: 85,
    completedAdmissions: 365,
    newApplications: 45
  };

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Computer Science', status: 'Pending Admission', date: '2024-03-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Electronics', status: 'Registration Complete', date: '2024-03-14' },
    // Add more dummy data as needed
  ]);

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleSave = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setShowEditModal(false);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`stat-card ${color}`}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </motion.div>
  );

  const StudentTable = ({ students }) => (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <motion.tr
              key={student.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <span className={`status-badge ${student.status.toLowerCase().replace(' ', '-')}`}>
                  {student.status}
                </span>
              </td>
              <td>{student.date}</td>
              <td>
                <button className="action-btn view" onClick={() => handleView(student)}>View</button>
                <button className="action-btn edit" onClick={() => handleEdit(student)}>Edit</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Adminsidebar />
      <div className="main-content">
        <h1 className="page-title">Registration Management</h1>
        
        <div className="stats-container">
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations}
            icon={<FaUserGraduate />}
            color="blue"
          />
          <StatCard
            title="Pending Admissions"
            value={stats.pendingAdmissions}
            icon={<MdPendingActions />}
            color="yellow"
          />
          <StatCard
            title="Completed Admissions"
            value={stats.completedAdmissions}
            icon={<FaUserPlus />}
            color="green"
          />
          <StatCard
            title="New Applications"
            value={stats.newApplications}
            icon={<FaHistory />}
            color="purple"
          />
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              New Registrations
            </button>
            <button
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Admissions
            </button>
            <button
              className={`tab ${activeTab === 'old' ? 'active' : ''}`}
              onClick={() => setActiveTab('old')}
            >
              Old Data
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'new' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2>New Registration Applications</h2>
                <StudentTable students={students} />
              </motion.div>
            )}
            
            {activeTab === 'pending' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Students Pending Admission</h2>
                <StudentTable students={students.filter(s => s.status === 'Pending Admission')} />
              </motion.div>
            )}
            
            {activeTab === 'old' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Previous Registrations</h2>
                <StudentTable students={students} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {showViewModal && selectedStudent && (
        <ViewRegistration
          student={selectedStudent}
          onClose={() => {
            setShowViewModal(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {showEditModal && selectedStudent && (
        <EditRegistration
          student={selectedStudent}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStudent(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Registration; 
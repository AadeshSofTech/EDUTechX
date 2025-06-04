import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './ViewRegistration.css';

const ViewRegistration = ({ student, onClose }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <div className="registration-details">
          <h2>Registration Details</h2>
          
          <div className="status-section">
            <span className={`status-badge ${student.status.toLowerCase().replace(' ', '-')}`}>
              {student.status}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-group">
              <label>Student ID</label>
              <p>{student.id}</p>
            </div>

            <div className="detail-group">
              <label>Full Name</label>
              <p>{student.name}</p>
            </div>

            <div className="detail-group">
              <label>Email</label>
              <p>{student.email}</p>
            </div>

            <div className="detail-group">
              <label>Course</label>
              <p>{student.course}</p>
            </div>

            <div className="detail-group">
              <label>Registration Date</label>
              <p>{student.date}</p>
            </div>

            <div className="detail-group full-width">
              <label>Additional Information</label>
              <div className="info-grid">
                <div>
                  <strong>Application Status:</strong>
                  <p>{student.status}</p>
                </div>
                <div>
                  <strong>Last Updated:</strong>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewRegistration; 
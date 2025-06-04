import React from 'react';
import { FiX, FiCheck, FiX as FiCross } from 'react-icons/fi';
import './ViewAddmission.css';

const ViewAdmission = ({ data, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      'document verification': 'status-verification',
      'interview scheduled': 'status-interview',
      approved: 'status-approved',
      rejected: 'status-rejected'
    };
    return statusClasses[status.toLowerCase()] || 'status-pending';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <div className="application-status">
          <span className={`status-label status-${data.status.toLowerCase()}`}>
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </span>
            <span className="application-date">
              Applied on {formatDate(data.applicationDate)}
            </span>
          </div>

        <div className="info-cards-grid">
          <div className="info-card">
              <h3>Student Information</h3>
            <div className="info-group">
              <div className="info-label">Name:</div>
              <div className="info-value">{data.studentName}</div>
              </div>
            <div className="info-group">
              <div className="info-label">Date of Birth:</div>
              <div className="info-value">{formatDate(data.dateOfBirth)}</div>
              </div>
            <div className="info-group">
              <div className="info-label">Gender:</div>
              <div className="info-value">{data.gender}</div>
              </div>
            <div className="info-group">
              <div className="info-label">Class Applied For:</div>
              <div className="info-value">{data.class}th Grade</div>
              </div>
            </div>

          <div className="info-card">
              <h3>Contact Information</h3>
            <div className="info-group">
              <div className="info-label">Parent/Guardian:</div>
              <div className="info-value">{data.parentName}</div>
              </div>
            <div className="info-group">
              <div className="info-label">Contact Number:</div>
              <div className="info-value">{data.contactNumber}</div>
            </div>
            <div className="info-group">
              <div className="info-label">Email:</div>
              <div className="info-value">{data.email || 'Not provided'}</div>
            </div>
            <div className="info-group">
              <div className="info-label">Address:</div>
              <div className="info-value">{data.address}</div>
                </div>
              </div>

          <div className="info-card">
            <h3>Academic Information</h3>
            <div className="info-group">
              <div className="info-label">Previous School:</div>
              <div className="info-value">{data.previousSchool || 'Not provided'}</div>
            </div>
          </div>

          <div className="document-status-card">
            <h3>Document Status</h3>
            <div className="document-list">
              {Object.entries(data.documents).map(([key, value]) => (
                <div key={key} className="document-item">
                  {value ? (
                    <FiCheck className="document-status-icon complete" />
                  ) : (
                    <FiCross className="document-status-icon incomplete" />
                  )}
                  <span className="document-name">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmission; 
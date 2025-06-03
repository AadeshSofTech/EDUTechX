import React from 'react';
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
    <div className="view-admission-overlay">
      <div className="view-admission-container">
        <div className="view-admission-header">
          <h2>Admission Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="view-admission-content">
          <div className="admission-status">
            <span className={`status-badge ${getStatusClass(data.status)}`}>
              {data.status}
            </span>
            <span className="application-date">
              Applied on {formatDate(data.applicationDate)}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-group">
              <h3>Student Information</h3>
              <div className="detail-item">
                <label>Name:</label>
                <span>{data.studentName}</span>
              </div>
              <div className="detail-item">
                <label>Date of Birth:</label>
                <span>{formatDate(data.dateOfBirth)}</span>
              </div>
              <div className="detail-item">
                <label>Gender:</label>
                <span>{data.gender}</span>
              </div>
              <div className="detail-item">
                <label>Class Applied For:</label>
                <span>{data.class}th Grade</span>
              </div>
            </div>

            <div className="detail-group">
              <h3>Contact Information</h3>
              <div className="detail-item">
                <label>Parent/Guardian:</label>
                <span>{data.parentName}</span>
              </div>
              <div className="detail-item">
                <label>Contact Number:</label>
                <span>{data.contactNumber}</span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span>{data.email || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <label>Address:</label>
                <span>{data.address}</span>
              </div>
            </div>

            <div className="detail-group">
              <h3>Academic Information</h3>
              <div className="detail-item">
                <label>Previous School:</label>
                <span>{data.previousSchool || 'Not provided'}</span>
              </div>
            </div>

            <div className="detail-group">
              <h3>Document Status</h3>
              <div className="documents-status-grid">
                <div className="document-status-item">
                  <span className={`document-indicator ${data.documents.birthCertificate ? 'complete' : 'pending'}`} />
                  Birth Certificate
                </div>
                <div className="document-status-item">
                  <span className={`document-indicator ${data.documents.previousMarksheet ? 'complete' : 'pending'}`} />
                  Previous Marksheet
                </div>
                <div className="document-status-item">
                  <span className={`document-indicator ${data.documents.transferCertificate ? 'complete' : 'pending'}`} />
                  Transfer Certificate
                </div>
                <div className="document-status-item">
                  <span className={`document-indicator ${data.documents.medicalRecord ? 'complete' : 'pending'}`} />
                  Medical Record
                </div>
              </div>
            </div>
          </div>

          <div className="view-actions">
            <button className="close-view-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmission; 
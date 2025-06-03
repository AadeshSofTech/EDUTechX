import React, { useState } from 'react';
import './AddmissionForm.css';

const AddmissionForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    studentName: '',
    applicationDate: new Date().toISOString().split('T')[0],
    class: '',
    status: 'pending',
    contactNumber: '',
    email: '',
    parentName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    previousSchool: '',
    documents: {
      birthCertificate: false,
      previousMarksheet: false,
      transferCertificate: false,
      medicalRecord: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentChange = (documentName) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentName]: !prev.documents[documentName]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="admission-form-overlay">
      <div className="admission-form">
        <div className="form-header">
          <h2>{initialData ? 'Edit Admission' : 'New Admission'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="studentName">Student Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="class">Class</label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="parentName">Parent/Guardian Name</label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="previousSchool">Previous School</label>
              <input
                type="text"
                id="previousSchool"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {initialData && (
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="document verification">Document Verification</option>
                  <option value="interview scheduled">Interview Scheduled</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}

            <div className="documents-section">
              <h3>Required Documents</h3>
              <div className="documents-grid">
                <div className="document-item">
                  <input
                    type="checkbox"
                    id="birthCertificate"
                    checked={formData.documents.birthCertificate}
                    onChange={() => handleDocumentChange('birthCertificate')}
                  />
                  <label htmlFor="birthCertificate">Birth Certificate</label>
                </div>

                <div className="document-item">
                  <input
                    type="checkbox"
                    id="previousMarksheet"
                    checked={formData.documents.previousMarksheet}
                    onChange={() => handleDocumentChange('previousMarksheet')}
                  />
                  <label htmlFor="previousMarksheet">Previous Marksheet</label>
                </div>

                <div className="document-item">
                  <input
                    type="checkbox"
                    id="transferCertificate"
                    checked={formData.documents.transferCertificate}
                    onChange={() => handleDocumentChange('transferCertificate')}
                  />
                  <label htmlFor="transferCertificate">Transfer Certificate</label>
                </div>

                <div className="document-item">
                  <input
                    type="checkbox"
                    id="medicalRecord"
                    checked={formData.documents.medicalRecord}
                    onChange={() => handleDocumentChange('medicalRecord')}
                  />
                  <label htmlFor="medicalRecord">Medical Record</label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {initialData ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddmissionForm; 
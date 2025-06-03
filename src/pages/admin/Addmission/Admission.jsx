import React, { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import Adminsidebar from "../../../components/AdminSidebar/Adminsidebar";
import AdmissionForm from "../../../components/Addmission/AddmissionForm";
import ViewAdmission from "../../../components/Addmission/ViewAddmission";
import "./Addmission.css";

const Admission = () => {
  const [activeTab, setActiveTab] = useState("new"); // "new" or "history"
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [admissions, setAdmissions] = useState([
    {
      id: 'ADM001',
      studentName: 'John Smith',
      applicationDate: '2024-03-15',
      class: '6',
      status: 'pending',
      contactNumber: '+1 234-567-8900',
      email: 'john.smith@email.com',
      parentName: 'Michael Smith',
      dateOfBirth: '2012-05-15',
      gender: 'male',
      address: '123 Main St, Anytown, USA',
      previousSchool: 'Primary School',
      documents: {
        birthCertificate: true,
        previousMarksheet: false,
        transferCertificate: false,
        medicalRecord: true
      }
    },
    {
      id: 'ADM002',
      studentName: 'Sarah Johnson',
      applicationDate: '2024-03-14',
      class: '8',
      status: 'document verification',
      contactNumber: '+1 234-567-8901',
      email: 'sarah.j@email.com',
      parentName: 'Robert Johnson',
      dateOfBirth: '2010-08-22',
      gender: 'female',
      address: '456 Oak Ave, Somewhere, USA',
      previousSchool: 'Middle School',
      documents: {
        birthCertificate: true,
        previousMarksheet: true,
        transferCertificate: false,
        medicalRecord: true
      }
    },
    {
      id: 'ADM003',
      studentName: 'Michael Brown',
      applicationDate: '2024-03-14',
      class: '7',
      status: 'interview scheduled',
      contactNumber: '+1 234-567-8902',
      email: 'michael.b@email.com',
      parentName: 'David Brown',
      dateOfBirth: '2011-03-10',
      gender: 'male',
      address: '789 Pine St, Elsewhere, USA',
      previousSchool: 'Elementary School',
      documents: {
        birthCertificate: true,
        previousMarksheet: true,
        transferCertificate: true,
        medicalRecord: true
      }
    },
    {
      id: 'ADM004',
      studentName: 'Emma Wilson',
      applicationDate: '2024-03-13',
      class: '9',
      status: 'approved',
      contactNumber: '+1 234-567-8903',
      email: 'emma.w@email.com',
      parentName: 'Jennifer Wilson',
      dateOfBirth: '2009-11-30',
      gender: 'female',
      address: '321 Maple Dr, Nowhere, USA',
      previousSchool: 'Junior High',
      documents: {
        birthCertificate: true,
        previousMarksheet: true,
        transferCertificate: true,
        medicalRecord: true
      }
    },
    {
      id: 'ADM005',
      studentName: 'James Davis',
      applicationDate: '2024-03-12',
      class: '6',
      status: 'rejected',
      contactNumber: '+1 234-567-8904',
      email: 'james.d@email.com',
      parentName: 'William Davis',
      dateOfBirth: '2012-07-18',
      gender: 'male',
      address: '654 Cedar Ln, Anywhere, USA',
      previousSchool: 'Primary Academy',
      documents: {
        birthCertificate: true,
        previousMarksheet: false,
        transferCertificate: false,
        medicalRecord: true
      }
    }
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    const newAdmission = {
      ...formData,
      id: `ADM${String(admissions.length + 1).padStart(3, '0')}`,
    };
    setAdmissions(prev => [newAdmission, ...prev]);
    setShowForm(false);
  };

  const handleView = (admission) => {
    setSelectedAdmission(admission);
    setShowViewModal(true);
  };

  const handleEdit = (admission) => {
    setSelectedAdmission(admission);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedAdmission(null);
  };

  const handleViewClose = () => {
    setShowViewModal(false);
    setSelectedAdmission(null);
  };

  const filteredAdmissions = admissions.filter(admission => {
    const searchLower = searchQuery.toLowerCase();
    return (
      admission.studentName.toLowerCase().includes(searchLower) ||
      admission.id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="admission-page">
      <Adminsidebar />

      <div className="admission-content">
        <div className="admission-header">
          <h1>Admission Management</h1>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <FiSearch className="search-icon" />
            </div>
            <button className="add-admission-btn" onClick={handleAddNew}>
              <FiPlus />
              New Admission
            </button>
          </div>
        </div>

        <div className="admission-tabs">
          <button
            className={`tab ${activeTab === "new" ? "active" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            New Admissions
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Admission History
          </button>
        </div>

        <div className="admission-table-container">
          <div className="table-scroll">
            <table className="admission-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Application Date</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Contact</th>
                  <th>Documents</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.map(admission => (
                  <tr key={admission.id}>
                    <td>{admission.id}</td>
                    <td>{admission.studentName}</td>
                    <td>{new Date(admission.applicationDate).toLocaleDateString()}</td>
                    <td>{admission.class}th Grade</td>
                    <td>
                      <span className={`status-badge status-${admission.status.toLowerCase()}`}>
                        {admission.status}
                      </span>
                    </td>
                    <td>{admission.contactNumber}</td>
                    <td>
                      <span className={`document-status ${Object.values(admission.documents).every(Boolean) ? 'complete' : 'incomplete'}`}>
                        {Object.values(admission.documents).filter(Boolean).length}/{Object.values(admission.documents).length}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="view-btn" onClick={() => handleView(admission)}>
                          View
                        </button>
                        <button className="edit-btn" onClick={() => handleEdit(admission)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <AdmissionForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={selectedAdmission}
        />
      )}

      {showViewModal && selectedAdmission && (
        <ViewAdmission
          data={selectedAdmission}
          onClose={handleViewClose}
        />
      )}
    </div>
  );
};

export default Admission;
                    
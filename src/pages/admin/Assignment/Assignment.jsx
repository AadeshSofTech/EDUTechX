import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Adminsidebar from '../../../components/AdminSidebar/Adminsidebar';
import { FaBook, FaCalendarAlt, FaCheckCircle, FaClock, FaDownload, FaEdit, FaEye, FaPlus, FaTrash, FaTimes, FaUpload } from 'react-icons/fa';
import './Assignment.css';

const Assignment = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    // Dummy data - Replace with API calls
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            title: 'Data Structures Implementation',
            subject: 'Computer Science',
            class: 'CS-301',
            dueDate: '2024-03-25',
            status: 'active',
            submissions: 15,
            totalStudents: 40,
            description: 'Implement basic data structures including linked lists, stacks, and queues.',
            attachments: ['assignment1.pdf']
        },
        {
            id: 2,
            title: 'Circuit Analysis',
            subject: 'Electrical Engineering',
            class: 'EE-201',
            dueDate: '2024-03-28',
            status: 'active',
            submissions: 25,
            totalStudents: 35,
            description: 'Analyze and solve complex circuit problems using various theorems.',
            attachments: ['circuit_problems.pdf']
        },
        {
            id: 3,
            title: 'Thermodynamics Project',
            subject: 'Mechanical Engineering',
            class: 'ME-301',
            dueDate: '2024-03-20',
            status: 'completed',
            submissions: 30,
            totalStudents: 30,
            description: 'Design and analyze a heat engine cycle.',
            attachments: ['project_guidelines.pdf']
        }
    ]);

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleAction = (type, assignment = null) => {
        setModalType(type);
        setSelectedAssignment(assignment);
        setShowModal(true);
        if (type === 'create') {
            setUploadedFiles([]);
        }
    };

    const handleFileUpload = (files) => {
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'image/gif',
            'video/mp4',
            'video/quicktime',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        const newFiles = Array.from(files).filter(file => {
            if (!allowedTypes.includes(file.type)) {
                showNotification(`File type ${file.type} is not supported`, 'error');
                return false;
            }
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                showNotification('File size should not exceed 50MB', 'error');
                return false;
            }
            return true;
        });

        setUploadedFiles(prev => [...prev, ...newFiles]);
        showNotification('Files uploaded successfully!');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        handleFileUpload(files);
    };

    const handleDownload = async (fileName) => {
        try {
            const response = await fetch(`/assignments/${fileName}`);
            if (!response.ok) throw new Error('File not found');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            showNotification('File downloaded successfully!');
        } catch (error) {
            showNotification('Error downloading file', 'error');
        }
    };

    const handleDelete = async (assignmentId) => {
        try {
            // In a real application, make an API call to delete the assignment
            const updatedAssignments = assignments.filter(a => a.id !== assignmentId);
            setAssignments(updatedAssignments);
            setShowModal(false);
            showNotification('Assignment deleted successfully!');
        } catch (error) {
            showNotification('Error deleting assignment', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create FormData object
            const formData = new FormData(e.target);
            uploadedFiles.forEach((file, index) => {
                formData.append('files', file);
            });

            // In a real application, make an API call to save the assignment
            if (modalType === 'create') {
                const newAssignment = {
                    id: assignments.length + 1,
                    title: formData.get('title'),
                    subject: formData.get('subject'),
                    class: formData.get('class'),
                    dueDate: formData.get('dueDate'),
                    status: formData.get('status'),
                    description: formData.get('description'),
                    submissions: 0,
                    totalStudents: 0,
                    attachments: uploadedFiles.map(file => file.name)
                };
                setAssignments([...assignments, newAssignment]);
            }

            setShowModal(false);
            showNotification(modalType === 'create' ? 'Assignment created successfully!' : 'Assignment updated successfully!');
        } catch (error) {
            showNotification('Error saving assignment', 'error');
        }
    };

    const AssignmentCard = ({ assignment }) => (
        <motion.div 
            className={`assignment-card ${assignment.status}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <div className="card-header">
                <h3>{assignment.title}</h3>
                <span className={`status-badge ${assignment.status}`}>
                    {assignment.status}
                </span>
            </div>
            
            <div className="card-content">
                <div className="info-row">
                    <span><FaBook /> {assignment.subject}</span>
                    <span><FaCalendarAlt /> Due: {assignment.dueDate}</span>
                </div>
                <div className="info-row">
                    <span><FaClock /> {assignment.class}</span>
                    <span>
                        <FaCheckCircle /> Submissions: {assignment.submissions}/{assignment.totalStudents}
                    </span>
                </div>
                <p className="description">{assignment.description}</p>
            </div>

            <div className="card-actions">
                <button onClick={() => handleAction('view', assignment)} className="view-btn">
                    <FaEye /> View
                </button>
                <button onClick={() => handleAction('edit', assignment)} className="edit-btn">
                    <FaEdit /> Edit
                </button>
                <button onClick={() => handleAction('delete', assignment)} className="delete-btn">
                    <FaTrash /> Delete
                </button>
            </div>
        </motion.div>
    );

    const Modal = ({ type, assignment, onClose }) => (
        <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="modal-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
            >
                <div className="modal-header">
                    <h2>{type === 'create' ? 'Create New Assignment' : 
                         type === 'edit' ? 'Edit Assignment' : 
                         'Assignment Details'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-body">
                    {type === 'delete' ? (
                        <div className="delete-confirmation">
                            <p>Are you sure you want to delete this assignment?</p>
                            <div className="action-buttons">
                                <button 
                                    className="confirm-btn" 
                                    onClick={() => handleDelete(assignment.id)}
                                >
                                    Confirm Delete
                                </button>
                                <button className="cancel-btn" onClick={onClose}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    name="title"
                                    defaultValue={assignment?.title || ''}
                                    readOnly={type === 'view'}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input 
                                        type="text" 
                                        name="subject"
                                        defaultValue={assignment?.subject || ''}
                                        readOnly={type === 'view'}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Class</label>
                                    <input 
                                        type="text" 
                                        name="class"
                                        defaultValue={assignment?.class || ''}
                                        readOnly={type === 'view'}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Due Date</label>
                                    <input 
                                        type="date" 
                                        name="dueDate"
                                        defaultValue={assignment?.dueDate || ''}
                                        readOnly={type === 'view'}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select 
                                        name="status"
                                        defaultValue={assignment?.status || 'active'}
                                        disabled={type === 'view'}
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    name="description"
                                    defaultValue={assignment?.description || ''}
                                    readOnly={type === 'view'}
                                    rows="4"
                                    required
                                />
                            </div>

                            {type !== 'view' && (
                                <div className="form-group">
                                    <label>Attachments</label>
                                    <div 
                                        className={`file-upload ${isDragging ? 'dragging' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        <input 
                                            type="file" 
                                            id="fileInput"
                                            multiple
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                                        />
                                        <FaUpload size={24} />
                                        <p>Drag & drop files here or click to browse</p>
                                        <small>Supported files: PDF, DOC, DOCX, Images, Videos (max 50MB)</small>
                                    </div>
                                    {uploadedFiles.length > 0 && (
                                        <div className="uploaded-files">
                                            <h4>Uploaded Files:</h4>
                                            {uploadedFiles.map((file, index) => (
                                                <div key={index} className="file-item">
                                                    <span>{file.name}</span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {type === 'view' && assignment?.attachments?.length > 0 && (
                                <div className="attachments-section">
                                    <h3>Attachments</h3>
                                    {assignment.attachments.map((file, index) => (
                                        <div key={index} className="attachment-item">
                                            <span>{file}</span>
                                            <button 
                                                type="button"
                                                className="download-btn"
                                                onClick={() => handleDownload(file)}
                                            >
                                                <FaDownload /> Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {type !== 'view' && (
                                <div className="modal-actions">
                                    <button type="submit" className="save-btn">
                                        {type === 'create' ? 'Create Assignment' : 'Save Changes'}
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={onClose}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );

    const Notification = ({ message, type }) => (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );

    return (
        <div className="dashboard-container">
            {notification.show && (
                <Notification message={notification.message} type={notification.type} />
            )}
            <Adminsidebar />
            <div className="main-content1">
                <div className="page-header">
                    <h1>Assignment Management</h1>
                    <button 
                        className="create-btn"
                        onClick={() => handleAction('create')}
                    >
                        <FaPlus /> Create Assignment
                    </button>
                </div>

                <div className="assignments-grid">
                    {assignments.map(assignment => (
                        <AssignmentCard 
                            key={assignment.id} 
                            assignment={assignment}
                        />
                    ))}
                </div>

                <AnimatePresence>
                    {showModal && (
                        <Modal 
                            type={modalType}
                            assignment={selectedAssignment}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Assignment; 
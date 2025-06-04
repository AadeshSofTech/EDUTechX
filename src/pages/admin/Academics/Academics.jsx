import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Adminsidebar from '../../../components/AdminSidebar/Adminsidebar';
import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaChartLine, FaTimes, FaDownload } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { MdClass, MdAssignment, MdNotifications } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Academics.Module.css';

const Academics = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Dummy data - Replace with API calls
    const academicStats = {
        totalCourses: 12,
        activeSubjects: 48,
        totalClasses: 24,
        averagePerformance: '78%'
    };

    const courses = [
        { id: 1, name: 'Computer Science', subjects: 8, students: 120, performance: 82 },
        { id: 2, name: 'Mechanical Engineering', subjects: 10, students: 90, performance: 75 },
        { id: 3, name: 'Electrical Engineering', subjects: 9, students: 85, performance: 79 },
        { id: 4, name: 'Civil Engineering', subjects: 8, students: 95, performance: 77 }
    ];

    const subjects = [
        { id: 1, name: 'Data Structures', course: 'Computer Science', teacher: 'Dr. Smith', students: 40 },
        { id: 2, name: 'Algorithms', course: 'Computer Science', teacher: 'Prof. Johnson', students: 45 },
        { id: 3, name: 'Database Systems', course: 'Computer Science', teacher: 'Dr. Williams', students: 35 }
    ];

    const schedules = [
        { id: 1, class: 'CS-301', subject: 'Data Structures', time: '09:00 AM - 10:30 AM', room: 'Lab 1' },
        { id: 2, class: 'ME-201', subject: 'Thermodynamics', time: '10:45 AM - 12:15 PM', room: 'Room 202' },
        { id: 3, class: 'EE-301', subject: 'Circuit Theory', time: '01:00 PM - 02:30 PM', room: 'Lab 3' }
    ];

    const announcements = [
        { id: 1, title: 'Mid-Term Examination Schedule', date: '2024-03-20', priority: 'high' },
        { id: 2, title: 'Course Registration Deadline', date: '2024-03-25', priority: 'medium' },
        { id: 3, title: 'Guest Lecture: AI in Education', date: '2024-03-28', priority: 'low' }
    ];

    // Sample syllabus data for each course
    const courseSyllabus = {
        1: {
            courseName: 'Computer Science',
            description: 'Bachelor of Computer Science program covering fundamental and advanced computing concepts.',
            duration: '4 Years',
            semesters: [
                {
                    name: 'Semester 1',
                    subjects: [
                        { name: 'Introduction to Programming', credits: 4 },
                        { name: 'Computer Architecture', credits: 3 },
                        { name: 'Mathematics for Computing', credits: 3 },
                    ]
                },
                {
                    name: 'Semester 2',
                    subjects: [
                        { name: 'Data Structures', credits: 4 },
                        { name: 'Database Systems', credits: 3 },
                        { name: 'Web Development', credits: 3 },
                    ]
                }
            ]
        },
        2: {
            courseName: 'Mechanical Engineering',
            description: 'Bachelor of Mechanical Engineering program focusing on mechanical systems and design.',
            duration: '4 Years',
            semesters: [
                {
                    name: 'Semester 1',
                    subjects: [
                        { name: 'Engineering Mathematics', credits: 4 },
                        { name: 'Engineering Mechanics', credits: 3 },
                        { name: 'Workshop Practice', credits: 3 },
                    ]
                },
                {
                    name: 'Semester 2',
                    subjects: [
                        { name: 'Thermodynamics', credits: 4 },
                        { name: 'Material Science', credits: 3 },
                        { name: 'Machine Drawing', credits: 3 },
                    ]
                }
            ]
        }
    };

    // Add notification handler
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const generateSyllabusPDF = (courseId) => {
        try {
            // Input validation
            if (!courseId) {
                console.error('No course ID provided');
                showNotification('Invalid course ID', 'error');
                return;
            }

            // Get course data
            const course = courses.find(c => c.id === courseId);
            if (!course) {
                console.error('Course not found:', courseId);
                showNotification('Course not found', 'error');
                return;
            }

            // Initialize jsPDF with error checking
            let doc;
            try {
                doc = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
            } catch (initError) {
                console.error('Failed to initialize PDF document:', initError);
                showNotification('PDF initialization failed', 'error');
                return;
            }

            // Basic document setup
            doc.setFont('helvetica');
            doc.setFontSize(16);

            // Add Header
            doc.text('Course Syllabus', 105, 20, { align: 'center' });
            doc.setFontSize(14);
            doc.text(course.name, 105, 30, { align: 'center' });

            // Add basic course information
            doc.setFontSize(12);
            doc.text('Course Information:', 20, 50);
            
            const info = [
                ['Course Name:', course.name],
                ['Total Students:', course.students.toString()],
                ['Number of Subjects:', course.subjects.toString()],
                ['Performance:', `${course.performance}%`]
            ];

            // Create table for course information
            try {
                doc.autoTable({
                    startY: 60,
                    head: [['Field', 'Value']],
                    body: info,
                    theme: 'plain',
                    styles: {
                        fontSize: 12,
                        cellPadding: 5
                    },
                    headStyles: {
                        fillColor: [200, 220, 255],
                        textColor: [0, 0, 0],
                        fontStyle: 'bold'
                    },
                    columnStyles: {
                        0: { fontStyle: 'bold' }
                    },
                    margin: { left: 20 }
                });
            } catch (tableError) {
                console.error('Failed to create table:', tableError);
                showNotification('Error creating PDF content', 'error');
                return;
            }

            // Add footer
            doc.setFontSize(10);
            doc.text(
                `Generated on ${new Date().toLocaleDateString()}`,
                105,
                doc.internal.pageSize.height - 10,
                { align: 'center' }
            );

            // Generate safe filename
            const safeFileName = `${course.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_syllabus.pdf`;

            // Save the PDF
            try {
                doc.save(safeFileName);
                console.log('PDF generated successfully');
                showNotification('Syllabus downloaded successfully!', 'success');
            } catch (saveError) {
                console.error('Failed to save PDF:', saveError);
                showNotification('Failed to save PDF', 'error');
            }

        } catch (error) {
            console.error('PDF Generation Error:', error);
            showNotification('Failed to generate PDF. Please try again.', 'error');
        }
    };

    const generateSyllabusText = (courseId) => {
        try {
            // Get course data
            const course = courses.find(c => c.id === courseId);
            if (!course) {
                showNotification('Course not found', 'error');
                return;
            }

            // Get syllabus data
            const syllabus = courseSyllabus[courseId];
            if (!syllabus) {
                showNotification('Syllabus not found', 'error');
                return;
            }

            // Create text content
            let content = [];
            
            // Header
            content.push('='.repeat(50));
            content.push(`${course.name.toUpperCase()} - COURSE SYLLABUS`);
            content.push('='.repeat(50));
            content.push('');

            // Course Information
            content.push('COURSE INFORMATION');
            content.push('-'.repeat(20));
            content.push(`Duration: ${syllabus.duration}`);
            content.push(`Total Students: ${course.students}`);
            content.push(`Number of Subjects: ${course.subjects}`);
            content.push(`Current Performance: ${course.performance}%`);
            content.push('');

            // Description
            content.push('COURSE DESCRIPTION');
            content.push('-'.repeat(20));
            content.push(syllabus.description);
            content.push('');

            // Semester-wise subjects
            syllabus.semesters.forEach(semester => {
                content.push(`${semester.name.toUpperCase()}`);
                content.push('-'.repeat(20));
                semester.subjects.forEach(subject => {
                    content.push(`• ${subject.name} (${subject.credits} credits)`);
                });
                content.push('');
            });

            // Footer
            content.push('-'.repeat(50));
            content.push(`Generated on ${new Date().toLocaleDateString()}`);

            // Join all lines with newline character
            const textContent = content.join('\n');

            // Create blob and download
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${course.name.replace(/\s+/g, '_')}_syllabus.txt`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            showNotification('Syllabus downloaded successfully!', 'success');

        } catch (error) {
            console.error('Error generating syllabus:', error);
            showNotification('Failed to generate syllabus. Please try again.', 'error');
        }
    };

    const StatCard = ({ title, value, icon, color }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`stat-card ${color}`}
        >
            <div className="stat-icon">{icon}</div>
            <div className="stat-info">
                <h3>{title}</h3>
                <p className="stat-value">{value}</p>
            </div>
        </motion.div>
    );

    const handleView = (item, type) => {
        setSelectedItem({ ...item, type });
        setShowViewModal(true);
    };

    const handleEdit = (item, type) => {
        setSelectedItem({ ...item, type });
        setShowEditModal(true);
    };

    const ViewModal = ({ item, onClose }) => {
        if (!item) return null;

        const renderContent = () => {
            switch (item.type) {
                case 'course':
                    return (
                        <div className="modal-body">
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <h3>Performance</h3>
                                    <div className="performance-circle">
                                        <span>{item.performance}%</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <h3>Students</h3>
                                    <p>{item.students}</p>
                                    <small>Currently Enrolled</small>
                                </div>
                                <div className="detail-item">
                                    <h3>Subjects</h3>
                                    <p>{item.subjects}</p>
                                    <small>Active Subjects</small>
                                </div>
                            </div>
                            <div className="syllabus-section">
                                <h3>Course Syllabus</h3>
                                <p>Download the complete course syllabus including subject details, credit information, and course structure.</p>
                                <button 
                                    className="download-btn"
                                    onClick={() => generateSyllabusText(item.id)}
                                >
                                    <FaDownload /> Download Syllabus (Text)
                                </button>
                            </div>
                        </div>
                    );

                case 'subject':
                    return (
                        <div className="modal-body">
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <h3>Course</h3>
                                    <p>{item.course}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Teacher</h3>
                                    <p>{item.teacher}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Students</h3>
                                    <p>{item.students}</p>
                                </div>
                            </div>
                            <div className="subject-details">
                                <h3>Subject Overview</h3>
                                <p>Curriculum Status: In Progress</p>
                                <p>Last Updated: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    );

                case 'schedule':
                    return (
                        <div className="modal-body">
                            <div className="schedule-details">
                                <div className="detail-item">
                                    <h3>Class</h3>
                                    <p>{item.class}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Subject</h3>
                                    <p>{item.subject}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Time</h3>
                                    <p>{item.time}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Room</h3>
                                    <p>{item.room}</p>
                                </div>
                            </div>
                        </div>
                    );

                case 'announcement':
                    return (
                        <div className="modal-body">
                            <div className="announcement-details">
                                <div className="detail-item">
                                    <h3>Title</h3>
                                    <p>{item.title}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Date</h3>
                                    <p>{item.date}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Priority</h3>
                                    <span className={`priority-badge ${item.priority}`}>
                                        {item.priority}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );

                default:
                    return null;
            }
        };

        return (
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>{item.name || item.title || item.subject}</h2>
                        <button className="close-button" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                    {renderContent()}
                </motion.div>
            </motion.div>
        );
    };

    const EditModal = ({ item, onClose }) => {
        const [formData, setFormData] = useState(item);

        const handleSubmit = (e) => {
            e.preventDefault();
            // Here you would typically make an API call to update the data
            console.log('Updated data:', formData);
            onClose();
        };

        const renderForm = () => {
            switch (item.type) {
                case 'course':
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Number of Subjects</label>
                                <input
                                    type="number"
                                    value={formData.subjects}
                                    onChange={e => setFormData({...formData, subjects: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Number of Students</label>
                                <input
                                    type="number"
                                    value={formData.students}
                                    onChange={e => setFormData({...formData, students: e.target.value})}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    );

                case 'subject':
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Subject Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course</label>
                                <input
                                    type="text"
                                    value={formData.course}
                                    onChange={e => setFormData({...formData, course: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teacher</label>
                                <input
                                    type="text"
                                    value={formData.teacher}
                                    onChange={e => setFormData({...formData, teacher: e.target.value})}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    );

                case 'schedule':
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Class</label>
                                <input
                                    type="text"
                                    value={formData.class}
                                    onChange={e => setFormData({...formData, class: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={e => setFormData({...formData, subject: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input
                                    type="text"
                                    value={formData.time}
                                    onChange={e => setFormData({...formData, time: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Room</label>
                                <input
                                    type="text"
                                    value={formData.room}
                                    onChange={e => setFormData({...formData, room: e.target.value})}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    );

                case 'announcement':
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={e => setFormData({...formData, priority: e.target.value})}
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    );

                default:
                    return null;
            }
        };

        return (
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>Edit {item.type.charAt(0).toUpperCase() + item.type.slice(1)}</h2>
                        <button className="close-button" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="modal-body">
                        {renderForm()}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    const renderCourses = () => (
        <div className="courses-grid">
            {courses.map(course => (
                <motion.div
                    key={course.id}
                    className="course-card"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="course-header">
                        <h3>{course.name}</h3>
                        <span className="performance-badge">
                            {course.performance}%
                        </span>
                    </div>
                    <div className="course-stats">
                        <div>
                            <span>Subjects</span>
                            <p>{course.subjects}</p>
                        </div>
                        <div>
                            <span>Students</span>
                            <p>{course.students}</p>
                        </div>
                    </div>
                    <div className="card-actions">
                        <button className="view-btn" onClick={() => handleView(course, 'course')}>
                            View Details
                        </button>
                        <button className="edit-btn" onClick={() => handleEdit(course, 'course')}>
                            Edit
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderSubjects = () => (    
        <div className="subjects-container">
            <table className="subjects-table">
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Course</th>
                        <th>Teacher</th>
                        <th>Students</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subject => (
                        <motion.tr
                            key={subject.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <td>{subject.name}</td>
                            <td>{subject.course}</td>
                            <td>{subject.teacher}</td>
                            <td>{subject.students}</td>
                            <td>
                                <button className="action-btn view" onClick={() => handleView(subject, 'subject')}>View</button>
                                <button className="action-btn edit" onClick={() => handleEdit(subject, 'subject')}>Edit</button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderSchedules = () => (
        <div className="schedule-container">
            {schedules.map(schedule => (
                <motion.div
                    key={schedule.id}
                    className="schedule-card"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="schedule-time">
                        <BiTime />
                        <span>{schedule.time}</span>
                    </div>
                    <div className="schedule-info">
                        <h4>{schedule.subject}</h4>
                        <p>Class: {schedule.class}</p>
                        <p>Room: {schedule.room}</p>
                    </div>
                    <div className="card-actions">
                        <button className="view-btn" onClick={() => handleView(schedule, 'schedule')}>View</button>
                        <button className="edit-btn" onClick={() => handleEdit(schedule, 'schedule')}>Edit</button>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderAnnouncements = () => (
        <div className="announcements-container">
            {announcements.map(announcement => (
                <motion.div
                    key={announcement.id}
                    className={`announcement-card priority-${announcement.priority}`}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="announcement-header">
                        <MdNotifications />
                        <span className="announcement-date">{announcement.date}</span>
                    </div>
                    <h4>{announcement.title}</h4>
                    <span className="priority-badge">{announcement.priority}</span>
                    <div className="card-actions">
                        <button className="view-btn" onClick={() => handleView(announcement, 'announcement')}>View</button>
                        <button className="edit-btn" onClick={() => handleEdit(announcement, 'announcement')}>Edit</button>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Add notification component 
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
                <h1 className="page-title">Academic Management</h1>

                <div className="stats-container">
                    <StatCard
                        title="Total Courses"
                        value={academicStats.totalCourses}
                        icon={<FaGraduationCap />}
                        color="blue"
                    />
                    <StatCard
                        title="Active Subjects"
                        value={academicStats.activeSubjects}
                        icon={<FaBook />}
                        color="green"
                    />
                    <StatCard
                        title="Total Classes"
                        value={academicStats.totalClasses}
                        icon={<FaChalkboardTeacher />}
                        color="purple"
                    />
                    <StatCard
                        title="Avg. Performance"
                        value={academicStats.averagePerformance}
                        icon={<FaChartLine />}
                        color="orange"
                    />
                </div>

                <div className="content-container">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
                            onClick={() => setActiveTab('courses')}
                        >
                            <MdClass /> Courses
                        </button>
                        <button
                            className={`tab ${activeTab === 'subjects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('subjects')}
                        >
                            <FaBook /> Subjects
                        </button>
                        <button
                            className={`tab ${activeTab === 'schedules' ? 'active' : ''}`}
                            onClick={() => setActiveTab('schedules')}
                        >
                            <BiTime /> Schedules
                        </button>
                        <button
                            className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
                            onClick={() => setActiveTab('announcements')}
                        >
                            <MdNotifications /> Announcements
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'courses' && renderCourses()}
                        {activeTab === 'subjects' && renderSubjects()}
                        {activeTab === 'schedules' && renderSchedules()}
                        {activeTab === 'announcements' && renderAnnouncements()}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showViewModal && (
                    <ViewModal
                        item={selectedItem}
                        onClose={() => {
                            setShowViewModal(false);
                            setSelectedItem(null);
                        }}
                    />
                )}
                {showEditModal && (
                    <EditModal
                        item={selectedItem}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedItem(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Academics; 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaClock, FaBook, FaChartBar, FaEye, FaCheck, FaBrain, FaPuzzlePiece } from 'react-icons/fa';
import Adminsidebar from '../../../components/AdminSidebar/Adminsidebar';
import './Quiz.css';

const Quiz = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [currentQuestion, setCurrentQuestion] = useState(null);

    // Dummy data - Replace with API calls
    const [quizzes, setQuizzes] = useState([
        {
            id: 1,
            title: 'Data Structures Fundamentals',
            subject: 'Computer Science',
            class: 'CS-301',
            duration: 60, // in minutes
            totalQuestions: 20,
            totalMarks: 40,
            status: 'active',
            dueDate: '2024-03-25',
            questions: [
                {
                    id: 1,
                    question: 'What is a Stack data structure?',
                    options: [
                        'FIFO data structure',
                        'LIFO data structure',
                        'Tree-based structure',
                        'Graph-based structure'
                    ],
                    correctAnswer: 1,
                    marks: 2
                },
                // Add more questions...
            ]
        },
        {
            id: 2,
            title: 'Database Management',
            subject: 'Information Technology',
            class: 'IT-401',
            duration: 45,
            totalQuestions: 15,
            totalMarks: 30,
            status: 'draft',
            dueDate: '2024-03-28',
            questions: []
        }
    ]);

    // Add question types
    const questionTypes = [
        { id: 'mcq', name: 'Multiple Choice', icon: FaCheck },
        { id: 'sequence', name: 'Sequence Completion', icon: FaChartBar },
        { id: 'pattern', name: 'Pattern Recognition', icon: FaPuzzlePiece },
        { id: 'logical', name: 'Logical Reasoning', icon: FaBrain }
    ];

    // Sample logical questions
    const sampleLogicalQuestions = [
        {
            type: 'sequence',
            question: 'Complete the sequence: 2, 4, 8, 16, __',
            options: ['24', '32', '28', '20'],
            correctAnswer: 2,
            explanation: 'Each number is multiplied by 2 to get the next number.'
        },
        {
            type: 'pattern',
            question: 'If RED = 27, BLUE = 40, then GREEN = ?',
            options: ['45', '50', '55', '60'],
            correctAnswer: 3,
            explanation: 'Each letter value (A=1, B=2, etc.) is summed and multiplied by 2.'
        },
        {
            type: 'logical',
            question: 'All cats have tails. Tom is a cat. Therefore:',
            options: [
                'Tom might have a tail',
                'Tom has a tail',
                'Tom is an animal',
                'Cats are pets'
            ],
            correctAnswer: 2,
            explanation: 'This is a logical syllogism. If all cats have tails and Tom is a cat, then Tom must have a tail.'
        }
    ];

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleAction = (type, quiz = null) => {
        setModalType(type);
        setSelectedQuiz(quiz);
        setShowModal(true);
        if (type === 'create') {
            setCurrentQuestion(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newQuiz = {
            id: modalType === 'create' ? quizzes.length + 1 : selectedQuiz.id,
            title: formData.get('title'),
            subject: formData.get('subject'),
            class: formData.get('class'),
            duration: parseInt(formData.get('duration')),
            totalMarks: parseInt(formData.get('totalMarks')),
            status: formData.get('status'),
            dueDate: formData.get('dueDate'),
            questions: modalType === 'create' ? [] : selectedQuiz.questions
        };

        if (modalType === 'create') {
            setQuizzes([...quizzes, newQuiz]);
            showNotification('Quiz created successfully!');
        } else {
            const updatedQuizzes = quizzes.map(q => 
                q.id === selectedQuiz.id ? newQuiz : q
            );
            setQuizzes(updatedQuizzes);
            showNotification('Quiz updated successfully!');
        }
        setShowModal(false);
    };

    const handleDelete = (quizId) => {
        const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
        setQuizzes(updatedQuizzes);
        setShowModal(false);
        showNotification('Quiz deleted successfully!');
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newQuestion = {
            id: selectedQuiz.questions.length + 1,
            type: formData.get('questionType'),
            question: formData.get('question'),
            options: [
                formData.get('option1'),
                formData.get('option2'),
                formData.get('option3'),
                formData.get('option4')
            ],
            correctAnswer: parseInt(formData.get('correctAnswer')),
            marks: parseInt(formData.get('marks')),
            explanation: formData.get('explanation')
        };

        const updatedQuiz = {
            ...selectedQuiz,
            questions: [...selectedQuiz.questions, newQuestion],
            totalQuestions: selectedQuiz.questions.length + 1,
            totalMarks: selectedQuiz.totalMarks + newQuestion.marks
        };

        const updatedQuizzes = quizzes.map(q => 
            q.id === selectedQuiz.id ? updatedQuiz : q
        );

        setQuizzes(updatedQuizzes);
        setSelectedQuiz(updatedQuiz);
        setCurrentQuestion(null);
        showNotification('Question added successfully!');
    };

    const QuizCard = ({ quiz }) => (
        <motion.div 
            className={`quiz-card ${quiz.status}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <div className="card-header">
                <h3>{quiz.title}</h3>
                <span className={`status-badge ${quiz.status}`}>
                    {quiz.status}
                </span>
            </div>
            
            <div className="card-content">
                <div className="info-row">
                    <span><FaBook /> {quiz.subject}</span>
                    <span><FaClock /> {quiz.duration} mins</span>
                </div>
                <div className="info-row">
                    <span>Class: {quiz.class}</span>
                    <span>Due: {quiz.dueDate}</span>
                </div>
                <div className="quiz-stats">
                    <div className="stat-item">
                        <span className="stat-label">Questions</span>
                        <span className="stat-value">{quiz.totalQuestions}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total Marks</span>
                        <span className="stat-value">{quiz.totalMarks}</span>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                <button onClick={() => handleAction('view', quiz)} className="view-btn">
                    <FaEye /> View
                </button>
                <button onClick={() => handleAction('edit', quiz)} className="edit-btn">
                    <FaEdit /> Edit
                </button>
                <button onClick={() => handleAction('delete', quiz)} className="delete-btn">
                    <FaTrash /> Delete
                </button>
            </div>
        </motion.div>
    );

    const QuestionForm = ({ onSubmit, question = null }) => (
        <form onSubmit={onSubmit} className="question-form">
            <div className="form-group">
                <label>Question Type</label>
                <select 
                    name="questionType"
                    defaultValue={question?.type || 'mcq'}
                    required
                    className="question-type-select"
                >
                    {questionTypes.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Question</label>
                <textarea 
                    name="question"
                    defaultValue={question?.question || ''}
                    required
                    rows="3"
                    placeholder="Enter your question here..."
                />
            </div>

            <div className="options-grid">
                {[1, 2, 3, 4].map(num => (
                    <div key={num} className="form-group">
                        <label>Option {num}</label>
                        <input 
                            type="text"
                            name={`option${num}`}
                            defaultValue={question?.options?.[num - 1] || ''}
                            required
                            placeholder={`Enter option ${num}`}
                        />
                    </div>
                ))}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Correct Answer (1-4)</label>
                    <input 
                        type="number"
                        name="correctAnswer"
                        min="1"
                        max="4"
                        defaultValue={question?.correctAnswer || ''}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Marks</label>
                    <input 
                        type="number"
                        name="marks"
                        min="1"
                        defaultValue={question?.marks || '2'}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Explanation</label>
                <textarea 
                    name="explanation"
                    defaultValue={question?.explanation || ''}
                    rows="2"
                    placeholder="Explain the correct answer (optional)"
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="save-btn">
                    {question ? 'Update Question' : 'Add Question'}
                </button>
                <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setCurrentQuestion(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );

    const QuestionDisplay = ({ question, index }) => (
        <div className="question-item">
            <div className="question-header">
                <div className="question-info">
                    <span className="question-number">Q{index + 1}</span>
                    <span className="question-type">
                        {questionTypes.find(t => t.id === question.type)?.name || 'Multiple Choice'}
                    </span>
                    <span className="question-marks">{question.marks} marks</span>
                </div>
            </div>
            <p className="question-text">{question.question}</p>
            <div className="options-list">
                {question.options.map((option, i) => (
                    <div 
                        key={i} 
                        className={`option ${question.correctAnswer === i + 1 ? 'correct' : ''}`}
                    >
                        {option}
                        {question.correctAnswer === i + 1 && (
                            <FaCheck className="correct-icon" />
                        )}
                    </div>
                ))}
            </div>
            {question.explanation && (
                <div className="explanation">
                    <h4>Explanation:</h4>
                    <p>{question.explanation}</p>
                </div>
            )}
        </div>
    );

    const Modal = ({ type, quiz, onClose }) => (
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
                    <h2>
                        {type === 'create' ? 'Create New Quiz' : 
                         type === 'edit' ? 'Edit Quiz' : 
                         type === 'view' ? 'Quiz Details' :
                         'Delete Quiz'}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-body">
                    {type === 'delete' ? (
                        <div className="delete-confirmation">
                            <p>Are you sure you want to delete this quiz?</p>
                            <div className="action-buttons">
                                <button 
                                    className="confirm-btn"
                                    onClick={() => handleDelete(quiz.id)}
                                >
                                    Confirm Delete
                                </button>
                                <button className="cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input 
                                        type="text"
                                        name="title"
                                        defaultValue={quiz?.title || ''}
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
                                            defaultValue={quiz?.subject || ''}
                                            readOnly={type === 'view'}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Class</label>
                                        <input 
                                            type="text"
                                            name="class"
                                            defaultValue={quiz?.class || ''}
                                            readOnly={type === 'view'}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Duration (minutes)</label>
                                        <input 
                                            type="number"
                                            name="duration"
                                            min="1"
                                            defaultValue={quiz?.duration || '60'}
                                            readOnly={type === 'view'}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Total Marks</label>
                                        <input 
                                            type="number"
                                            name="totalMarks"
                                            min="1"
                                            defaultValue={quiz?.totalMarks || '20'}
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
                                            defaultValue={quiz?.dueDate || ''}
                                            readOnly={type === 'view'}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select 
                                            name="status"
                                            defaultValue={quiz?.status || 'draft'}
                                            disabled={type === 'view'}
                                            required
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="active">Active</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>

                                {type !== 'view' && (
                                    <div className="modal-actions">
                                        <button type="submit" className="save-btn">
                                            {type === 'create' ? 'Create Quiz' : 'Save Changes'}
                                        </button>
                                        <button type="button" className="cancel-btn" onClick={onClose}>
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>

                            {(type === 'edit' || type === 'view') && (
                                <div className="questions-section">
                                    <div className="section-header">
                                        <h3>Questions</h3>
                                        {type === 'edit' && (
                                            <button 
                                                className="add-question-btn"
                                                onClick={() => setCurrentQuestion({})}
                                            >
                                                <FaPlus /> Add Question
                                            </button>
                                        )}
                                    </div>

                                    {currentQuestion && (
                                        <QuestionForm 
                                            onSubmit={handleAddQuestion}
                                            question={currentQuestion}
                                        />
                                    )}

                                    <div className="questions-list">
                                        {quiz?.questions.map((q, index) => (
                                            <QuestionDisplay key={q.id} question={q} index={index} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className="dashboard-container">
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            
            <Adminsidebar />
            
            <div className="main-content1">
                <div className="page-header">
                    <h1>Quiz Management</h1>
                    <button 
                        className="create-btn"
                        onClick={() => handleAction('create')}
                    >
                        <FaPlus /> Create Quiz
                    </button>
                </div>

                <div className="quizzes-grid">
                    {quizzes.map(quiz => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                </div>

                <AnimatePresence>
                    {showModal && (
                        <Modal 
                            type={modalType}
                            quiz={selectedQuiz}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Quiz; 
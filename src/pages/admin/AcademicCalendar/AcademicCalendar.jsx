import React, { useState } from 'react';
import './AcademicCalendar.css';
import Adminsidebar from "../../../components/AdminSidebar/Adminsidebar";

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AcademicCalendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', color: '#3B82F6' });

  const getDaysInMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handlePrevYear = () => {
    setCurrentYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(prev => prev + 1);
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
      setShowEventForm(true);
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (selectedDate && newEvent.title) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setEvents(prev => ({
        ...prev,
        [dateStr]: [...(prev[dateStr] || []), { ...newEvent, id: Date.now() }]
      }));
      setNewEvent({ title: '', description: '', color: '#3B82F6' });
      setShowEventForm(false);
    }
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events[dateStr] || [];
  };

  return (
    <div className="calendar-container">
      <Adminsidebar />
      <div className="academic-year-calendar">
        <div className="calendar-header">
          <h2>Academic Year Calendar {currentYear}</h2>
          <div className="calendar-controls">
            <button onClick={handlePrevYear} className="nav-btn">
              <span className="material-icons">chevron_left</span>
            </button>
            <h3>{currentYear}</h3>
            <button onClick={handleNextYear} className="nav-btn">
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="year-grid">
          {MONTHS.map((month, monthIndex) => (
            <div key={month} className="month-container">
              <h4 className="month-title">{month}</h4>
              <div className="month-grid">
                {DAYS.map(day => (
                  <div key={day} className="calendar-day-header">
                    {day}
                  </div>
                ))}
                {getDaysInMonth(currentYear, monthIndex).map((date, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${!date ? 'empty' : ''} ${
                      date && date.toDateString() === new Date().toDateString() ? 'today' : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    {date && (
                      <>
                        <span className="day-number">{date.getDate()}</span>
                        <div className="event-list">
                          {getEventsForDate(date).map(event => (
                            <div
                              key={event.id}
                              className="event-item"
                              style={{ backgroundColor: event.color }}
                              title={`${event.title}: ${event.description}`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showEventForm && (
          <div className="event-form-overlay">
            <div className="event-form">
              <h3>Add Event for {selectedDate?.toLocaleDateString()}</h3>
              <form onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Event Color</label>
                  <input
                    type="color"
                    value={newEvent.color}
                    onChange={e => setNewEvent({ ...newEvent, color: e.target.value })}
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-btn">Add Event</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowEventForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendar;
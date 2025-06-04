import React, { useState } from 'react';
import './AcademicCalendar.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AcademicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', color: '#3B82F6' });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
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

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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
    <div className="academic-calendar">
      <div className="calendar-header">
        <h2>Academic Calendar</h2>
        <div className="calendar-controls">
          <button onClick={handlePrevMonth} className="nav-btn">
            ←
          </button>
          <h3>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={handleNextMonth} className="nav-btn">
            →
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {DAYS.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {getDaysInMonth(currentDate).map((date, index) => (
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
                <div className="event-dots">
                  {getEventsForDate(date).map(event => (
                    <div
                      key={event.id}
                      className="event-dot"
                      style={{ backgroundColor: event.color }}
                      title={event.title}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showEventForm && (
        <div className="event-form-overlay">
          <div className="event-form">
            <h3>Add Event for {selectedDate?.toLocaleDateString()}</h3>
            <form onSubmit={handleAddEvent}>
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <input
                type="color"
                value={newEvent.color}
                onChange={e => setNewEvent({ ...newEvent, color: e.target.value })}
              />
              <div className="form-buttons">
                <button type="submit">Add Event</button>
                <button type="button" onClick={() => setShowEventForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar; 
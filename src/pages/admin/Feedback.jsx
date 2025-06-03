import React from "react";
import { useState } from "react";
import "./Feedback.css";
import Adminsidebar from "../../components/AdminSidebar/Adminsidebar";

const Feedback = () => {
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, review: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbacks([form, ...feedbacks]);
    setForm({ name: '', rating: 5, review: '' });
    setShowForm(false);
  };

  const averageRating =
    feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
    (feedbacks.length || 1);
  const ratingCount = [5, 4, 3, 2, 1].map(
    (star) => feedbacks.filter((f) => f.rating === star).length
  );

  return (
    <>
      {/* Adminsidebar */}

      <Adminsidebar />

       <div className="review-container">
      <div className="summary-section">
        <div className="rating-overview">
          <div className="average-score">{averageRating.toFixed(1)}</div>
          <div className="stars">
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </div>
          <div className="total-reviews">{feedbacks.length} reviews</div>
        </div>
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} className="bar-row">
              <span>{star}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(ratingCount[i] / (feedbacks.length || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="write-button" onClick={() => setShowForm(true)}>Write a review</button>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} Star</option>
            ))}
          </select>
          <textarea
            placeholder="Write your review"
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            required
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}

      <div className="feedback-list">
        {feedbacks.map((fb, idx) => (
          <div className="feedback-card" key={idx}>
            <div className="avatar">{fb.name.charAt(0).toUpperCase()}</div>
            <div className="feedback-content">
              <div className="feedback-header">
                <span className="name">{fb.name}</span>
                <span className="stars">
                  {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                </span>
              </div>
              <p className="feedback-text">{fb.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Feedback;

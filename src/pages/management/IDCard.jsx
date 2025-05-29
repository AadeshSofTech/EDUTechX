import React from 'react';
import './IDCard.css';

function IDCard({ student }) {
  return (
    <div className="id-card">
      <h3>Student ID Card</h3>
      <img src={URL.createObjectURL(student.photo)} alt="Student" className="id-photo" />
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>DOB:</strong> {student.dob}</p>
      <p><strong>Class:</strong> {student.class}</p>
      <p><strong>ID:</strong> STD-{student.name.slice(0,3).toUpperCase()}-{Math.floor(Math.random()*1000)}</p>
    </div>
  );
}

export default IDCard;

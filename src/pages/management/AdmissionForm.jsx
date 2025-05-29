import React, { useState } from 'react';
import './AdmissionForm.css';
import IDCard from './IDCard';

function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    contact: '',
    class: '',
    photo: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // show ID card
  };

  return (
    <div className="admission-form">
      <h2>Student Admission Form</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="date" name="dob" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
          <input type="tel" name="contact" placeholder="Contact Number" onChange={handleChange} required />
          <input type="text" name="class" placeholder="Class/Grade" onChange={handleChange} required />
          <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <IDCard student={formData} />
      )}
    </div>
  );
}

export default AdmissionForm;

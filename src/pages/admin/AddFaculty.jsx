import React, { useState, useEffect, useRef } from 'react';
import './AddFaculty.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'react-qr-code'; // ✅


function AddFaculty() {
  const [formData, setFormData] = useState({
    name: '',
    facultyId: '',
    email: '',
    phone: '',
    department: '',
    qualification: '',
    joiningDate: ''
  });

  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const generateFacultyId = () => {
    const now = new Date();
    const dateStr = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 12);
    return `FAC${dateStr}`;
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      facultyId: generateFacultyId()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCard(true);
    alert(`Faculty ${formData.name} added successfully!`);
  };

  const handleDownload = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 130);
      pdf.save(`${formData.facultyId}_IDCard.pdf`);
    });
  };

  return (
    <div className="add-faculty-container">
      <h2>Add New Faculty Member</h2>

      <form className="faculty-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="facultyId" value={formData.facultyId} readOnly />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="text" name="qualification" placeholder="Qualification" onChange={handleChange} required />
        <input type="date" name="joiningDate" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      {showCard && (
        <>
          <div className="id-card-container" ref={cardRef}>
            {/* FRONT SIDE */}
            <div className="id-front">
              <div className="card-header">
                <h3>ABHINAV SCHOOL</h3>
                <p>Inspiring Knowledge</p>
              </div>
              <div className="photo-circle">
                <img src="/user.jpg" alt="Faculty" />
              </div>
              <div className="card-body">
                <p><strong>Faculty ID:</strong> {formData.facultyId}</p>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Department:</strong> {formData.department}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Emergency:</strong> 123-456-7890</p>
              </div>
              <div className="card-footer">
                School Address, State, 123456
              </div>
            </div>

            {/* BACK SIDE */}
            <div className="id-back">
              <h4>Terms and Conditions</h4>
              <ul>
                <li>Must carry this ID always on campus.</li>
                <li>Return if found misplaced.</li>
              </ul>
              <p><strong>Joined:</strong> {formData.joiningDate}</p>
              <p><strong>Expiry:</strong> 31/03/2026</p>
              <div className="qr-box">
                <QRCode value={formData.facultyId || 'FAC-DEFAULT'} size={64} />
            </div>
              <p><em>Principal Signature</em></p>
            </div>
          </div>

          <button className="download-btn" onClick={handleDownload}>
            📥 Download ID Card
          </button>
        </>
      )}
    </div>
  );
}

export default AddFaculty;

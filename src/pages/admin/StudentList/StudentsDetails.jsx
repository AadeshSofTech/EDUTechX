import React, { useState } from "react";
import Adminsidebar from "../../../components/AdminSidebar/Adminsidebar";
import { FaSearch } from 'react-icons/fa';
import "./StudentsDetails.css";

const StudentsDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const students = [
    {
      id: 1,
      name: "Jack Sparrow",
      gender: "Male",
      class: "5-A",
      email: "jack@email.com",
      address: "123 Pirate Bay",
      fees: "$500",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=Jack%20Sparrow`,
      attendance: "85%",
      grade: "A",
      parentName: "Captain Teague",
      contactNo: "+1 234-567-8900"
    },
    {
      id: 2,
      name: "Harry Potter",
      gender: "Male",
      class: "6-B",
      email: "harry@email.com",
      address: "4 Privet Drive",
      fees: "$600",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=Harry%20Potter`,
      attendance: "92%",
      grade: "A+",
      parentName: "James Potter",
      contactNo: "+1 234-567-8901"
    },
    {
      id: 3,
      name: "Hermione Granger",
      gender: "Female",
      class: "6-B",
      email: "hermione@email.com",
      address: "5 Heathgate",
      fees: "$600",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=Hermione%20Granger`,
      attendance: "98%",
      grade: "A+",
      parentName: "Mr. Granger",
      contactNo: "+1 234-567-8902"
    },
    {
      id: 4,
      name: "Ron Weasley",
      gender: "Male",
      class: "6-B",
      email: "ron@email.com",
      address: "The Burrow",
      fees: "$600",
    },
    {
      id: 5,
      name: "Luna Lovegood",
      gender: "Female",
      class: "5-C",
      email: "luna@email.com",
      address: "Ottery St. Catchpole",
      fees: "$550",
    },
    {
      id: 6,
      name: "Neville Longbottom",
      gender: "Male",
      class: "6-B",
      email: "neville@email.com",
      address: "Longbottom Manor",
      fees: "$620",
    },
    {
      id: 7,
      name: "Draco Malfoy",
      gender: "Male",
      class: "6-B",
      email: "draco@email.com",
      address: "Malfoy Manor",
      fees: "$700",
    },
    {
      id: 8,
      name: "Ginny Weasley",
      gender: "Female",
      class: "5-B",
      email: "ginny@email.com",
      address: "The Burrow",
      fees: "$580",
    },
    {
      id: 9,
      name: "Cho Chang",
      gender: "Female",
      class: "6-A",
      email: "cho@email.com",
      address: "Ravenclaw Tower",
      fees: "$600",
    },
    {
      id: 10,
      name: "Cedric Diggory",
      gender: "Male",
      class: "6-A",
      email: "cedric@email.com",
      address: "Hufflepuff Basement",
      fees: "$630",
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-details-container">
      <Adminsidebar />
      
      <div className="students-content">
        <div className="students-header">
          <h1>Students Details</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, class, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Parent Name</th>
                <th>Attendance</th>
                <th>Grade</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="student-table-avatar"
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNo || 'N/A'}</td>
                  <td>{student.address}</td>
                  <td>{student.parentName || 'N/A'}</td>
                  <td>
                    <span className={`attendance-badge ${
                      parseInt(student.attendance) >= 90 ? 'high' : 'medium'
                    }`}>
                      {student.attendance || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="grade-chip">
                      {student.grade || 'N/A'}
                    </span>
                  </td>
                  <td>{student.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsDetails;

import React, { useState } from "react";
import Adminsidebar from "../../components/AdminSidebar/Adminsidebar";
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
    },
    {
      id: 2,
      name: "Harry Potter",
      gender: "Male",
      class: "6-B",
      email: "harry@email.com",
      address: "4 Privet Drive",
      fees: "$600",
    },
    {
      id: 3,
      name: "Hermione Granger",
      gender: "Female",
      class: "6-B",
      email: "hermione@email.com",
      address: "Hogwarts Castle",
      fees: "$650",
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

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id='root'>
      {/* Sidebar */}

      <Adminsidebar />

      {/* Main Content */}
      <div className='main-content'>
        {/* Search Bar */}
        <div className='top-bar'>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search here...'
              className='search-input'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <img src='search-icon.png' className='search-icon' alt='Search' />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <section className='table-section'>
          <h4>My Students</h4>
          <div className='table-wrapper'>
            <table>
              <thead>
                <tr>
                  <th>sr.</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Address</th> {/* Added */}
                  <th>Fees</th> {/* Added */}
                </tr>
              </thead>
            </table>

            <div className='table-body-scroll'>
              <table>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => {
                      const name = student.name;
                      const search = searchTerm.toLowerCase();
                      const matchIndex = name.toLowerCase().indexOf(search);
                      let highlightedName = name;

                      if (matchIndex !== -1 && searchTerm) {
                        const beforeMatch = name.substring(0, matchIndex);
                        const matchText = name.substring(
                          matchIndex,
                          matchIndex + search.length
                        );
                        const afterMatch = name.substring(
                          matchIndex + search.length
                        );

                        highlightedName = `${beforeMatch}<strong>${matchText}</strong>${afterMatch}`;
                      }

                      return (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: highlightedName,
                            }}
                          />
                          <td>{student.gender}</td>
                          <td>{student.class}</td>
                          <td>{student.email}</td>
                          <td>{student.address}</td> {/* Added */}
                          <td>{student.fees}</td> {/* Added */}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan='7'>No student found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentsDetails;

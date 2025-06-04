import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from './context/ProfileContext';
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";

// Import all module pages
import Academics from "./pages/admin/Academics/Academics";
import AcademicCalendar from "./pages/admin/AcademicCalendar/AcademicCalendar";

import Attendance from "./pages/admin/Attendance";
import Examination from "./pages/Examination";
import Accounts from "./pages/admin/Accounts";
import Admission from "./pages/admin/Addmission/Admission";
import Registration from "./pages/admin/Registration/Registration";
import Certificate from "./pages/admin/Certificate";
import Grievance from "./pages/Grievance";
import Feedback from "./pages/admin/Feedback";
import TimeTable from "./pages/TimeTable";
import Hostel from "./pages/Hostel";
import Transport from "./pages/Transport";
import Quiz from "./pages/admin/Quiz/Quiz";
import AddFaculty from "./pages/AddFaculty";
import StudentsDetails from "./pages/admin/StudentList/StudentsDetails";
import Profile from "./pages/admin/Profile/Profile";
import Assignment from './pages/admin/Assignment/Assignment';

function App() {
  return (
    <ProfileProvider>
    <Router>
      <Routes>
          {/* Public Route */}
        <Route path='/' element={<Login />} />
        
          {/* Admin Routes */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/academics' element={<Academics />} />
          <Route path='/admin/students' element={<StudentsDetails />} />
          <Route path='/admin/attendance' element={<Attendance />} />
          <Route path='/admin/examination' element={<Examination />} />
          <Route path='/admin/academic-calendar' element={<AcademicCalendar />} />
          <Route path='/admin/accounts' element={<Accounts />} />
          <Route path='/admin/admission' element={<Admission />} />
          <Route path='/admin/registration' element={<Registration />} />
          <Route path='/admin/certificate' element={<Certificate />} />
          <Route path='/admin/grievance' element={<Grievance />} />
          <Route path='/admin/feedback' element={<Feedback />} />
          <Route path='/admin/profile' element={<Profile />} />
          <Route path='/admin/timetable' element={<TimeTable />} />
          <Route path='/admin/hostel' element={<Hostel />} />
          <Route path='/admin/transport' element={<Transport />} />
          <Route path='/admin/quiz' element={<Quiz />} />
          <Route path='/admin/faculty/add' element={<AddFaculty />} />
          <Route path='/admin/assignment' element={<Assignment />} />

          {/* 404 Route */}
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
       
          {/* Commented Faculty and Management Routes */}
          {/* 
        <Route path='/faculty' element={<FacultyDashboard />} />
        <Route path='/faculty/attendance' element={<FacultyAttendance />} />
        <Route path='/management' element={<ManagementDashboard />} />
        <Route path='/management/admission' element={<AdmissionForm />} />
          */}
      </Routes>
    </Router>
    </ProfileProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Import all module pages
import Academics from "./pages/admin/Academics";
import Attendance from "./pages/admin/Attendance";
import Examination from "./pages/Examination";
import Accounts from "./pages/admin/Accounts";
import Admission from "./pages/admin/Admission";
import Certificate from "./pages/admin/Certificate";
import Grievance from "./pages/Grievance";
import Feedback from "./pages/admin/Feedback";
import TimeTable from "./pages/TimeTable";
import Hostel from "./pages/Hostel";
import Transport from "./pages/Transport";
import Quiz from "./pages/Quiz";
import AddFaculty from "./pages/AddFaculty";

// other dashboards
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyAttendance from "./pages/faculty/Attendance";
import ManagementDashboard from "./pages/ManagementDashboard";
import AdmissionForm from "./pages/management/AdmissionForm";
import StudentsDetails from "./pages/admin/StudentsDetails";
import Profile from "./pages/admin/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/academics' element={<Academics />} />
          <Route path='/students-Details' element={<StudentsDetails />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/examination' element={<Examination />} />
          <Route path='/accounts' element={<Accounts />} />
          <Route path='/admission' element={<Admission />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/grievance' element={<Grievance />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/timetable' element={<TimeTable />} />
          <Route path='/hostel' element={<Hostel />} />
          <Route path='/transport' element={<Transport />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/admin/addfaculty' element={<AddFaculty />} />
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
       

        <Route path='/faculty' element={<FacultyDashboard />} />
        <Route path='/faculty/attendance' element={<FacultyAttendance />} />
        <Route path='/management' element={<ManagementDashboard />} />
        <Route path='/management/admission' element={<AdmissionForm />} />
      </Routes>
    </Router>
  );
}

export default App;

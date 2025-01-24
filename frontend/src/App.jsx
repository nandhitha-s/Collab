// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/DashboardStudent";
import CoursePage from "./components/CoursePage";
import FacultyDashboard from "./pages/DashboardFaculty";
import AddCourse from "./components/AddCourse";
import AssignTask from "./components/AssignTask";
import UploadProblemSheet from "./components/UploadProblemSheet";
import ViewSubmissions from "./components/ViewSubmissions";
import PostAnnouncements from "./components/PostAnnouncements";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/course/:code" element={<CoursePage />} />  
        <Route path='/faculty-dashboard' element={<FacultyDashboard/>}/>
        <Route path='/add-course' element={<AddCourse/>}/>
        <Route path="/assign-task" element={<AssignTask />} />
        <Route path="/upload-problemsheet" element={<UploadProblemSheet />} />
        <Route path="/view-submissions" element={<ViewSubmissions />} />
        <Route path="/post-announcements" element={<PostAnnouncements />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

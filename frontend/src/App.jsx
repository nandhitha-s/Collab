// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/DashboardStudent";
import CoursePage from "./pages/CoursePage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/course/:code" element={<CoursePage />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import Login from "./pages/login";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const courses = [
    { code: "20XT12", name: "Software Engineering" },
    { code: "20XT34", name: "Data Structures" },
    { code: "20XT56", name: "Computer Networks" },
    { code: "20XT78", name: "Machine Learning" },
    { code: "20XT90", name: "Database Systems" },
    { code: "20XT11", name: "Cyber Security" },
    { code: "20XT22", name: "Artificial Intelligence" },
    { code: "20XT44", name: "Operating Systems" },
  ];

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-white text-s">Roll No: 12345</p>
          <div className="w-10 h-10 rounded-full bg-cl1"></div>
        </div>
      </header>

      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-cl5 shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/course/${course.code}`, { state: { course } })}
          >
            <h3 className="text-xl font-bold text-cl4">{course.code}</h3>
            <p className="text-cl4 text-sm mt-2">{course.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

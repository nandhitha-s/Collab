/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const actions = [
    { name: "Add Course", path: "/add-course", description: "Create and add a new course for students." },
    { name: "Assign Task", path: "/assign-task", description: "Assign tasks or homework to your students." },
    { name: "View Submissions", path: "/view-submissions", description: "Review and grade student submissions." },
    { name: "Post Announcements", path: "/post-announcements", description: "Share updates and announcements with your class." },
  ];

  // Retrieve userName from localStorage when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName); // Set userName from localStorage
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Displaying the user name if available, otherwise default to 'Faculty' */}
          <p className="text-white text-s">Welcome, {userName || 'Faculty'}</p>
          <div className="w-10 h-10 rounded-full bg-cl1"></div>
        </div>
      </header>

      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="bg-cl5 shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(action.path)}
          >
            <h3 className="text-xl font-bold text-cl4">{action.name}</h3>
            <p className="text-cl4 text-sm mt-2">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;

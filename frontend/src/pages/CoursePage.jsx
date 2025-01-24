// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";

const CoursePage = () => {
  const location = useLocation();
  const { course } = location.state || {};

  return (
    <div className="flex flex-col h-screen bg-cl1">
      {/* Header */}
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">{course?.name || "Course Page"}</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left Side */}
        <section className="flex flex-col gap-4 w-1/3">
          <div className="bg-cl5 shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-cl4">Assignments</h3>
            <p className="text-cl4 text-sm">Check your assignments and due dates.</p>
          </div>
          <div className="bg-cl5 shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-cl4">Resources</h3>
            <p className="text-cl4 text-sm">Access all your study materials and references.</p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex-1 bg-cl5 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-cl4 mb-4">Faculty Announcements</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-cl4">
              Classes are canceled for today. Please submit your assignment by the 23rd.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoursePage;

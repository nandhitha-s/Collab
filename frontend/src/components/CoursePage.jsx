// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  const handleAssignmentsClick = () => {
    navigate(`/course/${course?.courseCode}/assignments`, { state: { course } });
  };

  const handleResourcesClick = () => {
    navigate(`/course/${course?.courseCode}/resources`, { state: { course } });
  };

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">{course?.name || "Course Page"}</h1>
      </header>

      <div className="flex flex-1 p-4 gap-4 flex-wrap justify-between">
        <section className="flex flex-col gap-4 w-full sm:w-1/3 lg:w-1/4 xl:w-1/5">
          <div
            className="bg-cl5 shadow-md rounded-lg p-6 space-y-4 flex items-center cursor-pointer"
            onClick={handleAssignmentsClick}
          >
            <img
              src="/assets/Assignment.png"
              alt="Assignment"
              className="w-16 h-auto mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-cl4">Assignments</h3>
              <p className="text-cl4 text-sm">Check your assignments and due dates.</p>
            </div>
          </div>
          <div
            className="bg-cl5 shadow-md rounded-lg p-6 space-y-4 flex items-center cursor-pointer"
            onClick={handleResourcesClick}
          >
            <img
              src="/assets/Resources.png"
              alt="Resources"
              className="w-16 h-auto mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-cl4">Resources</h3>
              <p className="text-cl4 text-sm">Access all your study materials and references.</p>
            </div>
          </div>
        </section>

        <section className="flex-1 bg-cl5 shadow-md rounded-lg p-6 mt-4 sm:mt-0 sm:w-full lg:w-2/3 xl:w-3/4">
          <h3 className="text-lg font-semibold text-cl4 mb-4">Faculty Announcements</h3>

          <div className="bg-cl6 p-4 rounded-xl shadow-lg max-w-sm mx-auto">
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

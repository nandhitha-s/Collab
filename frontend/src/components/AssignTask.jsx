// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssignTask = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: "Software Engineering" },
    { id: 2, name: "Data Structures" },
    { id: 3, name: "Computer Networks" },
    { id: 4, name: "Machine Learning" },
    { id: 5, name: "Database Systems" },
    { id: 6, name: "Cyber Security" },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleAction = (action) => {
    if (action === "createTask") {
      window.open("https://forms.google.com", "_blank"); 
    } else if (action === "postProblemsheet") {
      navigate("/upload-problemsheet", { state: { course: selectedCourse } });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Assign Task</h1>
      </header>

      <div className="flex-1 p-4">
        {!selectedCourse ? (
          <>
            <h2 className="text-xl font-bold text-cl4 mb-6">
              Select a Course to Assign Task
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-cl5 shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
                  onClick={() => handleCourseSelect(course)}
                >
                  <h3 className="text-xl font-bold text-cl4">{course.name}</h3>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-cl4 mb-6">
              {`Assign Task for ${selectedCourse.name}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                onClick={() => handleAction("createTask")}
                className="bg-cl4 text-white py-4 px-6 rounded-lg shadow-md hover:bg-cl2 transition"
              >
                Create a Task
              </button>
              <button
                onClick={() => handleAction("postProblemsheet")}
                className="bg-cl4 text-white py-4 px-6 rounded-lg shadow-md hover:bg-cl2 transition"
              >
                Post a Problem Sheet
              </button>
            </div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="mt-6 bg-cl2 text-cl5 py-2 px-4 rounded-lg hover:bg-cl4 transition"
            >
              Back to Courses
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignTask;

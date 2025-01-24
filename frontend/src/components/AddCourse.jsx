// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const AddCourse = () => {
  // eslint-disable-next-line no-unused-vars
  const [courses, setCourses] = useState([
    { id: 1, name: "Software Engineering", credits: 3 },
    { id: 2, name: "Data Structures", credits: 4 },
    { id: 3, name: "Computer Networks", credits: 3 },
    { id: 4, name: "Machine Learning", credits: 4 },
    { id: 5, name: "Database Systems", credits: 3 },
    { id: 6, name: "Cyber Security", credits: 3 },
  ]);

  const [assignedCourses, setAssignedCourses] = useState([]);

  const addCourseToAssignTask = (course) => {
    if (!assignedCourses.find((assigned) => assigned.id === course.id)) {
      setAssignedCourses([...assignedCourses, course]);
    } else {
      alert(`${course.name} is already added to Assign Task.`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Add Course</h1>
      </header>

      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold text-cl4 mb-6">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-cl5 shadow-md rounded-lg p-6 flex flex-col justify-between items-center text-center"
            >
              <h3 className="text-xl font-bold text-cl4">{course.name}</h3>
              <p className="text-cl4 text-sm mt-2">Credits: {course.credits}</p>
              <button
                onClick={() => addCourseToAssignTask(course)}
                className="mt-4 bg-cl4 text-white py-2 px-4 rounded-lg hover:bg-cl2 transition"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {assignedCourses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-cl4 mb-4">
              Courses Added to Assign Task
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-cl4 shadow-md rounded-lg p-6 flex flex-col justify-between items-center text-center"
                >
                  <h3 className="text-xl font-bold text-white">
                    {course.name}
                  </h3>
                  <p className="text-white text-sm mt-2">
                    Credits: {course.credits}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;

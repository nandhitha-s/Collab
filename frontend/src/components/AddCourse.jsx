/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [courses, setCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const teacherId = "teacher_id_here"; 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/auth/course");

        // Log the entire API response to the console
        console.log(response);  // Logs the response object

        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          console.log("Failed to fetch courses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const addCourseToAssignTask = async (course) => {
    if (!assignedCourses.find((assigned) => assigned.id === course.id)) {
      try {
        const response = await axios.post("/api/auth/teacher/addCourse", {
          teacherId,
          courseId: course.id,
        });
        if (response.data.success) {
          setAssignedCourses([...assignedCourses, course]);
          alert(`${course.name} added successfully`);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Error adding course");
      }
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
              key={course._id}
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

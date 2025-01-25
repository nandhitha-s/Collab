/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [courses, setCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const teacherId = "teacher_id_here"; // Replace with actual teacher ID from auth state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/auth/course");
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          console.error("Failed to fetch courses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();

    const fetchAssignedCourses = async () => {
      try {
        const response = await axios.post("/api/auth/teacher/listTeacherCourse", {
          teacherId,
        });
        if (response.data.success) {
          setAssignedCourses(response.data.courses);
        } else {
          console.error("Failed to fetch assigned courses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching assigned courses:", error);
      }
    };

    fetchAssignedCourses();
  }, [teacherId]);

  const addCourseToTeacher = async (course) => {
    if (!assignedCourses.find((assigned) => assigned._id === course._id)) {
      try {
        const response = await axios.post("/api/auth/teacher/addCourse", {
          teacherId,
          courseId: course._id,
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
      alert(`${course.name} is already assigned.`);
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
                onClick={() => addCourseToTeacher(course)}
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
              Assigned Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedCourses.map((course) => (
                <div
                  key={course._id}
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

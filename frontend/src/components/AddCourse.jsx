/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [courseList, setCourseList] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const teacherId = localStorage.getItem("userName"); 

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.post(
          "https://collab-i4sn.onrender.com/api/auth/course/allCourse"
        );
        if (response.data.success) {
          const { courseCodes, courseNames } = response.data;
          const courses = courseCodes.map((code, index) => ({
            code,
            name: courseNames[index],
          }));
          setCourseList(courses);
        } else {
          console.error("Failed to fetch all courses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching all courses:", error);
      }
    };

    const fetchAssignedCourses = async () => {
      try {
        const response = await axios.post(
          "https://collab-i4sn.onrender.com/api/auth/teacher/listTeacherCourse",
          { teacherId } 
        );
        if (response.data.success) {
          const courses = response.data.courses.map((course) => ({
            code: course.description[0].courseCode,
            name: course.name,
          }));
          setAssignedCourses(courses);
        } else {
          console.error(
            "Failed to fetch assigned courses:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching assigned courses:", error);
      }
    };

    fetchAllCourses();
    fetchAssignedCourses();
  }, [teacherId]);

  const addCourseToTeacher = async (course) => {
    if (!assignedCourses.find((assigned) => assigned.code === course.code)) {
      try {
        const response = await axios.post(
          "https://collab-i4sn.onrender.com/api/auth/teacher/addCourse",
          {
            teacherId, 
            courseId: [course.code],
          }
        );
        if (response.data.success) {
          setAssignedCourses([
            ...assignedCourses,
            { code: course.code, name: course.name },
          ]);
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
          {courseList.map((course) => (
            <div
              key={course.code}
              className="bg-cl5 shadow-md rounded-lg p-6 flex flex-col justify-between items-center text-center"
            >
              <img
                src="/assets/elearning.png"
                alt="eLearning"
                className="w-20 h-20 mb-4"
              />
              <h3 className="text-xl font-bold text-cl4">{course.name}</h3>
              <p className="text-cl4 text-sm mt-2">Code: {course.code}</p>
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
                  key={course.code}
                  className="bg-cl4 shadow-md rounded-lg p-6 flex flex-col justify-between items-center text-center"
                >
                  <img
                    src="/assets/elearning.png"
                    alt="eLearning"
                    className="w-20 h-20 mb-4"
                  />
                  <h3 className="text-xl font-bold text-white">
                    {course.name}
                  </h3>
                  <p className="text-white text-sm mt-2">
                    Code: {course.code}
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

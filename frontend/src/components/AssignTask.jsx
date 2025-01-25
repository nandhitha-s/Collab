import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssignTask = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [actionStatus, setActionStatus] = useState("");
  const teacherId = localStorage.getItem("userName"); // Retrieve the teacher ID from localStorage

  useEffect(() => {
    if (!teacherId) {
      setActionStatus("Teacher ID is missing. Please log in.");
      return;
    }

    const fetchCourses = async () => {
      try {
        console.log("Fetching courses for Teacher ID:", teacherId); // Log teacher ID
        const response = await axios.post(
          "http://localhost:5000/api/auth/teacher/listTeacherCourse",
          { teacherId }
        );

        console.log("API Response:", response.data); // Log full API response

        if (response.data.success && response.data.courses.length > 0) {
          const formattedCourses = response.data.courses.flatMap((course) =>
            course.description.map((desc) => ({
              id: course._id,
              courseCode: desc.courseCode,
              courseName: desc.courseName,
              courseParentName: course.name,
            }))
          );
          console.log("Formatted Courses:", formattedCourses); // Log formatted courses
          setCourses(formattedCourses);
        } else if (response.data.courses.length === 0) {
          setActionStatus("No courses found for the teacher.");
        } else {
          setActionStatus("Failed to fetch courses: " + response.data.message);
        }
      } catch (error) {
        setActionStatus("Error fetching courses. Please try again later.");
        console.error("Error fetching courses:", error); // Log errors
      }
    };

    fetchCourses();
  }, [teacherId]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleAction = (action) => {
    if (action === "createTask") {
      window.open("https://forms.google.com", "_blank");
      setActionStatus("Task creation form opened.");
    } else if (action === "postProblemsheet") {
      navigate("/upload-problemsheet", { state: { course: selectedCourse } });
      setActionStatus("Navigating to post a problem sheet.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cl1"> {/* Updated: min-h-screen ensures full height */}
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Assign Task</h1>
      </header>

      <div className="flex-1 p-4">
        {actionStatus && (
          <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 rounded-md">
            {actionStatus}
          </div>
        )}

        {!selectedCourse ? (
          <>
            <h2 className="text-xl font-bold text-cl4 mb-6">
              Select a Course to Assign Task
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-cl5 shadow-md rounded-lg p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
                    onClick={() => handleCourseSelect(course)}
                  >
                    <img
                      src="/assets/to-do-list.png" // Image path from public/assets folder
                      alt="To-Do List"
                      className="w-16 h-16 sm:w-20 sm:h-20 mb-4" // Increased image size on larger screens
                    />
                    <h3 className="text-xl font-bold text-cl4">{course.courseParentName}</h3>
                    <p className="text-cl4 text-sm mt-2">
                      Code: {course.courseCode}
                    </p>
                    <p className="text-cl4 text-sm mt-2">
                      Course: {course.courseName}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-cl4">
                  No courses available.
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-cl4 mb-6">
              Assign Task for {selectedCourse.courseName}
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

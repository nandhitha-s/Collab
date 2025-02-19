import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssignTask = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [actionStatus, setActionStatus] = useState("");
  const [file, setFile] = useState(null); 
  const [assignmentTitle, setAssignmentTitle] = useState(""); 
  const teacherId = localStorage.getItem("userName"); // Get teacher ID from localStorage

  useEffect(() => {
    if (!teacherId) {
      setActionStatus("Teacher ID is missing. Please log in.");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "https://collab-i4sn.onrender.com/api/auth/teacher/listTeacherCourse", // Adjusted endpoint
          { teacherId }
        );

        if (response.data.success && response.data.courses.length > 0) {
          const formattedCourses = response.data.courses.flatMap((course) =>
            course.description.map((desc) => ({
              courseCode: desc.courseCode,
              courseName: desc.courseName,
              courseParentName: course.name,
            }))
          );
          setCourses(formattedCourses);
        } else if (response.data.courses.length === 0) {
          setActionStatus("No courses found for the teacher.");
        } else {
          setActionStatus("Failed to fetch courses: " + response.data.message);
        }
      } catch (error) {
        setActionStatus("Error fetching courses. Please try again later.");
      }
    };

    fetchCourses();
  }, [teacherId]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const fileToBase64 = (file) => 
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); 
      reader.onerror = (error) => reject(error);
    });

  const handleAssignmentSubmit = async () => {
    if (!assignmentTitle || !file || !selectedCourse) {
      setActionStatus("Please fill in all fields and upload a file.");
      return;
    }

    try {
      const base64File = await fileToBase64(file);

      const payload = {
        teacherId, 
        courseId: selectedCourse.courseCode, 
        title: assignmentTitle, 
        file: base64File, 
      };

      const response = await axios.post(
        "https://collab-imps.onrender.com/api/auth/assignment/addAssignment",    
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setActionStatus("Assignment added successfully!");
      } else {
        setActionStatus(response.data.message);
      }
    } catch (error) {
      setActionStatus("Error adding assignment. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cl1">
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
                courses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-cl5 shadow-md rounded-lg p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
                    onClick={() => handleCourseSelect(course)}
                  >
                    <img
                      src="/assets/leadership.png"
                      alt="Course"
                      className="w-24 h-24 mb-4 object-cover rounded-full" 
                    />
                    <h3 className="text-xl font-bold text-cl4">
                      {course.courseParentName}
                    </h3>
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
            <div className="mb-4">
              <label
                htmlFor="assignmentTitle"
                className="block text-cl4 font-bold mb-2"
              >
                Assignment Title
              </label>
              <input
                type="text"
                id="assignmentTitle"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fileUpload"
                className="block text-cl4 font-bold mb-2"
              >
                Upload File
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                onClick={handleAssignmentSubmit}
                className="bg-cl4 text-white py-4 px-6 rounded-lg shadow-md hover:bg-cl2 transition"
              >
                Add Assignment
              </button>
              <button
                onClick={() => setSelectedCourse(null)}
                className="bg-gray-400 text-white py-4 px-6 rounded-lg shadow-md hover:bg-gray-300 transition"
              >
                Back to Courses
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignTask;

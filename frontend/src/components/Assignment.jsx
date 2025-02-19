import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";

dayjs.extend(relativeTime);

const Assignment = () => {
  const location = useLocation();
  const { course } = location.state || {};
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const studentId = localStorage.getItem("userName");
        const response = await axios.post(
          "https://collab-frontend-putq.onrender.com/api/auth/assignment/listAssignmentsForStudent",
          {
            studentId,
            courseId: course?.courseCode,
          }
        );
        if (response.data.success) {
          setAssignments(response.data.assignments || []);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [course]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64 data
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmitAssignment = async (assignmentId) => {
    const studentId = localStorage.getItem("userName");

    if (file && assignmentId) {
      try {
        const fileBase64 = await convertFileToBase64(file);

        const response = await axios.post(
          `https://collab-imps.onrender.com/api/auth/assignment/submitAssignment`,
          {
            studentId,
            assignmentId,
            courseId: course?.courseCode,
            title: selectedAssignment?.title || "Assignment Title",
            file: fileBase64,
          }
        );

        if (response.data.success) {
          alert("Assignment submitted successfully");
          setFile(null);
          setSelectedAssignment(null);
        }
      } catch (error) {
        console.error("Error submitting assignment:", error);
        alert("Error submitting the assignment.");
      }
    } else {
      alert("Please select a file to submit.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-cl4 text-white flex justify-between items-center p-4 shadow-md">
        <h1 className="text-2xl font-bold">{course?.name || "Assignments"}</h1>
      </header>

      <div className="flex flex-1 flex-col p-4 space-y-6">
        <h3 className="text-lg font-semibold text-cl4">Today's Assignments</h3>

        <div className="space-y-6 flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center text-cl4">Loading assignments...</div>
          ) : assignments.length > 0 ? (
            assignments.map((assignment) => {
              const remainingTime = dayjs(assignment.dueDate).fromNow();
              const isOverdue = remainingTime.includes("ago");

              return (
                <div
                  key={assignment._id}
                  className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold text-cl4">
                      {assignment.title}
                    </h4>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        isOverdue
                          ? "bg-red-100 text-red-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {isOverdue ? "Overdue" : "Due Soon"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {assignment.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold">Posted:</p>
                      <p>{dayjs(assignment.createdAt).format("YYYY-MM-DD")}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Due:</p>
                      <p>{dayjs(assignment.dueDate).format("YYYY-MM-DD")}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Marks:</p>
                      <p>{assignment.marks}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status:</p>
                      <p>
                        {assignment.isCompleted ? "Completed" : "Not Submitted"}
                      </p>
                    </div>
                  </div>

                  {!assignment.isCompleted && (
                    <div className="flex flex-col space-y-4">
                      <input
                        type="file"
                        onChange={(e) => {
                          handleFileChange(e);
                          setSelectedAssignment(assignment);
                        }}
                        className="p-2 border border-gray-300 rounded w-full sm:w-auto"
                      />
                      <button
                        onClick={() => handleSubmitAssignment(assignment._id)}
                        className="bg-cl4 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-cl3 transition"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center text-cl4">No assignments available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;

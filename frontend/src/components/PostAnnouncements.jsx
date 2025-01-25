import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PostAnnouncements = () => {
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageContainerRef = useRef(null);
  const teacherId = localStorage.getItem("userName");

  useEffect(() => {
    if (!teacherId) {
      setError("Teacher ID is missing. Please log in.");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/teacher/listTeacherCourse",
          { teacherId }
        );

        if (response.data.success && response.data.courses.length > 0) {
          const formattedCourses = response.data.courses.flatMap((course) =>
            course.description.map((desc) => ({
              id: course._id,
              courseCode: desc.courseCode,
              courseName: desc.courseName,
              courseParentName: course.name,
            }))
          );
          setCourses(formattedCourses);
        } else {
          setError("No courses found for the teacher.");
        }
      } catch (error) {
        setError("Error fetching courses. Please try again later.");
      }
    };

    fetchCourses();
  }, [teacherId]);

  useEffect(() => {
    if (selectedCourse && messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedCourse]);

  const sendMessage = () => {
    if (currentMessage.trim() !== "" && selectedCourse) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedCourse]: [
          ...(prevMessages[selectedCourse] || []),
          { text: currentMessage, sender: "Faculty" },
        ],
      }));
      setCurrentMessage("");
    }
  };

  const handleBackButtonClick = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-cl1">
      {/* Left Side: Course List */}
      <div
        className={`w-full lg:w-1/3 bg-cl5 p-4 overflow-y-auto ${
          selectedCourse ? "hidden" : ""
        }`}
      >
        <header className="bg-cl4 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Assigned Courses</h2>
        </header>
        {loading ? (
          <p className="p-4 text-cl5">Loading...</p>
        ) : error ? (
          <p className="p-4 text-cl5">{error}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {courses.map((course) => (
              <li
                key={course.courseCode}
                className="p-3 flex items-center gap-4 bg-cl5 text-cl3 rounded-lg shadow cursor-pointer hover:bg-cl3 transition"
                onClick={() => setSelectedCourse(course.courseCode)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full overflow-hidden">
                  <img
                    src="/assets/multiple-users-silhouette.png"
                    alt="Course Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-cl4">{course.courseName}</p>
                  <p className="text-sm text-cl4">{course.courseParentName}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Side: Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedCourse ? (
          <>
            {/* Chat Header */}
            <header className="bg-cl4 text-white flex items-center justify-between p-4 shadow-lg">
              <h1 className="text-xl font-semibold">{selectedCourse}</h1>
              <button
                onClick={handleBackButtonClick}
                className="w-8 h-8 flex items-center justify-center bg-white text-cl4 rounded-full shadow hover:bg-cl5 transition"
              >
                ←
              </button>
            </header>

            {/* Chat Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 bg-cl5 rounded-lg scrollbar-thin scrollbar-thumb-cl4"
              ref={messageContainerRef}
            >
              {messages[selectedCourse]?.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    message.sender === "Faculty" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg shadow ${
                      message.sender === "Faculty"
                        ? "bg-cl4 text-white"
                        : "bg-cl3 text-cl5"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-cl5 border-t border-cl4 flex items-center gap-3">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-1 border border-cl4 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cl4"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-cl4 text-white px-4 py-2 rounded-lg hover:bg-cl3 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-cl3">Select a course to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAnnouncements;

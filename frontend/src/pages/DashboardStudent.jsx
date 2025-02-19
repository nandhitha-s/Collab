import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingPage"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState({}); 
  const [newMessage, setNewMessage] = useState(""); 
  const [activeChat, setActiveChat] = useState(null); 

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (!storedUserName || !token) {
      navigate("/");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "https://collab-i4sn.onrender.com/api/auth/course/dashboard",
          { userName: storedUserName },
          {
            headers: {
              token,
            },
          }
        );

        if (response.data.success) {
          const coursesData = response.data.courseCodes.map((code, index) => ({
            courseCode: code,
            courseName: response.data.courseNames[index],
          }));
          setCourses(coursesData);
        } else {
          setErrorMessage(response.data.message || "Unable to fetch courses.");
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
          navigate("/");
        } else {
          setErrorMessage("An error occurred while fetching courses.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleChatToggle = (courseCode) => {
    setActiveChat(activeChat === courseCode ? null : courseCode);
  };

  const handleSendMessage = (courseCode) => {
    if (!newMessage.trim()) return;

    setChatMessages((prev) => ({
      ...prev,
      [courseCode]: [...(prev[courseCode] || []), newMessage],
    }));
    setNewMessage(""); 
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-white text-sm">
            Welcome, {localStorage.getItem("userName")}
          </p>
          <div
            className="bg-white rounded-full p-1 cursor-pointer"
            onClick={handleLogout}
          >
            <img
              src="/assets/icons8-user-24.png"
              alt="User Icon"
              className="w-6 h-6"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-cl5 shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src="/assets/books.png"
                alt="Books"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold text-cl4">{course.courseCode}</h3>
              <p className="text-cl4 text-sm mt-2">{course.courseName}</p>
              <button
                className="bg-cl4 text-white py-1 px-4 rounded-lg mt-4"
                onClick={() => navigate(`/course/${course.courseCode}`, { state: { course } })}
              >
                View Course
              </button>
              <button
                className="bg-cl6 text-white py-1 px-4 rounded-lg mt-2"
                onClick={() => handleChatToggle(course.courseCode)}
              >
                Chat
              </button>

              {activeChat === course.courseCode && (
                <div className="w-full mt-4 p-4 bg-white shadow-md rounded-lg">
                  <h4 className="text-cl4 font-semibold mb-2">Chat</h4>
                  <div className="max-h-32 overflow-y-auto border rounded-md p-2 bg-gray-100">
                    {(chatMessages[course.courseCode] || []).map(
                      (message, idx) => (
                        <p key={idx} className="text-sm text-cl4">
                          {message}
                        </p>
                      )
                    )}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="Type a message..."
                    />
                    <button
                      onClick={() => handleSendMessage(course.courseCode)}
                      className="bg-cl4 text-white py-1 px-4 rounded-lg"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-cl4 text-lg">
            {errorMessage || "No courses found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

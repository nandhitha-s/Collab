/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
          "http://localhost:5000/api/auth/course/dashboard",
          { userName: storedUserName }, 
          {
            headers: {
              token, 
            },
          }
        );

        console.log("Backend Response:", response.data); 

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
        console.error("Error fetching courses:", error);

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

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-white text-sm">Welcome, {localStorage.getItem("userName")}</p>
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
              onClick={() =>
                navigate(`/course/${course.courseCode}`, { state: { course } })
              }
            >
              <h3 className="text-xl font-bold text-cl4">{course.courseCode}</h3>
              <p className="text-cl4 text-sm mt-2">{course.courseName}</p>
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

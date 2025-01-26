/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const FacultyDashboard = () => {
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const actions = [
    {
      name: "Add Course",
      path: "/add-course",
      description: "Assign courses to yourself.",
      image: "/assets/classroom.png",
    },
    {
      name: "Assign Task",
      path: "/assign-task",
      description: "Assign tasks or homework to your students.",
      image: "/assets/delegation.png",
    },
    {
      name: "View Submissions",
      path: "/view-submissions",
      description: "Review and grade student submissions.",
      image: "/assets/job-application.png",
    },
    {
      name: "Post Announcements",
      path: "/post-announcements",
      description: "Share updates and announcements with your class.",
      image: "/assets/loudspeaker.png",
    },
  ];

  const holidays = [
    { date: "Jan 1", name: "New Year's Day" },
    { date: "Jan 14", name: "Makar Sankranti / Pongal" },
    { date: "Jan 26", name: "Republic Day" },
    { date: "Feb 14", name: "Valentine's Day" },
    { date: "Mar 8", name: "International Women's Day" },
    { date: "Mar 17", name: "Holi" },
    { date: "Apr 7", name: "Good Friday" },
    { date: "Apr 14", name: "Ambedkar Jayanti" },
    { date: "May 1", name: "Labor Day" },
    { date: "May 23", name: "Eid al-Fitr (Tentative)" },
    { date: "Aug 15", name: "Independence Day" },
    { date: "Aug 19", name: "Raksha Bandhan" },
    { date: "Aug 28", name: "Janmashtami" },
    { date: "Oct 2", name: "Gandhi Jayanti" },
    { date: "Oct 21", name: "Dussehra" },
    { date: "Nov 1", name: "Diwali" },
    { date: "Nov 14", name: "Children's Day" },
    { date: "Dec 25", name: "Christmas" },
  ];

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      navigate("/");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4 sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-white text-sm hidden sm:block">
            Welcome, {userName || "Faculty"}
          </p>
          <div
            className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
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

      <div className="flex-1 p-4 grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {actions.map((action, idx) => (
            <div
              key={idx}
              className="bg-cl5 shadow-lg rounded-2xl p-6 flex flex-col justify-start items-center text-center hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              {action.image && (
                <img
                  src={action.image}
                  alt={action.name}
                  className="w-24 h-24 object-cover mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-cl4">{action.name}</h3>
              <p className="text-cl4 text-sm mt-2">{action.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold text-cl4 mb-4">Calendar</h2>
            <iframe
              title="Calendar"
              src="https://calendar.google.com/calendar/embed?src=your_calendar_id"
              style={{
                border: "none",
                width: "100%",
                height: "300px",
                borderRadius: "12px",
              }}
              className="shadow-inner"
            ></iframe>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-cl4 mb-4">Upcoming Holidays</h2>
            <ul className="divide-y divide-gray-300 max-h-60 overflow-y-scroll">
              {holidays.map((holiday, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center py-2 text-cl4"
                >
                  <span className="font-semibold">{holiday.date}</span>
                  <span className="text-gray-600">{holiday.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

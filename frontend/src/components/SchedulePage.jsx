/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const SchedulePage = () => {
  const staticSchedule = [
    {
      month: "January",
      events: [
        { date: "2025-01-05", details: "Intro to Programming" },
        { date: "2025-01-15", details: "Assignment 1 Due" },
      ],
    },
    {
      month: "February",
      events: [
        { date: "2025-02-10", details: "Lecture on Algorithms" },
        { date: "2025-02-20", details: "Project Proposal" },
      ],
    },
    {
      month: "March",
      events: [
        { date: "2025-03-12", details: "Lecture on Data Structures" },
        { date: "2025-03-25", details: "Midterm Exam" },
      ],
    },
    {
      month: "April",
      events: [
        { date: "2025-04-08", details: "Lecture on Databases" },
        { date: "2025-04-20", details: "Final Project Due" },
      ],
    },
  ];

  const [schedule, setSchedule] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);

  const motivationalQuotes = [
    "Keep pushing forward!",
    "Success is the sum of small efforts, repeated daily.",
    "Your future depends on what you do today.",
    "Believe in yourself and all that you are.",
  ];

  const getRandomQuote = () =>
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    setSchedule(staticSchedule);

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
    const endOfWeek = new Date(today.setDate(today.getDate() + 6)); // Saturday

    const weeklyEvents = staticSchedule
      .flatMap((month) => month.events)
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      });

    setCurrentWeek(weeklyEvents);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Static Schedule</h1>
        <p className="italic">{quote}</p>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row p-6 gap-6">
        <section className="flex-1 bg-cl5 shadow-lg rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-cl4 mb-4">Weekly Schedule</h3>
          {currentWeek.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentWeek.map((event, index) => (
                <div
                  key={index}
                  className="bg-cl6 p-4 rounded-lg shadow-md border-l-4 border-cl4 flex items-center gap-4"
                  style={{ height: "120px" }}
                >
                  <img
                    src="/timeline.png"
                    alt="Timeline Icon"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="text-cl4 font-semibold">{event.date}</h4>
                    <p className="text-cl4">{event.details}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-cl4">No events scheduled for this week.</p>
          )}
        </section>

        <section className="flex-1 bg-cl5 shadow-lg rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-cl4 mb-4">Monthly Calendar</h3>
          {schedule.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schedule.map((month, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-semibold text-cl4">{month.month}</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {month.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="bg-cl6 p-4 rounded-lg shadow-md flex items-center gap-4"
                        style={{ height: "120px" }}
                      >
                        <img
                          src="/assets/timeline.png"
                          alt="Timeline Icon"
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h5 className="text-cl4 font-semibold">{event.date}</h5>
                          <p className="text-cl4">{event.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-cl4">No schedule available for 2025.</p>
          )}
        </section>
      </div>

      
    </div>
  );
};

export default SchedulePage;
 
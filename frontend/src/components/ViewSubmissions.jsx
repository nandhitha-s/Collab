// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const ViewSubmissions = () => {
  const [courses] = useState([
    {
      id: 1,
      name: "Software Engineering",
      totalStudents: 30,
      submissions: [
        { name: "22PT04", status: "Submitted" },
        { name: "22PT05", status: "Submitted" },
        { name: "22PT06", status: "Pending" },
      ],
    },
    {
      id: 2,
      name: "Data Structures",
      totalStudents: 25,
      submissions: [
        { name: "22PT01", status: "Submitted" },
        { name: "22PT02", status: "Pending" },
        { name: "22PT03", status: "Pending" },
      ],
    },
  ]);

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">View Submissions</h1>
      </header>

      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const submitted = course.submissions.filter(
            (s) => s.status === "Submitted"
          );
          const pending = course.submissions.filter(
            (s) => s.status === "Pending"
          );

          return (
            <div
              key={course.id}
              className="bg-cl5 p-6 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-cl4 mb-4">{course.name}</h2>
                <p className="text-cl4 mb-2">
                  Students Submitted: {submitted.length} / {course.totalStudents}
                </p>
                <p className="text-cl4 mb-4">Pending: {pending.length}</p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-cl4 mb-2">Submitted:</h3>
                  {submitted.map((student, idx) => (
                    <p
                      key={idx}
                      className="text-cl4 bg-cl1 rounded-lg px-3 py-1 shadow-sm"
                    >
                      {student.name}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cl4 mb-2">Pending:</h3>
                  {pending.map((student, idx) => (
                    <p
                      key={idx}
                      className="text-cl4 bg-cl1 rounded-lg px-3 py-1 shadow-sm"
                    >
                      {student.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewSubmissions;

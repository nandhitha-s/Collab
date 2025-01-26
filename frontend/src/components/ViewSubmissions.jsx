/* eslint-disable-next-line no-unused-vars */
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        { name: "22PT07", status: "Pending" },
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

  const generatePDF = (course) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(course.name, 10, 10);
    doc.setFontSize(12);

    doc.text("Submitted Students:", 10, 20);
    const submittedStudents = course.submissions.filter((s) => s.status === "Submitted");
    submittedStudents.forEach((student, index) => {
      doc.text(`${index + 1}. ${student.name}`, 10, 30 + index * 10);
    });

    doc.text("Pending Students:", 10, 30 + submittedStudents.length * 10 + 5);
    const pendingStudents = course.submissions.filter((s) => s.status === "Pending");
    pendingStudents.forEach((student, index) => {
      doc.text(`${index + 1}. ${student.name}`, 10, 40 + (submittedStudents.length + index) * 10);
    });

    doc.save(`${course.name}_Submissions.pdf`);
  };

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4 shadow-lg">
        <h1 className="text-2xl font-bold">View Submissions</h1>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const submitted = course.submissions.filter((s) => s.status === "Submitted");
            const pending = course.submissions.filter((s) => s.status === "Pending");

            return (
              <div
                key={course.id}
                className="bg-white p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="mb-4 flex flex-col items-center">
                  <div className="flex justify-between w-full items-center">
                    <h2 className="text-xl font-bold text-cl4 mb-2">{course.name}</h2>
                    <button
                      onClick={() => generatePDF(course)}
                      className="bg-cl4 text-white py-1 px-4 rounded-md hover:bg-cl3 transition duration-200"
                    >
                      Download
                    </button>
                  </div>
                  <p className="text-sm text-cl4 mb-1">
                    <span className="font-semibold">Total Students:</span> {course.totalStudents}
                  </p>
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-green-600">✔</span>
                      <p className="text-sm text-green-600">{submitted.length} Submitted</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-red-600">⏳</span>
                      <p className="text-sm text-red-600">{pending.length} Pending</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-cl4 mb-2">Submitted:</h3>
                    <div className="space-y-2">
                      {submitted.map((student, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-green-100 rounded-lg px-4 py-2 shadow-sm hover:bg-green-200 transition-colors"
                        >
                          <span className="text-sm font-medium text-green-600">{student.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-cl4 mb-2">Pending:</h3>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {pending.map((student, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-red-100 rounded-lg px-4 py-2 shadow-sm hover:bg-red-200 transition-colors"
                        >
                          <span className="text-sm font-medium text-red-600">{student.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewSubmissions;

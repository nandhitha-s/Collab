import React from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const AssignmentsPage = () => {
  const location = useLocation();
  const { course } = location.state || {};

  const assignments = [
    {
      title: "Assignment 1",
      postedDate: "2025-02-10",
      dueDate: "2025-02-15",
      marks: 50,
      isCompleted: false,
    },
    {
      title: "Assignment 2",
      postedDate: "2025-02-12",
      dueDate: "2025-02-20",
      marks: 75,
      isCompleted: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">{course?.name || "Assignments"}</h1>
      </header>

      <div className="flex flex-1 flex-col p-4 space-y-6">
        <h3 className="text-lg font-semibold text-cl4">Today's Assignments</h3>

        <div className="space-y-6 flex-1 overflow-y-auto">
          {assignments.length > 0 ? (
            assignments.map((assignment, idx) => {
              const remainingTime = dayjs(assignment.dueDate).fromNow();
              const isOverdue = remainingTime.includes("ago");

              return (
                <div
                  key={idx}
                  className="bg-cl5 shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        assignment.isCompleted
                          ? "bg-green-500"
                          : isOverdue
                          ? "bg-red-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                    <h4 className="text-lg font-semibold text-cl4">
                      {assignment.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-sm text-cl4 md:w-2/3">
                    <div className="flex">
                      <p className="font-semibold w-24">Posted:</p>
                      <p>{dayjs(assignment.postedDate).format("YYYY-MM-DD")}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-24">Due:</p>
                      <p>{dayjs(assignment.dueDate).format("YYYY-MM-DD")}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-24">Marks:</p>
                      <p>{assignment.marks}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold w-24">Status:</p>
                      <p>{assignment.isCompleted ? "Completed" : "Pending"}</p>
                    </div>
                    <div className="flex col-span-2">
                      <p className="font-semibold w-24">Remaining:</p>
                      <p
                        className={`font-semibold ${
                          isOverdue ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {assignment.isCompleted
                          ? "Completed"
                          : isOverdue
                          ? "Overdue"
                          : remainingTime}
                      </p>
                    </div>
                  </div>
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

export default AssignmentsPage;

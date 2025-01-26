/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";

const ResourcePage = () => {
  const location = useLocation();
  const { course } = location.state || {};

  const resources = [
    { title: "Lecture Notes - Week 1", link: "/files/week1-notes.pdf" },
    { title: "Practice Problems - Chapter 1", link: "/files/chapter1-problems.pdf" },
    { title: "Reference Book - XYZ", link: "/files/reference-book.pdf" },
  ];

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">{course?.name || "Resources"}</h1>
      </header>

      <div className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-cl4">Resources</h3>

        <div className="space-y-3">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cl5 shadow-md rounded-lg p-4 flex items-center space-x-4"
            >
              <div className="w-10 h-10 bg-cl4 rounded-full flex items-center justify-center text-white font-bold">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-cl4 font-semibold">{resource.title}</h4>
                <p className="text-sm text-cl4">Click to download</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;

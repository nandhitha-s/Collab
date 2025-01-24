// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";

const UploadProblemSheet = () => {
  const location = useLocation();
  const { course } = location.state;

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Post a Problem Sheet</h1>
      </header>

      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold text-cl4 mb-6">
          {`Upload Problem Sheet for ${course.name}`}
        </h2>
        <input
          type="file"
          className="w-full border border-cl3 rounded-lg p-2 mb-4"
        />
        <button className="bg-cl4 text-white py-2 px-4 rounded-lg shadow-md hover:bg-cl2 transition">
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadProblemSheet;

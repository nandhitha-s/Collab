import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingPage"; 

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post("https://collab-i4sn.onrender.com/api/auth/user/register", {
        userName,
        name,
        role,
        password,
      });

      if (response.data.success) {
        navigate("/"); 
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <LoadingPage />; 
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="relative w-[400px] h-[600px] bg-cl5 rounded-xl shadow-xl border-cl3 flex flex-col p-6"
      >
        <div className="text-cl4 text-2xl font-bold mt-10 text-center">
          <p>Hello,</p>
          <p>Sign Up!</p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-cl4 mb-2">ROLLNUMBER</label>
          <input
            type="text"
            placeholder="Enter your Roll Number (eg:22PT10) "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-cl3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cl4"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-cl4 mb-2">NAME</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-cl3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cl4"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-cl4 mb-2">ROLE</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-cl3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cl4 bg-cl5 text-cl4"
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-cl4 mb-2">PASSWORD</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-cl3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cl4"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2 text-cl4"
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-cl2 text-cl5 py-2 mt-6 rounded-lg shadow-md hover:bg-cl4 transition"
        >
          Sign Up
        </button>

        <div className="text-center mt-6 text-cl4 text-sm">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue font-semibold hover:underline"
              onClick={() => navigate("/")}
            >
              Log In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/user/login", {
        userName,
        password,
      });

      if (response.data.success) {
        const { token, role } = response.data;

        localStorage.setItem("token", token);

        if (role === "student") {
          navigate("/dashboard");
        } else if (role === "teacher") {
          navigate("/faculty-dashboard"); 
        } else {
          setErrorMessage("Unknown role. Please contact the administrator.");
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="relative w-[400px] h-[550px] bg-cl5 rounded-xl shadow-xl border-cl3 flex flex-col p-6"
      >
        <div className="text-cl4 text-2xl font-bold mt-16">
          <p>Welcome Back,</p>
          <p>Log In!</p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-cl4 mb-2">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-cl3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cl4"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-cl4 mb-2">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="*********"
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
          Log in
        </button>

        <div className="text-center mt-6 text-cl4 text-sm">
          <p>
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue font-semibold hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

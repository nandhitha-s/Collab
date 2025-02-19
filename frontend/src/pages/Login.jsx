import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingPage"; 

const Login = () => {
  const [userName, setUserName] = useState("");
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
      const response = await axios.post("https://collab-i4sn.onrender.com/api/auth/user/login", {
        userName,
        password,
      });

      if (response.data.success) {
        const { token, role } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        localStorage.setItem("role", role);

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
      console.error("Error during login:", error);
      setErrorMessage("Invalid username or password.");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-cl1">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-cl5 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-cl4">Log In</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-cl4 mb-2">Roll Number</label>
          <input
            type="text"
            placeholder="Enter your Roll Number (eg:22PT01)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-cl3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cl4"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-cl4 mb-2">Password</label>
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
          Log In
        </button>

        <div className="text-center mt-6 text-sm text-cl4">
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const isFormComplete = () => formData.email && formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Store the logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start bg-white p-4">
      <div className="text-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your PopX account</h1>
        <p className="text-gray-500 mb-6">Please enter your email and password to sign in.</p>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="text-left">
            <label className="text-purple-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="text-left">
            <label className="text-purple-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormComplete()}
            className={`py-2 px-4 font-semibold rounded-md transition-all duration-300 mt-4 ${
              !isFormComplete()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-700 text-white hover:bg-purple-800"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

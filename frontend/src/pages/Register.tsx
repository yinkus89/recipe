import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/tailwind.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for the form
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: Check if fields are empty
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage(""); // Reset any previous error message
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post('http://localhost:5432/api/register', {
        name,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (error: any) {
      console.error("Error registering:", error.response || error.message);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

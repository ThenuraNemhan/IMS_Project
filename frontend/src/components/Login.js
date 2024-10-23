import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";

function Login() {
  const [role, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate user type
    if (!role) {
      toast.error("Please select a user type."); // Show error toast for missing user type
      return;
    }

    try {
      const response = await fetch("http://192.168.2.48:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      // Log the entire response for debugging
      console.log("Login response:", data);

      // Check for successful response status
      if (!response.ok || !data.token) {
        // Check if the token exists
        setError(data.message || "Login failed"); // Set default message if none is provided
        toast.error(data.message || "Login failed. Please try again."); // Show error toast
        return;
      }

      // Store token and user role in localStorage for persistence
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("user_code", data.data.user_code);
      localStorage.setItem("username", data.data.username); // Store username

      // Show success toast and redirect based on role
      toast.success("Login successful!"); // Show success toast

      // Redirect based on role
      if (data.data.role === "Main Admin") {
        navigate("/mainadmin-dashboard");
      } else if (data.data.role === "Company Admin") {
        navigate("/companyadmin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again."); // Show error toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <img src="/IMS.png" alt="logo" className="mx-auto h-12" />
          <h1 className="text-2xl font-semibold mt-4">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <Form.Group className="relative">
            <i className="fas fa-user absolute top-3 left-3 text-gray-400"></i>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Group>
          <Form.Group className="relative">
            <i className="fas fa-lock absolute top-3 left-3 text-gray-400"></i>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className="pl-10 w-full py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Group>
          <div>
            <Form.Group className="relative">
              <Form.Control
                as="select"
                name="role"
                value={role}
                onChange={handleUserTypeChange}
                className="pl-3 w-full pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select User Type</option>
                <option value="User">User</option>
                <option value="Company Admin">Company Admin</option>
                <option value="Main Admin">Main Admin</option>
              </Form.Control>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </Form.Group>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="keep-me-signed-in"
                checked={rememberMe}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="keep-me-signed-in" className="ml-2">
                Keep me signed in
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

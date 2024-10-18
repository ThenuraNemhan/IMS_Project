import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./components/Login.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./i18n";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username"); // Get username

    if (token && userRole && storedUsername) {
      setIsAuthenticated(true);
      setRole(userRole);
      setUsername(storedUsername); // Set username state
    }
  }, []);

  // Redirect user based on role
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "Main Admin") {
        navigate("/mainadmin-dashboard");
      } else if (role === "Company Admin") {
        navigate("/companyadmin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <>
      <div>
        {/* Display the username only if the user is authenticated */}
        {isAuthenticated && (
          <h1 className="text-lg font-semibold">
            {`Hello, ${username}`}
          </h1>
        )}
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<DashboardLayout />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

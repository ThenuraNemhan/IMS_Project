import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddUser() {
  const [username, setUsername] = useState(""); // Changed to match backend field
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [generatedUserCode, setGeneratedUserCode] = useState(null);

  // Handle form submission
  const handleAddUser = async () => {
    // Validate required fields
    if (!username) {
      toast.error("Username is required.");
      return;
    }
    if (!userEmail) {
      toast.error("User Email is required.");
      return;
    }
    if (!userPassword) {
      toast.error("User Password is required.");
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm Password is required.");
      return;
    }
    if (userPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!userRole) {
      toast.error("User Role is required.");
      return;
    }

    const formData = {
      username, // Correct field name
      user_email: userEmail,
      password: userPassword,
      role: userRole,
    };

    const apiUrl = "http://192.168.2.48:5000/api/users/register";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message, user } = response.data;
      toast.success(message); // Display success toast

      // Set the generated user code from the response
      setGeneratedUserCode(user.user_code);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">Add User</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">User Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">User Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter user email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">User Role</label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="">Select User Role</option>
                <option value="User">User</option>
                <option value="Company Admin">Company Admin</option>
                <option value="Main Admin">Main Admin</option>
              </select>
            </div>
          </div>

          {generatedUserCode && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-green-700 font-bold">
                Generated User Code: {generatedUserCode}
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;

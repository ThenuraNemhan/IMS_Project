import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Users({ onAddUserClick }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch users from the API when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://192.168.56.1:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Ensure response.data exists before accessing users
        if (response.data && response.data.users) {
          const usersWithId = response.data.users.map((user) => ({
            ...user,
            id: user.user_code,
          }));
          setUsers(usersWithId);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response ? error.response.data.message : error.message
        );
        toast.error("Failed to fetch users. Please try again."); // Notify the user
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    // Ensure that the selected customer contains all necessary fields
    setSelectedUser({
      ...user,
      username: user.username || "",
      user_email: user.user_email || "",
      password: user.password || "",
      role: user.role || "",
      status: user.status || "Active",
    });
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const columns = [
    { field: "user_code", headerName: "ID", width: 90 }, // Use id here
    { field: "username", headerName: "User Name", width: 150 },
    { field: "user_email", headerName: "User Email", width: 150 },
    { field: "role", headerName: "User Type", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        const status = params.row.status;
        const statusClass =
          status === "Active"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white";

        return (
          <span className={`px-2 py-1 rounded-sm ${statusClass}`}>
            {status}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-left items-left w-10 h-10">
          <button
            onClick={() => handleUserClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://192.168.56.1:5000/api/users/update/${selectedUser.user_code}`,
        {
          ...selectedUser,
        }
      );
      toast.success("User Updated Succesfully");
      setSelectedUser(null);
      // Refresh the User list
      const response = await axios.get("http://192.168.56.1:5000/api/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error Updating User");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `http://192.168.56.1:5000/api/users/delete/${selectedUser.user_code}`
      );
      toast.success("User Deleted Succesfully");
      setSelectedUser(null);
      // Refresh the User list
      const response = await axios.get("http://192.168.56.1:5000/api/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error Deleting User");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            onClick={onAddUserClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add User
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* user Grid */}
          <Grid rows={users} columns={columns} />
        </div>

        {/* Popup for User Details */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <div className="flex mb-4">
                <div className="w-1/2 pl-4">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedUser.user_code}
                  </h2>
                  {/* user name */}
                  <div className="mb-4">
                    <label className="block text-gray-700">User Name</label>
                    <input
                      type="text"
                      value={selectedUser.username}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* user email */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      User Email Address
                    </label>
                    <input
                      type="text"
                      value={selectedUser.user_email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          user_email: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* user Type */}
                  <div className="mb-4">
                    <label className="block text-gray-700">User Type</label>
                    <select
                      value={selectedUser.role}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="">Select User type</option>
                      <option value="Main Admin">Main Admin</option>
                      <option value="Company Admin">Company Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                  {/* Status Dropdown */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                      value={selectedUser.status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  {/* Buttons */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleDeleteUser}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleUpdateUser}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;

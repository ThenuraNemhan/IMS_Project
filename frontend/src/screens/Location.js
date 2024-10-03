import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Location({ onAddLocationClick }) {
  const [location, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch locations from the API when the component mounts
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/locations"
        );
        // Map the locations to include an id field
        const locationsWithId = response.data.locations.map((location) => ({
          ...location,
          id: location.location_code, // Assign _id to id
        }));
        setLocations(locationsWithId); // Set locations with id field
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationClick = (location) => {
    // Ensure that the selected locations contains all necessary fields
    setSelectedLocation({
      ...location,
      location_name: location.location_name || "",
      status: location.status || "Active",
    });
  };

  const handleClosePopup = () => {
    setSelectedLocation(null);
  };

  const columns = [
    { field: "location_code", headerName: "ID", width: 90 }, // Use id here
    { field: "location_name", headerName: "Location Name", width: 150 },
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
            onClick={() => handleLocationClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateLocation = async () => {
    try {
      await axios.put(
        `http://192.168.56.1:5000/api/locations/update/${selectedLocation.location_code}`,
        {
          ...selectedLocation,
        }
      );
      toast.success("Location Updated Successfully");
      setSelectedLocation(null);
      // Refresh the Location list
      const response = await axios.get(
        "http://192.168.56.1:5000/api/locations"
      );
      setLocations(response.data.locations);
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Error Updating Location");
    }
  };

  const handleDeleteLocation = async () => {
    try {
      await axios.delete(
        `http://192.168.56.1:5000/api/locations/delete/${selectedLocation.location_code}`
      );
      toast.success("Location Deleted Successfully");
      setSelectedLocation(null);
      // Refresh the Location list
      const response = await axios.get(
        "http://192.168.56.1:5000/api/locations"
      );
      setLocations(response.data.locations);
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Error Deleting Location");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Locations</h1>
          <button
            onClick={onAddLocationClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Location
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search location here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Location Grid */}
          <Grid rows={location} columns={columns} />
        </div>

        {/* Popup for Location Details */}
        {selectedLocation && (
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
                    {selectedLocation.location_code}
                  </h2>
                  {/* Location Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Location Name
                    </label>
                    <input
                      type="text"
                      value={selectedLocation.location_name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedLocation({
                          ...selectedLocation,
                          Location_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Status Dropdown */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                      value={selectedLocation.status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedLocation({
                          ...selectedLocation,
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
                      onClick={handleDeleteLocation}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleUpdateLocation}
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

export default Location;

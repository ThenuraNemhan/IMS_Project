import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

function AddLocation() {
  const [locationName, setLocationName] = useState("");
  const [generatedLocationCode, setGeneratedLocationCode] = useState(null); // State to hold the generated location code

 
  // Handle form submission
  const handleAddLocation = async () => {
    // Validate required fields
    if (!locationName) {
      toast.error("Location name is required.");
      return;
    }

    const formData = {
      location_name: locationName,
    };

    const apiUrl = "http://192.168.56.1:5000/api/locations/add";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json", // Use JSON instead of multipart/form-data
        },
      });

      const { message, location } = response.data;
      toast.success(message || "Locations added successfully!"); // Display success toast
      console.log("locations added successfully!");

      // Set the generated location code from the response
      setGeneratedLocationCode(location.location_code);
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Error adding location. Please try again."); // Display error toast
    }
  };



  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Add Location
          </h2>
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Location Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter location name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </div>
          </div>
          {/* Display the generated location code if available */}
          {generatedLocationCode && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-green-700 font-bold">
                Generated Location Code: {generatedLocationCode}
              </p>
            </div>
          )}
        </div>
        {/* {toast.error && <p className="text-red-500">{toast.error}</p>}
        {toast.message && <p className="text-green-500">{toast.message}</p>} */}
        <div className="mt-6 text-right">
          <button
            onClick={handleAddLocation}
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLocation;

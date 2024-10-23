import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

function AddUnit() {
  const [unitName, setUnitName] = useState("");
  const [generatedUnitCode, setGeneratedUnitCode] = useState(null); // State to hold the generated unit code

  // Handle form submission
  const handleAddUnit = async () => {
    if (!unitName) {
      toast.error("Unit name is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.2.48:5000/api/units/add",
        { unit_name: unitName }, // Send as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message, unit } = response.data;
      toast.success(message || "Unit added successfully!");

      // Set the generated unit code from the response
      setGeneratedUnitCode(unit.unit_code);
    } catch (error) {
      console.error("Error adding unit:", error);
      toast.error("Error adding unit. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">Add Unit</h2>
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Unit Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter unit name"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
          </div>
          {/* Display the generated unit code if available */}
          {generatedUnitCode && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-green-700 font-bold">
                Generated Unit Code: {generatedUnitCode}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleAddUnit}
        >
          Add Unit
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          Save Unit
        </button>
      </div>
    </div>
  );
}

export default AddUnit;

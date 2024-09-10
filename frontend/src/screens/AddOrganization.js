import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

function AddOrganization() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationBRN, setOrganizationBRN] = useState("");
  const [organizationOwnerName, setOrganizationOwnerName] = useState("");
  const [generatedOrganizationCode, setGeneratedOrganizationCode] = useState(null); // State to hold the generated unit code

 
  // Handle form submission
  const handleAddOrganization = async () => {
    // Validate required fields
    if (!organizationName) {
      toast.error("Organization name is required.");
      return;
    }
    if (!organizationBRN) {
      toast.error("Organization BRN is required.");
      return;
    }
    if (!organizationOwnerName) {
      toast.error("Owner Name is required.");
      return;
    }

    const formData = {
      organization_name: organizationName,
      organization_BRN: organizationBRN,
      owner_name: organizationOwnerName,
    };

    const apiUrl = "http://192.168.56.1:5000/api/organizations/add";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json", // Use JSON instead of multipart/form-data
        },
      });

      const { message, organization } = response.data;
      toast.success(message || "Organizations added successfully!"); // Display success toast
      console.log("Organizations added successfully!");

      // Set the generated unit code from the response
      setGeneratedOrganizationCode(organization.organization_code);
    } catch (error) {
      console.error("Error adding organization:", error);
      toast.error("Error adding organization. Please try again."); // Display error toast
    }
  };



  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Add Organization
          </h2>
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter organization name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Organization BRN
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter organization BRN"
                value={organizationBRN}
                onChange={(e) => setOrganizationBRN(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Organization Owner Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter organization owner name"
                value={organizationOwnerName}
                onChange={(e) => setOrganizationOwnerName(e.target.value)}
              />
            </div>
          </div>
          {/* Display the generated organization code if available */}
          {generatedOrganizationCode && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-green-700 font-bold">
                Generated Organization Code: {generatedOrganizationCode}
              </p>
            </div>
          )}
        </div>
        {toast.error && <p className="text-red-500">{toast.error}</p>}
        {toast.message && <p className="text-green-500">{toast.message}</p>}
        <div className="mt-6 text-right">
          <button
            onClick={handleAddOrganization}
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Organization
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrganization;

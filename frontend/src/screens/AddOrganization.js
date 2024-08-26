import React, { useState } from "react";

function AddOrganization() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationBRN, setOrganizationBRN] = useState("");
  const [organizationOwnerName, setOrganizationOwnerName] = useState("");
  const [organizationCode] = useState("#0001254632");

  // Handle form submission
  const handleAddOrganization = () => {
    console.log("Organization added successfully!");
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Organization Code
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className="w-min p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={organizationCode}
                readOnly
              />
              <button className="ml-4 p-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                <span className="text-gray-700">Edit</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              This is organization code auto-generated by the system. It can be
              changed at any time.
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleAddOrganization}
        >
          Add Organization
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          Save Organization
        </button>
      </div>
    </div>
  );
}

export default AddOrganization;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//example data
const mockOrgData = {
    id: "OID012",
    name: "Tokyo Pvt Ltd 1",
    BRN: "BRN123456",
    owner_name: "A.T.Fernando",
  };

function Organizations({ onAddOrganizationClick }) {
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleOrganizationClick = (organization) => {
    setSelectedOrganization(organization);
  };

  const handleClosePopup = () => {
    setSelectedOrganization(null);
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Organizations</h1>
          <button
            onClick={onAddOrganizationClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Organization
          </button>
        </div>

        {/* Org List */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search organizations here"
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>
          </div>

          <table className="w-full text-center border-collapse">
            {/*----Table Start---- */}
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Organization Code
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Organization Name
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Organization BRN
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Owner Name
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Organization */}
              <tr
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOrganizationClick(mockOrgData)}
              >
                <td className="py-2 px-4 text-sm">OID012</td>
                <td className="py-2 px-4 text-sm">Tokyo Pvt Ltd 1</td>
                <td className="py-2 px-4 text-sm">BRN123456</td>
                <td className="py-2 px-4 text-sm">A.T.Fernando</td>
              </tr>
            </tbody>
          </table>
          {/*----Table End---- */}
        </div>

        {/* Popup for Organization Details */}
        {selectedOrganization && (
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
                    {selectedOrganization.name}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Organization BRN</label>
                    <input
                      type="text"
                      value={selectedOrganization.BRN}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Owner Name</label>
                    <input
                      type="text"
                      value={selectedOrganization.owner_name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Organizations;

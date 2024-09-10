import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";

function Organizations({ onAddOrganizationClick }) {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ field: "company_name", direction: "asc" });

  useEffect(() => {
    // Fetch organizations from the API when the component mounts
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/organizations"
        );
        // Map the organization to include an id field
        const organizationsWithId = response.data.organizations.map(
          (organization) => ({
            ...organization,
            id: organization.organization_code, // Assign _id to id
          })
        );
        setOrganizations(organizationsWithId); // Set organizations with id field
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleOrganizationClick = (organization) => {
    setSelectedOrganization(organization);
  };

  const handleClosePopup = () => {
    setSelectedOrganization(null);
  };

  const handleSortChange = (field) => {
    setSort((prev) => ({
      field,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredOrganizations = organizations
    .filter(
      (organization) =>
        organization.organization_name &&
        organization.organization_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sort.field] < b[sort.field])
        return sort.direction === "asc" ? -1 : 1;
      if (a[sort.field] > b[sort.field])
        return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

  const columns = [
    { field: "organization_code", headerName: "ID", width: 90 }, // Use id here
    { field: "organization_name", headerName: "Organization Name", width: 150 },
    { field: "organization_BRN", headerName: "Organization BRN", width: 200 },
    { field: "owner_name", headerName: "Organization Owner Name", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-left items-left w-10 h-10">
          <button
            onClick={() => handleOrganizationClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
          </button>
        </div>
      ),
    },
  ];

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

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search organizations here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>
            {/* Organization Sorting */}
            <div className="flex space-x-4 items-center">
              <label className="px-1 py-2 block text-gray-700 flex items-center">
                <span className="mr-2">Sort</span>
                <FontAwesomeIcon icon={faFilter} className="text-gray-700" />
              </label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full h-10"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Select </option>
                <option value="organization_name">Organization Name</option>
                <option value="owner_name">Owners name</option>
                {/* Add more sorting options if needed */}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <Grid rows={filteredOrganizations} columns={columns} />
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
                    {selectedOrganization.organization_name}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Organization BRN
                    </label>
                    <input
                      type="text"
                      value={selectedOrganization.organization_BRN}
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

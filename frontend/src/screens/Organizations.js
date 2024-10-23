import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Organizations({ onAddOrganizationClick }) {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort] = useState({ field: "organization_name", direction: "asc" });
  const [selectedSearchField, setSelectedSearchField] = useState("organization_name"); // New state for search field


  useEffect(() => {
    // Fetch organizations from the API when the component mounts
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.2.48:5000/api/organizations"
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
    setSelectedOrganization({
      ...organization,
      organization_name: organization.organization_name || "",
      organization_BRN: organization.organization_BRN || "",
      status: organization.status || "Active",
    });
  };

  const handleClosePopup = () => {
    setSelectedOrganization(null);
  };

 // Filter and sort the production batches
 const filteredOrganizations = organizations
 .filter((organization) => {
   switch (selectedSearchField) {
     case "organization_code":
       return (
         organization.organization_code &&
         organization.organization_code.toLowerCase().includes(searchTerm.toLowerCase())
       );
     case "organization_name":
       return (
         organization.organization_name &&
         organization.organization_name.toLowerCase().includes(searchTerm.toLowerCase())
       );
    case "organization_BRN":
      return (
        organization.organization_BRN &&
        organization.organization_BRN.toLowerCase().includes(searchTerm.toLowerCase())
      );
      case "owner_name":
        return (
          organization.owner_name &&
          organization.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
     default:
       return false;
   }
 })
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

  const handleUpdateOrganization = async () => {
    try {
      await axios.put(
        `http://192.168.2.48:5000/api/organizations/update/${selectedOrganization.organization_code}`,
        {
          ...selectedOrganization,
        }
      );
      toast.success("Customer Updated Succesfully");
      setSelectedOrganization(null);
      // Refresh the customer list
      const response = await axios.get(
        "http://192.168.2.48:5000/api/organizations"
      );
      setOrganizations(response.data.organizations);
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Error Updating Organization");
    }
  };

  const handleDeleteOrganization = async () => {
    try {
      await axios.delete(
        `http://192.168.2.48:5000/api/organizations/delete/${selectedOrganization.organization_code}`
      );
      toast.success("Organization Deleted Succesfully");
      setSelectedOrganization(null);
      // Refresh the Organization list
      const response = await axios.get(
        "http://192.168.2.48:5000/api/organizations"
      );
      setOrganizations(response.data.organizations);
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Error Deleting Organization");
    }
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

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            {/* Dropdown for selecting the search field */}
            <div className="mr-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg"
                value={selectedSearchField}
                onChange={(e) => setSelectedSearchField(e.target.value)}
              >
                <option value="organization_name">Organization Name</option>
                <option value="organization_code">Code</option>
                <option value="organization_BRN">Organization BRN</option>
                <option value="owner_name">Owner Name</option>
              </select>
            </div>

            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Batch here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
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
                  {/*organization BRN */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Organization BRN
                    </label>
                    <input
                      type="text"
                      value={selectedOrganization.organization_BRN}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedOrganization({
                          ...selectedOrganization,
                          organization_BRN: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Owner Name</label>
                    <input
                      type="text"
                      value={selectedOrganization.owner_name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedOrganization({
                          ...selectedOrganization,
                          owner_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    onClick={handleDeleteOrganization}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleUpdateOrganization}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
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

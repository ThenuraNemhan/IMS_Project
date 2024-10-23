import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Units({ onAddUnitClick }) {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort] = useState({ field: "unit_name", direction: "asc" });
  const [selectedSearchField, setSelectedSearchField] = useState("unit_name"); // New state for search field

  useEffect(() => {
    // Fetch units from the API when the component mounts
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://192.168.2.48:5000/api/units");
        // Map the units to include an id field
        const unitsWithId = response.data.units.map((unit) => ({
          ...unit,
          id: unit.unit_code, // Assign _id to id
        }));
        setUnits(unitsWithId); // // Set units with id field
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  const handleClosePopup = () => {
    setSelectedUnit(null);
  };

  // Filter and sort the production batches
  const filteredUnits = units
    .filter((unit) => {
      switch (selectedSearchField) {
        case "unit_code":
          return (
            unit.unit_code &&
            unit.unit_code.toLowerCase().includes(searchTerm.toLowerCase())
          );
        case "unit_name":
          return (
            unit.unit_name &&
            unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
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
    { field: "unit_code", headerName: "ID", width: 90 }, // Use id here
    { field: "unit_name", headerName: "Unit Name", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-left items-left w-10 h-10">
          <button
            onClick={() => handleUnitClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateUnit = async () => {
    try {
      await axios.put(
        `http://192.168.2.48:5000/api/units/update/${selectedUnit.unit_code}`,
        {
          ...selectedUnit,
        }
      );
      toast.success("Unit Updated Succesfully");
      setSelectedUnit(null);
      // Refresh the unit list
      const response = await axios.get("http://192.168.2.48:5000/api/units");
      setUnits(response.data.customers);
    } catch (error) {
      console.error("Error updating units:", error);
      toast.error("Error Updating units");
    }
  };

  const handleDeleteUnit = async () => {
    try {
      await axios.delete(
        `http://192.168.2.48:5000/api/units/delete/${selectedUnit.unit_code}`
      );
      toast.success("Unit Deleted Succesfully");
      setSelectedUnit(null);
      // Refresh the Unit list
      const response = await axios.get("http://192.168.2.48:5000/api/units");
      setUnits(response.data.units);
    } catch (error) {
      console.error("Error deleting unit:", error);
      toast.error("Error Deleting unit");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Units</h1>
          <button
            onClick={onAddUnitClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Unit
          </button>
        </div>

        {/* Unit List */}
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
                <option value="unit_name">Unit Name</option>
                <option value="unit_code">Unit Code</option>
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
          <Grid rows={filteredUnits} columns={columns} />
        </div>

        {/* Popup for Units Details */}
        {selectedUnit && (
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
                    {selectedUnit.unit_code}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Unit Name</label>
                    <input
                      type="text"
                      value={selectedUnit.unit_name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <button
                    onClick={handleDeleteUnit}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleUpdateUnit}
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

export default Units;

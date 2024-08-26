import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const mockUnitData = {
  code: "UID012",
  name: "g",
};

function Units({ onAddUnitClick }) {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  const handleClosePopup = () => {
    setSelectedUnit(null);
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
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search units here"
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
                  Unit Code
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Unit Name
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Unit */}
              <tr
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleUnitClick(mockUnitData)}
              >
                <td className="py-2 px-4 text-sm">UID012</td>
                <td className="py-2 px-4 text-sm">g</td>
              </tr>
              {/* Add more units here */}
              <tr
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleUnitClick(mockUnitData)}
              >
                <td className="py-2 px-4 text-sm">UID013</td>
                <td className="py-2 px-4 text-sm">Kg</td>
              </tr>
            </tbody>
          </table>
          {/*----Table End---- */}
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
                    {selectedUnit.code}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Unit Name</label>
                    <input
                      type="text"
                      value={selectedUnit.name}
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

export default Units;

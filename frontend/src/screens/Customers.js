import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//example data
const mockCustomerData = {
    id: "CID012",
    name: "T K S Holdings Pvt Ltd",
    address:"No. 24, Lorris Road, Galle Road, Colombo 03",
    mobileno:"0112453456",
    email:"tks@sales.lk",
    cus_type:"Distributor",
    cus_status:"Active",
  };

function Customers({ onAddCustomerClick }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleClosePopup = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <button
            onClick={onAddCustomerClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Customer
          </button>
        </div>

        {/* Customer List */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers here"
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
                  Customer Code
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Customer Name
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Customer Address
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Customer Mobile No
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Customer email
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Customer Type
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Organization */}
              <tr
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleCustomerClick(mockCustomerData)}
              >
                <td className="py-2 px-4 text-sm">CID001</td>
                <td className="py-2 px-4 text-sm">T K S Holdings Pvt Ltd</td>
                <td className="py-2 px-4 text-sm">No. 24, Lorris Road, Galle Road, Colombo 03</td>
                <td className="py-2 px-4 text-sm">0112453456</td>
                <td className="py-2 px-4 text-sm">tks@sales.lk</td>
                <td className="py-2 px-4 text-sm">Distributor</td>
                <td className="py-2 px-4 text-sm">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-sm">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {/*----Table End---- */}
        </div>

        {/* Popup for Customer Details */}
        {selectedCustomer && (
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
                    {selectedCustomer.name}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Customer Address</label>
                    <input
                      type="text"
                      value={selectedCustomer.address}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Customer MobileNo</label>
                    <input
                      type="number"
                      value={selectedCustomer.mobileno}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Customer Email Address</label>
                    <input
                      type="text"
                      value={selectedCustomer.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Customer Type</label>
                    <select
                      value={selectedCustomer.cus_type}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Distributor</option>
                      <option>Dealer</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                      value={selectedCustomer.cus_status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
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

export default Customers;

import React, { useState } from "react";

function AddCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerMobileNo, setCustomerMobileNo] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerType, setCustomerType] = useState("");

  // Handle form submission
  const handleAddCustomer = () => {
    console.log("Customer added successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Add Customer
          </h2>
          <div className="grid grid-cols-2 gap-8">
            
          </div>
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Customer Address
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter customer address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Customer Mobile No
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter customer mobile no"
                value={customerMobileNo}
                onChange={(e) => setCustomerMobileNo(e.target.value)}
              />
            </div>
          </div>
          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Customer Email</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter customer email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Customer Type</label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
              >
                <option value="Distributor">Distributor</option>
                <option value="Dealer">Dealer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleAddCustomer}
        >
          Add Customer
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          Save Customer
        </button>
      </div>
    </div>
  );
}

export default AddCustomer;

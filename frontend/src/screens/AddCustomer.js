import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

function AddCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerMobileNo, setCustomerMobileNo] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [generatedCustomerCode, setGeneratedCustomerCode] = useState(null); // State to hold the generated customer code
  

  // Handle form submission
  const handleAddCustomer = async () => {
    // Validate required fields
    if (!customerName) {
      toast.error("Customer Name is required.");
      return;
    }
    if (!customerEmail) {
      toast.error("Customer Email is required.");
      return;
    }
    if (!customerType) {
      toast.error("Customer Type is required.");
      return;
    }
    const formData = {
      customer_name: customerName,
      cus_address: customerAddress,
      cus_mobileno: customerMobileNo,
      cus_email: customerEmail,
      customer_type: customerType,
    };

    const apiUrl = "http://192.168.2.48:5000/api/customers/add";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json", // Use JSON instead of multipart/form-data
        },
      });

      const { message, customer } = response.data;
      toast.success(message || "Customer added successfully!"); // Display success toast
      console.log("Customer added successfully!");

      // Set the generated unit code from the response
      setGeneratedCustomerCode(customer.customer_code);
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Error adding customer. Please try again."); // Display error toast
    }
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
          {/* Display the generated organization code if available */}
          {generatedCustomerCode && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-green-700 font-bold">
                Generated Customer Code: {generatedCustomerCode}
              </p>
            </div>
          )}
        </div>
        {/* {toast.error && <p className="text-red-500">{toast.error}</p>}
        {toast.message && <p className="text-green-500">{toast.message}</p>} */}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleAddCustomer}
        >
          Add Customer
        </button>
      </div>
    </div>
  );
}

export default AddCustomer;

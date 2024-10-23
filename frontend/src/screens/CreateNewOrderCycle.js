import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function CreateNewOrderCycle() {
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [orderCycleCode, setOrderCycleCode] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestBatchProducts, setLatestBatchProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // Inside the component
  const getLocationName = () => {
    const selected = locations.find(
      (location) => location._id === selectedLocation
    );
    return selected ? selected.location_name : "Unknown Location";
  };

  // Fetch locations and current user
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.2.48:5000/api/locations"
        );
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://192.168.2.48:5000/api/users/order-cycle-created-user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentUser(response.data.username || "");
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchLocations();
    fetchCurrentUser();
  }, []);

  // Generate cycle code on load
  useEffect(() => {
    const generateCycleCode = async () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      try {
        const response = await axios.get(
          "http://192.168.2.48:5000/api/orders/order-cycle/latest-cycle-number"
        );
        const cycleNumber = response.data.nextCycleNumber;
        const code = `OC-${year}-${month}-${cycleNumber}`;

        setOrderCycleCode(code);
        setCreatedDate(new Date().toLocaleString());
        setCreatedBy(currentUser);
      } catch (error) {
        console.error("Error generating cycle code:", error);
        toast.error("Failed to generate cycle code.");
      }
    };

    if (currentUser) {
      generateCycleCode();
    }
  }, [currentUser]);

  // Handle form submission
  const handleCreateOrderCycle = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location");
      return;
    }

    //console.log("Selected Location ID:", selectedLocation); // Debugging

    setLoading(true); // Show loading indicator

    try {
      // Fetch the latest production batch for the selected location
      const response = await axios.get(
        `http://192.168.2.48:5000/api/products/order-cycle/latest-production-batch/${selectedLocation}`
      );

      const latestBatch = response.data.latestBatch;

      if (latestBatch) {
        setLatestBatchProducts(latestBatch.selectedProducts); // Set the latest products in state
        setLoading(false); // Hide loading indicator
        toast.success("Products loaded successfully");
      }
    } catch (error) {
      setLoading(false); // Hide loading indicator
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Add Order Cycle
        </h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Order Cycle Code</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={orderCycleCode}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Created Date & Time
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={createdDate}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Created By</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={createdBy}
              readOnly
            />
          </div>

          <div className="mb-4 col-span-3">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              placeholder="Enter order cycle description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4 col-span-3">
            <label className="block text-gray-700 mb-2">Location</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleCreateOrderCycle}
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            {loading ? "Loading..." : "Create Order Cycle"}
          </button>
        </div>
        {latestBatchProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Latest Products for {getLocationName()} :
            </h3>
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product Code</th>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Stock Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {latestBatchProducts.map((product) => (
                  <tr key={product.product._id}>
                    <td className="border px-4 py-2">
                      {product.product.product_code}
                    </td>
                    <td className="border px-4 py-2">
                      {product.product.product_name}
                    </td>
                    <td className="border px-4 py-2">
                      {product.in_stock_quantity}
                    </td>
                    <td className="border px-4 py-2">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateNewOrderCycle;

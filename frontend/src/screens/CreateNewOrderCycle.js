import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

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
      const month = String(date.getMonth() + 0).padStart(0, "0");

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

  const handleCreateOrderCycle = async () => {
    if (!description || !selectedLocation) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User is not authenticated");
        setLoading(false);
        return;
      }
      // Fetch the latest production batch for the selected location
      const response = await axios.get(
        `http://192.168.2.48:5000/api/products/order-cycle/latest-production-batch/${selectedLocation}`
      );

      const latestBatch = response.data.latestBatch;
      let batchProducts = [];

      if (latestBatch) {
        batchProducts = latestBatch.selectedProducts.map((product) => ({
          product_code: product.product.product_code,
          latestInStockQuantity: product.in_stock_quantity,
          latestPrice: product.price.$numberDecimal || product.price,
        }));

        setLatestBatchProducts(latestBatch.selectedProducts);
        toast.success("Products loaded successfully");
      } else {
        toast.info("No production batch found for the selected location");
      }

      // Prepare payload for creating a new order cycle, including createdBy
      const payload = {
        orderCycleCode,
        description,
        location: selectedLocation,
        selectedProductionBatches: [
          {
            batchCode: latestBatch.productionBatchCode,
            products: batchProducts,
          },
        ],
        createdBy: currentUser, // Ensure createdBy is set to the current user's ID
      };

      // Send data to backend with Authorization header
      const orderCycleResponse = await axios.post(
        "http://192.168.2.48:5000/api/orders/order-cycle/createNewOrderCycle",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed correctly
          },
        }
      );

      toast.success("Order Cycle created successfully");

      // Store the batch code to use when adding products
      const createdCycleCode = orderCycleResponse.data.orderCycleCode; // Get cycle code from response
      setOrderCycleCode(createdCycleCode); // Set the correct cycle code
    } catch (error) {
      console.error("Error creating order cycle:", error);
      toast.error("Failed to create order cycle");
    } finally {
      setLoading(false);
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
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={latestBatchProducts.map((product) => ({
                  id: product.product._id, // unique row ID
                  product_code: product.product.product_code,
                  product_name: product.product.product_name,
                  in_stock_quantity: product.in_stock_quantity,
                  price: parseFloat(
                    product.price.$numberDecimal || product.price
                  ),
                }))}
                columns={[
                  {
                    field: "product_code",
                    headerName: "Product Code",
                    width: 150,
                  },
                  {
                    field: "product_name",
                    headerName: "Product Name",
                    width: 200,
                  },
                  {
                    field: "in_stock_quantity",
                    headerName: "Stock Quantity",
                    width: 150,
                    type: "number",
                  },
                  {
                    field: "price",
                    headerName: "Price",
                    width: 150,
                    renderCell: (params) => {
                      const price = parseFloat(params.value);
                      return isNaN(price)
                        ? "LKR0.00"
                        : `LKR${price.toFixed(2)}`; // Format price as currency
                    },
                  },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateNewOrderCycle;

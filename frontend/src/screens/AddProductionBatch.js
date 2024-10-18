import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function AddProductionBatch() {
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [productionBatchCode, setProductionBatchCode] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [batchProducts, setBatchProducts] = useState([]); // Products to display in the main form grid with qty and price
  const [saveEnabled, setSaveEnabled] = useState(false); // Toggle save button visibility
  const [currentUser, setCurrentUser] = useState(""); // To hold the current user's information

  // Fetch products and locations
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/products"
        );
        const productsWithId = response.data.products.map((product) => ({
          ...product,
          id: product.product_code, // Ensure `id` is set properly for DataGrid
        }));
        setProducts(productsWithId);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/locations"
        );
        const locationsWithId = response.data.locations.map((location) => ({
          ...location,
          id: location.location_code,
        }));
        setLocations(locationsWithId);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token"); // Assuming you store the token in local storage
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/users/production-batch-created-user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the header
            },
          }
        );
        setCurrentUser(response.data.username || ""); // Assume the API returns the username
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchProducts();
    fetchLocations();
    fetchCurrentUser();
  }, []);

  // Generate Batch Code on load
  useEffect(() => {
    const generateBatchCode = async () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      try {
        // Fetch next batch number from the backend
        const response = await axios.get(
          "http://192.168.56.1:5000/api/products/production-batch/latest-batch-number"
        );
        const batchNumber = response.data.nextBatchNumber;

        const code = `PB-${year}-${month}-${batchNumber}`;
        setProductionBatchCode(code);
        setCreatedDate(new Date().toLocaleString());
        setCreatedBy(currentUser); // Replace with the logged-in user
      } catch (error) {
        console.error("Error fetching batch number:", error);
        toast.error("Failed to generate batch number.");
      }
    };

    generateBatchCode();
  }, [currentUser]); // Dependency array now includes currentUser

  const handleAddProducts = async () => {
    if (!description || !selectedLocation) {
      toast.error("All fields are required");
      return;
    }

    // Prepare payload for creating a production batch
    const payload = {
      productionBatchCode,
      description,
      location: selectedLocation,
      selectedProducts: selectedProducts.map((product) => ({
        product_name: product.product_name,
        in_stock_quantity: product.in_stock_quantity || 0, // default to 0 if undefined
        price: product.price || 0, // default to 0 if undefined
      })),
    };

    try {
      // Get the token from localStorage (or sessionStorage)
      const token = localStorage.getItem("token");

      // Ensure token is available
      if (!token) {
        toast.error("No authentication token found, please login again.");
        return;
      }

      // Send data to backend with Authorization header
      const response = await axios.post(
        "http://192.168.56.1:5000/api/products/production-batch/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request headers
          },
        }
      );

      toast.success("Production Batch created successfully!");

      // Store the batch code to use when adding products
      const createdBatchCode = response.data.productionBatchCode; // Get batch code from response
      setProductionBatchCode(createdBatchCode); // Set the correct batch code
      setIsModalOpen(true); // Open modal to add products
    } catch (error) {
      console.error("Error creating batch:", error);
      toast.error("Failed to create Production Batch");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle moving products from one grid to another
  const handleProductSelect = (params) => {
    const selected = params.row;
    setSelectedProductId(selected.id); // Save selected product ID for transfer
  };

  const handleTransferProduct = () => {
    const productToMove = products.find((p) => p.id === selectedProductId);
    if (productToMove) {
      setSelectedProducts((prev) => [...prev, productToMove]);
      setProducts(products.filter((p) => p.id !== selectedProductId));
    }
  };

  const handleReTransferProduct = () => {
    const productToMoveBack = selectedProducts.find(
      (p) => p.id === selectedProductId
    );
    if (productToMoveBack) {
      setProducts((prev) => [...prev, productToMoveBack]);
      setSelectedProducts(
        selectedProducts.filter((p) => p.id !== selectedProductId)
      );
    }
  };

  // Save the selected products with quantity and price to the main grid
  const handleSaveProducts = async () => {
    const selectedProductsData = selectedProducts.map((product) => ({
      id: product.id, // Unique ID for DataGrid
      product_name: product.product_name, // Ensure the required fields exist
      in_stock_quantity: product.in_stock_quantity, // Initially set quantity to 0
      price: product.price, // Initially set price to 0
    }));

    // Prepare payload to add products
    const payload = {
      productionBatchCode,
      selectedProducts: selectedProductsData,
    };

    try {
      // Send products to backend
      await axios.post(
        "http://192.168.56.1:5000/api/products/production-batch/add-products",
        payload
      );
      toast.success("Products added successfully!");

      // Reset products and close the modal
      setSelectedProducts(selectedProductsData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding products:", error);
      toast.error("Failed to add products");
    }
  };

  const handleSaveBatchProducts = async () => {
    try {
      const payload = {
        productionBatchCode: productionBatchCode, // Ensure you're using the correct productionBatchCode
        updatedProducts: selectedProducts.map((product) => ({
          product_code: product.product_code, // Match the product_code inside the product object
          in_stock_quantity: Number(product.in_stock_quantity), // Ensure this matches backend
          price: Number(product.price),
        })),
      };

      console.log("Payload being sent:", payload);

      await axios.put(
        "http://192.168.56.1:5000/api/products/production-batch/update-products",
        payload
      );

      toast.success("Batch products updated successfully!");

      // Optionally re-fetch the updated batch to ensure the data was updated correctly
      // const response = await axios.get(
      //   `http://192.168.56.1:5000/api/products/production-batch/${productionBatchCode}`
      // );
      // setSelectedProducts(response.data.updatedBatch.selectedProducts);

      setSaveEnabled(false); // Disable the save button after saving
    } catch (error) {
      console.error("Error saving batch products:", error);
      toast.error("Failed to save products");
    }
  };

  // Handle editing qty and price in the main grid
  const handleQtyPriceChange = (updatedRow) => {
    const updatedBatchProducts = selectedProducts.map((product) => {
      if (product.id === updatedRow.id) {
        return {
          ...product,
          in_stock_quantity: updatedRow.in_stock_quantity,
          price: updatedRow.price,
        };
      }
      return product;
    });

    console.log("Updated Batch Products:", updatedBatchProducts);

    setSelectedProducts(updatedBatchProducts); // Ensure state is updated correctly
    setSaveEnabled(true); // Enable save button
    return updatedRow;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Add Production Batch
        </h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Production Batch Code
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={productionBatchCode}
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
              placeholder="Enter production batch description"
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
                <option key={location.id} value={location.location_name}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handleAddProducts}
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Products
          </button>
        </div>

        {/* Display Selected Products with qty and price */}
        {selectedProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Selected Products for Production Batch
            </h3>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={selectedProducts}
                columns={[
                  { field: "id", headerName: "ID", width: 100 },
                  {
                    field: "product_name",
                    headerName: "Product Name",
                    width: 200,
                  },
                  {
                    field: "in_stock_quantity",
                    headerName: "Quantity",
                    width: 150,
                    editable: true, // Allow editing qty
                  },
                  {
                    field: "price",
                    headerName: "Price",
                    width: 150,
                    editable: true, // Allow editing price
                  },
                ]}
                pageSize={5}
                processRowUpdate={handleQtyPriceChange} // Handle editing in the grid
              />
            </div>
            {/* Display Save button if changes are made */}
            {saveEnabled && (
              <div className="mt-6 text-right">
                <button
                  onClick={handleSaveBatchProducts}
                  className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
            <h3 className="text-2xl font-semibold mb-4">Manage Products</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Available Products Grid */}
              <div>
                <h4 className="text-xl font-bold mb-2">Available Products</h4>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={products}
                    columns={[
                      { field: "id", headerName: "ID", width: 100 },
                      {
                        field: "product_name",
                        headerName: "Product Name",
                        width: 150,
                      },
                    ]}
                    checkboxSelection
                    onRowClick={handleProductSelect}
                    pageSize={5}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={handleTransferProduct}
                  className="bg-green-600 text-white py-2 px-3 rounded-lg mb-4"
                >
                  Transfer &gt;&gt;
                </button>
                <button
                  onClick={handleReTransferProduct}
                  className="bg-red-600 text-white py-2 px-3 rounded-lg"
                >
                  &lt;&lt; Remove
                </button>
              </div>

              {/* Selected Products Grid */}
              <div>
                <h4 className="text-xl font-bold mb-2">Selected Products</h4>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={selectedProducts}
                    columns={[
                      { field: "id", headerName: "ID", width: 100 },
                      {
                        field: "product_name",
                        headerName: "Product Name",
                        width: 150,
                      },
                    ]}
                    checkboxSelection
                    onRowClick={handleProductSelect}
                    pageSize={5}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={handleSaveProducts}
                className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white py-3 px-6 rounded-lg ml-4 hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductionBatch;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaEye } from "react-icons/fa"; // Import the edit icon
import axios from "axios";
import Grid from "../components/Grid"; // Import the Grid component
import { DataGrid } from "@mui/x-data-grid";

function ProductBatch({ onAddProductBatchClick }) {
  const [productionbatch, setProductionBatch] = useState([]);
  const [selectedProductionBatch, setSelectedProductionBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchField, setSelectedSearchField] = useState("description"); // New state for search field
  const [sort] = useState({ field: "description", direction: "asc" });

  // Fetch production batches and locations
  useEffect(() => {
    const fetchProductionBatch = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/products/production-batch"
        );
        console.log(response.data);

        const productionbatchWithId = response.data.productionBatches.map(
          (productionbatch) => ({
            ...productionbatch,
            id: productionbatch.productionBatchCode,
          })
        );
        setProductionBatch(productionbatchWithId);
      } catch (error) {
        console.error("Error fetching production batches:", error);
      }
    };

    fetchProductionBatch();
  }, []);

  const handleProductionBatchClick = (productionBatch) => {
    console.log("Clicked Production Batch:", productionBatch); // Log the entire production batch

    // Check if selectedProducts is an array
    if (!Array.isArray(productionBatch.selectedProducts)) {
      console.error(
        "Selected Products is not an array:",
        productionBatch.selectedProducts
      );
    }

    const formattedProducts = Array.isArray(productionBatch.selectedProducts)
  ? productionBatch.selectedProducts.map((product) => ({
      id: product.product._id, // Ensure this matches the product ObjectId
      product_name: product.product.product_name, // Access populated product_name
      product_code: product.product.product_code, // Access populated product_code
      quantity: product.in_stock_quantity || 0, // Ensure quantity field exists
      price: product.price || 0, // Ensure price field exists
    }))
  : []; // Fallback to an empty array if products is undefined


    setSelectedProductionBatch({
      ...productionBatch,
      products: formattedProducts, // Format the products properly
      location: productionBatch.location?.location_name || "",
      status: productionBatch.status || "Active",
    });
  };

  const handleClosePopup = () => {
    setSelectedProductionBatch(null);
  };

  // Filter and sort the production batches
  const filteredProductionBatches = productionbatch
    .filter((batch) => {
      switch (selectedSearchField) {
        case "description":
          return (
            batch.description &&
            batch.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        case "createdBy":
          return (
            batch.createdBy &&
            batch.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
          );
        case "productionBatchCode":
          return (
            batch.productionBatchCode &&
            batch.productionBatchCode
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "location":
          return batch.location
            ? batch.location.location_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : false;
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
    { field: "id", headerName: "ID", width: 120 }, // Use id here
    { field: "createdDate", headerName: "Created Date", width: 200 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.location ? params.row.location.location_name : "N/A"}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full h-full">
          <button
            onClick={() => handleProductionBatchClick(params.row)}
            className="bg-yellow-500 text-white p-2  flex items-center justify-center"
            style={{ width: "40px", height: "40px" }} // Set fixed size for the icon button
          >
            <FaEye className="text-white" />
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
          <h1 className="text-2xl font-semibold">Production Batch</h1>
          <button
            onClick={onAddProductBatchClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Production Batch
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex justify-between mb-4 items-center">
            {/* Dropdown for selecting the search field */}
            <div className="mr-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg"
                value={selectedSearchField}
                onChange={(e) => setSelectedSearchField(e.target.value)}
              >
                <option value="description">Description</option>
                <option value="createdBy">Created By</option>
                <option value="location">Location</option>
                <option value="productionBatchCode">Batch Code</option>
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
          <Grid rows={filteredProductionBatches} columns={columns} />
        </div>

        {/* Popup for Production Batch Details */}
        {selectedProductionBatch && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex justify-center items-center rounded-sm hover:bg-red-700"
              >
                &times;
              </button>
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedProductionBatch.productionBatchCode}
                </h2>

                {/* Production Batch Description */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Production Batch Description
                  </label>
                  <input
                    type="text"
                    value={selectedProductionBatch.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* PB Location */}
                <div className="mb-4">
                  <label className="block text-gray-700">PB Location</label>
                  <input
                    type="text"
                    value={selectedProductionBatch.location}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Production Batch Created User */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Production Batch Created User
                  </label>
                  <input
                    type="text"
                    value={selectedProductionBatch.createdBy}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Production Batch Created Date */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Production Batch Created Date
                  </label>
                  <input
                    type="text"
                    value={selectedProductionBatch.createdDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Selected Products Grid */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Production Batch Selected Products
                  </h3>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={selectedProductionBatch?.products || []} // Use the products from selectedProductionBatch
                      columns={[
                        { field: "product_code", headerName: "ID", width: 100 },
                        {
                          field: "product_name",
                          headerName: "Product Name",
                          width: 150,
                        },
                        {
                          field: "quantity",
                          headerName: "Quantity",
                          width: 150,
                        },
                        { field: "price", headerName: "Price", width: 150 },
                      ]}
                      pageSize={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductBatch;

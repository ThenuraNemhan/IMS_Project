import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaEye, FaShareAlt } from "react-icons/fa"; // Import the edit icon
import axios from "axios";
import Grid from "../components/Grid"; // Import the Grid component
import { DataGrid } from "@mui/x-data-grid";

function OrderCycle({ onAddOrderCycleClick }) {
  const [ordercycle, setOrderCycle] = useState([]);
  const [selectedOrderCycle, setSelectedOrderCycle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  //const [customers, setCustomers] = useState([]);
  const [selectedSearchField, setSelectedSearchField] = useState("description"); // New state for search field
  const [sort] = useState({ field: "description", direction: "asc" });

  // Fetch order cycle and locations
  useEffect(() => {
    const fetchOrderCycle = async () => {
      try {
        const response = await axios.get(
          "http://192.168.2.48:5000/api/orders/order-cycle/get-all-order-cycles"
        );
        console.log(response.data);

        const ordercycleWithId = response.data.orderCycles.map(
          (ordercycle) => ({
            ...ordercycle,
            id: ordercycle.orderCycleCode,
          })
        );
        setOrderCycle(ordercycleWithId);
      } catch (error) {
        console.error("Error fetching order cycles:", error);
      }
    };

    // const fetchCustomers = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://192.168.2.48:5000/api/customers"
    //     );
    //     setCustomers(response.data.setCustomers);
    //   } catch (error) {
    //     console.error("Error fetching customers:", error);
    //   }
    // };

    fetchOrderCycle();
    //fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedOrderCycle) {
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable background scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [selectedOrderCycle]);

  const handleOrderCycleClick = (orderCycle) => {
    console.log("Clicked Order Cycle:", orderCycle); // Log the entire order cycle

    // Check if selectedProducts is an array
    if (!Array.isArray(orderCycle.selectedProducts)) {
      console.error(
        "Selected Products is not an array:",
        orderCycle.selectedProducts
      );
    }

    const formattedProducts = Array.isArray(orderCycle.selectedProducts)
      ? orderCycle.selectedProducts.map((product) => ({
          id: product.product._id, // Ensure this matches the product ObjectId
          product_name: product.product.product_name, // Access populated product_name
          product_code: product.product.product_code, // Access populated product_code
          quantity: product.in_stock_quantity || 0, // Ensure quantity field exists
          price: product.price || 0, // Ensure price field exists
        }))
      : []; // Fallback to an empty array if products is undefined

    setSelectedOrderCycle({
      ...orderCycle,
      products: formattedProducts, // Format the products properly
      location: orderCycle.location?.location_name || "",
      status: orderCycle.status || "Active",
    });
  };

  const handleShareClick = (orderCycle) => {
    // console.log("Clicked Order Cycle:", orderCycle); // Log the entire order cycle
    // // Check if selectedProducts is an array
    // if (!Array.isArray(orderCycle.selectedProducts)) {
    //   console.error(
    //     "Selected Products is not an array:",
    //     orderCycle.selectedProducts
    //   );
    // }
    // const formattedProducts = Array.isArray(orderCycle.selectedProducts)
    //   ? orderCycle.selectedProducts.map((product) => ({
    //       id: product.product._id, // Ensure this matches the product ObjectId
    //       product_name: product.product.product_name, // Access populated product_name
    //       product_code: product.product.product_code, // Access populated product_code
    //       quantity: product.in_stock_quantity || 0, // Ensure quantity field exists
    //       price: product.price || 0, // Ensure price field exists
    //     }))
    //   : []; // Fallback to an empty array if products is undefined
    // setSelectedOrderCycle({
    //   ...orderCycle,
    //   products: formattedProducts, // Format the products properly
    //   location: orderCycle.location?.location_name || "",
    //   status: orderCycle.status || "Active",
    // });
  };

  const handleClosePopup = () => {
    setSelectedOrderCycle(null);
  };

  // Filter and sort the order cycles
  const filteredOrderCycles = ordercycle
    .filter((cycle) => {
      switch (selectedSearchField) {
        case "description":
          return (
            cycle.description &&
            cycle.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        case "createdBy":
          return (
            cycle.createdBy &&
            cycle.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
          );
        case "orderCycleCode":
          return (
            cycle.orderCycleCode &&
            cycle.orderCycleCode
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "location":
          return cycle.location
            ? cycle.location.location_name
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
        <div className="flex justify-center items-center gap-2 w-full h-full">
          {" "}
          {/* gap-2 adds space between elements */}
          <button
            onClick={() => handleOrderCycleClick(params.row)}
            className="bg-yellow-500 text-white p-2 flex items-center justify-center"
            style={{ width: "30px", height: "30px" }}
          >
            <FaEye className="text-white" />
          </button>
          <button
            onClick={() => handleShareClick(params.row)}
            className="bg-blue-300 text-white p-2 flex items-center justify-center"
            style={{ width: "30px", height: "30px" }}
          >
            <FaShareAlt className="text-white" />
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
          <h1 className="text-2xl font-semibold">Order Cycle</h1>
          <button
            onClick={onAddOrderCycleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Order Cycle
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
                <option value="orderCycleCode">Cycle Code</option>
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

          {/* Order Cycles Grid */}
          <Grid rows={filteredOrderCycles} columns={columns} />
        </div>

        {/* Popup for Order Cycle Details */}
        {selectedOrderCycle && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
            style={{ overflowY: "auto" }}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 relative max-h-[90vh] overflow-y-auto"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex justify-center items-center rounded-sm hover:bg-red-700"
              >
                &times;
              </button>
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedOrderCycle.orderCycleCode}
                </h2>

                {/* Order Cycle Description */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Order Cycle Description
                  </label>
                  <input
                    type="text"
                    value={selectedOrderCycle.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Order Cycle Location */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Order Cycle Location
                  </label>
                  <input
                    type="text"
                    value={selectedOrderCycle.location}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Order Cycle Created User */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Order Cycle Created User
                  </label>
                  <input
                    type="text"
                    value={selectedOrderCycle.createdBy}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Order Cycle Created Date */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Order Cycle Created Date
                  </label>
                  <input
                    type="text"
                    value={selectedOrderCycle.createdDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>

                {/* Status Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <select
                    value={selectedOrderCycle.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) =>
                      setSelectedOrderCycle({
                        ...selectedOrderCycle,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Selected Orders Grid */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Order Cycle Selected Production Batch Details
                  </h3>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={
                        // Flatten production batches to get products with needed fields
                        selectedOrderCycle?.selectedProductionBatches?.flatMap(
                          (batch) =>
                            batch.products.map((product) => ({
                              id: product.product._id, // Unique identifier for each row
                              product_code: product.product.product_code,
                              product_name: product.product.product_name,
                              quantity: product.latestInStockQuantity || 0,
                              price: product.latestPrice || 0,
                            }))
                        ) || []
                      }
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

export default OrderCycle;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Customers({ onAddCustomerClick }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort] = useState({
    field: "customer_name",
    direction: "asc",
  });
  const [selectedSearchField, setSelectedSearchField] =
    useState("customer_name"); // New state for search field

  useEffect(() => {
    // Fetch customers from the API when the component mounts
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/customers"
        );
        // Map the customers to include an id field
        const customersWithId = response.data.customers.map((customer) => ({
          ...customer,
          id: customer.customer_code, // Assign _id to id
        }));
        setCustomers(customersWithId); // Set customers with id field
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerClick = (customer) => {
    // Ensure that the selected customer contains all necessary fields
    setSelectedCustomer({
      ...customer,
      customer_name: customer.customer_name || "",
      cus_address: customer.cus_address || "",
      cus_mobileno: customer.cus_mobileno || "",
      cus_email: customer.cus_email || "",
      customer_type: customer.customer_type || "",
      status: customer.status || "Active",
    });
  };

  const handleClosePopup = () => {
    setSelectedCustomer(null);
  };

  // Filter and sort the Customers
  const filteredCustomers = customers
    .filter((customer) => {
      switch (selectedSearchField) {
        case "customer_code":
          return (
            customer.customer_code &&
            customer.customer_code
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "customer_name":
          return (
            customer.customer_name &&
            customer.customer_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "cus_email":
          return (
            customer.cus_email &&
            customer.cus_email.toLowerCase().includes(searchTerm.toLowerCase())
          );
        case "customer_type":
          return (
            customer.customer_type &&
            customer.customer_type
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
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
    { field: "customer_code", headerName: "ID", width: 90 }, // Use id here
    { field: "customer_name", headerName: "Customer Name", width: 150 },
    { field: "cus_address", headerName: "Customer Address", width: 200 },
    { field: "cus_mobileno", headerName: "Mobile No", width: 150 },
    { field: "cus_email", headerName: "Email", width: 100 },
    { field: "customer_type", headerName: "Customer Type", width: 150 },
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
        <div className="flex justify-left items-left w-10 h-10">
          <button
            onClick={() => handleCustomerClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(
        `http://192.168.56.1:5000/api/customers/update/${selectedCustomer.customer_code}`,
        {
          ...selectedCustomer,
        }
      );
      toast.success("Customer Updated Succesfully");
      setSelectedCustomer(null);
      // Refresh the customer list
      const response = await axios.get(
        "http://192.168.56.1:5000/api/customers"
      );
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error updating customers:", error);
      toast.error("Error Updating Customer");
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(
        `http://192.168.56.1:5000/api/customers/delete/${selectedCustomer.customer_code}`
      );
      toast.success("Customer Deleted Succesfully");
      setSelectedCustomer(null);
      // Refresh the Customer list
      const response = await axios.get(
        "http://192.168.56.1:5000/api/customers"
      );
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Error Deleting Customer");
    }
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
                <option value="customer_name">Customer Name</option>
                <option value="customer_code">Code</option>
                <option value="cus_email">Email</option>
                <option value="customer_type">Customer Type</option>
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

          {/* customer Grid */}
          <Grid rows={filteredCustomers} columns={columns} />
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
                    {selectedCustomer.customer_name}
                  </h2>
                  {/* customer address */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Customer Address
                    </label>
                    <input
                      type="text"
                      value={selectedCustomer.cus_address}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          cus_address: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* customer mobile No */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Customer MobileNo
                    </label>
                    <input
                      type="number"
                      value={selectedCustomer.cus_mobileno}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          cus_mobileno: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* customer email */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Customer Email Address
                    </label>
                    <input
                      type="text"
                      value={selectedCustomer.cus_email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          cus_email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Customer Type</label>
                    <select
                      value={selectedCustomer.customer_type}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_type: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Customer type</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Dealer">Dealer</option>
                    </select>
                  </div>
                  {/* Status Dropdown */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                      value={selectedCustomer.status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  {/* Buttons */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleDeleteCustomer}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleUpdateCustomer}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
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

export default Customers;

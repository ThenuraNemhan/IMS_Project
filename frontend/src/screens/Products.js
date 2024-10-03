import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaEdit } from "react-icons/fa"; // Import the edit icon
import axios from "axios";
import Grid from "../components/Grid"; // Import the Grid component
import { toast } from "react-toastify";

function Products({ onAddProductClick }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(""); // New state for selected unit
  const [units, setUnits] = useState([]); // State to hold units fetched from API
  const [sort, setSort] = useState({ field: "product_name", direction: "asc" });

  useEffect(() => {
    // Fetch products from the API when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/products"
        );
        // Map the products to include an id field
        const productsWithId = response.data.products.map((product) => ({
          ...product,
          id: product.product_code, // Assign _id to id
        }));
        setProducts(productsWithId); // Set products with id field
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch categories from the API when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/categories"
        );
        setCategories(response.data.categories); // Assuming the response has a `categories` field
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch units from the API when the component mounts
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://192.168.56.1:5000/api/units");
        setUnits(response.data.units); // Assuming the response has a `units` field
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchUnits();
  }, []);

  const handleProductClick = (product) => {
    // Ensure that the selected product contains all necessary fields
    setSelectedProduct({
      ...product,
      product_category: product.product_category?._id || "", // Handle nested category
      unit: product.unit?._id || "", // Handle nested unit
      product_description: product.product_description || "",
      product_countInStock: product.product_countInStock || 0,
      status: product.status || "Active",
    });
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleSortChange = (field) => {
    setSort((prev) => ({
      field,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.product_name &&
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sort.field] < b[sort.field])
        return sort.direction === "asc" ? -1 : 1;
      if (a[sort.field] > b[sort.field])
        return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

  const columns = [
    { field: "id", headerName: "ID", width: 100 }, // Use id here
    { field: "product_name", headerName: "Product Name", width: 150 },
    // {
    //   field: "images",
    //   headerName: "Image",
    //   width: 120,
    //   renderCell: (params) => (
    //     <img
    //       src={params.row.images[0]}
    //       alt={params.row.product_name}
    //       className="w-16 h-16 object-cover rounded-md"
    //     />
    //   ),
    // },
    {
      field: "product_description",
      headerName: "Product Description",
      width: 200,
    },
    {
      field: "product_category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => (
        <span>
          {params.row.product_category
            ? params.row.product_category.category_name
            : "N/A"}
        </span>
      ),
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
      renderCell: (params) => (
        <span>{params.row.unit ? params.row.unit.unit_name : "N/A"}</span>
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
        <div className="flex justify-left items-left w-10 h-10">
          <button
            onClick={() => handleProductClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://192.168.56.1:5000/api/products/update/${selectedProduct.product_code}`,
        {
          ...selectedProduct,
          product_category: selectedCategory,
          unit: selectedUnit,
        }
      );
      toast.success("Product Updated Succesfully");
      setSelectedProduct(null);
      // Refresh the products list
      const response = await axios.get("http://192.168.56.1:5000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error Updating Product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://192.168.56.1:5000/api/products/delete/${selectedProduct.product_code}`
      );
      toast.success("Product Deleted Succesfully");
      setSelectedProduct(null);
      // Refresh the products list
      const response = await axios.get("http://192.168.56.1:5000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error Deleting Product");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Products</h1>
          <button
            onClick={onAddProductClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search product here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 border border-gray-300 rounded-lg w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>

            {/* Product Sorting */}
            <div className="flex space-x-4 items-center">
              <label className="px-1 py-2 block text-gray-700 flex items-center">
                <span className="mr-2">Sort</span>
                <FontAwesomeIcon icon={faFilter} className="text-gray-700" />
              </label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full h-10"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Select </option>
                <option value="product_name">Product Name</option>
                <option value="product_price">Price</option>
                {/* Add more sorting options if needed */}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <Grid rows={filteredProducts} columns={columns} />
        </div>

        {/* Popup for Product Details */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedProduct.product_name}
                </h2>

                {/* Category Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Category</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Product Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.category_name}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Description */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Product Description
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.product_description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        product_description: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Unit Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Unit</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                  >
                    <option value="">Select Product Unit</option>
                    {units.map((unit) => (
                      <option key={unit._id} value={unit.unit_name}>
                        {unit.unit_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <select
                    value={selectedProduct.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
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
                    onClick={handleDeleteProduct}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleUpdateProduct}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
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

export default Products;

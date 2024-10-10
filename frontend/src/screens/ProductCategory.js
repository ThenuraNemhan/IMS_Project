import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Grid from "../components/Grid"; // Import the Grid component
import { FaEdit } from "react-icons/fa";

function ProductCateogry({ onAddProductCategoryClick }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort] = useState({ field: "category_name", direction: "asc" });
  const [selectedSearchField, setSelectedSearchField] =
    useState("category_name"); // New state for search field

  useEffect(() => {
    // Fetch category from the API when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:5000/api/categories"
        );
        // Map the category to include an id field
        const categoryWithId = response.data.categories.map((category) => ({
          ...category,
          id: category.category_code, // Assign _id to id
        }));
        setCategories(categoryWithId); // // Set category with id field
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClosePopup = () => {
    setSelectedCategory(null);
  };

  // const handleSortChange = (field) => {
  //   setSort((prev) => ({
  //     field,
  //     direction: prev.direction === 'asc' ? 'desc' : 'asc'
  //   }));
  // };

  // Filter and sort the production batches
  const filteredCategories = categories
    .filter((category) => {
      switch (selectedSearchField) {
        case "category_code":
          return (
            category.category_code &&
            category.category_code
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "category_name":
          return (
            category.category_name &&
            category.category_name
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
    { field: "category_code", headerName: "ID", width: 100 }, // Use id here
    { field: "category_name", headerName: "Category Name", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-left items-left w-10 h-10">
          <button
            onClick={() => handleCategoryClick(params.row)}
            className="bg-blue-500 text-white px-2 py-1 flex items-center rounded-lg"
          >
            <FaEdit className="text-white mr-2" />
            Edit
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
          <h1 className="text-2xl font-semibold">Categories</h1>
          <button
            onClick={onAddProductCategoryClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Category
          </button>
        </div>

        {/* Unit List */}
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
                <option value="category_name">Category Name</option>
                <option value="category_code">Category Code</option>
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

          <Grid rows={filteredCategories} columns={columns} />
        </div>

        {/* Popup for Units Details */}
        {selectedCategory && (
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
                    {selectedCategory.category_code}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Category Name</label>
                    <input
                      type="text"
                      value={selectedCategory.category_name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
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

export default ProductCateogry;

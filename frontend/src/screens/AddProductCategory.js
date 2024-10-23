import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

function AddProductCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [generatedProductCategoryCode, setGeneratedProductCategoryCode] = useState(null); // State to hold the generated unit code


// Handle form submission
const handleAddCategory = async () => {
  if (!categoryName) {
    toast.error("Catgeory name is required.");
    return;
  }

  try {
    const response = await axios.post(
      "http://192.168.2.48:5000/api/categories/add",
      { category_name: categoryName }, // Send as JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { message, category } = response.data;
    toast.success(message || "Category added successfully!"); // Display success toast
    console.log("Category added successfully!");

    // Set the generated unit code from the response
    setGeneratedProductCategoryCode(category.category_code);
  } catch (error) {
    console.error("Error adding Category:", error);
    toast.error("Error adding Category. Please try again."); // Display error toast
  }
};
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">Add Category</h2>
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter unit name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
          {/* Display the generated organization code if available */}
          {generatedProductCategoryCode && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-green-700 font-bold">
                Generated Product Category Code: {generatedProductCategoryCode}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          Save Category
        </button>
      </div>
    </div>
  );
}

export default AddProductCategory;

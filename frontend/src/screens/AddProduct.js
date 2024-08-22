import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { FaHome, FaBox } from "react-icons/fa";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productDate, setProductDate] = useState("");
  const [tags, setTags] = useState("");
  const [productCode] = useState("#0001254632");
  //const [activeContent, setActiveContent] = useState("addProduct");

  const navigate = useNavigate(); // Initialize the navigate function

  const breadcrumbPaths = [
    { name: "Home", content: "home", icon: <FaHome /> },
    { name: "Product", content: "product", icon: <FaBox /> },
    { name: "Add Product", content: "addProduct", icon: <FaBox /> }
  ];

  const handleBreadcrumbClick = (content) => {
    // setActiveContent(content);
    
    // Navigate to the respective path based on the breadcrumb clicked
    switch (content) {
      case "home":
        navigate("/user-dashboard");
        break;
      case "product":
        navigate("/products");
        break;
      case "addProduct":
        navigate("/add-product");
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb paths={breadcrumbPaths} onClick={handleBreadcrumbClick} />

      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        {/* {activeContent === "home" && (
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-6">Home</h2>
          </div>
        )}

        {activeContent === "product" && (
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-6">Product</h2>
            <p>This is the product screen content.</p>
          </div>
        )}

        {activeContent === "addProduct" && ( */}
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-6">Add Product</h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Do not exceed 25 characters when entering the product name.
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Flooring">Flooring</option>
                    <option value="Masonry">Masonry</option>
                    <option value="Water Proofing">Water Proofing</option>
                  </select>
                </div>

                <div className="mb-4 flex items-center">
                  <div className="flex-grow">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="ml-4">
                    <label className="block text-gray-700 mb-2">&nbsp;</label>
                    <select className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>LKR</option>
                      <option>USD</option>
                      {/* Add more currencies as needed */}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Image</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center">
                      <span className="text-gray-500">Click to browse</span>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center">
                      <span className="text-gray-500">Click to browse</span>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center">
                      <span className="text-gray-500">Click to browse</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    You need to add at least 3 images. Pay attention to the quality
                    of the pictures you add; comply with the background color
                    standards. Pictures must be in certain dimensions. Notice that
                    the product shows all the details.
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Add Tags</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={productDate}
                    onChange={(e) => setProductDate(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Code</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={productCode}
                      readOnly
                    />
                    <button className="ml-4 p-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                      <span className="text-gray-700">Edit</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This is a product code auto generated by the system. It can be
                    changed at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Add Product
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Save Product
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Schedule
              </button>
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}
export default AddProduct;

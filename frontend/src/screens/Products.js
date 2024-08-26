import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
//import { Link } from "react-router-dom";

const mockProductData = {
  id: "PID012",
  name: "Product 1",
  description: "Sample Description",
  category: "Flooring",
  unit: "Bag",
  stock: 50,
  price: "LKR:2500/=",
  status: "Active",
  image: "https://via.placeholder.com/150", // Replace with actual image URL
};

function Products({ onAddProductClick }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
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

        {/* Product List */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search product here"
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
              <select className="px-4 py-2 border border-gray-300 rounded-lg w-1/3 h-10">
                <option>Flooring</option>
                <option>Masonary</option>
                <option>Water Proofing</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg w-1/3 h-10">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <table className="w-full text-center border-collapse">
            {/*----Table Start---- */}
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-sm md:text-base">ID</th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Product Name
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Product Image
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Product Description
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Category
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Unit
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Stock Today
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Price
                </th>
                <th className="py-2 px-4 border-b text-sm md:text-base">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Product */}
              <tr
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleProductClick(mockProductData)}
              >
                <td className="py-2 px-4 text-sm">PID012</td>
                <td className="py-2 px-4 text-sm">Product 1</td>
                <td className="py-2 px-4 text-sm">
                  <img
                    src={mockProductData.image}
                    alt={mockProductData.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 text-sm">Sample Description</td>
                <td className="py-2 px-4 text-sm">Flooring</td>
                <td className="py-2 px-4 text-sm">Bag</td>
                <td className="py-2 px-4 text-sm">50</td>
                <td className="py-2 px-4 text-sm">LKR:2500/=</td>
                <td className="py-2 px-4 text-sm">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-sm">
                    Active
                  </span>
                </td>
              </tr>
              {/* Add more products here */}
              <tr
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleProductClick(mockProductData)}
              >
                <td className="py-2 px-4 text-sm">PID012</td>
                <td className="py-2 px-4 text-sm">Product 1</td>
                <td className="py-2 px-4 text-sm">
                  <img
                    src={mockProductData.image}
                    alt={mockProductData.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 text-sm">Sample Description</td>
                <td className="py-2 px-4 text-sm">Flooring</td>
                <td className="py-2 px-4 text-sm">Bag</td>
                <td className="py-2 px-4 text-sm">50</td>
                <td className="py-2 px-4 text-sm">LKR:2500/=</td>
                <td className="py-2 px-4 text-sm">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-sm">
                    Inactive
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {/*----Table End---- */}
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
              <div className="flex mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-1/2 h-auto rounded-lg"
                />
                <div className="w-1/2 pl-4">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedProduct.name}
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <select
                      value={selectedProduct.category}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Flooring</option>
                      <option>Masonary</option>
                      <option>Water Proofing</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Product Description
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.description}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Unit</label>
                    <select
                      value={selectedProduct.unit}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Kg</option>
                      <option>g</option>
                      <option>Nos</option>
                      <option>Bag</option>
                      <option>Pkt</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Stock Today</label>
                    <input
                      type="number"
                      value={selectedProduct.stock}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                      type="text"
                      value={selectedProduct.price}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                      value={selectedProduct.status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
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

export default Products;

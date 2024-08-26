import React, { useState } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productDate, setProductDate] = useState("");
  const [tags, setTags] = useState("");
  const [productCode] = useState("#0001254632");
  const [quantity, setQuantity] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]); // State to hold selected images
  const [error, setError] = useState(""); // State to hold error messages

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    setError(""); // Clear error if any
  };

  // Handle form submission
  const handleAddProduct = () => {
    if (selectedImages.length < 3) {
      setError("Please upload at least 3 images.");
      return;
    }
    // Proceed with form submission (e.g., API call) if validation passes
    // Add your form submission logic here
    console.log("Product added successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Add Product
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Product Name
                  </label>
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
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Product Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        setQuantity((prevQuantity) =>
                          Math.max(prevQuantity - 1, 0)
                        )
                      }
                      className="bg-gray-500 text-white px-4 py-2 rounded-l-lg focus:outline-none"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-full p-3 border-t border-b border-gray-300 text-center focus:outline-none"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      min="0"
                    />
                    <button
                      onClick={() =>
                        setQuantity((prevQuantity) => prevQuantity + 1)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-r-lg focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Product Images
                  </label>
                  <input
                    type="file"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {selectedImages.length > 0 &&
                      selectedImages.map((image, index) => (
                        <div
                          key={index}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product Preview ${index + 1}`}
                            className="object-cover h-20 w-full rounded"
                          />
                        </div>
                      ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    You need to add at least 3 images. Pay attention to the
                    quality of the pictures you add; comply with the background
                    color standards. Pictures must be in certain dimensions.
                    Notice that the product shows all the details.
                  </p>
                  {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
                  {/* Display error if any */}
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
                  <label className="block text-gray-700 mb-2">
                    Product Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={productDate}
                    onChange={(e) => setProductDate(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Product Code
                  </label>
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
                    This is a product code auto-generated by the system. It can
                    be changed at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleAddProduct}
              >
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
      </div>
    </div>
  );
}

export default AddProduct;

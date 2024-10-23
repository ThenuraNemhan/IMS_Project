import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [productDate, setProductDate] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(""); // New state for selected unit
  const [units, setUnits] = useState([]); // State to hold units fetched from API
  //const [selectedImages, setSelectedImages] = useState([]);
  const [productCode, setProductCode] = useState(""); // State for product code
  const [showProductCode, setShowProductCode] = useState(false); // State to control visibility of product code

  useEffect(() => {
    // Fetch units from the API when the component mounts
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://192.168.2.48:5000/api/units");
        setUnits(response.data.units); // Assuming the response has a `units` field
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    // Fetch categories from the API when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.2.48:5000/api/categories"
        );
        setCategories(response.data.categories); // Assuming the response has a `categories` field
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchUnits();
    fetchCategories();

    // Generate and set product code on component mount
    setProductCode(generateProductCode());
  }, []);

  const generateProductCode = () => {
    return "PROD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // const handleImageChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   setSelectedImages(files);

  //   // Loop through each file and upload to Cloudinary
  //   const imageUrls = [];
  //   for (let file of files) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "IMS_System"); // Replace with your Cloudinary upload preset

  //     try {
  //       const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dxpbkbzur/image/upload", // Replace with your Cloudinary details
  //         formData
  //       );
  //       imageUrls.push(response.data.secure_url); // Store the secure URL from Cloudinary
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       toast.error("Error uploading image. Please try again.");
  //       return;
  //     }
  //   }

  //   // Save the image URLs to state instead of files
  //   setSelectedImages(imageUrls);
  // };

  // const handleImagePreview = () => {
  //   return selectedImages.map((image, index) => {
  //     const isUrl = typeof image === "string"; // Check if it's a URL or File object
  //     const src = isUrl ? image : URL.createObjectURL(image);

  //     return (
  //       <img
  //         key={index}
  //         src={src}
  //         alt={`Preview ${index}`}
  //         className="w-32 h-32 object-cover rounded-lg"
  //       />
  //     );
  //   });
  // };

  const handleAddProduct = async () => {
    // Validate required fields
    if (!productName) {
      toast.error("Product name is required.");
      return;
    }
    if (!selectedCategory || selectedCategory === "") {
      toast.error("Category is required.");
      return;
    }
    if (!description) {
      toast.error("Description is required.");
      return;
    }
    if (!selectedUnit) {
      toast.error("Please select a unit.");
      return;
    }
    if (!productDate) {
      toast.error("Product date is required.");
      return;
    }
    // if (selectedImages.length === 0) {
    //   toast.error("Please select at least one image."); // Display error toast
    //   return;
    // }
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_category", selectedCategory);
    formData.append("product_description", description);
    formData.append("unit", selectedUnit);
    formData.append("productDate", productDate);
    formData.append("productCode", productCode); // Add product code to form data
    // selectedImages.forEach((image) => {
    //   formData.append("images", image);
    // });

    const apiUrl = "http://192.168.2.48:5000/api/products/add";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message, productCode } = response.data;
      toast.success(message || "Product added successfully!");
      setProductCode(productCode); // Set the product code from the response
      setShowProductCode(true); // Show the product code
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Add Product</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            {/* Product Code Display */}
            {showProductCode && (
              <div className="col-span-2 mt-4">
                <p className="text-xl font-semibold">
                  Product Code: {productCode}
                </p>
              </div>
            )}
            {/* Product Name Input */}
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

            {/* Category Select */}
            <div className="mb-4">
              <label className="w-full block text-gray-700 mb-2">
                Category
              </label>
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

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
             {/* Unit Select */}
             <div className="mb-4">
              <label className="w-full block text-gray-700 mb-2">
                Unit
              </label>
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

            {/* Product Date */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={productDate}
                onChange={(e) => setProductDate(e.target.value)}
              />
            </div>
          </div>

          {/* <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload Images</label>
              <input
                type="file"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">Selected Images:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {handleImagePreview()}
                  </div>
                </div>
              )}
            </div>
          </div> */}
        </div>

        {/* {toast.error && <p className="text-red-500">{toast.error}</p>}
        {toast.message && <p className="text-green-500">{toast.message}</p>} */}

        <div className="mt-6 text-right">
          <button
            onClick={handleAddProduct}
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

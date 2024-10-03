import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FaEdit } from "react-icons/fa"; // Import the edit icon
// import axios from "axios";
// import Grid from "../components/Grid"; // Import the Grid component
// import { toast } from "react-toastify";

function ProductBatch({ onAddProductBatchClick }) {


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
      </div>
    </div>
  );
}

export default ProductBatch;

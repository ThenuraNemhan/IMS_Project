import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faFileAlt,
  faCog,
  faChevronDown,
  faCubes,
  faBuilding,
  faBalanceScale,
  faTag,
  faUsers,
  faLocationArrow,
  faUserGroup,
  faRecycle,
  faIndustry,
  faCartFlatbed,
  faCartFlatbedSuitcase,
  faCartArrowDown,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onContentChange }) => {
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isProductionOpen, setProductionOpen] = useState(false);
  const [isOrdersOpen, setOrdersOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("user-dashboard");

  const navigate = useNavigate(); // Use navigate for redirection

  const toggleInventoryDropdown = () => {
    setInventoryOpen(!isInventoryOpen);
  };

  const toggleProductionDropdown = () => {
    setProductionOpen(!isProductionOpen);
  };

  const toggleOrdersDropdown = () => {
    setOrdersOpen(!isOrdersOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    onContentChange(menuItem);
  };

  const handleLogout = () => {
    // Clear local storage and navigate to login page
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0 overflow-y-auto">
      {/* Highlighted IMS Dashboard label */}
      <div className="p-4 text-xl font-bold bg-gray-900 flex items-center">
        IMS Dashboard
        <img src="/IMS.png" alt="logo" className="ml-4 h-10 w-10" />
      </div>

      <nav className="mt-6">
        <button
          onClick={() => handleMenuItemClick("user-dashboard")}
          className={`flex items-center py-2.5 px-4 rounded w-full text-left ${
            activeMenuItem === "user-dashboard"
              ? "bg-gray-700 text-gray-300"
              : "hover:bg-gray-700"
          }`}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          Home
        </button>

        {/* Inventory Item with Dropdown */}
        <div>
          <button
            onClick={toggleInventoryDropdown}
            className={`flex items-center w-full py-2.5 px-4 rounded focus:outline-none ${
              activeMenuItem === "inventory"
                ? "bg-gray-700 text-gray-300"
                : "hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faBox} className="mr-3" />
            Master Data
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`ml-auto transition-transform ${
                isInventoryOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {isInventoryOpen && (
            <div className="pl-8">
              <button
                onClick={() => handleMenuItemClick("products")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "products"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faCubes} className="mr-3" />
                Products
              </button>
              <button
                onClick={() => handleMenuItemClick("units")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "units"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faBalanceScale} className="mr-3" />
                Units
              </button>
              <button
                onClick={() => handleMenuItemClick("organizations")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "organizations"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faBuilding} className="mr-3" />
                Organizations
              </button>
              <button
                onClick={() => handleMenuItemClick("customers")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "customers"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faUserGroup} className="mr-3" />
                Customers
              </button>
              <button
                onClick={() => handleMenuItemClick("product-categories")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "product-categories"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faTag} className="mr-3" />
                Category
              </button>
              <button
                onClick={() => handleMenuItemClick("locations")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "locations"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faLocationArrow} className="mr-3" />
                Location
              </button>
              <button
                onClick={() => handleMenuItemClick("users")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "users"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faUsers} className="mr-3" />
                Users
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={toggleProductionDropdown}
            className={`flex items-center w-full py-2.5 px-4 rounded focus:outline-none ${
              activeMenuItem === "production"
                ? "bg-gray-700 text-gray-300"
                : "hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faIndustry} className="mr-3" />
            Production
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`ml-auto transition-transform ${
                isProductionOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {isProductionOpen && (
            <div className="pl-8">
              <button
                onClick={() => handleMenuItemClick("production-batch")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "production-batch"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faRecycle} className="mr-3" />
                Production Batch
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={toggleOrdersDropdown}
            className={`flex items-center w-full py-2.5 px-4 rounded focus:outline-none ${
              activeMenuItem === "orders"
                ? "bg-gray-700 text-gray-300"
                : "hover:bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} className="mr-3" />
            Orders
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`ml-auto transition-transform ${
                isOrdersOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {isOrdersOpen && (
            <div className="pl-8">
              <button
                onClick={() => handleMenuItemClick("sales-orders")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "sales-orders"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faCartFlatbed} className="mr-3" />
                Sales Orders
              </button>
              <button
                onClick={() => handleMenuItemClick("transfer-orders")}
                className={`flex items-center py-2 px-4 rounded w-full text-left ${
                  activeMenuItem === "transfer-orders"
                    ? "bg-gray-700 text-gray-300"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faCartArrowDown} className="mr-3" />
                Transfer Orders
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => handleMenuItemClick("reports")}
          className={`flex items-center py-2 px-4 rounded w-full text-left ${
            activeMenuItem === "reports"
              ? "bg-gray-700 text-gray-300"
              : "hover:bg-gray-700"
          }`}
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          Reports
        </button>
        <button
          onClick={() => handleMenuItemClick("settings")}
          className={`flex items-center py-2 px-4 rounded w-full text-left ${
            activeMenuItem === "settings"
              ? "bg-gray-700 text-gray-300"
              : "hover:bg-gray-700"
          }`}
        >
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          Settings
        </button>

        {/* Logout Button */}
        <div className="absolute bottom-10 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center py-2 px-4 w-full text-left hover:bg-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faChartLine,
  faFileAlt,
  faCog,
  faChevronDown,
  faCubes,
  faBuilding,
  faBalanceScale,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";


const Sidebar = ({ onContentChange }) => {
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("user-dashboard");

  const toggleInventoryDropdown = () => {
    setInventoryOpen(!isInventoryOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    onContentChange(menuItem);
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
            Inventory
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
                <FontAwesomeIcon icon={faUserTie} className="mr-3" />
                Customers
              </button>
            </div>
          )}
        </div>

        <NavLink
          to="/sales"
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700 text-gray-300"
        >
          <FontAwesomeIcon icon={faChartLine} className="mr-3" />
          Sales
        </NavLink>
        <NavLink
          to="/reports"
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700 text-gray-300"
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700 text-gray-300"
        >
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

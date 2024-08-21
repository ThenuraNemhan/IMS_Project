import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBox, 
  faChartLine, 
  faFileAlt, 
  faCog, 
  faChevronDown, 
  faCubes, 
  faBuilding 
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  const toggleInventoryDropdown = () => {
    setInventoryOpen(!isInventoryOpen);
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0">
      {/* Highlighted IMS Dashboard label */}
      <div className="p-4 text-xl font-bold bg-gray-900">
        IMS Dashboard
      </div>
      <nav className="mt-6">
        <NavLink
          to="/"
          exact
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          Home
        </NavLink>

        {/* Inventory Item with Dropdown */}
        <div>
          <button
            onClick={toggleInventoryDropdown}
            className="flex items-center w-full py-2.5 px-4 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBox} className="mr-3" />
            Inventory
            <FontAwesomeIcon icon={faChevronDown} className={`ml-auto transition-transform ${isInventoryOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isInventoryOpen && (
            <div className="pl-8">
              <NavLink
                to="/inventory/products"
                className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <FontAwesomeIcon icon={faCubes} className="mr-3" />
                Products
              </NavLink>
              <NavLink
                to="/inventory/organizations"
                className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <FontAwesomeIcon icon={faBuilding} className="mr-3" />
                Organizations
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/sales"
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FontAwesomeIcon icon={faChartLine} className="mr-3" />
          Sales
        </NavLink>
        <NavLink
          to="/reports"
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center py-2.5 px-4 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faEnvelope, faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import profileImage from "./face10.jpg";

function Navbar({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Sidebar Toggle Icon */}
        <button 
          onClick={toggleSidebar} 
          className="p-3 mr-5 bg-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <FontAwesomeIcon icon={faBars} className="text-gray-500" />
        </button>
        
        <div>
          <h1 className="text-lg font-semibold">Hello User!</h1>
          <p className="text-sm text-gray-600">Welcome back to Dashboard</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-4 pr-8 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-2 top-2 text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FontAwesomeIcon icon={faBell} className="text-gray-500" />
          </button>

          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
            </button>
            <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-blue-600 rounded-full text-white text-xs leading-tight text-center">4</span>
          </div>

          <div>
            <button className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-600">EN</span>
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

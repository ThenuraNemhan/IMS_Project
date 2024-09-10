import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faEnvelope,
  faChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import profileImage from "./face10.jpg";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const languages = [
  { code: "US", name: "English", flag: "US" },
  { code: "ES", name: "Spanish", flag: "ES" },
  // Add more languages as needed
];

function Navbar({ toggleSidebar}) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("US");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    setShowDropdown(false);
    i18n.changeLanguage(code); // Change the language using i18next
    // Implement language change logic here
  };

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
          <h1 className="text-lg font-semibold">{t('hello_user')}</h1>
          <p className="text-sm text-gray-600">{t('welcome')}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('search_placeholder')}
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
            <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-blue-600 rounded-full text-white text-xs leading-tight text-center">
              4
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-600">
                {languages.find((lang) => lang.code === selectedLanguage)?.name}
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-gray-500 ml-1"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                <ul>
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Flag country={lang.flag} className="w-6 h-4 mr-2" />
                      <span>{lang.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

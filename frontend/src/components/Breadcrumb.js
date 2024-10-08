import React from "react";
import { FaChevronRight } from "react-icons/fa";

function Breadcrumb({ paths, onClick }) {
  return (
    <nav className="flex text-gray-500 text-sm items-center">
      {paths.map((path, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <FaChevronRight className="mx-2" />}
          <span
            className={`flex items-center cursor-pointer ${path.isActive ? "text-blue-600" : "text-gray-500"}`}
            onClick={() => onClick(path.content)}
          >
            {path.icon && <span className="mr-2">{path.icon}</span>}
            {path.name}
          </span>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;

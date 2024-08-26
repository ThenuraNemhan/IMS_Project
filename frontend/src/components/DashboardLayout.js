import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./SIdebar";
import Products from "../screens/Products";
import UserDashboard from "../screens/UserDashboard";
import AddProduct from "../screens/AddProduct";
import Breadcrumb from "./Breadcrumb"; // Import Breadcrumb
import {
  FaHome,
  FaBox,
  FaPlus,
  FaBalanceScale,
  FaBuilding,
  FaUserTie,
} from "react-icons/fa"; // Import icons
import Units from "../screens/Units";
import AddUnit from "../screens/AddUnit";
import Organizations from "../screens/Organizations";
import AddOrganization from "../screens/AddOrganization";
import Customers from "../screens/Customers";
import AddCustomer from "../screens/AddCustomer";

const DashboardLayout = () => {
  const [activeContent, setActiveContent] = useState("user-dashboard"); // Default to 'user-dashboard'
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility

  const [breadcrumbPaths, setBreadcrumbPaths] = useState([
    {
      name: "Home",
      content: "user-dashboard",
      icon: <FaHome />,
      isActive: true,
    },
  ]);

  const handleContentChange = (content) => {
    setActiveContent(content);

    // Update breadcrumb paths dynamically
    setBreadcrumbPaths((prevPaths) => {
      const newPath = {
        name: getContentName(content),
        content,
        icon: getContentIcon(content),
        isActive: true,
      };

      // Check if the content already exists in the breadcrumb
      const existingIndex = prevPaths.findIndex(
        (path) => path.content === content
      );

      if (existingIndex !== -1) {
        // If the user is navigating backward, slice the breadcrumb array to the current path
        return prevPaths.slice(0, existingIndex + 1);
      } else {
        // Add the new path and mark it as active
        return [...prevPaths, newPath];
      }
    });
  };

  const getContentName = (content) => {
    switch (content) {
      case "products":
        return "Product";
      case "add-product":
        return "Add Product";
      case "units":
        return "Unit";
      case "add-unit":
        return "Add Unit";
      case "organizations":
        return "Organization";
      case "add-organization":
        return "Add Organization";
      case "customers":
        return "Customer";
      case "add-customer":
        return "Add Customer";
      default:
        return "Home";
    }
  };

  const getContentIcon = (content) => {
    switch (content) {
      case "products":
        return <FaBox />;
      case "add-product":
        return <FaPlus />;
      case "units":
        return <FaBalanceScale />;
      case "add-unit":
        return <FaPlus />;
      case "organizations":
        return <FaBuilding />;
      case "add-organization":
        return <FaPlus />;
      case "customers":
        return <FaUserTie />
      case "add-customer":
        return <FaPlus />
      default:
        return <FaHome />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "products":
        return (
          <Products
            onAddProductClick={() => handleContentChange("add-product")}
          />
        );
      case "user-dashboard":
        return <UserDashboard />;
      case "add-product":
        return <AddProduct />;
      case "units":
        return (<Units onAddUnitClick={() => handleContentChange("add-unit")} />);
      case "add-unit":
        return <AddUnit />;
      case "organizations":
        return (<Organizations onAddOrganizationClick={() => handleContentChange("add-organization")}/>);
      case "add-organization":
        return <AddOrganization/>;
      case "customers":
        return (<Customers onAddCustomerClick={() => handleContentChange("add-customer")}/>);
      case "add-customer":
        return <AddCustomer/>;
      default:
        return <div>Select a content from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-width duration-300 bg-gray-800 overflow-hidden`}
      >
        <Sidebar onContentChange={handleContentChange} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-6 bg-gray-100">
          {/* Breadcrumb */}
          <Breadcrumb paths={breadcrumbPaths} onClick={handleContentChange} />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

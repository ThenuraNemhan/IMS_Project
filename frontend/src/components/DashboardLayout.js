import React, { useState } from "react";
import Navbar from "./Navbar.js";
import Sidebar from "./SIdebar.js";
import Products from "../screens/Products.js";
import UserDashboard from "../screens/UserDashboard.js";
import AddProduct from "../screens/AddProduct.js";
import Breadcrumb from "./Breadcrumb"; // Import Breadcrumb
import {
  FaHome,
  FaBox,
  FaPlus,
  FaBalanceScale,
  FaBuilding,
  FaUserTie,
  FaTags,
  FaLocationArrow,
  FaUsers,
  FaRecycle,
  FaIndustry,
} from "react-icons/fa"; // Import icons
import Units from "../screens/Units";
import AddUnit from "../screens/AddUnit";
import Organizations from "../screens/Organizations";
import AddOrganization from "../screens/AddOrganization";
import Customers from "../screens/Customers";
import AddCustomer from "../screens/AddCustomer";
import ProductCateogry from "../screens/ProductCategory.js";
import AddProductCategory from "../screens/AddProductCategory.js";
import Location from "../screens/Location.js";
import AddLocation from "../screens/AddLocations.js";
import Users from "../screens/Users.js";
import AddUser from "../screens/AddUser.js";
import ProductBatch from "../screens/ProductBatch.js";
import AddProductionBatch from "../screens/AddProductionBatch.js";

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

  // Define the hierarchy of the menu items
  const menuHierarchy = {
    "products": {
      parent: "master-data",
      name: "Product",
      icon: <FaBox />,
    },
    "units": {
      parent: "master-data",
      name: "Unit",
      icon: <FaBalanceScale />,
    },
    "organizations": {
      parent: "master-data",
      name: "Organization",
      icon: <FaBuilding />,
    },
    "customers": {
      parent: "master-data",
      name: "Customer",
      icon: <FaUserTie />,
    },
    "product-categories": {
      parent: "master-data",
      name: "Product Category",
      icon: <FaTags />,
    },
    "locations": {
      parent: "master-data",
      name: "Location",
      icon: <FaLocationArrow />,
    },
    "users": {
      parent: "master-data",
      name: "User",
      icon: <FaUsers />,
    },
    "master-data": {
      parent: null,
      name: "Master Data",
      icon: <FaTags />,
    },
    "add-product": {
      parent: "products",
      name: "Add Product",
      icon: <FaPlus />,
    },
    "add-unit": {
      parent: "units",
      name: "Add Unit",
      icon: <FaPlus />,
    },
    "add-organization": {
      parent: "organizations",
      name: "Add Organization",
      icon: <FaPlus />,
    },
    "add-customer": {
      parent: "customers",
      name: "Add Customer",
      icon: <FaPlus />,
    },
    "add-product-categories": {
      parent: "product-categories",
      name: "Add Product Category",
      icon: <FaPlus />,
    },
    "add-location": {
      parent: "locations",
      name: "Add Location",
      icon: <FaPlus />,
    },
    "add-user": {
      parent: "users",
      name: "Add User",
      icon: <FaPlus />,
    },
    "production": {
      parent: null,
      name: "Production",
      icon: <FaIndustry />,
    },
    "production-batch": {
      parent: "production",
      name: "Production Batch",
      icon: <FaRecycle />,
    },
    "add-production-batch": {
      parent: "production-batch",
      name: "Add Production Batch",
      icon: <FaPlus />,
    },

  };

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

      const hierarchy = menuHierarchy[content];

      // If the content has a parent (e.g., "Master Data"), include it in the breadcrumb
      if (hierarchy && hierarchy.parent) {
        const parentPath = {
          name: getContentName(hierarchy.parent),
          content: hierarchy.parent,
          icon: getContentIcon(hierarchy.parent),
          isActive: false,
        };

        // Add parent and child to the breadcrumb
        return [...prevPaths.slice(0, 1), parentPath, newPath];
      } else {
        // Add only the new path
        return [...prevPaths.slice(0, 1), newPath];
      }
    });
  };

  const getContentName = (content) => {
    return menuHierarchy[content]?.name || "Home";
  };

  const getContentIcon = (content) => {
    return menuHierarchy[content]?.icon || <FaHome />;
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
        return <Units onAddUnitClick={() => handleContentChange("add-unit")} />;
      case "add-unit":
        return <AddUnit />;
      case "organizations":
        return (
          <Organizations
            onAddOrganizationClick={() =>
              handleContentChange("add-organization")
            }
          />
        );
      case "add-organization":
        return <AddOrganization />;
      case "customers":
        return (
          <Customers
            onAddCustomerClick={() => handleContentChange("add-customer")}
          />
        );
      case "add-customer":
        return <AddCustomer />;
      case "product-categories":
        return (
          <ProductCateogry
            onAddProductCategoryClick={() =>
              handleContentChange("add-product-categories")
            }
          />
        );
      case "add-product-categories":
        return <AddProductCategory />;
      case "locations":
        return (
          <Location
            onAddLocationClick={() => handleContentChange("add-location")}
          />
        );
      case "add-location":
        return <AddLocation />;
      case "users":
        return <Users onAddUserClick={() => handleContentChange("add-user")} />;
      case "add-user":
        return <AddUser />;
      case "production-batch":
        return <ProductBatch onAddProductBatchClick={() => handleContentChange("add-production-batch")}/>
        case "add-production-batch":
        return <AddProductionBatch />;
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
        } transition-all duration-300 bg-gray-800 overflow-hidden fixed top-0 left-0 bottom-0`}
      >
        <Sidebar onContentChange={handleContentChange} />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-margin duration-300`}
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "0", // 16rem = 64px (Sidebar width)
          width: isSidebarOpen ? "calc(100% - 16rem)" : "100%",
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-6 bg-gray-100 overflow-hidden">
          <Breadcrumb paths={breadcrumbPaths} onClick={handleContentChange} />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

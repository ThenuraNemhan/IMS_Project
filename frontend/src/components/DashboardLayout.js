import React, { useEffect, useMemo, useState } from "react";
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
  FaFirstOrder,
  FaShopify,
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
import { useNavigate } from "react-router-dom";
import OrderCycle from "../screens/OrderCycle.js";
import CreateNewOrderCycle from "../screens/CreateNewOrderCycle.js";
import { useCallback } from "react";

const DashboardLayout = ({ setIsAuthenticated }) => {
  const [activeContent, setActiveContent] = useState("user-dashboard"); // Default to 'user-dashboard'
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility
  const navigate = useNavigate();

  // Fetch the username from local storage
  const username = localStorage.getItem("username");

  // UseEffect to check if user is logged in and is Global Admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    // Simplified token validity check
    const isTokenValid = (token) => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return Date.now() < payload.exp * 1000;
      } catch {
        return false;
      }
    };

    if (!token || role !== "Main Admin" || !isTokenValid(token)) {
      navigate("/login");
    }
  }, [navigate]); // Keep only `navigate` in the dependency array

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false); // Update the authentication state
    navigate("/login"); // Redirect to login page
  };

  const [breadcrumbPaths, setBreadcrumbPaths] = useState([
    {
      name: "Home",
      content: "user-dashboard",
      icon: <FaHome />,
      isActive: true,
    },
  ]);

  // Define the hierarchy of the menu items
  const menuHierarchy = useMemo(
    () => ({
      products: {
        parent: "master-data",
        name: "Product",
        icon: <FaBox />,
      },
      units: {
        parent: "master-data",
        name: "Unit",
        icon: <FaBalanceScale />,
      },
      organizations: {
        parent: "master-data",
        name: "Organization",
        icon: <FaBuilding />,
      },
      customers: {
        parent: "master-data",
        name: "Customer",
        icon: <FaUserTie />,
      },
      "product-categories": {
        parent: "master-data",
        name: "Product Category",
        icon: <FaTags />,
      },
      locations: {
        parent: "master-data",
        name: "Location",
        icon: <FaLocationArrow />,
      },
      users: {
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
      production: {
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
      orders: {
        parent: null,
        name: "Orders",
        icon: <FaShopify />,
      },
      "order-cycle": {
        parent: "orders",
        name: "Order Cycle",
        icon: <FaFirstOrder />,
      },
      "add-order-cycle": {
        parent: "order-cycle",
        name: "Add Order Cycle",
        icon: <FaPlus />,
      },
    }),
    []
  );

  const getContentName = useCallback(
    (content) => {
      return menuHierarchy[content]?.name || "Home";
    },
    [menuHierarchy]
  );

  const getContentIcon = useCallback(
    (content) => {
      return menuHierarchy[content]?.icon || <FaHome />;
    },
    [menuHierarchy]
  );

  const handleContentChange = useCallback(
    (content) => {
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
    },
    [getContentName, getContentIcon, menuHierarchy]
  );

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = useCallback(() => {
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
        return (
          <ProductBatch
            onAddProductBatchClick={() =>
              handleContentChange("add-production-batch")
            }
          />
        );
      case "add-production-batch":
        return <AddProductionBatch />;
      case "order-cycle":
        return (
          <OrderCycle
            onAddOrderCycleClick={() => handleContentChange("add-order-cycle")}
          />
        );
      case "add-order-cycle":
        return <CreateNewOrderCycle />;
      default:
        return <div>Select a content from the sidebar</div>;
    }
  }, [activeContent, handleContentChange]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-gray-800 overflow-hidden fixed top-0 left-0 bottom-0`}
      >
        <Sidebar
          onContentChange={handleContentChange}
          onLogout={{ handleLogout }}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-margin duration-300`}
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "0", // 16rem = 64px (Sidebar width)
          width: isSidebarOpen ? "calc(100% - 16rem)" : "100%",
        }}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          username={username}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Breadcrumb paths={breadcrumbPaths} onClick={handleContentChange} />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

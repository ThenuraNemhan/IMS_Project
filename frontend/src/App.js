import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./screens/UserDashboard";
import DashboardLayout from "./components/DashboardLayout";
import AddProduct from "./screens/AddProduct";
import Products from "./screens/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
      </Route>
      <Route path="/add-product" element={<DashboardLayout />}>
        <Route index element={<AddProduct />} />
      </Route>
      <Route path="/products" element={<DashboardLayout />}>
        <Route index element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;

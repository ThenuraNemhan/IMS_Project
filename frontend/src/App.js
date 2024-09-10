import React from "react";
import DashboardLayout from "./components/DashboardLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './index.css';
import './i18n'; // Import the i18n configuration

function App() {
  return (
    <>
      <DashboardLayout />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

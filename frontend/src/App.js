import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './screens/UserDashboard';
import DashboardLayout from './components/DashboardLayout'; // Import the layout component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-dashboard" element={
        <DashboardLayout>
          <UserDashboard />
        </DashboardLayout>
      } />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;

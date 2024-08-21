import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './SIdebar';
import Products from '../screens/Products';

const DashboardLayout = () => {
  const [activeContent, setActiveContent] = useState(''); // State to manage active content
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'products':
        return <Products />;
      // Add other cases for different content
      default:
        return <div>Select a content from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } transition-width duration-300 bg-gray-800 overflow-hidden`}
      >
        <Sidebar onContentChange={handleContentChange} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-6 bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

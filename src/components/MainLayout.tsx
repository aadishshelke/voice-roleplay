import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebarCollapsed');
      setIsCollapsed(saved ? JSON.parse(saved) : false);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main 
        className={`transition-all duration-300 p-6 ${
          isCollapsed ? 'ml-[70px]' : 'ml-[250px]'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 
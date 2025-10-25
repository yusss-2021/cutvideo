"use client";

import React, { useState } from "react";
import NavbarSidebar from "../../components/navbarSidebar";
import TopNavbar from "../../components/navbarTop";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = "Jason Ranti";
  const userAvatar = "https://csspicker.dev/api/image/?q=professional+man+portrait&image_type=photo";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <NavbarSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar userName={userName} userAvatar={userAvatar} onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dynamic page content */}
        <main className="flex-1 overflow-y-auto p-2 bg-gray-50">{children || <p className="text-gray-500">Isi konten yang akan berganti</p>}</main>
      </div>
    </div>
  );
};

export default Layout;

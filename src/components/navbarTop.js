"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, Moon, Bell, ChevronDown, ChevronRight } from "lucide-react";

const TopNavbar = ({ userName = "User", userAvatar = "/default-avatar.png", onMenuToggle }) => {
  const pathname = usePathname();
  const [avatarSrc, setAvatarSrc] = useState(userAvatar || "/default-avatar.png");

  // Ambil nama halaman dari path, contoh: "/upload" → "Upload"
  const getPageTitle = (path) => {
    if (!path || path === "/") return "Dashboard";
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="w-full bg-white mb-4 shadow-sm sticky top-0 z-30">
      {/* Header atas */}
      <header className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Kiri: tombol menu + search */}
          <div className="flex items-center gap-3 flex-1">
            {/* Tombol menu → hanya muncul di mobile */}
            <button onClick={onMenuToggle} className="p-2 hover:bg-gray-100 rounded-lg transition-colors block md:hidden">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Search box */}
            <div className="relative flex-1 max-w-xs sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-300" />
            </div>
          </div>

          {/* Kanan: mode, notifikasi, dan avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark mode */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <Moon className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifikasi */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* Avatar user */}
            <button className="flex items-center gap-1 sm:gap-2 hover:bg-gray-50 rounded-lg transition-colors pl-1 pr-2 sm:pr-3 py-1">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gray-200">
                <Image src={avatarSrc} alt={userName} fill sizes="36px" className="object-cover" onError={() => setAvatarSrc("/default-avatar.png")} />
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-800">{userName}</span>
              <ChevronDown className="hidden sm:inline w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Judul halaman + breadcrumb */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{pageTitle}</h1>

          {/* Breadcrumb hanya tampil di desktop */}
          <nav className="hidden sm:flex items-center gap-2 text-sm">
            <a href="/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{pageTitle}</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;

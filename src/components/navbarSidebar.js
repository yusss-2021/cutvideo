"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Upload, FileText, LogOut } from "lucide-react";

const NavbarSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay hitam di belakang sidebar saat mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose}></div>}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">AutoCutVideo</span>
        </div>

        {/* Menu utama */}
        <div className="px-4 mb-6">
          <div className="text-xs text-gray-400 mb-3 px-2">OVERVIEW</div>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <BookOpen className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/upload" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Upload className="w-5 h-5" />
              <span>Upload File</span>
            </Link>
            <Link href="/dashboard/files" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>Semua File</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-auto px-4 pb-6">
          <div className="text-xs text-gray-400 mb-3 px-2">SETTINGS</div>
          <button
            onClick={async () => {
              try {
                const res = await fetch("http://localhost:4000/api/users/logout", {
                  method: "POST",
                  credentials: "include", // penting biar cookie ikut dikirim
                });

                const data = await res.json();
                console.log("✅ Logout response:", data);

                if (res.ok) {
                  // Logout berhasil → redirect ke /login
                  window.location.href = "/login";
                } else {
                  alert(data?.error?.message || "Gagal logout!");
                }
              } catch (err) {
                console.error("❌ Error logout:", err);
                alert("Terjadi kesalahan saat logout");
              }
            }}
            className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarSidebar;

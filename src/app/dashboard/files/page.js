"use client";

import React from "react";
import { Folder, File, MoreHorizontal, Share2, Users, Lock } from "lucide-react";

export default function FilePage() {
  // 🔹 Quick Access data
  const defaultQuickAccess = [
    { name: "Project Docs", icon: "blue", size: "120 MB", items: "12 Files" },
    { name: "Design Assets", icon: "orange", size: "80 MB", items: "8 Files" },
    { name: "Video Clips", icon: "blue", size: "2.3 GB", items: "24 Files" },
    { name: "Archive", icon: "orange", size: "560 MB", items: "5 Files" },
  ];

  // 🔹 File list data
  const defaultFiles = [
    { name: "Source", type: "folder", sharing: "shared", size: "-", modified: "Oct 18, 2025" },
    { name: "Example", type: "folder", sharing: "team", size: "-", modified: "Oct 17, 2025" },
    { name: "Project-Brief.pdf", type: "file", sharing: "private", size: "4.1 MB", modified: "Oct 12, 2025" },
    { name: "UI-Design.fig", type: "file", sharing: "shared", size: "12.8 MB", modified: "Oct 10, 2025" },
    { name: "Clip-Intro.mp4", type: "file", sharing: "team", size: "432 MB", modified: "Oct 5, 2025" },
  ];

  // 🔹 Render file icon
  const getFileIcon = (item) => {
    if (item.type === "folder") {
      return (
        <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-100">
          <Folder className="w-4 h-4 text-blue-600" />
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-100">
          <File className="w-4 h-4 text-gray-600" />
        </div>
      );
    }
  };

  // 🔹 Render sharing icon
  const renderSharing = (type) => {
    switch (type) {
      case "shared":
        return (
          <div className="flex items-center gap-1.5 text-blue-600">
            <Share2 className="w-4 h-4" /> <span className="text-xs font-medium">Shared</span>
          </div>
        );
      case "team":
        return (
          <div className="flex items-center gap-1.5 text-orange-600">
            <Users className="w-4 h-4" /> <span className="text-xs font-medium">Team</span>
          </div>
        );
      case "private":
        return (
          <div className="flex items-center gap-1.5 text-gray-500">
            <Lock className="w-4 h-4" /> <span className="text-xs font-medium">Private</span>
          </div>
        );
      default:
        return <span className="text-xs text-gray-500">-</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* 🔸 Quick Access Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Access</h2>
          <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {defaultQuickAccess.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded ${item.icon === "blue" ? "bg-blue-600" : "bg-orange-500"} flex items-center justify-center`}>
                  {item.icon === "blue" ? <Folder className="w-6 h-6 text-white" /> : <File className="w-6 h-6 text-white" />}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
              <p className="text-xs text-gray-500">
                {item.size} • {item.items}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔸 File List Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 cursor-pointer hover:text-gray-900">Home</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600 cursor-pointer hover:text-gray-900">Concept Font</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">Maszeh</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-xs font-medium text-gray-500">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Sharing</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Modified</div>
        </div>

        {/* File List */}
        <div>
          {defaultFiles.map((item, idx) => (
            <div key={idx} className={`grid grid-cols-12 gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer items-center ${item.name === "Source" || item.name === "Example" ? "bg-blue-50" : ""}`}>
              <div className="col-span-5 flex items-center space-x-3">
                {getFileIcon(item)}
                <span className="text-sm text-gray-900">{item.name}</span>
              </div>
              <div className="col-span-3">{renderSharing(item.sharing)}</div>
              <div className="col-span-2">
                <span className="text-sm text-gray-600">{item.size}</span>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.modified}</span>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

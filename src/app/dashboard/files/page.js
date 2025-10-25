"use client";

import React, { useEffect, useState } from "react";
import { Folder, File, MoreHorizontal, Share2, Users, Lock, X, Eye, Download } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { apiGetUserFolders, apiGetFolderContents } from "@/utils/api";

export default function FilePage() {
  const [folders, setFolders] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  const [loadingFolder, setLoadingFolder] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 👈 menu aktif (dropdown)

  const apiBase = "http://localhost:4000";

  // ✅ Ambil daftar folder user
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiGetUserFolders();
        if (res.status === "success") {
          setUsername(res.data?.data?.username || "");
          setFolders(res.data?.data?.folders || []);
        } else {
          console.warn("⚠️ Gagal ambil data folder:", res.message);
        }
      } catch (err) {
        console.error("❌ Error saat ambil data folder:", err);
      }
    }
    fetchData();
  }, []);

  // ✅ Ambil isi folder
  const handleFolderClick = async (folderName) => {
    if (selectedFolder === folderName) {
      setSelectedFolder(null);
      setFolderFiles([]);
      return;
    }

    setSelectedFolder(folderName);
    setFolderFiles([]);
    setLoadingFolder(true);

    try {
      const res = await apiGetFolderContents(folderName);
      if (res.status === "success") {
        setFolderFiles(res.data?.data?.files || []);
      } else {
        console.warn("⚠️ Gagal ambil isi folder:", res.message);
      }
    } catch (err) {
      console.error("❌ Error ambil isi folder:", err);
    } finally {
      setLoadingFolder(false);
    }
  };

  // ✅ Klik file → buka preview modal
  const handlePreview = (file) => {
    setSelectedFile(file);
    setIsPreviewOpen(true);
    setActiveMenu(null);
  };

  // ✅ Klik download file
  const handleDownload = (file) => {
    const url = `${apiBase}/api/video/download/${encodeURIComponent(username)}/${encodeURIComponent(selectedFolder)}/${encodeURIComponent(file)}`;
    window.open(url, "_blank");
    setActiveMenu(null);
  };

  // ✅ Ikon file/folder
  const getFileIcon = (type) =>
    type === "folder" ? (
      <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-100">
        <Folder className="w-4 h-4 text-blue-600" />
      </div>
    ) : (
      <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-100">
        <File className="w-4 h-4 text-gray-600" />
      </div>
    );

  // ✅ Status sharing
  const renderSharing = (type = "private") => {
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
      default:
        return (
          <div className="flex items-center gap-1.5 text-gray-500">
            <Lock className="w-4 h-4" /> <span className="text-xs font-medium">Private</span>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 cursor-pointer hover:text-gray-900">Home</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">Files</span>
          </div>
          {username && <span className="text-xs text-gray-500">Owner: {username}</span>}
        </div>

        {/* Header tabel */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-xs font-medium text-gray-500">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Sharing</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Actions</div>
        </div>

        {/* Folder list */}
        <div>
          {folders.length > 0 ? (
            folders.map((folder, idx) => (
              <div key={idx}>
                <div onClick={() => handleFolderClick(folder)} className={`grid grid-cols-12 gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer items-center ${selectedFolder === folder ? "bg-blue-50" : ""}`}>
                  <div className="col-span-12 sm:col-span-5 flex items-center space-x-3">
                    {getFileIcon("folder")}
                    <span className="text-sm text-gray-900 font-medium">{folder}</span>
                  </div>
                  <div className="hidden sm:col-span-3 sm:block">{renderSharing("private")}</div>
                  <div className="hidden sm:col-span-2 sm:block">
                    <span className="text-sm text-gray-600">-</span>
                  </div>
                  <div className="hidden sm:col-span-2 sm:flex items-center justify-between relative">
                    <span className="text-sm text-gray-600">—</span>
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Isi folder */}
                {selectedFolder === folder && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {loadingFolder ? (
                      <div className="pl-12 py-3 text-xs text-gray-500">Loading...</div>
                    ) : folderFiles.length > 0 ? (
                      folderFiles.map((file, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 pl-12 pr-6 py-2 items-center border-b border-gray-100 hover:bg-gray-100">
                          <div className="col-span-10 flex items-center text-sm text-gray-700">
                            <File className="w-4 h-4 text-gray-500 mr-2" />
                            {file}
                          </div>
                          <div className="col-span-2 flex justify-end relative">
                            <button onClick={() => setActiveMenu(activeMenu === `${folder}-${file}` ? null : `${folder}-${file}`)} className="p-1 rounded hover:bg-gray-200">
                              <MoreHorizontal className="w-4 h-4 text-gray-600" />
                            </button>

                            {/* Dropdown menu */}
                            {activeMenu === `${folder}-${file}` && (
                              <div className="absolute right-0 top-6 bg-white shadow-lg rounded-md border border-gray-200 z-50 w-32">
                                <button onClick={() => handlePreview(file)} className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <Eye className="w-4 h-4 mr-2" /> Preview
                                </button>
                                <button onClick={() => handleDownload(file)} className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <Download className="w-4 h-4 mr-2" /> Download
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="pl-12 py-3 text-xs text-gray-500">Folder kosong</div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-sm text-gray-500">Belum ada folder. Upload video untuk membuat folder baru.</div>
          )}
        </div>
      </div>

      {/* 🔹 Modal Preview Video */}
      <Dialog open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
          <DialogPanel className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-4 sm:p-6 relative">
            <button onClick={() => setIsPreviewOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">
              <X className="w-5 h-5" />
            </button>

            <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-center">🎬 Preview: {selectedFile}</DialogTitle>

            {selectedFile ? (
              <div className="w-full flex justify-center">
                <video
                  key={selectedFile}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-lg bg-black"
                  src={`${apiBase}/api/video/preview/${encodeURIComponent(username)}/${encodeURIComponent(selectedFolder)}/${encodeURIComponent(selectedFile)}`}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">File tidak ditemukan.</p>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

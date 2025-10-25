"use client";

import React, { useState } from "react";
import { Upload, Minus, Plus } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { apiUploadVideo, apiDashboard } from "@/utils/api";

const UploadPage = () => {
  const [duration, setDuration] = useState(1);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", message: "", success: false });

  const handleDecrement = () => {
    if (duration > 1) setDuration(duration - 1);
  };

  const handleIncrement = () => {
    if (duration < 100) setDuration(duration + 1);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const validTypes = ["video/mp4", "video/x-matroska"];
    if (!validTypes.includes(selected.type)) {
      showModal("Format Tidak Didukung", "❌ Hanya file MP4 atau MKV yang diperbolehkan!", false);
      return;
    }

    setFile(selected);
  };

  // Fungsi helper untuk tampilkan modal
  const showModal = (title, message, success = true) => {
    setModalInfo({ title, message, success });
    setIsModalOpen(true);
  };

  const handlePublish = async () => {
    if (!file) {
      showModal("Gagal", "Silakan pilih video terlebih dahulu!", false);
      return;
    }

    if (isNaN(duration) || duration < 1 || duration > 100) {
      showModal("Durasi Tidak Valid", "Durasi harus berupa angka antara 1 - 100 menit!", false);
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("duration", duration);

      const response = await apiUploadVideo(formData);

      if (response.status === "error") {
        showModal("Upload Gagal", response.message || "Terjadi kesalahan saat upload.", false);
        return;
      }

      showModal("Berhasil!", "✅ Video berhasil dikirim dan sedang diproses di server!", true);
    } catch (err) {
      showModal("Kesalahan", `Upload gagal: ${err.message}`, false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm relative">
      {/* Upload Area */}
      <div className="mb-8 relative">
        <h3 className="text-base font-medium text-gray-900 mb-4">File Video</h3>

        <label className="relative border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-gray-400 transition-colors cursor-pointer block">
          <input type="file" accept=".mp4,.mkv" onChange={handleFileChange} onClick={(e) => (e.target.value = null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-gray-700 mb-1">
              <span className="font-medium text-gray-900">{file ? file.name : "Klik untuk upload"}</span>
              {!file && <span className="text-gray-500"> atau drag and drop</span>}
            </p>
            <p className="text-gray-500 text-sm">MP4, MKV files supported</p>
          </div>
        </label>
      </div>

      {/* Input Durasi */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durasi video per part <span className="text-gray-400 text-xs">(dalam menit)</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button type="button" onClick={handleDecrement} className="px-4 py-3 hover:bg-gray-50 transition-colors border-r border-gray-300">
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <input type="number" value={duration} min="1" max="100" onChange={(e) => setDuration(parseInt(e.target.value) || 1)} className="flex-1 px-4 py-3 text-center border-none outline-none text-gray-700" />
            <button type="button" onClick={handleIncrement} className="px-4 py-3 hover:bg-gray-50 transition-colors border-l border-gray-300">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Upload */}
      <div className="flex justify-end gap-3">
        <button onClick={handlePublish} disabled={isUploading} className={`px-6 py-2.5 rounded-lg font-medium text-white transition-colors ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
          {isUploading ? "Mengupload dan memproses..." : "Kirim"}
        </button>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <DialogTitle className={`text-lg font-semibold mb-3 ${modalInfo.success ? "text-green-600" : "text-red-600"}`}>{modalInfo.title}</DialogTitle>
            <p className="text-gray-700 mb-4">{modalInfo.message}</p>
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Tutup
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default UploadPage;

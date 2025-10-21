"use client";

import React, { useState } from "react";
import { Upload, Minus, Plus } from "lucide-react";

const UploadPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handlePublish = () => {
    alert(`Video akan dipotong setiap ${quantity} menit ✅`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Upload Area */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">File Video</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-gray-400 transition-colors cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-gray-700 mb-1">
              <span className="font-medium text-gray-900">Click to upload</span>
              <span className="text-gray-500"> or drag and drop</span>
            </p>
            <p className="text-gray-500 text-sm">MP4, MKV files supported</p>
          </div>
        </div>
      </div>

      {/* Input Durasi */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durasi video per part <span className="text-gray-400 text-xs">(dalam menit)</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={handleDecrement} className="px-4 py-3 hover:bg-gray-50 transition-colors border-r border-gray-300">
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} className="flex-1 px-4 py-3 text-center border-none outline-none text-gray-700" />
            <button onClick={handleIncrement} className="px-4 py-3 hover:bg-gray-50 transition-colors border-l border-gray-300">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Publish */}
      <div className="flex justify-end gap-3">
        <button onClick={handlePublish} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Kirim
        </button>
      </div>
    </div>
  );
};

export default UploadPage;

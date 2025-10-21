"use client";

import React from "react";
import PricingCard from "@/components/PricingCard";
import { Building2, Zap, Rocket } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16 px-4 container mx-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Pilih Paketmu <br />
            dan Mulai <span className="text-gray-400">Potong Video Lebih Cepat</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">Gunakan tools canggih untuk memotong video panjang menjadi bagian kecil. Dapatkan limit lebih besar dan fitur premium sesuai kebutuhanmu.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <PricingCard
            icon={<Building2 size={32} className="text-gray-400" />}
            title="Free Plan (Level 0)"
            description="Cocok untuk pengguna baru yang ingin mencoba memotong video dengan limit terbatas."
            price={0}
            period="bulan"
            features={["Upload maksimal 100MB per video", "Total penyimpanan 150MB/bulan", "Auto hapus hasil potongan dalam 24 jam"]}
            unavailable={["File disimpan permanen", "Batch upload (5 video sekaligus)", "Download kapan saja"]}
          />

          <PricingCard
            icon={<Zap size={32} className="text-green-400" />}
            title="VIP 1"
            description="Untuk kreator aktif yang sering upload video dan ingin penyimpanan permanen."
            price={20000}
            period="bulan"
            features={["Upload maksimal 1GB per video", "Total penyimpanan 1GB/bulan", "File disimpan selamanya selama akun aktif", "Bisa download file kapan saja"]}
            unavailable={["Batch upload (5 video sekaligus)"]}
            isPopular={true}
          />

          <PricingCard
            icon={<Rocket size={32} className="text-blue-400" />}
            title="VIP 2 (Coming Soon)"
            description="Untuk agensi atau profesional yang butuh kapasitas besar dan batch upload."
            price={50000}
            period="bulan"
            features={["Upload maksimal 5GB per video", "Total penyimpanan 5GB/bulan", "File disimpan selamanya selama akun aktif", "Bisa download file kapan saja", "Batch upload (5 video sekaligus)"]}
          />
        </div>
      </div>
    </div>
  );
}

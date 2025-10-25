"use client";

import React, { useState, useEffect } from "react";
import { apiDashboard } from "../../utils/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ========================
// 💡 Small Reusable Card
// ========================
function PortfolioCard({ title, description, amount, change, changeLabel, bgColor, isPositive }) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 flex flex-col justify-between h-full`}>
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-600 mb-4">{description}</p>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-2">{amount}</div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${isPositive ? "text-blue-600" : "text-red-600"}`}>
            {isPositive ? "▲" : "▼"} {change}
          </span>
          <span className="text-xs text-gray-600">{changeLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ========================
// 📊 Upload Chart
// ========================
function UploadChart({ data }) {
  if (!data?.length) return null;
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Upload Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ========================
// 🧩 Main Dashboard
// ========================
export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    async function getDashboard() {
      try {
        const res = await apiDashboard();

        console.log("📦 Hasil API Dashboard:", res?.data);

        const data = res?.data?.data;
        if (!data?.user) throw new Error("Data user tidak ditemukan");

        setDashboardData(data);
      } catch (err) {
        console.error("❌ Gagal fetch dashboard:", err);

        // 🔍 Kalau response 401 → token invalid / tidak ada
        if (err.response?.status === 401) {
          console.warn("⚠️ Token invalid atau tidak ditemukan, logout...");
          window.location.href = "/login";
          return;
        }

        // 🔍 Atau kalau ada pesan Token dari backend
        if (err.message?.includes("Token")) {
          window.location.href = "/login";
          return;
        }

        setError(err.message || "Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    }

    getDashboard();
    interval = setInterval(getDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-gray-500 p-6">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!dashboardData) return <p className="text-gray-500 p-6">Tidak ada data dashboard</p>;

  const user = dashboardData.user || {};
  const stats = dashboardData.stats || {};
  const recentFiles = dashboardData.recent_files || [];

  // ⚙️ Gunakan raw bytes langsung dari backend kalau tersedia
  const usedBytes = Number(user.storage_used_raw) || 0;
  const limitBytes = Number(user.plan_limit_raw) || 1;

  const usedMB = usedBytes / (1024 * 1024);
  const limitMB = limitBytes / (1024 * 1024);

  const rawPercent = (usedBytes / limitBytes) * 100;
  const percentUsed = Math.min(rawPercent, 100).toFixed(2);
  const isOverLimit = rawPercent > 100;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Info Plan */}
        <div className="bg-blue-100 border border-blue-300 text-blue-800 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium">
            You are on the <strong>{user.plan || "Free"}</strong> plan. Upgrade anytime for more storage and features!
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.username || "User"}</h1>
          <p className="text-gray-700 text-sm">
            Plan: {user.plan || "Free"} — Storage Used: {usedMB.toFixed(2)} MB / {limitMB.toFixed(2)} MB ({percentUsed}%)
          </p>

          {isOverLimit ? <p className="text-red-600 text-xs mt-1 font-semibold">🚨 Storage limit exceeded!</p> : rawPercent > 90 ? <p className="text-orange-500 text-xs mt-1">⚠️ Storage almost full!</p> : null}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <div className={`h-3 rounded-full transition-all duration-500 ${isOverLimit ? "bg-red-600" : rawPercent > 90 ? "bg-orange-500" : "bg-blue-500"}`} style={{ width: `${percentUsed}%` }} />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PortfolioCard title="Total Files" description="Jumlah file yang kamu upload" amount={stats.total_files || 0} change="+" changeLabel="Files stored" bgColor="bg-yellow-200" isPositive={true} />
          <PortfolioCard title="Total Storage Used" description="Total penggunaan penyimpanan" amount={stats.total_size || "0 MB"} change="+" changeLabel="Space used" bgColor="bg-pink-200" isPositive={true} />
        </div>

        {/* Chart */}
        {dashboardData.chart?.uploads && <UploadChart data={dashboardData.chart.uploads} />}

        {/* Recent Files */}
        {recentFiles.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📁 Recent Files</h2>
            <ul className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
              {recentFiles.map((file) => (
                <li key={file.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{file.original_filename || "Unknown File"}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB — Uploaded on {new Date(file.created_at).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

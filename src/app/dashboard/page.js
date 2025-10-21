"use client";

import React, { useState } from "react";

// Komponen Kartu Portfolio
const PortfolioCard = ({ title, description, amount, change, changeLabel, bgColor, isPositive }) => {
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
};

// Komponen Utama Dashboard
const App = () => {
  const timePeriods = ["24h", "7d", "6m", "1y", "Max"];
  const [selectedPeriod, setSelectedPeriod] = useState("Max");

  return (
    <div className="bg-gray-50 min-h-screen p-4 pt-0">
      <div className="max-w-7xl mx-auto">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Total Portfolio Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Total portfolio</div>
              <div className="text-4xl font-bold text-gray-900">
                $35,687<span className="text-gray-400">.64</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">You gained $34,036.04 last 6 months. Thats the best result in last 2 years.</div>
            </div>

            {/* Time Period Filters */}
            <div className="flex gap-2 mb-4">
              {timePeriods.map((period) => (
                <button key={period} onClick={() => setSelectedPeriod(period)} className={`px-3 py-1 text-xs rounded ${selectedPeriod === period ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {period}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="relative h-40">
              <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffc0cb" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffc0cb" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path d="M 0,80 L 50,60 L 100,40 L 150,70 L 200,50 L 250,90 L 300,70 L 350,100 L 400,90" fill="none" stroke="#ffc0cb" strokeWidth="2" />
                <path d="M 0,80 L 50,60 L 100,40 L 150,70 L 200,50 L 250,90 L 300,70 L 350,100 L 400,90 L 400,160 L 0,160 Z" fill="url(#gradient)" />
                <circle cx="100" cy="40" r="4" fill="#8b5cf6" />
                <line x1="100" y1="40" x2="100" y2="160" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4" />
              </svg>
              <div className="absolute top-8 left-24 bg-gray-900 text-white text-xs px-2 py-1 rounded">$18,495</div>
              <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          {/* Return on Investment Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Return on Investment</div>
                <div className="text-4xl font-bold text-gray-900">
                  $1234<span className="text-gray-400">.40</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">Oct 2022 - April 2023</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">Last 6m</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-xs text-blue-600 font-semibold">▲ Increased by 20%</div>
            </div>

            {/* Bar Chart */}
            <div className="relative h-40 flex items-end justify-between gap-4 px-2">
              {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full ${i === 1 ? "bg-gray-300 relative" : "bg-yellow-400"} rounded-t-lg`}
                    style={{
                      height: ["60%", "50%", "95%", "70%", "100%", "85%"][i],
                    }}>
                    {i === 1 && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Aug +34.5%</div>}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Details Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Details</h2>
          <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">View More</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioCard title="Liquid Assets" description="Which representing your positions in pools" amount="$4,234.34" change="20.52%" changeLabel="This Week" bgColor="bg-yellow-300" isPositive={true} />
          <PortfolioCard title="Margin Positions" description="Which representing your positions in pools" amount="$234.34" change="6.34%" changeLabel="This Week" bgColor="bg-pink-200" isPositive={true} />
          <PortfolioCard title="LP Positions" description="Which representing your positions in pools" amount="$1,575.35" change="0.45%" changeLabel="This Week" bgColor="bg-purple-200" isPositive={true} />
        </div>
      </div>
    </div>
  );
};

export default App;

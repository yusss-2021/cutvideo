"use client";

import React from "react";
import { Rocket, Zap, Building2, Check, X } from "lucide-react";

const PricingCard = ({ icon, title, description, price, period, features, unavailable = [], isPopular = false }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 flex flex-col h-full border border-gray-800 hover:border-gray-700 transition-all">
      <div className="mb-6 w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">{icon}</div>

      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>

      <div className="mb-6">
        <span className="text-5xl font-bold text-white">{price === 0 ? "Free" : `Rp ${price.toLocaleString("id-ID")}`}</span>
        <span className="text-gray-500 ml-2">/ {period}</span>
      </div>

      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl mb-8 flex items-center justify-center gap-2 transition-colors">
        <Rocket size={18} />
        {price === 0 ? "Mulai Gratis" : "Upgrade Sekarang"}
      </button>

      <div className="space-y-1 mb-4">
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Fitur yang kamu dapat</p>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check size={16} className="text-green-400 mt-1" />
            <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
          </div>
        ))}
        {unavailable.map((feature, index) => (
          <div key={`x-${index}`} className="flex items-start gap-3 opacity-50">
            <X size={16} className="text-red-400 mt-1" />
            <p className="text-gray-400 text-sm line-through leading-relaxed">{feature}</p>
          </div>
        ))}
      </div>

      {isPopular && (
        <div className="absolute bottom-8 right-8 bg-gradient-to-br from-green-400 to-green-600 text-black font-bold px-6 py-3 rounded-2xl transform rotate-12 shadow-lg">
          <div className="text-xs">Paling</div>
          <div className="text-2xl">Populer</div>
          <div className="text-xs">🔥</div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;

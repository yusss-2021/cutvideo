"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function HeaderHomePage({ brand = "CutVideo Tools" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 relative z-50">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <div className="w-8 h-8 bg-teal-400 rounded-lg transform -rotate-12"></div>
        <span className="text-xl font-semibold text-gray-900">{brand}</span>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-black transition-colors font-medium">
          Home
        </Link>
        <Link href="/pricing" className="text-gray-700 hover:text-black transition-colors font-medium">
          Pricing
        </Link>
        <Link href="/pricing" className="text-gray-700 hover:text-black transition-colors font-medium">
          about
        </Link>
      </nav>

      {/* Auth Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/login" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
          Login
        </Link>

        <Link href="/register" className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
          Register
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-black transition">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden animate-fadeIn">
          <nav className="flex flex-col p-4 space-y-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-black font-medium">
              Home
            </Link>
            <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-black font-medium">
              Pricing
            </Link>
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-black font-medium">
              About
            </Link>
            <Link href="/login" onClick={() => setIsOpen(false)} className="mt-2 px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 text-center">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 text-center">
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

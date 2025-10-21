"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import CryptoJS from "crypto-js";
import Link from "next/link";
import HeaderHomePage from "../components/HeaderHomePage"; // ✅ perbaikan import

export default function LoginPage() {
  const brand = "ClipFastVideo";
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [encryptedApi, setEncryptedApi] = useState("");

  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔐 Encrypt endpoint hanya setelah komponen mount
  useEffect(() => {
    setMounted(true);
    if (SECRET_KEY && BASE_URL) {
      const enc = CryptoJS.AES.encrypt(`${BASE_URL}/login`, SECRET_KEY).toString();
      setEncryptedApi(enc);
    }
  }, [SECRET_KEY, BASE_URL]);

  if (!mounted) return null;

  const decryptEndpoint = (cipherText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return "";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint = decryptEndpoint(encryptedApi);
    if (!endpoint) {
      setMessage("❌ Endpoint API tidak valid");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();

      if (res.ok && result.status === "success") {
        localStorage.setItem("token", result.data.token);
        setMessage("✅ Login berhasil");
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        setMessage(result.error?.message || "❌ Login gagal, periksa kembali");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Tidak dapat terhubung ke server");
    }
  };

  // 🧱 UI tetap sama
  return (
    <div>
      <HeaderHomePage brand={brand} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          {/* --- UI sama seperti sebelumnya --- */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600 text-sm mb-6">Masukkan Email dan Password Anda</p>

          <form onSubmit={handleLogin}>
            {/* Email input */}
            <input type="email" placeholder="info@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            {/* Password input */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-12"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Masuk
            </button>
          </form>

          {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
          <p className="text-center text-sm text-gray-600 mt-4">
            Tidak punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Registrasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

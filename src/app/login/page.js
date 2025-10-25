"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import CryptoJS from "crypto-js";
import Link from "next/link";
import HeaderHomePage from "../../components/HeaderHomePage";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { apiLogin } from "../../utils/api";

export default function LoginPage() {
  const brand = "ClipFastVideo";
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // === Modal State ===
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("success"); // "success" | "error"
  const [modalMessage, setModalMessage] = useState("");

  // === Encryption API ===
  const [encryptedApi, setEncryptedApi] = useState("");
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
      showModal("error", "❌ Endpoint API tidak valid");
      return;
    }

    setLoading(true);

    try {
      const result = await apiLogin(email, password);

      if (result.status === "success") {
        showModal("success", result.message || "✅ Login berhasil! Anda akan dialihkan...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        showModal("error", result.message || "❌ Login gagal, periksa kembali data Anda.");
      }
    } catch (error) {
      console.error(error);
      showModal("error", "❌ Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setModalOpen(true);
  };

  return (
    <div>
      <HeaderHomePage brand={brand} />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          </div>

          {/* Google Sign-in (dummy) */}
          <div className="flex gap-4 mb-6">
            <button onClick={() => alert("Google Sign-In belum diimplementasi")} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" />
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <p className="text-gray-600 text-sm mb-6">Masukkan Email dan Password Anda</p>

          <form onSubmit={handleLogin}>
            <input type="email" placeholder="info@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />

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

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Masuk"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Tidak punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Registrasi
            </Link>
          </p>
        </div>
      </div>

      {/* === MODAL === */}
      <Dialog open={modalOpen} onClose={setModalOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-sm transform overflow-hidden rounded-lg bg-gray-800 shadow-xl transition-all">
            <div className="p-6 text-center">
              {modalType === "success" ? <CheckCircle2 className="mx-auto h-12 w-12 text-green-400" /> : <XCircle className="mx-auto h-12 w-12 text-red-400" />}
              <DialogTitle as="h3" className={`mt-4 text-lg font-semibold ${modalType === "success" ? "text-green-400" : "text-red-400"}`}>
                {modalType === "success" ? "Login Berhasil" : "Login Gagal"}
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-300">{modalMessage}</p>
            </div>
            <div className="bg-gray-700/25 px-4 py-3 text-center">
              <button
                onClick={() => setModalOpen(false)}
                className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-semibold text-white ${modalType === "success" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`}>
                {modalType === "success" ? "Lanjutkan" : "Tutup"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

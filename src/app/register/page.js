"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import CryptoJS from "crypto-js";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { apiRegister } from "../../utils/api";
import Link from "next/link";
import HeaderHomePage from "../../components/HeaderHomePage";

export default function RegisterPage() {
  const brand = "ClipFastVideo";
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [encryptedApi, setEncryptedApi] = useState("");

  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);
    if (SECRET_KEY && BASE_URL) {
      const enc = CryptoJS.AES.encrypt(`${BASE_URL}/register`, SECRET_KEY).toString();
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const endpoint = decryptEndpoint(encryptedApi);
    if (!endpoint) {
      setMessage("❌ Endpoint API tidak valid");
      setIsSuccess(false);
      setOpen(true);
      return;
    }

    try {
      const result = await apiRegister(username, email, password);

      if (result.status === "success") {
        setMessage(result.message || "✅ Registrasi berhasil! Silakan login.");
        setIsSuccess(true);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          router.push("/login");
        }, 1500);
      } else {
        setMessage(result.message || "❌ Registrasi gagal, periksa kembali data Anda.");
        setIsSuccess(false);
        setOpen(true);
      }
    } catch (error) {
      setMessage("❌ Tidak dapat terhubung ke server.");
      setIsSuccess(false);
      setOpen(true);
    }
  };

  return (
    <div>
      <HeaderHomePage brand={brand} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
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
              Sign up with Google
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Modal notifikasi */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center transition-all">
            <div className="flex flex-col items-center">
              {isSuccess ? <CheckCircle className="text-green-500 w-12 h-12 mb-3" /> : <XCircle className="text-red-500 w-12 h-12 mb-3" />}
              <p className="text-gray-700 mb-4">{message}</p>
              <button onClick={() => setOpen(false)} className={`px-5 py-2 rounded-lg font-medium text-white ${isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
                Tutup
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import { User, Settings } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Ini metadata standar (tanpa themeColor)
export const metadata = {
  title: "ClipFast — Potong Video Panjang Jadi Bagian Kecil Instan",
  description: "ClipFast adalah tools online untuk memotong video panjang menjadi bagian-bagian pendek tanpa perlu komputer. Gunakan langsung dari ponsel dan unduh hasilnya kapan saja.",
  keywords: ["potong video online", "cut video online", "video editor mobile", "video splitter", "video trimmer", "edit video tanpa pc", "video cutter tool"],
  authors: [{ name: "ClipFast", url: "https://clipfast.app" }],
  creator: "ClipFast Team",
  publisher: "ClipFast",
  metadataBase: new URL("https://clipfast.app"),
  openGraph: {
    title: "ClipFast — Potong Video Panjang Jadi Bagian Kecil Instan",
    description: "Potong video panjang menjadi bagian kecil tanpa perlu komputer. Cepat, mudah, dan bisa diunduh kapan saja langsung dari browser kamu.",
    url: "https://clipfast.app",
    siteName: "ClipFast",
    images: [
      {
        url: "https://clipfast.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClipFast - Online Video Cutter",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipFast — Potong Video Panjang Jadi Bagian Kecil Instan",
    description: "Tools online untuk potong video tanpa ribet. Edit langsung dari HP dan unduh hasilnya kapan saja.",
    creator: "@clipfast",
    images: ["https://clipfast.app/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// ✅ Ini gantiin themeColor lama
export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>{children}</body>
    </html>
  );
}

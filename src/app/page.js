import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 sm:px-8 py-12 sm:py-16">
        {/* Title Section */}
        <div className="relative text-center mb-12 sm:mb-16 max-w-2xl sm:max-w-4xl">
          <span className="hidden sm:inline absolute -top-8 left-32 bg-blue-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm">@clipper</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 sm:mb-8">
            Cut your long videos
            <br className="hidden sm:block" />
            into short clips — instantly.
          </h1>
          <span className="hidden sm:inline absolute -top-4 right-16 bg-teal-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm">@fastcut</span>
        </div>

        {/* Gallery Section */}
        <div className="relative w-full max-w-5xl mb-10 sm:mb-12">
          {/* Mobile: Grid layout */}
          <div className="grid grid-cols-2 sm:hidden gap-3">
            <div className="w-full h-40 bg-white rounded-xl shadow-md overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=video+editing+interface&image_type=photo" alt="Editing Interface" width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 bg-white rounded-xl shadow-md overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=video+timeline+clip&image_type=photo" alt="Timeline Clip" width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 bg-white rounded-xl shadow-md overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=mobile+video+editing&image_type=photo" alt="Mobile Editor" width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 bg-white rounded-xl shadow-md overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=video+export+screen&image_type=photo" alt="Video Export" width={400} height={400} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Desktop: Overlapping layout */}
          <div className="hidden sm:block relative h-80">
            <div className="absolute left-8 top-8 w-72 h-64 bg-white rounded-2xl shadow-2xl transform -rotate-12 overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=video+editing+interface&image_type=photo" alt="Editing Interface" fill className="object-cover" />
            </div>

            <div className="absolute left-80 top-0 w-72 h-64 bg-white rounded-2xl shadow-2xl transform rotate-6 overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=video+timeline+clip&image_type=photo" alt="Timeline Clip" fill className="object-cover" />
            </div>

            <div className="absolute left-1/2 top-12 w-72 h-64 bg-white rounded-2xl shadow-2xl transform -rotate-3 overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=mobile+video+editing&image_type=photo" alt="Mobile Editor" fill className="object-cover" />
            </div>

            <div className="absolute right-32 top-4 w-72 h-64 bg-white rounded-2xl shadow-2xl transform rotate-12 overflow-hidden">
              <Image src="https://csspicker.dev/api/image/?q=video+export+screen&image_type=photo" alt="Video Export" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-gray-700 mb-8 max-w-md sm:max-w-xl text-sm sm:text-base">
          Potong video panjang menjadi beberapa bagian kecil tanpa perlu komputer. Gunakan langsung dari ponselmu, edit dengan mudah, dan unduh hasilnya kapan saja.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto">Mulai Sekarang</button>
          <a href="#" className="text-gray-700 hover:text-black transition-colors text-sm sm:text-base">
            Pelajari lebih lanjut
          </a>
        </div>
      </main>
    </div>
  );
}

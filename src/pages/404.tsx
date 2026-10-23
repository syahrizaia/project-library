import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Compass, Sparkles } from 'lucide-react';
import Library3DBackground from '@/components/3d/Library3DBackground';

const Custom404 = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* 3D Canvas Background */}
      <Library3DBackground />

      {/* Floating Holographic Glass Card */}
      <div className="liquid-glass-heavy rounded-3xl p-8 sm:p-12 shadow-liquid-lg max-w-lg w-full text-center border border-white/90 relative z-10 animate-float-slow">
        
        {/* Ambient Halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-sky-400/20 to-indigo-400/20 rounded-3xl -z-10 blur-2xl" />

        {/* 404 Glass Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full liquid-glass-subtle text-cyan-800 text-xs font-bold border border-cyan-300/50 shadow-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Status 404: Void Dimension</span>
        </div>

        {/* Illustration */}
        <div className="relative w-full max-w-[240px] mx-auto py-2 mb-6">
          <Image
            className="w-full h-auto object-contain drop-shadow-xl"
            src="/undraw_void_3ggu.png"
            alt="404 Ruang Kosong"
            width={240}
            height={160}
            priority
          />
        </div>

        {/* Headline & Text */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <p className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text">
            404
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full my-1" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Halamannya ga ada WIR!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xs leading-relaxed">
            Halaman atau buku yang Anda cari mungkin telah dipindahkan atau tersesat di galaksi lain.
          </p>
        </div>

        {/* Return Button */}
        <Link
          href="/"
          className="liquid-button-accent py-3.5 px-8 rounded-2xl text-white font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-liquid-button hover:shadow-liquid-button-hover active:scale-95 transition-all w-full sm:w-auto"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
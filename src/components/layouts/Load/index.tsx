import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const Load = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full p-6">
      <div className="liquid-glass-heavy rounded-3xl p-8 shadow-liquid-lg flex flex-col items-center gap-6 relative max-w-xs w-full text-center border border-white/80">
        
        {/* Pulsing Glowing Orbital Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 border-t-cyan-500 border-r-cyan-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-sky-400/10 border-b-sky-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
          
          {/* Center Icon */}
          <div className="w-20 h-20 rounded-2xl bg-white/70 backdrop-blur-md p-3 shadow-inner flex items-center justify-center border border-white/80">
            <Image
              className="w-14 h-14 object-contain animate-pulse"
              src="/pngtree-vector-reading-icon-png-image_983807 copy.png"
              alt="Loading Perpustakaan WIR"
              width={70}
              height={70}
            />
          </div>
        </div>

        {/* Loading Text & Status */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-cyan-700 font-bold text-sm tracking-wide">
            <Sparkles className="w-4 h-4 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Memuat Koleksi Buku...</span>
          </div>
          <p className="text-xs text-slate-500">Menghubungkan ke Perpustakaan WIR</p>
        </div>
      </div>
    </div>
  );
};

export default Load;
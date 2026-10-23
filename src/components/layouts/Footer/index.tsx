import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { defaultCategories } from '@/lib/data/defaultData';
import { BookOpen, Clock, Phone, Mail, MapPin, ChevronRight, Sparkles, BookMarked, ArrowRight } from 'lucide-react';

type CategoryItem = {
  id: string;
  title?: string;
  name?: string;
  explanation?: string;
};

const Footer = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(defaultCategories);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_URL || '';
    fetch(`${apiUrl}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch categories for footer');
        return res.json();
      })
      .then((response) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          setCategories(response.data);
        }
      })
      .catch((err) => {
        console.error('Footer categories fetch error:', err);
      });
  }, []);

  return (
    <footer className="w-full relative z-10 mt-16 pt-6">
      {/* Top Specular Gradient Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Main Glass Deck */}
      <div className="liquid-glass-heavy backdrop-blur-2xl px-6 sm:px-12 py-12 md:py-16 shadow-liquid-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Column 1: Info & Operational Hours */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 border border-white/40">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-2xl tracking-tight text-slate-900">
                Perpustakaan <span className="text-cyan-600">WIR</span>
              </h2>
            </div>
            
            <div className="liquid-glass-subtle rounded-2xl p-4 border border-white/80 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-cyan-800 font-semibold text-sm">
                <Clock className="w-4 h-4 text-cyan-600" />
                <span>Jam Operasional Layanan</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex justify-between border-b border-slate-200/50 pb-1">
                  <span>Senin - Jumat</span>
                  <span className="font-semibold text-slate-800">08.00 - 16.00</span>
                </li>
                <li className="flex justify-between border-b border-slate-200/50 pb-1">
                  <span>Sabtu - Minggu</span>
                  <span className="font-semibold text-slate-800">09.00 - 15.00</span>
                </li>
                <li className="text-[11px] text-amber-700 bg-amber-50/70 px-2 py-1 rounded-md border border-amber-200/50">
                  ⚠️ Cuti bersama & libur nasional <strong>tutup</strong>
                </li>
              </ul>
              <div className="mt-1 pt-1.5 border-t border-slate-200/50 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-500" />
                <span>Kapasitas: Maksimal 2.000 Pengunjung / Hari</span>
              </div>
            </div>
          </div>

          {/* Column 2: Featured Collections - DYNAMIC FIREBASE LINKS */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-cyan-600" />
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Koleksi Unggulan</h3>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full" />
            
            {/* Dynamic Category Links from Firebase */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={'/category/' + category.id}
                    className="group flex items-center gap-2 p-2 rounded-xl text-slate-700 hover:text-cyan-700 hover:bg-white/70 transition-all duration-200 border border-transparent hover:border-white/80"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                    <span className="font-medium text-xs sm:text-sm truncate">
                      {category.title || category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/category"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 transition-colors pt-1 w-fit group"
            >
              <span>Lihat Semua ({categories.length}) Kategori</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">Kontak Kami</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full" />

            <div className="space-y-2.5 text-xs">
              <div className="liquid-glass-subtle p-3 rounded-xl border border-white/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-500 text-[10px] uppercase">Telepon</p>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">0895-2973-8778</p>
                </div>
              </div>

              <div className="liquid-glass-subtle p-3 rounded-xl border border-white/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-500 text-[10px] uppercase">Email</p>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">wir@gmail.com</p>
                </div>
              </div>

              <div className="liquid-glass-subtle p-3 rounded-xl border border-white/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-500 text-[10px] uppercase">Alamat</p>
                  <p className="font-medium text-slate-800 text-xs">Wakanda cabang Cikarang. 17845</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
          <p>© 2023 - 2026 Perpustakaan WIR. All Rights Reserved. Crafted with Liquid Glass System by Team 3.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-600">
            <Link href="/" className="hover:text-cyan-600 transition-colors">Beranda</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-cyan-600 transition-colors">Tentang</Link>
            <span>•</span>
            <Link href="/services" className="hover:text-cyan-600 transition-colors">Layanan</Link>
            <span>•</span>
            <Link href="/about/profile" className="hover:text-cyan-600 transition-colors">Profil</Link>
            <span>•</span>
            <Link href="/cas" className="hover:text-cyan-600 transition-colors">Kritik & Saran</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
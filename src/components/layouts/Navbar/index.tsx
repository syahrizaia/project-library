import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookOpen, Sparkles, Home, Info, Compass, Grid, Newspaper, MessageSquareHeart, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Beranda', href: '/', icon: Home },
  { name: 'Tentang', href: '/about', icon: Info },
  { name: 'Layanan', href: '/services', icon: Compass },
  { name: 'Kategori', href: '/category', icon: Grid },
  { name: 'Blog', href: '/blog', icon: Newspaper },
  { name: 'Kritik & Saran', href: '/cas', icon: MessageSquareHeart },
];

const Navbar = () => {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 transition-all duration-300">
      <nav
        className="liquid-glass rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-liquid transition-all duration-300"
        aria-label="Navigasi Utama"
      >
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 border border-white/40 group-hover:shadow-cyan-500/50 transition-all">
            <BookOpen className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 bg-clip-text text-transparent">
              Perpustakaan <span className="text-cyan-600">WIR</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-500 inline" /> Smart Library Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/60 border border-white/60 backdrop-blur-md">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
                  active
                    ? 'bg-white text-cyan-700 shadow-sm border border-cyan-200/80'
                    : 'text-slate-600 hover:text-cyan-700 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-600' : 'text-slate-400'}`} />
                <span>{item.name}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-white/80 active:scale-95 transition-all border border-white/40"
          aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-700" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer / Expanded Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 liquid-glass-heavy rounded-2xl p-3 shadow-liquid-lg animate-in fade-in slide-in-from-top-3 duration-200 flex flex-col gap-1.5 border border-white/80">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                  active
                    ? 'bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-700 hover:bg-white/70 active:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-cyan-600'}`} />
                  <span>{item.name}</span>
                </div>
                {active && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Aktif</span>}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
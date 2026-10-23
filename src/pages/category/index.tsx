import React, { useEffect, useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Load from '@/components/layouts/Load';
import { defaultCategories } from '@/lib/data/defaultData';
import { retrieveData } from '@/lib/firebase/service';
import { 
  Sparkles, 
  Grid, 
  ArrowRight, 
  AlertTriangle, 
  Search, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Lightbulb, 
  Coffee,
  X
} from 'lucide-react';

export type Data = {
  id: string;
  image: string;
  title: string;
  explanation: string;
};

// Genre filter options
const filterPills = [
  'Semua',
  'Teknologi',
  'Fiksi & Cerita',
  'Akademik & Sains',
  'Sejarah & Biografi'
];

interface CategoryPageProps {
  initialCategories?: Data[];
}

const CategoryPage = ({ initialCategories }: CategoryPageProps) => {
  const [categories, setCategories] = useState<Data[]>(initialCategories && initialCategories.length > 0 ? initialCategories : defaultCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_URL || '';
    fetch(`${apiUrl}/api/categories`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((response) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          setCategories(response.data);
        } else {
          setCategories(defaultCategories);
        }
      })
      .catch((error) => {
        console.error(error);
        setCategories(defaultCategories);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Filter categories based on search query and active genre pill
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.explanation.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'Semua') return true;
      if (activeFilter === 'Teknologi') {
        return cat.title.toLowerCase().includes('pemrograman') || cat.title.toLowerCase().includes('teknologi');
      }
      if (activeFilter === 'Fiksi & Cerita') {
        return ['novel', 'fantasi', 'komik', 'petualangan'].some((k) => cat.title.toLowerCase().includes(k));
      }
      if (activeFilter === 'Akademik & Sains') {
        return ['sains', 'pelajaran', 'pendidikan'].some((k) => cat.title.toLowerCase().includes(k));
      }
      if (activeFilter === 'Sejarah & Biografi') {
        return ['sejarah', 'biografi'].some((k) => cat.title.toLowerCase().includes(k));
      }
      return true;
    });
  }, [categories, searchQuery, activeFilter]);

  return (
    <div className="relative pt-32 sm:pt-40 md:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
      {isLoading ? (
        <Load />
      ) : categories.length > 0 ? (
        <main className="flex flex-col items-center gap-14">
          
          {/* Section Header */}
          <section className="text-center flex flex-col items-center gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
              <Grid className="w-4 h-4 text-cyan-600 animate-pulse" />
              <span className="text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide">
                Katalog Koleksi Lengkap WIR
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Eksplorasi <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">Kategori Buku</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl">
              Dari mahakarya sastra klasik, komik fantasi, hingga buku arsitektur komputasi modern. Temukan bahan bakar rasa ingin tahumu di sini, WIR!
            </p>
          </section>

          {/* Interactive Search & Filter Bar */}
          <section className="w-full max-w-4xl flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kategori buku, topik, atau kata kunci (contoh: pemrograman, sejarah, novel)..."
                className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl liquid-glass border border-white/90 shadow-liquid text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar sm:justify-center">
              {filterPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setActiveFilter(pill)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${
                    activeFilter === pill
                      ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-cyan-500/25'
                      : 'liquid-glass-subtle text-slate-600 hover:text-cyan-700 hover:bg-white/80 border border-white/60'
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-2 font-medium">
              <span>
                Menampilkan <strong className="text-slate-800">{filteredCategories.length}</strong> dari {categories.length} kategori buku
              </span>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setActiveFilter('Semua'); }}
                  className="text-cyan-700 hover:underline font-semibold"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </section>

          {/* Cards Grid */}
          <section className="w-full">
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {filteredCategories.map((category: Data) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="liquid-glass liquid-card-lift rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between text-center shadow-liquid border border-white/80 group h-full min-h-[310px] relative overflow-hidden"
                  >
                    {/* Ambient Card Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top: Icon in Specular Well */}
                    <div className="w-24 h-24 rounded-2xl bg-white/70 backdrop-blur-md p-4 shadow-inner flex items-center justify-center border border-white/90 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 mb-4 relative overflow-hidden">
                      <Image
                        className="object-contain p-2"
                        src={category.image}
                        alt={`Ikon kategori: ${category.title}`}
                        fill
                        sizes="96px"
                        loading="lazy"
                      />
                    </div>

                    {/* Center: Title & Description */}
                    <div className="flex flex-col gap-2 my-auto">
                      <div className="flex items-center justify-center gap-1.5">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {category.title}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {category.explanation}
                      </p>
                    </div>

                    {/* Bottom: Action Pill */}
                    <div className="mt-5 pt-3 border-t border-slate-200/50 w-full flex items-center justify-between text-xs font-semibold text-cyan-700 group-hover:text-cyan-800 px-1">
                      <span className="text-[11px] font-medium text-slate-400 group-hover:text-cyan-600 transition-colors">
                        Koleksi Terbuka
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span>Buka Rak</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="liquid-glass rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-200/70 shadow-liquid">
                <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Tidak ada kategori yang cocok</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">
                  Kategori dengan kata kunci &quot;{searchQuery}&quot; belum ditemukan di database WIR.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveFilter('Semua'); }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Lihat Semua Kategori
                </button>
              </div>
            )}
          </section>

          {/* Spotlight Kategori Bulan Ini (Featured Bento Banner) */}
          <section className="w-full liquid-glass-heavy rounded-3xl p-8 sm:p-10 border border-white/90 shadow-liquid relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-800 text-xs font-semibold w-fit border border-cyan-500/20">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Sorotan Pembaca Bulan Ini</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Pemrograman, AI & Rekayasa Perangkat Lunak Modern
                </h2>
                
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Menjawab antusiasme mahasiswa di Wakanda Cikarang dan Planet Bekasi, rak Pemrograman kini diperkaya dengan judul-judul terkini seputar Next.js, Arsitektur Microservices, Algoritma Machine Learning, dan Desain UI/UX Apple Glassmorphism.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-lg bg-white/80 text-xs font-medium text-slate-700 border border-slate-200">
                    💻 Clean Code & Refactoring
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/80 text-xs font-medium text-slate-700 border border-slate-200">
                    ⚡ React & Three.js 3D
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/80 text-xs font-medium text-slate-700 border border-slate-200">
                    🤖 Generative AI & LLM Systems
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
                <Link
                  href="/category/VcW6ZPi8SVxxvf47MqS1"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white text-sm font-semibold shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Jelajahi Rak Pemrograman</span>
                </Link>
                <Link
                  href="/cas"
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl liquid-glass text-slate-700 hover:text-cyan-800 text-xs font-semibold border border-white/80 flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <span>Request Judul Baru via CAS</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* Statistik Koleksi Pustaka WIR (4 Stat Cards) */}
          <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center border border-white/80 shadow-liquid">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3 text-cyan-600">
                <Grid className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">9+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Kategori Genre Pustaka</div>
            </div>

            <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center border border-white/80 shadow-liquid">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-3 text-sky-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1.500+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Buku Fisik & Digital</div>
            </div>

            <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center border border-white/80 shadow-liquid">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Gratis Tanpa Biaya</div>
            </div>

            <div className="liquid-glass rounded-2xl p-5 sm:p-6 text-center border border-white/80 shadow-liquid">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3 text-indigo-600">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">24/7</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Akses Katalog Terbuka</div>
            </div>
          </section>

          {/* Panduan Memilih Bahan Bacaan (Bento Guide) */}
          <section className="w-full flex flex-col gap-6">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-subtle text-cyan-800 text-xs font-semibold mb-2">
                <Compass className="w-3.5 h-3.5 text-cyan-600" />
                <span>Tips Pustakawan WIR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Bingung Memilih Bacaan Hari Ini?
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Tiga kiat sederhana agar sesi membacamu mengalir lancar dan menyenangkan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-white/80 shadow-liquid flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Mulai dari yang Ringan & Tipis
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bila kamu baru membangun kebiasaan membaca, hindari langsung melahap ensiklopedia 800 halaman. Pilih kategori <strong className="text-slate-800">Komik</strong>, <strong className="text-slate-800">Petualangan</strong>, atau novel pendek untuk membakar momentum rasa penasaranmu.
                </p>
              </div>

              <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-white/80 shadow-liquid flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Praktikkan 15 Menit Tanpa Notifikasi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kunci membaca buku teknis atau sains adalah ritme mikro yang konsisten. Luangkan 15 menit setiap pagi atau sore hari di pojok membaca tenang WIR sambil menikmati kopi atau teh favoritmu.
                </p>
              </div>

              <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-white/80 shadow-liquid flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Diskusi Langsung dengan Tim WIR
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tidak yakin buku mana yang tepat untuk skripsimu atau proyek akhirmu? Sambangi meja sirkulasi atau tinggalkan pesan lewat halaman <Link href="/cas" className="text-cyan-700 underline font-semibold">CAS (Curhat & Saran)</Link> untuk kurasi personal.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA to Services */}
          <section className="w-full liquid-glass rounded-3xl p-8 sm:p-10 border border-white/90 shadow-liquid text-center flex flex-col items-center gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Ingin Meminjam Buku Fisik Langsung di Lokasi?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Cek panduan keanggotaan, jadwal buka ruang baca pod hening, dan fasilitas peminjaman mandiri di halaman Layanan Pustaka WIR.
            </p>
            <Link
              href="/services"
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <span>Lihat Layanan & Tata Tertib Pustaka</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

        </main>
      ) : hasError ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="liquid-glass rounded-3xl p-8 max-w-md text-center border border-rose-300/60 shadow-liquid">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Gagal Memuat Kategori</h3>
            <p className="text-sm text-slate-600 mt-1">Gagal memuat data kategori. Silakan coba lagi.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let categories: Data[] = [];
  try {
    const data: any = await retrieveData('categories');
    if (Array.isArray(data) && data.length > 0) {
      categories = data as Data[];
    }
  } catch (error) {
    console.error('getStaticProps categories error:', error);
  }

  if (categories.length === 0) {
    categories = defaultCategories;
  }

  return {
    props: {
      initialCategories: categories,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
};

export default CategoryPage;
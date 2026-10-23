import React, { useEffect, useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Load from '@/components/layouts/Load';
import { defaultBlogs } from '@/lib/data/defaultData';
import { retrieveData } from '@/lib/firebase/service';
import { 
  Newspaper, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  Search, 
  Sparkles, 
  Clock, 
  User, 
  Quote, 
  Mail, 
  CheckCircle2, 
  MessageSquare, 
  Flame, 
  BookOpen, 
  Coffee,
  X,
  Send
} from 'lucide-react';

type Data = {
  id: string;
  image: string;
  date: string;
  title: string;
  news: string;
};

const filterTabs = [
  'Semua Artikel',
  'Pengumuman',
  'Komunitas & Event',
  'Ngopi & Diskusi'
];

interface BlogPageProps {
  initialBlogs?: Data[];
}

const BlogPage = ({ initialBlogs }: BlogPageProps) => {
  const [blogs, setBlogs] = useState<Data[]>(initialBlogs && initialBlogs.length > 0 ? initialBlogs : defaultBlogs);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Semua Artikel');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_URL || '';
    fetch(`${apiUrl}/api/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((response) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          setBlogs(response.data);
        } else {
          setBlogs(defaultBlogs);
        }
      })
      .catch((error) => {
        console.error(error);
        setBlogs(defaultBlogs);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Filtered blogs based on search query and active tab
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.news.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === 'Semua Artikel') return true;
      if (activeTab === 'Pengumuman') {
        return ['peresmian', 'opening', 'website', 'resmi'].some((k) => blog.title.toLowerCase().includes(k));
      }
      if (activeTab === 'Komunitas & Event') {
        return ['presentasi', 'project', 'gdsc', 'tim', 'event'].some((k) => (blog.title + ' ' + blog.news).toLowerCase().includes(k));
      }
      if (activeTab === 'Ngopi & Diskusi') {
        return ['ngopi', 'kelas', 'bincang', 'santai'].some((k) => (blog.title + ' ' + blog.news).toLowerCase().includes(k));
      }
      return true;
    });
  }, [blogs, searchQuery, activeTab]);

  // Featured blog (usually the first one or grand opening)
  const featuredBlog = blogs[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setEmailSubscribed(true);
    setEmailInput('');
  };

  return (
    <div className="relative pt-32 sm:pt-40 md:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
      {isLoading ? (
        <Load />
      ) : blogs.length > 0 ? (
        <main className="flex flex-col items-center gap-14">
          
          {/* Header */}
          <section className="text-center flex flex-col items-center gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
              <Newspaper className="w-4 h-4 text-cyan-600 animate-pulse" />
              <span className="text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide">
                Warta Literasi & Kabar Komunitas WIR
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Blog & Jurnal <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">WIR!</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl">
              Catatan perjalanan, riset literatur, pengumuman event komunitas, serta obrolan hangat seputar dunia buku di Cikarang dan sekitarnya.
            </p>
          </section>

          {/* Featured Headline Hero Article (If exists and no search active) */}
          {featuredBlog && !searchQuery && activeTab === 'Semua Artikel' && (
            <section className="w-full">
              <Link
                href={`/blog/${featuredBlog.id}`}
                className="liquid-glass-heavy rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/90 shadow-liquid flex flex-col lg:flex-row gap-8 items-center group relative overflow-hidden transition-all duration-300 hover:shadow-cyan-500/10"
              >
                {/* Visual Ambient Glow */}
                <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

                {/* Left/Top Image with badge */}
                <div className="relative w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/80 shadow-md">
                  <Image
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    src={featuredBlog.image}
                    alt={`Sorotan Utama: ${featuredBlog.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-heavy text-xs font-bold text-amber-900 border border-white/90 shadow-sm z-10">
                    <Flame className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                    <span>Sorotan Utama</span>
                  </div>
                </div>

                {/* Right/Bottom Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{featuredBlog.date}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Dewan WIR & Tim 3</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-600" />
                        <span>3 mnt baca</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                      {featuredBlog.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
                      {featuredBlog.news}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-800">
                      Baca liputan resmi selengkapnya
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold shadow-md group-hover:bg-cyan-700 transition-colors">
                      <span>Buka Artikel</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Search Bar & Filter Tabs */}
          <section className="w-full max-w-4xl flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul berita, liputan acara, atau kata kunci artikel..."
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

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar sm:justify-center">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-cyan-500/25'
                      : 'liquid-glass-subtle text-slate-600 hover:text-cyan-700 hover:bg-white/80 border border-white/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-2 font-medium">
              <span>
                Menampilkan <strong className="text-slate-800">{filteredBlogs.length}</strong> tulisan
              </span>
              {(searchQuery || activeTab !== 'Semua Artikel') && (
                <button
                  onClick={() => { setSearchQuery(''); setActiveTab('Semua Artikel'); }}
                  className="text-cyan-700 hover:underline font-semibold"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </section>

          {/* Magazine Cards Grid */}
          <section className="w-full">
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {filteredBlogs.map((blog: Data) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.id}`}
                    className="liquid-glass liquid-card-lift rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-liquid border border-white/80 group h-full relative overflow-hidden"
                  >
                    {/* Top Image Container with Frosted Floating Date Pill */}
                    <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 border border-white/80 shadow-inner">
                      <Image
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        src={blog.image}
                        alt={`Gambar berita: ${blog.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-heavy text-[11px] font-semibold text-cyan-900 shadow-sm border border-white/90 z-10">
                        <Calendar className="w-3 h-3 text-cyan-600" />
                        <span>{blog.date}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="flex flex-col gap-2.5 px-1 flex-1">
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <BookOpen className="w-3 h-3 text-cyan-600" />
                        <span>Jurnal Literasi</span>
                        <span>•</span>
                        <span>3 mnt baca</span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {blog.news}
                      </p>
                    </div>

                    {/* Bottom Footer Pill */}
                    <div className="mt-5 pt-3.5 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-cyan-700 group-hover:text-cyan-800 px-1">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="liquid-glass rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-200/70 shadow-liquid">
                <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Artikel tidak ditemukan</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">
                  Tidak ada artikel yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveTab('Semua Artikel'); }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Tampilkan Semua Tulisan
                </button>
              </div>
            )}
          </section>

          {/* Kutipan Literasi Hari Ini (Liquid Glass Quote Bento) */}
          <section className="w-full liquid-glass-heavy rounded-3xl p-8 sm:p-10 border border-white/90 shadow-liquid relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-cyan-400/10 via-sky-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-600 shadow-inner">
                <Quote className="w-8 h-8" />
              </div>

              <div className="flex flex-col gap-2 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-800 text-xs font-semibold w-fit mx-auto md:mx-0">
                  <Sparkles className="w-3 h-3 text-cyan-600" />
                  <span>Kutipan Literasi Hari Ini</span>
                </div>
                <blockquote className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed">
                  &ldquo;Aku rela dipenjara asalkan bersama buku, karena dengan buku aku bebas.&rdquo;
                </blockquote>
                <div className="text-xs sm:text-sm font-semibold text-cyan-700">
                  — Mohammad Hatta, Proklamator & Bapak Koperasi Indonesia
                </div>
              </div>
            </div>
          </section>

          {/* WIR Radar & Buletin Mingguan (2-Column Bento) */}
          <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Radar Highlights */}
            <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-liquid flex flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-subtle text-cyan-800 text-xs font-semibold mb-3">
                  <Flame className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Radar Komunitas WIR</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Aktivitas & Diskusi Terbaru Pekan Ini
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-600">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Ngopi & Reviu Buku Akhir Pekan</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Sesi santai bedah buku di Café Rooftop WIR tiap Sabtu sore. Terbuka gratis untuk semua anggota dan umum.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0 text-sky-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Call for Contributors: Jurnal WIR</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Punya tulisan, resensi novel, atau esai seputar teknologi? Kirim naskahmu dan dapatkan merchandise eksklusif WIR.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Saran Pembaca via CAS Selalu Terbuka</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Ide topik liputan atau usulan buku yang ingin dibahas? Tulis langsung lewat form <Link href="/cas" className="text-cyan-700 underline font-semibold">CAS</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Subscription Box */}
            <div className="lg:col-span-5 liquid-glass-heavy rounded-3xl p-6 sm:p-8 border border-white/90 shadow-liquid flex flex-col justify-between gap-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-500 text-white flex items-center justify-center shadow-md mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Buletin Mingguan WIR
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Jangan ketinggalan kurasi buku terpopuler, tips literasi, dan undangan workshop gratis. Langsung masuk ke inbox email kamu tiap Senin pagi.
                </p>
              </div>

              {emailSubscribed ? (
                <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold">Terima Kasih, WIR!</p>
                    <p className="text-xs text-emerald-800">Email kamu sudah terdaftar di buletin mingguan kami.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Masukkan alamat email kamu..."
                    required
                    className="w-full px-4 py-3.5 rounded-xl liquid-glass border border-white/90 shadow-inner text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Langganan Buletin Gratis</span>
                  </button>
                  <span className="text-[11px] text-slate-400 text-center">
                    Bebas spam. Berhenti berlangganan kapan pun dengan sekali klik.
                  </span>
                </form>
              )}
            </div>

          </section>

        </main>
      ) : hasError ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="liquid-glass rounded-3xl p-8 max-w-md text-center border border-rose-300/60 shadow-liquid">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Gagal Memuat Blog</h3>
            <p className="text-sm text-slate-600 mt-1">Gagal memuat data blog. Silakan coba lagi.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let blogs: Data[] = [];
  try {
    const data: any = await retrieveData('blogs');
    if (Array.isArray(data) && data.length > 0) {
      blogs = data as Data[];
    }
  } catch (error) {
    console.error('getStaticProps blogs error:', error);
  }

  if (blogs.length === 0) {
    blogs = defaultBlogs;
  }

  return {
    props: {
      initialBlogs: blogs,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
};

export default BlogPage;
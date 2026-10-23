import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { retrieveData } from '@/lib/firebase/service';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass,
  ShieldCheck,
  Users,
  Star,
  Flame,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  Coffee,
  Wifi,
  VolumeX,
  MessageSquare,
} from 'lucide-react';

export type BookItem = {
  id?: string;
  title: string;
  author?: string;
  category?: string;
  categoryName?: string;
  categoryId?: string;
  image?: string;
  rating?: string;
  borrows?: string;
  tag?: string;
  tagColor?: string;
  explanation?: string;
};

interface HomePageProps {
  popularBooks?: BookItem[];
}

const features = [
  {
    title: 'Keanggotaan 100% Gratis',
    desc: 'Semua mahasiswa, pelajar, dan masyarakat umum dapat mendaftar tanpa dipungut biaya sepeser pun.',
    icon: ShieldCheck,
    color: 'from-cyan-500 to-sky-600',
  },
  {
    title: 'Silent Pods Ber-AC',
    desc: 'Bilik individual kedap suara dengan pencahayaan hangat untuk fokus membaca dan pengerjaan tugas skripsi.',
    icon: VolumeX,
    color: 'from-sky-500 to-indigo-600',
  },
  {
    title: 'Wi-Fi Fiber 100 Mbps',
    desc: 'Koneksi internet dedicated super cepat untuk menunjang pencarian referensi jurnal dan literatur digital.',
    icon: Wifi,
    color: 'from-indigo-500 to-violet-600',
  },
  {
    title: 'Café Literasi & Diskusi',
    desc: 'Area membaca semi-outdoor dengan kopi hangat dan ruang kolaborasi untuk bertukar gagasan kreatif.',
    icon: Coffee,
    color: 'from-teal-500 to-emerald-600',
  },
];

const upcomingEvents = [
  {
    title: 'Bedah Buku: Filsafat Modern & Etika Kode',
    speaker: 'Muhammad Faaiz Anugrah (Lead Philosopher)',
    date: 'Sabtu, 28 Oktober 2026',
    time: '13.30 - 15.30 WIB',
    location: 'Ruang Kolaborasi Lt. 2',
    seats: 'Sisa 8 Kursi',
  },
  {
    title: 'Creative Talk: Merancang Web 3D & Liquid Glass',
    speaker: 'Syahriza Ikhsan Alsistani (Tech Architect)',
    date: 'Rabu, 01 November 2026',
    time: '14.00 - 16.00 WIB',
    location: 'Audio-Visual Pods',
    seats: 'Sisa 12 Kursi',
  },
  {
    title: 'Malam Akustik & Puisi Literasi Mahasiswa',
    speaker: 'Bintang Angga Pratama & Komunitas Seni',
    date: 'Jumat, 10 November 2026',
    time: '19.00 - 21.00 WIB',
    location: 'Café Literasi Semi-Outdoor',
    seats: 'Terbuka Umum',
  },
];

const testimonials = [
  {
    quote: 'Tempat ternyaman di Cikarang buat ngerjain tugas akhir. Koleksi bukunya lengkap dan silent pods-nya bikin fokus maksimal!',
    name: 'Anisa Rahmawati',
    role: 'Mahasiswi Teknik',
    avatar: 'AR',
  },
  {
    quote: 'Sistem liquid glass web-nya keren banget, peminjaman buku juga gampang banget tinggal scan QR anggota digital.',
    name: 'Fikri Alamsyah',
    role: 'Web Developer & Pembaca Aktif',
    avatar: 'FA',
  },
  {
    quote: 'Koleksi komik dan novelnya selalu update. Pustakawannya ramah dan kopi di café-nya enak banget buat nemenin sore.',
    name: 'Nadia Safitri',
    role: 'Penikmat Sastra',
    avatar: 'NS',
  },
];

const HomePage = ({ popularBooks = [] }: HomePageProps) => {
  return (
    <>
      <Head>
        <title>Perpustakaan WIR | Untuk Semua Kebutuhan Membaca</title>
        <meta
          name="description"
          content="Perpustakaan WIR adalah tempat membaca buku terbaik yang berada di Cikarang. Semua pilihan buku tersedia untuk kalian yang gemar membaca."
        />
      </Head>

      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col gap-20">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 z-10">
            
            {/* Glowing Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <h1 className="text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide">
                Perpustakaan WIR • Smart Reading Space
              </h1>
            </div>

            {/* Main Hero Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Untuk Semua <br />
              <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Kebutuhan Membaca
              </span>
            </h2>

            {/* Body Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Perpustakaan WIR adalah tempat membaca buku terbaik yang berada di Cikarang. Semua pilihan buku tersedia untuk kalian yang gemar membaca.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/category"
                className="liquid-button-accent px-6 py-3.5 rounded-2xl text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-liquid-button hover:shadow-liquid-button-hover active:scale-95 group transition-all"
              >
                <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
                <span>Jelajahi Koleksi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="liquid-glass px-6 py-3.5 rounded-2xl text-slate-700 hover:text-cyan-700 font-semibold text-sm sm:text-base hover:bg-white/80 active:scale-95 transition-all border border-white/80 shadow-liquid-sm flex items-center gap-2 group"
              >
                <span>Selebihnya</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Quick Highlight Stats in Liquid Glass Chips */}
            <div className="grid grid-cols-3 gap-3 pt-4 w-full max-w-lg">
              <div className="liquid-glass-subtle p-3 rounded-2xl text-center border border-white/70">
                <Users className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                <p className="font-extrabold text-slate-900 text-sm sm:text-base">2.000+</p>
                <p className="text-[11px] text-slate-500 font-medium">Pengunjung/Hari</p>
              </div>

              <div className="liquid-glass-subtle p-3 rounded-2xl text-center border border-white/70">
                <BookOpen className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <p className="font-extrabold text-slate-900 text-sm sm:text-base">500+</p>
                <p className="text-[11px] text-slate-500 font-medium">Judul Pilihan</p>
              </div>

              <div className="liquid-glass-subtle p-3 rounded-2xl text-center border border-white/70">
                <ShieldCheck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <p className="font-extrabold text-slate-900 text-sm sm:text-base">Nyaman</p>
                <p className="text-[11px] text-slate-500 font-medium">Spot Membaca</p>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Glass Illustrated Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Ambient Glowing Halo */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-400/20 via-sky-400/20 to-indigo-400/20 blur-3xl -z-10 animate-pulse-glow" />

            {/* Liquid Glass Showcase Card */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-liquid-lg border border-white/90 relative max-w-md w-full animate-float-slow">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-100/70 px-2.5 py-0.5 rounded-full border border-cyan-200/50">
                  WIR Interactive
                </span>
              </div>

              <div className="relative flex justify-center items-center py-4">
                <Image
                  className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  src="/pngtree-library-reading-student-png-image_5420476.png"
                  alt="Ilustrasi mahasiswa sedang membaca buku di perpustakaan WIR"
                  width={400}
                  height={400}
                  priority
                />
              </div>

              <div className="mt-2 text-center text-xs text-slate-600 font-medium bg-white/60 backdrop-blur-sm rounded-xl py-2 px-3 border border-white/60 shadow-sm">
                ✨ Ruang baca ramah mahasiswa dengan suasana tenang & modern
              </div>
            </div>

          </div>

        </section>

        {/* SECTION 2: KOLEKSI TERPOPULER & REKOMENDASI PUSTAKAWAN */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/60 pb-3 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Paling Banyak Dibaca</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Koleksi Buku Terpopuler Minggu Ini
              </h2>
            </div>
            <Link
              href="/category"
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group"
            >
              <span>Lihat Semua Katalog</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularBooks.map((book) => {
              const categoryLink = book.categoryId ? `/category/${book.categoryId}` : '/category';
              const categoryName = book.categoryName || book.category || 'Koleksi WIR';
              return (
                <div
                  key={book.id || book.title}
                  className="liquid-glass liquid-card-lift rounded-3xl p-5 shadow-liquid border border-white/90 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Book Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full bg-gradient-to-r ${book.tagColor || 'from-cyan-500 to-sky-600'} shadow-sm`}>
                      {book.tag || 'Rekomendasi'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{book.rating || '4.9'}</span>
                    </div>
                  </div>

                  {/* Book Cover Frame */}
                  <div className="w-full h-44 rounded-2xl bg-white/70 backdrop-blur-md p-3 shadow-inner flex items-center justify-center border border-white/90 mb-4 group-hover:shadow-md transition-all relative overflow-hidden">
                    <Image
                      className="object-contain p-2 drop-shadow-md group-hover:scale-105 transition-transform"
                      src={book.image || '/pngtree-library-reading-student-png-image_5420476.png'}
                      alt={book.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-cyan-700 uppercase tracking-wider">
                      {categoryName}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-cyan-700 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500">{book.author || 'Pustakawan WIR'}</p>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[11px] font-medium">{book.borrows || '100+ dipinjam'}</span>
                    <Link
                      href={categoryLink}
                      className="text-cyan-700 font-bold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: MENGAPA PERPUSTAKAAN WIR (BENTO GRID NILAI UNGGULAN) */}
        <section className="flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Standar Fasilitas
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kenyamanan Membaca Generasi Digital
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kami menyatukan ketenangan perpustakaan klasik dengan fasilitas teknologi modern untuk memberikan pengalaman membaca terbaik bagi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="liquid-glass-heavy liquid-card-lift rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col justify-between gap-4 group"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md border border-white/50 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-cyan-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/40 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tersedia Setiap Hari</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: JADWAL EVENT & BEDAH BUKU TERDEKAT */}
        <section className="liquid-glass-heavy rounded-3xl p-6 sm:p-10 shadow-liquid-lg border border-white/90 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/60 pb-4 gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>Agenda Komunitas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Kegiatan Literasi & Workshop Terdekat
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group"
            >
              <span>Lihat Liputan Acara di Blog</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.title}
                className="liquid-glass-subtle p-5 rounded-3xl border border-white/80 flex flex-col justify-between gap-4 hover:bg-white/80 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100/70 px-2.5 py-0.5 rounded-full border border-cyan-200/60">
                    {evt.seats}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-600" /> {evt.date}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Pembicara: {evt.speaker}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/50 flex flex-col gap-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: KATA PEMBACA & TESTIMONI */}
        <section className="flex flex-col gap-6">
          <div className="text-center flex flex-col items-center gap-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Suara Pengunjung Perpustakaan WIR
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pengalaman nyata membaca dan berkegiatan dari kawan-kawan mahasiswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="liquid-glass rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &quot;{item.quote}&quot;
                </p>

                <div className="pt-3 border-t border-slate-200/50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h4>
                    <p className="text-[10px] text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: CTA BANNER GABUNG & KUNJUNGAN */}
        <section className="liquid-glass-heavy rounded-3xl p-8 sm:p-12 shadow-liquid-lg border border-white/90 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-3 text-center lg:text-left max-w-xl z-10">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest">
              Mari Bergabung Bersama Kami
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Siap Memulai Petualangan Literasi Anda Hari Ini?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kunjungi Perpustakaan WIR di Cikarang atau akses ratusan koleksi buku dan artikel online kami. Ruang baca kami selalu terbuka hangat untuk Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 z-10 flex-shrink-0">
            <Link
              href="/category"
              className="liquid-button-accent px-6 py-3.5 rounded-2xl text-white font-bold text-sm flex items-center gap-2 shadow-liquid-button active:scale-95 transition-all"
            >
              <span>Jelajahi Semua Buku</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/services"
              className="liquid-glass px-6 py-3.5 rounded-2xl text-slate-700 hover:text-cyan-700 font-bold text-sm hover:bg-white/80 active:scale-95 transition-all border border-white/80 shadow-sm"
            >
              Panduan Layanan
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  let popularBooks: BookItem[] = [];
  try {
    const booksData: any = await retrieveData('detail_categories');
    const categoriesData: any = await retrieveData('categories');

    const catMap = new Map<string, string>();
    if (Array.isArray(categoriesData)) {
      categoriesData.forEach((c: any) => {
        catMap.set(c.id, c.title || c.name || 'Koleksi');
      });
    }

    if (Array.isArray(booksData) && booksData.length > 0) {
      popularBooks = booksData.map((b: any) => ({
        id: b.id,
        title: b.title || 'Judul Buku',
        author: b.author || 'Pustakawan WIR',
        categoryId: b.categoryId || '',
        categoryName: b.categoryName || (b.categoryId ? catMap.get(b.categoryId) : '') || 'Koleksi Pilihan',
        image: b.image || '',
        rating: b.rating || '4.9',
        borrows: b.borrows || '120+ dipinjam',
        tag: b.tag || 'Unggulan',
        tagColor: b.tagColor || 'from-cyan-500 to-sky-600',
        explanation: b.explanation || '',
      }));
    }
  } catch (error) {
    console.error('getStaticProps HomePage error:', error);
  }

  return {
    props: {
      popularBooks,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
};
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
  Sparkles,
  Terminal,
  Rocket,
  Trophy,
  ArrowRight,
  Compass,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  Building2,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';

const founders = [
  {
    name: 'Muhammad Faaiz Anugrah',
    role: 'Programmer & Filsuf Terkenal',
    icon: Terminal,
    color: 'from-cyan-500 to-blue-600',
    description: 'Menjaga logika sistem, arsitektur data, dan perenungan filosofis mendalam tentang makna literasi bagi peradaban.',
    quote: '"Kode adalah puisi logika; buku adalah lentera yang menuntun arahnya."',
  },
  {
    name: 'Syahriza Ikhsan Alsistani',
    role: 'CEO Google Katanya Mah',
    icon: Rocket,
    color: 'from-sky-500 to-indigo-600',
    description: 'Visioner digital yang memadukan keindahan material kaca cair (Liquid Glass) dengan kanvas 3D fotorealistik masa depan.',
    quote: '"Jika sebuah ruang baca bisa seindah fiksi ilmiah, siapa yang tak ingin membaca?"',
  },
  {
    name: 'Bintang Angga Pratama',
    role: 'Atlet Badminton Gagal Tenar',
    icon: Trophy,
    color: 'from-teal-500 to-emerald-600',
    description: 'Pilar energi positif, penyeimbang dinamika tim dengan sportivitas dan tawa segar di seluruh sudut ruang perpustakaan.',
    quote: '"Gagal juara di lapangan bulu tangkis, tapi kami juara di hati para pembaca WIR!"',
  },
];

const coreValues = [
  {
    title: 'Inklusivitas Terbuka',
    desc: 'Pintu perpustakaan terbuka lebar untuk siapa saja tanpa memandang status kampus, usia, atau latar belakang.',
    icon: HeartHandshake,
  },
  {
    title: 'Dialektika Kritis',
    desc: 'Menghidupkan tradisi bertanya, berdiskusi secara sehat, dan menentang kedangkalan informasi.',
    icon: Lightbulb,
  },
  {
    title: 'Estetika & Kenyamanan',
    desc: 'Memperlakukan ruang baca seperti rumah kedua yang bersih, sejuk, hening, dan memanjakan mata.',
    icon: Sparkles,
  },
  {
    title: 'Inovasi Tanpa Batas',
    desc: 'Terus bereksplorasi menyatukan dunia pustaka klasik dengan teknologi visual WebGL termutakhir.',
    icon: Compass,
  },
];

const milestones = [
  {
    year: '2023',
    title: 'Percikan Gagasan di Kantin Cikarang',
    desc: 'Tiga mahasiswa memutuskan merintis ruang baca mandiri bermodalkan rak buku patungan dan 80 judul buku koleksi pribadi.',
  },
  {
    year: '2024',
    title: 'Peresmian Portal & 5 Kategori Pustaka',
    desc: 'Website resmi diluncurkan dan koleksi berkembang mencakup buku Pemrograman, Sains, Novel, Komik, dan Sejarah.',
  },
  {
    year: '2025',
    title: 'Pembangunan Silent Pods & E-Library',
    desc: 'Fasilitas fisik diperluas dengan bilik hening ber-AC, koneksi serat optik 100Mbps, dan sistem QR Card sirkulasi digital.',
  },
  {
    year: '2026',
    title: 'Era Liquid Glass & WebGL 3D Interaktif',
    desc: 'Transformasi antarmuka digital ke standar visual kelas dunia, kini melayani lebih dari 2.000 kunjungan pembaca setiap hari.',
  },
];

const zones = [
  {
    floor: 'Lantai 1',
    name: 'Lobi Sirkulasi & Café Literasi',
    desc: 'Meja peminjaman cepat, pengembalian mandiri, sofa baca santai, dan barista kopi hangat.',
  },
  {
    floor: 'Lantai Mezzanine',
    name: 'Galeri Novel, Komik & Seni',
    desc: 'Rak fiksi komprehensif, sudut baca santai beanbag, dan display manga populer.',
  },
  {
    floor: 'Lantai 2',
    name: 'Silent Reading Pods & Riset',
    desc: 'Zona hening total dengan meja bersekat, lampu kuningan banker, dan komputer jurnal ilmiah.',
  },
  {
    floor: 'Rooftop Garden',
    name: 'Taman Diskusi Terbuka',
    desc: 'Area semi-outdoor untuk bedah buku, malam akustik puisi, dan ruang kolaborasi mahasiswa.',
  },
];

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Tentang Kami | Perpustakaan WIR</title>
        <meta
          name="description"
          content="Kisah di balik Perpustakaan WIR, dewan pengelola legendaris, nilai-nilai literasi, dan milestone perjalanan di Cikarang."
        />
      </Head>

      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col gap-20">
        
        {/* TOP HERO STORY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Illustration Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center order-2 lg:order-1">
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-liquid-lg border border-white/90 relative max-w-md w-full animate-float-slow">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/15 to-indigo-400/15 rounded-3xl -z-10 blur-xl" />

              <div className="flex justify-center items-center py-4">
                <Image
                  className="w-full h-auto object-contain drop-shadow-xl"
                  src="/hero3.png"
                  alt="Ilustrasi anggota perpustakaan WIR"
                  width={400}
                  height={400}
                  priority
                />
              </div>

              <div className="mt-2 text-center text-xs text-cyan-900 font-semibold bg-cyan-100/60 rounded-xl py-2 px-3 border border-cyan-200/50">
                📍 Negeri Wakanda cabang Cikarang • Planet Bekasi
              </div>
            </div>
          </div>

          {/* Right: Narrative Container */}
          <section className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-cyan-800 text-xs sm:text-sm font-semibold">
                Kisah di Balik Perpustakaan
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Tentang <br />
              <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Perpustakaan WIR
              </span>
            </h1>

            <div className="liquid-glass p-6 sm:p-7 rounded-3xl shadow-liquid border border-white/90">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                Perpustakaan WIR yang berlokasikan di Negeri Wakanda cabang Cikarang melewati planet Bekasi. Yang dikelola oleh tiga mahasiswa ternama, Muhammad Faaiz Anugrah (Programmer dan Filsuf terkenal), Syahriza Ikhsan Alsistani (CEO Google katanya mah), dan Bintang Angga Pratama (Atlet Badminton gagal tenar).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/about/profile"
                className="liquid-button-accent px-6 py-3.5 rounded-2xl text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-liquid-button hover:shadow-liquid-button-hover active:scale-95 transition-all"
              >
                <span>Selengkapnya (Profil & Visi)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="liquid-glass px-6 py-3.5 rounded-2xl text-slate-700 hover:text-cyan-700 font-semibold text-sm hover:bg-white/80 active:scale-95 transition-all border border-white/80"
              >
                Fasilitas & Layanan
              </Link>
            </div>

          </section>

        </div>

        {/* SECTION 2: DEWAN PENGELOLA MAHASISWA */}
        <section className="flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-600" /> Profil Penggagas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dewan Pengelola Legendaris WIR
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Tiga pilar mahasiswa di balik terbentuk dan bertumbuhnya ruang baca mandiri ini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder) => {
              const Icon = founder.icon;
              return (
                <div
                  key={founder.name}
                  className="liquid-glass-heavy liquid-card-lift rounded-3xl p-6 sm:p-7 shadow-liquid border border-white/90 flex flex-col justify-between gap-5 group"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${founder.color} flex items-center justify-center text-white shadow-lg border border-white/40 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {founder.name}
                      </h3>
                      <span className="text-xs font-semibold text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-200/50 w-fit mx-auto">
                        {founder.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {founder.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl liquid-glass-subtle border border-white/80 text-[11px] text-slate-600 italic text-center">
                    {founder.quote}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: NILAI-NILAI UTAMA (CORE VALUES) */}
        <section className="flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Prinsip Dasar yang Menuntun WIR
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Nilai-nilai yang kami rawat di setiap helai buku dan layanan yang kami berikan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="liquid-glass rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{val.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: MILESTONE & TIMELINE PERJALANAN */}
        <section className="liquid-glass-heavy rounded-3xl p-6 sm:p-10 shadow-liquid-lg border border-white/90 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Napak Tilas Perjalanan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dari Rak Kayu Sederhana ke Platform Modern
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="liquid-glass-subtle p-5 rounded-2xl border border-white/80 flex flex-col gap-2.5 relative"
              >
                <span className="text-2xl font-black text-cyan-600 font-mono">
                  {m.year}
                </span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: ZONA & FASILITAS GEDUNG */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/60 pb-3 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>Denah & Ruang Membaca</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Empat Zona Kenyamanan Membaca
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group"
            >
              <span>Pelajari Detail Fasilitas</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {zones.map((z) => (
              <div
                key={z.name}
                className="liquid-glass rounded-3xl p-5 shadow-liquid border border-white/90 flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100/70 px-2.5 py-0.5 rounded-full">
                    {z.floor}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-2">{z.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{z.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/40 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Akses Terbuka</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;
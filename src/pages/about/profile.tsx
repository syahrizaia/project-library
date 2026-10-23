import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  Sparkles,
  ArrowLeft,
  Compass,
  Target,
  History,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  BookMarked,
  HeartHandshake,
  Lightbulb,
  Building2,
  Users2,
  CheckCircle,
} from 'lucide-react';

const missionPoints = [
  {
    title: 'Akses Pengetahuan Inklusif',
    desc: 'Menyediakan akses koleksi pustaka bermutu tinggi tanpa memandang latar belakang sosial, ekonomi, dan usia.',
    icon: BookMarked,
  },
  {
    title: 'Inovasi Digital & WebGL',
    desc: 'Memanfaatkan teknologi visual 3D modern untuk menghidupkan pengalaman membaca yang menarik bagi generasi muda.',
    icon: Lightbulb,
  },
  {
    title: 'Komunitas & Ruang Diskusi',
    desc: 'Membangun ekosistem intelektual melalui forum bedah buku, workshop penulisan, dan kolaborasi mahasiswa.',
    icon: Users2,
  },
  {
    title: 'Sanctuary Membaca yang Tenang',
    desc: 'Menjadi ruang ketiga (third place) yang aman, sejuk, dan inspiratif di tengah hiruk-pikuk kota Cikarang.',
    icon: HeartHandshake,
  },
];

const faqs = [
  {
    q: 'Siapa saja yang boleh berkunjung ke Perpustakaan WIR?',
    a: 'Perpustakaan WIR terbuka untuk seluruh lapisan masyarakat—terutama mahasiswa, pelajar sekolah, peneliti independen, hingga masyarakat umum yang memiliki minat membaca dan belajar.',
  },
  {
    q: 'Apakah pembuatan kartu anggota dipungut biaya?',
    a: 'Tidak sama sekali! Pembuatan kartu anggota Perpustakaan WIR 100% GRATIS. Anda hanya perlu membawa kartu identitas (KTP/KTM/Kartu Pelajar) atau mendaftar melalui formulir digital di meja sirkulasi.',
  },
  {
    q: 'Berapa banyak buku yang dapat dipinjam sekaligus?',
    a: 'Setiap anggota terdaftar berhak meminjam hingga 3 (tiga) buku fisik sekaligus dengan durasi standar 14 hari kalender, dan dapat diperpanjang 1x secara online.',
  },
  {
    q: 'Bagaimana jika saya terlambat mengembalikan buku?',
    a: 'Kami mengutamakan kesadaran literasi bersama. Denda keterlambatan bersifat edukatif sebesar Rp1.000/hari/buku, atau Anda dapat menggantinya dengan menyumbangkan 1 buku bacaan layak untuk program Book Sharing.',
  },
  {
    q: 'Bisakah memesan ruang diskusi kelompok (Discussion Hub)?',
    a: 'Tentu bisa! Ruang Discussion Hub dapat direservasi secara gratis oleh kelompok belajar (3–8 orang) dengan konfirmasi ke staf sirkulasi atau mengirimkan pesan melalui halaman Kritik & Saran minimal H-1.',
  },
];

const AboutProfilePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Profil Mendalam & Visi Misi | Perpustakaan WIR</title>
        <meta
          name="description"
          content="Sejarah perjalanan, visi & misi, tata tertib pengunjung, dan FAQ lengkap Perpustakaan WIR Cikarang."
        />
      </Head>

      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col gap-14">
        
        {/* Navigation Breadcrumb */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm text-cyan-800 text-xs sm:text-sm font-semibold hover:bg-white/80 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Tentang</span>
          </Link>

          <span className="text-xs font-semibold text-slate-500 liquid-glass-subtle px-3 py-1 rounded-full border border-white/70">
            Profil Resmi WIR
          </span>
        </div>

        {/* Hero Title */}
        <section className="text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide">
              Manifes & Riwayat Literasi
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Profil Mendalam <br />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Perpustakaan WIR
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Berawal dari mimpi sederhana tiga sekawan di bangku kuliah, berkembang menjadi pusat literasi modern yang menyeimbangkan warisan cetak dan teknologi masa depan.
          </p>
        </section>

        {/* Bento Grid Part 1: Visi & Misi */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card Visi Utama (5 Kolom) */}
          <div className="lg:col-span-5 liquid-glass-heavy rounded-3xl p-6 sm:p-8 shadow-liquid-lg border border-white/90 flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-md border border-white/40">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-800 uppercase tracking-widest">
                Visi Jangka Panjang
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Menjadi Episentrum Literasi Paling Inklusif & Futuristik di Jawa Barat
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Menciptakan ruang belajar di mana tradisi membaca buku kertas bersanding harmonis dengan estetika digital, menginspirasi ribuan pemuda untuk berpikir kritis dan berwawasan luas.
              </p>
            </div>

            <div className="p-4 rounded-2xl liquid-glass-subtle border border-white/80 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
              <div className="flex flex-col text-xs text-slate-700">
                <span className="font-bold">Didirikan pada Tahun 2023</span>
                <span className="text-slate-500">Negeri Wakanda cabang Cikarang, Planet Bekasi</span>
              </div>
            </div>
          </div>

          {/* Card 4 Pilar Misi (7 Kolom) */}
          <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-8 shadow-liquid border border-white/90 flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Compass className="w-4 h-4 text-sky-600" /> Komitmen Strategis
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Empat Pilar Misi Perpustakaan WIR
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {missionPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="liquid-glass-subtle p-4 rounded-2xl border border-white/80 flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{point.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{point.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200/50">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Dievaluasi dan diperbarui berkala bersama dewan pengelola mahasiswa</span>
            </div>
          </div>

        </section>

        {/* Bento Grid Part 2: Narasi Sejarah & Nilai Filosofis */}
        <section className="liquid-glass-heavy rounded-3xl p-6 sm:p-10 shadow-liquid-lg border border-white/90 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Napak Tilas & Sejarah Pendirian</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dari Tugas Kelompok Menjadi Rumah Bagi Ribuan Pembaca
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="liquid-glass-subtle p-5 rounded-2xl border border-white/80 flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-base">Awal Mula yang Penuh Cita-Cita</h3>
              <p>
                Pada penghujung tahun 2023 di sebuah sudut kota industri Cikarang, tiga mahasiswa—Muhammad Faaiz Anugrah (seorang pemikir filosofis arsitektur perangkat lunak), Syahriza Ikhsan Alsistani (visioner digital yang bermimpi memimpin raksasa teknologi), dan Bintang Angga Pratama (sang penyeimbang dinamika tim dengan humor dan sportivitas)—menyadari minimnya ruang baca yang nyaman dan berjiwa muda.
              </p>
              <p>
                Mereka memutuskan untuk mendirikan sebuah perpustakaan independen yang tidak hanya memajang buku di rak berdebu, tetapi juga merawat percakapan, gagasan kritis, dan rasa ingin tahu.
              </p>
            </div>

            <div className="liquid-glass-subtle p-5 rounded-2xl border border-white/80 flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-base">Filosofi Nama &quot;WIR&quot;</h3>
              <p>
                Kata &quot;WIR&quot; diambil dari seruan persaudaraan dan keakraban generasi masa kini. Membaca buku tidak lagi dipandang sebagai kegiatan kaku dan menjemukan, melainkan petualangan seru yang dijalani bersama sahabat-sahabat terbaik.
              </p>
              <p>
                Kini, perpustakaan terus berkembang dengan integrasi teknologi web mutakhir, kanvas 3D interaktif, serta kurasi ratusan koleksi literatur berbobot tinggi.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid Part 3: Tata Tertib & Kode Etik */}
        <section className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-liquid border border-white/90 flex flex-col gap-5">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Tata Tertib Pengunjung</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Etika Bersama demi Kenyamanan Membaca
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/80 flex flex-col gap-1.5">
              <span className="font-bold text-slate-900">1. Menjaga Ketenangan</span>
              <p className="text-slate-600 leading-relaxed">
                Gunakan headset saat mendengarkan audio dan atur nada dering ponsel pada mode senyap (silent).
              </p>
            </div>

            <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/80 flex flex-col gap-1.5">
              <span className="font-bold text-slate-900">2. Merawat Bahan Pustaka</span>
              <p className="text-slate-600 leading-relaxed">
                Dilarang melipat halaman, mencoret, atau merusak fisik buku. Gunakan pembatas buku yang disediakan.
              </p>
            </div>

            <div className="liquid-glass-subtle p-4 rounded-2xl border border-white/80 flex flex-col gap-1.5">
              <span className="font-bold text-slate-900">3. Makanan & Minuman</span>
              <p className="text-slate-600 leading-relaxed">
                Minuman tertutup diperkenankan. Makanan berat hanya diizinkan di area Café Literasi semi-outdoor.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid Part 4: FAQ Interaktif */}
        <section className="liquid-glass-heavy rounded-3xl p-6 sm:p-10 shadow-liquid-lg border border-white/90 flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm w-fit mx-auto sm:mx-0">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-cyan-800 text-xs sm:text-sm font-semibold">
                Pertanyaan yang Sering Diajukan (FAQ)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Semua yang Perlu Anda Ketahui
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="liquid-glass rounded-2xl border border-white/90 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-cyan-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-600 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200 border-t border-slate-200/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 rounded-2xl liquid-glass-subtle border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-medium">Masih punya pertanyaan yang belum terjawab?</span>
            <Link
              href="/cas"
              className="liquid-button-accent px-5 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <span>Hubungi Kami via Kritik & Saran</span>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutProfilePage;

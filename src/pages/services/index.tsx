import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  Sparkles,
  BookOpen,
  CreditCard,
  Clock,
  RefreshCw,
  Wifi,
  Laptop,
  Headphones,
  Coffee,
  VolumeX,
  Users,
  Printer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
} from 'lucide-react';

const borrowingSteps = [
  {
    step: '01',
    title: 'Kartu Anggota Digital',
    desc: 'Daftar instan di meja sirkulasi atau via web untuk mendapatkan QR Card anggota aktif.',
    icon: CreditCard,
    accent: 'from-cyan-500 to-sky-600',
  },
  {
    step: '02',
    title: 'Pilih Koleksi Buku',
    desc: 'Jelajahi rak fisik atau katalog online, maksimal 3 buku per transaksi peminjaman.',
    icon: BookOpen,
    accent: 'from-sky-500 to-indigo-600',
  },
  {
    step: '03',
    title: 'Durasi 14 Hari',
    desc: 'Nikmati waktu membaca yang leluasa hingga dua pekan dengan pengingat otomatis.',
    icon: Clock,
    accent: 'from-indigo-500 to-violet-600',
  },
  {
    step: '04',
    title: 'Perpanjangan Online',
    desc: 'Perpanjang masa pinjam 1x melalui portal web tanpa harus datang ke perpustakaan.',
    icon: RefreshCw,
    accent: 'from-teal-500 to-emerald-600',
  },
];

const digitalServices = [
  {
    title: 'Akses E-Book 24/7',
    desc: 'Ribuan judul buku digital yang dapat diakses kapan saja melalui smartphone dan laptop.',
    icon: Laptop,
  },
  {
    title: 'Wi-Fi Hyper-Speed',
    desc: 'Koneksi internet serat optik dedicated 100 Mbps di seluruh sudut ruang baca.',
    icon: Wifi,
  },
  {
    title: 'Audio-Visual Corner',
    desc: 'Pod multimedia untuk mendengarkan audio book, kuliah umum, dan video dokumenter ilmiah.',
    icon: Headphones,
  },
  {
    title: 'Self-Service Print & Scan',
    desc: 'Stasiun cetak dan pemindai dokumen mandiri untuk mendukung tugas akhir dan riset mahasiswa.',
    icon: Printer,
  },
];

const readingSpaces = [
  {
    name: 'Silent Reading Pods',
    tag: 'Fokus Penuh',
    desc: 'Bilik individual kedap suara dengan lampu meja kuningan ergonomis untuk konsentrasi mutlak.',
    icon: VolumeX,
  },
  {
    name: 'Discussion & Collab Hub',
    tag: 'Kerja Tim',
    desc: 'Ruang diskusi interaktif dengan papan tulis kaca dan layar presentasi nirkabel.',
    icon: Users,
  },
  {
    name: 'Café Literasi WIR',
    tag: 'Santai & Hangat',
    desc: 'Area membaca semi-outdoor dengan aroma kopi segar, sofa empuk, dan alunan musik instrumental lembut.',
    icon: Coffee,
  },
];

const ServicesPage = () => {
  return (
    <>
      <Head>
        <title>Layanan & Fasilitas | Perpustakaan WIR</title>
        <meta
          name="description"
          content="Panduan peminjaman buku, keanggotaan digital, fasilitas ruang baca, dan layanan literasi modern di Perpustakaan WIR Cikarang."
        />
      </Head>

      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col gap-14">
        
        {/* Header Hero Section */}
        <section className="text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide">
              Layanan & Fasilitas Terpadu
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Eksplorasi Layanan <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Perpustakaan WIR
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Menghadirkan ekosistem membaca yang cerdas, nyaman, dan inklusif. Dari peminjaman buku fisik hingga fasilitas riset digital kelas dunia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/category"
              className="liquid-button-accent px-6 py-3.5 rounded-2xl text-white font-semibold text-sm flex items-center gap-2 shadow-liquid-button hover:shadow-liquid-button-hover active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Cari Buku di Katalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/cas"
              className="liquid-glass px-6 py-3.5 rounded-2xl text-slate-700 hover:text-cyan-700 font-semibold text-sm hover:bg-white/80 active:scale-95 transition-all border border-white/80 shadow-liquid-sm"
            >
              Konsultasi & Saran
            </Link>
          </div>
        </section>

        {/* Bento Grid Part 1: Alur Peminjaman Buku */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/60 pb-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Alur Peminjaman & Keanggotaan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Empat langkah mudah untuk meminjam koleksi buku fisik di Perpustakaan WIR
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-200/50 w-fit">
              Gratis untuk Mahasiswa & Umum
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {borrowingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="liquid-glass liquid-card-lift rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-cyan-500 transition-colors font-mono">
                      {step.step}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${step.accent} flex items-center justify-center text-white shadow-md border border-white/50 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-cyan-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/40 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Terverifikasi Otomatis</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bento Grid Part 2: Layanan Literasi Digital & Fasilitas Ruang Baca */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Kolom Kiri: Layanan Digital (7 Kolom) */}
          <div className="lg:col-span-7 liquid-glass-heavy rounded-3xl p-6 sm:p-8 shadow-liquid-lg border border-white/90 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase tracking-wider">
                <Laptop className="w-4 h-4 text-cyan-600" />
                <span>Teknologi & Literasi Digital</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Akses Pengetahuan Tanpa Batas Ruang
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kami melengkapi perpustakaan fisik dengan infrastruktur teknologi termutakhir untuk menunjang kebutuhan tugas kuliah, riset ilmiah, dan hobi membaca Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {digitalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="liquid-glass-subtle p-4 rounded-2xl border border-white/80 flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{service.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{service.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10 p-4 rounded-2xl border border-cyan-300/30 flex items-center justify-between text-xs text-slate-700 font-medium">
              <span>Pertanyaan seputar akses e-journal dan software riset?</span>
              <Link href="/cas" className="text-cyan-700 font-bold hover:underline flex items-center gap-1">
                Tanya Pustakawan <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Fasilitas Ruang Baca (5 Kolom) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 shadow-liquid border border-white/90 flex flex-col gap-4 h-full justify-between">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Coffee className="w-4 h-4" /> Zona Ruang Baca
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Kenyamanan Visual & Akustik
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Pilihan area yang dirancang sesuai preferensi gaya belajar Anda.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {readingSpaces.map((space) => {
                  const Icon = space.icon;
                  return (
                    <div
                      key={space.name}
                      className="liquid-glass-subtle p-3.5 rounded-2xl border border-white/80 flex items-start gap-3.5 hover:bg-white/80 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{space.name}</h4>
                          <span className="text-[10px] font-semibold text-cyan-800 bg-cyan-100/70 px-2 py-0.5 rounded-full">
                            {space.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{space.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Pengunjung diwajibkan menjaga ketenangan di seluruh area Silent Pods.</span>
              </div>
            </div>
          </div>

        </section>

        {/* Bento Grid Part 3: Regulasi & Jam Pelayanan */}
        <section className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-liquid border border-white/90 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-extrabold text-lg text-slate-900">Jam Sirkulasi & Pelayanan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Layanan fisik meja sirkulasi dibuka setiap hari kerja pukul 08.00–16.00 WIB dan akhir pekan pukul 09.00–15.00 WIB.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-extrabold text-lg text-slate-900">Ketentuan Bebas Denda</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pengembalian buku sebelum masa jatuh tempo tidak dikenakan biaya apa pun. Sistem kami akan mengirimkan pengingat H-2 via WhatsApp & Email.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-extrabold text-lg text-slate-900">Sumbang Koleksi Buku</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Punya buku bekas berkualitas yang ingin dibagikan? Program *Book Sharing* kami siap menyalurkan ilmu Anda ke pembaca lain.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default ServicesPage;

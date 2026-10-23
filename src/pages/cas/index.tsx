import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { retrieveData } from '@/lib/firebase/service';
import {
  MessageSquareHeart,
  User,
  Mail,
  Phone,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  Star,
  BookPlus,
  Coffee,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export type CasFeedback = {
  id?: string;
  name: string;
  role?: string;
  avatar?: string;
  category: string;
  date?: string;
  message: string;
  status?: string;
  statusColor?: string;
  adminReply?: string;
  createdAt?: string;
};

const categories = [
  { id: 'buku', label: 'Usulan Judul Buku', icon: BookPlus },
  { id: 'fasilitas', label: 'Fasilitas & Ruang Baca', icon: Coffee },
  { id: 'layanan', label: 'Layanan & Pustakawan', icon: Sparkles },
  { id: 'lainnya', label: 'Pertanyaan & Ide Umum', icon: HelpCircle },
];

const satisfactionStats = [
  {
    value: '98.6%',
    label: 'Tingkat Kepuasan',
    desc: 'Berdasarkan survei 2.000+ pembaca bulanan',
    icon: Star,
    color: 'from-amber-400 to-orange-500',
  },
  {
    value: '< 24 Jam',
    label: 'Respon Cepat',
    desc: 'Waktu rata-rata tim menindaklanjuti pesan',
    icon: Clock,
    color: 'from-cyan-500 to-sky-600',
  },
  {
    value: '420+',
    label: 'Buku Ditambahkan',
    desc: 'Judul baru hasil usulan langsung pengunjung',
    icon: BookPlus,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    value: '1.450+',
    label: 'Aspirasi Masuk',
    desc: 'Telah diproses dan direalisasikan sejak 2023',
    icon: TrendingUp,
    color: 'from-indigo-500 to-violet-600',
  },
];

interface ContactPageProps {
  initialFeedbacks?: CasFeedback[];
}

const ContactPage = ({ initialFeedbacks = [] }: ContactPageProps) => {
  const [feedbacks, setFeedbacks] = useState<CasFeedback[]>(initialFeedbacks);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Usulan Judul Buku');
  
  // Controlled form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Client-side revalidation to fetch real-time fresh feedbacks from Firestore
  useEffect(() => {
    setIsLoadingFeedbacks(true);
    fetch('/api/cas')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((res) => {
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setFeedbacks(res.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch real-time cas feedback:', err);
      })
      .finally(() => {
        setIsLoadingFeedbacks(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/cas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: selectedCategory,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.status) {
        throw new Error(result.message || 'Gagal mengirim aspirasi ke database.');
      }

      // Prepend newly created Firestore document to local state
      if (result.data) {
        setFeedbacks((prev) => [result.data, ...prev]);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Auto dismiss success toast after 6 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    } catch (err: any) {
      console.error('Error submitting feedback:', err);
      setSubmitError(err.message || 'Terjadi kesalahan sistem saat menghubungi database Firebase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kritik & Saran | Perpustakaan WIR</title>
        <meta
          name="description"
          content="Kirimkan aspirasi, kritik, saran, atau usulan buku baru untuk Perpustakaan WIR Cikarang. Suara Anda tersimpan langsung di database kami."
        />
      </Head>

      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col gap-16">
        
        {/* Top Header Hero */}
        <section className="text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm">
            <MessageSquareHeart className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide">
              Kotak Suara & Forum Aspirasi WIR
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Kritik, Saran & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Usulan Koleksi Buku
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Perpustakaan WIR tumbuh dari suara para pembacanya. Sampaikan aspirasi, keluhan layanan, atau usulkan judul buku favorit Anda agar kami sediakan di rak.
          </p>
        </section>

        {/* Section 1: Main Grid (Interactive Form on Left, Illustrated Showcase & Hotline on Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Form Panel */}
          <div className="lg:col-span-7 flex flex-col z-10 w-full">
            <div className="liquid-glass-heavy rounded-3xl p-6 sm:p-10 shadow-liquid-lg border border-white/90 relative">
              
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest">
                  Formulir Masukan Resmi
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Kirim Pesan ke Tim Perpustakaan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Data masukan Anda tersimpan secara aman di database Firebase dan ditinjau langsung oleh pustakawan jaga.
                </p>
              </div>

              {/* Category Chips Selector */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xs font-bold text-slate-700">
                  Pilih Kategori Masukan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.label;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.label)}
                        className={`p-2.5 rounded-2xl text-xs font-semibold flex flex-col items-center text-center gap-1.5 transition-all duration-200 border ${
                          isSelected
                            ? 'bg-gradient-to-tr from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/30 border-white/60 scale-[1.02]'
                            : 'liquid-glass-subtle text-slate-700 hover:bg-white/80 border-white/70'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-cyan-600'}`} />
                        <span className="leading-tight text-[11px]">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                {/* Field: Nama */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Nama Lengkap</span>
                  </label>
                  <input
                    className="liquid-input rounded-2xl px-4 py-3 text-sm placeholder:text-slate-400 font-medium w-full"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda..."
                    required
                  />
                </div>

                {/* Field: Email & Telepon Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Alamat Email</span>
                    </label>
                    <input
                      className="liquid-input rounded-2xl px-4 py-3 text-sm placeholder:text-slate-400 font-medium w-full"
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@gmail.com"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Nomor WhatsApp (Opsional)</span>
                    </label>
                    <input
                      className="liquid-input rounded-2xl px-4 py-3 text-sm placeholder:text-slate-400 font-medium w-full"
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812-xxxx-xxxx"
                    />
                  </div>
                </div>

                {/* Field: Pesan */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Detail Kritik, Saran, atau Usulan Buku</span>
                  </label>
                  <textarea
                    className="liquid-input rounded-2xl px-4 py-3 text-sm placeholder:text-slate-400 font-medium min-h-[110px] resize-y w-full"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan masukan Anda dengan jelas (misal: Judul buku impian, pengarang, fasilitas ruang baca, dsb)..."
                    required
                  />
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-400/50 text-rose-900 text-xs font-semibold flex items-center gap-3 animate-in fade-in duration-300">
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <p>{submitError}</p>
                  </div>
                )}

                {/* Success Toast Banner */}
                {isSubmitted && (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/50 text-emerald-900 text-xs font-semibold flex items-center gap-3 animate-in fade-in duration-300">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold">Masukan Berhasil Disimpan di Firebase!</p>
                      <p className="font-normal text-[11px] text-emerald-800">
                        Terima kasih banyak WIR! Masukan Anda telah masuk ke sistem database kami dan akan segera ditinjau tim pustakawan.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  className="liquid-button-accent mt-2 py-3.5 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-liquid-button hover:shadow-liquid-button-hover active:scale-95 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim ke Firebase...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Masukan Anda</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Right Column: Illustration Pedestal & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6 z-10 w-full">
            
            {/* Visual Glass Showcase Card */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-liquid border border-white/90 flex flex-col gap-5 relative overflow-hidden">
              <div className="w-full h-48 sm:h-56 relative rounded-2xl overflow-hidden shadow-inner bg-gradient-to-tr from-cyan-100/60 to-sky-200/40 border border-white/80">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                  alt="Ruang Baca Tenang Perpustakaan WIR"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1.5 drop-shadow">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    Ruang Baca Tenang & Silent Pods Cikarang
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                  Komitmen Pelayanan Prima
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kami percaya bahwa perpustakaan modern harus adaptif dan mendengar kebutuhan pemustakanya. Setiap buku baru yang kami beli selalu mempertimbangkan daftar wishlist pembaca di sini.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/50">
                <div className="liquid-glass-subtle p-3 rounded-2xl border border-white/70 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Respon Layanan</p>
                    <p className="text-xs font-extrabold text-slate-800">&lt; 24 Jam Kerja</p>
                  </div>
                </div>

                <div className="liquid-glass-subtle p-3 rounded-2xl border border-white/70 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Tindak Lanjut</p>
                    <p className="text-xs font-extrabold text-slate-800">100% Tercatat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Hotline Glass Card */}
            <div className="liquid-glass rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-600 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Butuh Respon Cepat?</h4>
                  <p className="text-xs text-slate-500">Hubungi langsung narahubung pustakawan</p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href="https://wa.me/6289529738778"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-subtle p-3 rounded-2xl border border-white/80 flex items-center justify-between hover:bg-white/80 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        WhatsApp Hotline WIR
                      </p>
                      <p className="text-[11px] text-slate-500">0895-2973-8778 (Chat Langsung)</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="mailto:wir@gmail.com"
                  className="liquid-glass-subtle p-3 rounded-2xl border border-white/80 flex items-center justify-between hover:bg-white/80 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        Email Redaksi WIR
                      </p>
                      <p className="text-[11px] text-slate-500">wir@gmail.com</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              <div className="mt-1 pt-2 border-t border-slate-200/50 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>Privasi data nomor & identitas Anda terjaga 100% aman.</span>
              </div>
            </div>

          </div>

        </section>

        {/* Section 2: Statistik Kepuasan & Aspirasi (Bento Grid) */}
        <section className="flex flex-col gap-6">
          <div className="text-center flex flex-col items-center gap-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dampak Nyata Suara Pengunjung
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Statistik transparansi tindak lanjut masukan pembaca di Perpustakaan WIR
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {satisfactionStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="liquid-glass liquid-card-lift rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col justify-between gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md border border-white/40 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-900 text-sm">{stat.label}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Dinding Suara Pengunjung (100% Firebase Firestore Driven) */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/60 pb-3 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Transparansi Masukan (Firebase Firestore)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Aspirasi Terbaru yang Telah Ditindaklanjuti
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Total {feedbacks.length} masukan terverifikasi di database
            </span>
          </div>

          {isLoadingFeedbacks && feedbacks.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="liquid-glass-heavy rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col gap-4 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-200/80" />
                      <div className="space-y-1.5">
                        <div className="w-28 h-3.5 bg-slate-200/80 rounded" />
                        <div className="w-20 h-2.5 bg-slate-200/60 rounded" />
                      </div>
                    </div>
                    <div className="w-24 h-5 bg-slate-200/80 rounded-full" />
                  </div>
                  <div className="w-full h-16 bg-slate-200/60 rounded-2xl" />
                  <div className="w-full h-10 bg-slate-200/40 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-8 text-center border border-white/80 shadow-liquid">
              <MessageSquareHeart className="w-10 h-10 text-cyan-600 mx-auto mb-2 opacity-60" />
              <p className="font-bold text-slate-800 text-sm">Belum ada aspirasi tersimpan.</p>
              <p className="text-xs text-slate-500 mt-1">Jadilah orang pertama yang mengirimkan masukan untuk Perpustakaan WIR!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbacks.map((item, index) => (
                <div
                  key={item.id || index}
                  className="liquid-glass-heavy rounded-3xl p-6 shadow-liquid border border-white/90 flex flex-col justify-between gap-4"
                >
                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm border border-white/60">
                        {item.avatar || (item.name ? item.name.substring(0, 2).toUpperCase() : 'WR')}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.name}</h3>
                        <p className="text-[11px] text-slate-500">{item.role || 'Pengunjung Perpustakaan'}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.statusColor || 'text-cyan-700 bg-cyan-100/70 border-cyan-300/50'}`}>
                      {item.status || 'Telah Diterima'}
                    </span>
                  </div>

                  {/* User Message */}
                  <div className="liquid-glass-subtle p-3.5 rounded-2xl border border-white/80">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      &quot;{item.message}&quot;
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-2 text-right">
                      {item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Baru saja')}
                    </span>
                  </div>

                  {/* Library Team Reply */}
                  <div className="p-3 bg-cyan-50/70 rounded-2xl border border-cyan-200/50 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      WIR
                    </div>
                    <div className="text-xs text-cyan-950 leading-relaxed">
                      <span className="font-bold text-[11px] text-cyan-800 block">Tanggapan Pustakawan:</span>
                      {item.adminReply || 'Terima kasih atas aspirasi Anda! Kami akan menindaklanjuti masukan ini dalam pembaruan layanan berikutnya.'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA Banner */}
        <section className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-liquid border border-white/90 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Ingin Menjelajahi Buku yang Sudah Tersedia?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Lihat katalog lengkap buku fiksi, teknologi, sains, dan pelajaran di rak kami.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/category"
              className="liquid-button-accent px-5 py-3 rounded-2xl text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-liquid-button active:scale-95 transition-all"
            >
              <span>Buka Katalog Buku</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/services"
              className="liquid-glass px-5 py-3 rounded-2xl text-slate-700 hover:text-cyan-700 font-semibold text-xs sm:text-sm hover:bg-white/80 active:scale-95 transition-all border border-white/80"
            >
              Panduan Layanan
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let initialFeedbacks: CasFeedback[] = [];
  try {
    const data = await retrieveData('cas');
    if (Array.isArray(data) && data.length > 0) {
      initialFeedbacks = data as CasFeedback[];
    }
  } catch (error) {
    console.error('getStaticProps cas error:', error);
  }

  return {
    props: {
      initialFeedbacks,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
};

export default ContactPage;
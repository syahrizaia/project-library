import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { retrieveData, retrieveDataById, retrieveDataByQuery } from '@/lib/firebase/service';
import { defaultCategories, defaultDetailCategories } from '@/lib/data/defaultData';
import { BookOpen, ArrowLeft, CheckCircle2, AlertTriangle, Tag } from 'lucide-react';

export type CategoryInfo = {
  id: string;
  image: string;
  title: string;
  explanation: string;
};

export type BookData = {
  id: string;
  image: string;
  title: string;
  explanation: string;
  categoryId?: string;
};

interface DetailCategoryProps {
  initialCategory: CategoryInfo | null;
  initialBooks: BookData[];
}

const DetailCategoryPage = ({ initialCategory, initialBooks }: DetailCategoryProps) => {
  const [categoryData] = useState<CategoryInfo | null>(initialCategory);
  const [detail_categories] = useState<BookData[]>(initialBooks || []);

  if (!categoryData) {
    return (
      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="liquid-glass rounded-3xl p-8 max-w-md text-center border border-rose-300/60 shadow-liquid">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">Koleksi Tidak Ditemukan</h3>
          <p className="text-sm text-slate-600 mt-1 mb-4">
            Kategori yang Anda tuju belum terdaftar di database Perpustakaan WIR.
          </p>
          <Link
            href="/category"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-32 sm:pt-40 md:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
      <main className="flex flex-col items-center gap-10">
        
        {/* Header & Breadcrumb */}
        <div className="w-full flex flex-col items-center text-center gap-3">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm text-cyan-800 text-xs sm:text-sm font-semibold hover:bg-white/80 transition-all mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Kategori</span>
          </Link>

          {/* Dynamic Category Name Header (NO RAW FIREBASE ID) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Koleksi:{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              {categoryData.title}
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            {categoryData.explanation || 'Katalog judul dan sinopsis buku terverifikasi di Perpustakaan WIR'}
          </p>

          {/* Active Category Meta Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-medium text-slate-500 border border-white/60">
            <Tag className="w-3 h-3 text-cyan-600" />
            <span>Genre: <strong className="text-slate-800">{categoryData.title}</strong></span>
            <span>•</span>
            <span>{detail_categories.length} Judul Terdaftar</span>
          </div>
        </div>

        {/* Book Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full pt-4">
          {detail_categories.map((book: BookData) => (
            <div
              key={book.id}
              className="liquid-glass liquid-card-lift rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-liquid border border-white/80 relative overflow-hidden group"
            >
              {/* Ambient Top Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-transparent to-cyan-500/5 pointer-events-none" />

              {/* Book Cover Frame in Specular Glass */}
              <div className="w-full h-64 rounded-2xl bg-white/70 backdrop-blur-md p-4 shadow-inner flex items-center justify-center border border-white/90 group-hover:shadow-md transition-all duration-300 mb-6 relative overflow-hidden">
                <Image
                  className="object-contain p-2 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  src={book.image}
                  alt={`Sampul buku: ${book.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tersedia di Rak WIR</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {book.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                  {book.explanation}
                </p>
              </div>

              {/* Card Action Pill */}
              <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Koleksi Terdaftar</span>
                <span className="font-semibold text-cyan-700 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Baca di Tempat
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Suggest More Books CTA */}
        <div className="w-full liquid-glass-subtle rounded-2xl p-6 border border-white/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800">
              Punya rekomendasi judul lain untuk kategori {categoryData.title}?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ajukan judul buku baru kepada tim kurasi perpustakaan melalui layanan CAS.
            </p>
          </div>
          <Link
            href="/cas"
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-md whitespace-nowrap transition-colors"
          >
            Usulkan Buku via CAS
          </Link>
        </div>

      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await retrieveData('categories');
    const list = Array.isArray(categories) && categories.length > 0 ? categories : defaultCategories;
    const paths = list.map((c: any) => ({
      params: { category: c.id },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    const paths = defaultCategories.map((c) => ({
      params: { category: c.id },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.category as string;
  let categoryData: CategoryInfo | null = null;
  let books: BookData[] = [];

  try {
    const docData: any = await retrieveDataById('categories', categoryId);
    if (docData) {
      categoryData = {
        id: categoryId,
        title: docData.title || docData.name || '',
        explanation: docData.explanation || '',
        image: docData.image || '',
      };
    }
  } catch (err) {
    console.error('getStaticProps retrieveDataById error:', err);
  }

  if (!categoryData) {
    categoryData = defaultCategories.find((c) => c.id === categoryId) || null;
  }

  try {
    let queryBooks: any = await retrieveDataByQuery('detail_categories', 'categoryId', '==', categoryId);
    if (!queryBooks || queryBooks.length === 0) {
      queryBooks = await retrieveDataByQuery('books', 'categoryId', '==', categoryId);
    }
    if (Array.isArray(queryBooks) && queryBooks.length > 0) {
      books = queryBooks;
    }
  } catch (err) {
    console.error('getStaticProps retrieveDataByQuery error:', err);
  }

  if (books.length === 0) {
    const filtered = defaultDetailCategories.filter((b) => b.categoryId === categoryId);
    books = filtered.length > 0 ? filtered : defaultDetailCategories.filter((b) => b.categoryId === 'ASeeEUlYKNOiPh9WAHHQ');
  }

  return {
    props: {
      initialCategory: categoryData,
      initialBooks: books,
    },
    revalidate: 60, // ISR: revalidate cache in background every 60 seconds
  };
};

export default DetailCategoryPage;
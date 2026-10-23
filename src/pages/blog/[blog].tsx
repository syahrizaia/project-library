import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { retrieveData, retrieveDataById } from '@/lib/firebase/service';
import { defaultBlogs, defaultDetailBlogs } from '@/lib/data/defaultData';
import { 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  User, 
  Bookmark 
} from 'lucide-react';

export type BlogArticle = {
  id: string;
  image: string;
  date: string;
  title: string;
  news: string;
};

interface DetailBlogProps {
  initialBlog: BlogArticle | null;
}

const DetailBlogPage = ({ initialBlog }: DetailBlogProps) => {
  const [blogData] = useState<BlogArticle | null>(initialBlog);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!blogData) {
    return (
      <div className="relative pt-32 sm:pt-40 md:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto min-h-screen flex items-center justify-center">
        <div className="liquid-glass rounded-3xl p-8 max-w-md text-center border border-rose-300/60 shadow-liquid">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">Artikel Tidak Ditemukan</h3>
          <p className="text-sm text-slate-600 mt-1 mb-4">
            Artikel yang Anda cari tidak tersedia di database Perpustakaan WIR.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Blog WIR</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-32 sm:pt-40 md:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto min-h-screen">
      <main className="flex flex-col items-center gap-8">
        
        {/* Breadcrumb Navigation - NO RAW FIREBASE ID */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle border border-cyan-300/40 shadow-liquid-sm text-cyan-800 text-xs sm:text-sm font-semibold hover:bg-white/80 transition-all w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Semua Artikel</span>
          </Link>

          {/* Replaced raw ID with Clean Article Category / Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-subtle border border-white/70 text-xs text-slate-600 font-medium w-fit">
            <Bookmark className="w-3 h-3 text-cyan-600" />
            <span className="truncate max-w-xs">{blogData.title}</span>
          </div>
        </div>

        {/* Article Presentation Deck */}
        <article className="w-full liquid-glass-heavy rounded-3xl p-6 sm:p-10 shadow-liquid-lg border border-white/90 flex flex-col gap-7">
          
          {/* Meta Header */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-100/70 border border-cyan-200/60 text-xs font-bold text-cyan-800">
              <Calendar className="w-3.5 h-3.5 text-cyan-600" />
              <span>{blogData.date}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <User className="w-3.5 h-3.5 text-cyan-600" />
              <span>Tim Editorial WIR</span>
            </div>
            <span>•</span>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-cyan-600" />
              <span>3 Menit Baca</span>
            </div>
          </div>

          {/* Article Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {blogData.title}
          </h1>

          {/* Cover Image Frame */}
          <div className="relative w-full h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-inner border border-white/80">
            <Image
              className="object-cover"
              src={blogData.image}
              alt={`Gambar artikel: ${blogData.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Article Body - Ergonomic Reading Typography */}
          <div className="liquid-glass-subtle p-6 sm:p-9 rounded-2xl border border-white/80">
            <p className="text-slate-700 text-base sm:text-lg leading-loose font-normal whitespace-pre-line">
              {blogData.news}
            </p>
          </div>

          {/* Footer Tag & Sharing Deck */}
          <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Diterbitkan oleh Tim Editorial Perpustakaan WIR</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl liquid-glass text-cyan-700 hover:text-cyan-800 font-semibold border border-white/80 transition-all hover:scale-105"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Tautan Disalin!' : 'Bagikan Artikel'}</span>
              </button>
              <Link
                href="/cas"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm transition-all"
              >
                <span>Tulis Tanggapan</span>
              </Link>
            </div>
          </div>

        </article>

      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const blogs = await retrieveData('blogs');
    const list = Array.isArray(blogs) && blogs.length > 0 ? blogs : defaultBlogs;
    const paths = list.map((b: any) => ({
      params: { blog: b.id },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    const paths = defaultBlogs.map((b) => ({
      params: { blog: b.id },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogId = params?.blog as string;
  let blogData: BlogArticle | null = null;

  try {
    let docData: any = await retrieveDataById('detail_blogs', blogId);
    if (!docData) {
      docData = await retrieveDataById('blogs', blogId);
    }
    if (docData) {
      blogData = {
        id: blogId,
        title: docData.title || '',
        news: docData.news || docData.content || '',
        date: docData.date || '16-12-2023',
        image: docData.image || '',
      };
    }
  } catch (err) {
    console.error('getStaticProps retrieveDataById error in blog:', err);
  }

  if (!blogData) {
    const fallback =
      defaultDetailBlogs.find((b) => b.id === blogId) ||
      defaultBlogs.find((b) => b.id === blogId) ||
      defaultDetailBlogs[0];
    blogData = fallback;
  }

  return {
    props: {
      initialBlog: blogData,
    },
    revalidate: 60, // ISR: revalidate in background every 60s
  };
};

export default DetailBlogPage;
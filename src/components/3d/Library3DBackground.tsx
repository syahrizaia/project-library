import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene without SSR to avoid any hydration mismatch or WebGL server errors
const FloatingBooksScene = dynamic(
  () => import('./FloatingBooksScene'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 -z-10 bg-transparent animate-pulse opacity-40 pointer-events-none" />
    ),
  }
);

interface Library3DBackgroundProps {
  className?: string;
}

export default function Library3DBackground({ className = '' }: Library3DBackgroundProps) {
  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <FloatingBooksScene />
      </Suspense>
    </div>
  );
}

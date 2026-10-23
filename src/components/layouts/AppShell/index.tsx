import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Library3DBackground from '@/components/3d/Library3DBackground';

type AppShellProps = {
  children: React.ReactNode;
};

const disableNavbar = ['/Load', '/404'];
const disableFooter = ['/Load', '/404'];

const AppShell = ({ children }: AppShellProps) => {
  const { pathname } = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Interactive 3D WebGL Library Background */}
      <Library3DBackground />

      {/* Floating Navigation Bar */}
      {!disableNavbar.includes(pathname) && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>

      {/* Liquid Glass Footer Deck */}
      {!disableFooter.includes(pathname) && <Footer />}
    </div>
  );
};

export default AppShell;
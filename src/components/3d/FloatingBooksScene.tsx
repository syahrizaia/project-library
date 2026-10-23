'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import RealisticHardcoverBook from './RealisticHardcoverBook';
import OpenLibraryBook from './OpenLibraryBook';
import ClassicBankersLamp from './ClassicBankersLamp';

// Ambient Floating Luminous Dust Motes (Sunlight through library windows)
function LibrarySunbeamMotes({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#38bdf8'); // Sky Cyan
    const colorB = new THREE.Color('#fef08a'); // Warm Amber Gold

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const mixed = colorA.clone().lerp(colorB, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() * 0.12;
    pointsRef.current.rotation.y = t * 0.25;
    pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive Parallax Rig responding to cursor
function ParallaxRig({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // On mobile screens, throttle sensitivity to prevent jitter and conserve GPU battery
    const mult = isMobile ? 0.12 : 0.45;
    const targetX = state.pointer.x * mult;
    const targetY = state.pointer.y * (mult * 0.7);

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.035;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.035;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function FloatingBooksScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none -z-10 will-change-transform">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: isMobile ? 52 : 45 }}
        dpr={isMobile ? [1, 1.1] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: isMobile ? 'default' : 'high-performance',
        }}
      >
        {/* Cinematic Ambient Lighting (Cool Sky + Warm Reading Hall) */}
        <ambientLight intensity={0.9} color="#eef2ff" />

        {/* Primary Specular Key Light (Crisp Sky Blue edge highlights) */}
        <directionalLight
          position={[6, 9, 5]}
          intensity={1.8}
          color="#38bdf8"
        />

        {/* Secondary Fill Light (Soft Teal Indigo) */}
        <directionalLight
          position={[-7, -4, 3]}
          intensity={1.2}
          color="#818cf8"
        />

        {/* Dynamic Specular Point Light for book covers */}
        <pointLight position={[2, 3, 4]} intensity={1.5} color="#06b6d4" distance={12} />

        {/* Main 3D Composition with Cursor Parallax */}
        <ParallaxRig isMobile={isMobile}>
          
          {/* 1. Classic Banker's Reading Lamp (Midground Right) */}
          <Float
            speed={1.2}
            rotationIntensity={0.2}
            floatIntensity={0.35}
            floatingRange={[-0.1, 0.1]}
          >
            <ClassicBankersLamp
              position={[4.6, -0.6, -1.8]}
              rotation={[0.1, -0.6, 0.05]}
              scale={[1.15, 1.15, 1.15]}
            />
          </Float>

          {/* 2. Open Library Book with Fluttering Pages (Upper Left) */}
          <Float
            speed={1.4}
            rotationIntensity={0.35}
            floatIntensity={0.45}
            floatingRange={[-0.15, 0.15]}
          >
            <OpenLibraryBook
              position={[-4.2, 1.6, -2.2]}
              rotation={[0.35, 0.5, -0.15]}
              scale={[1.1, 1.1, 1.1]}
            />
          </Float>

          {/* 3. Realistic Hardcover Book 1: Front Right (Sapphire Midnight Blue) */}
          <Float
            speed={1.1}
            rotationIntensity={0.4}
            floatIntensity={0.5}
            floatingRange={[-0.2, 0.2]}
          >
            <RealisticHardcoverBook
              position={[3.8, 1.8, -1.2]}
              rotation={[-0.25, -0.5, 0.2]}
              scale={[1.15, 1.15, 1.15]}
              coverColor="#0f3a5d"
              ribbonColor="#06b6d4"
            />
          </Float>

          {/* 4. Realistic Hardcover Book 2: Lower Left (Rich Burgundy Grimoire) */}
          <Float
            speed={0.9}
            rotationIntensity={0.3}
            floatIntensity={0.4}
            floatingRange={[-0.15, 0.15]}
          >
            <RealisticHardcoverBook
              position={[-3.6, -1.8, -1.6]}
              rotation={[0.3, 0.6, -0.2]}
              scale={[1.2, 1.2, 1.2]}
              coverColor="#831843"
              ribbonColor="#fbbf24"
            />
          </Float>

          {/* 5. Realistic Hardcover Book 3: Deep Background Center (Emerald Leather Archive) */}
          <Float
            speed={0.8}
            rotationIntensity={0.25}
            floatIntensity={0.3}
            floatingRange={[-0.1, 0.1]}
          >
            <RealisticHardcoverBook
              position={[0.2, 3.2, -4.5]}
              rotation={[0.4, -0.3, -0.3]}
              scale={[1.35, 1.35, 1.35]}
              coverColor="#064e3b"
              ribbonColor="#34d399"
            />
          </Float>

          {/* 6. Realistic Hardcover Book 4: Bottom Center-Right (Deep Obsidian Onyx) */}
          <Float
            speed={1.0}
            rotationIntensity={0.3}
            floatIntensity={0.35}
            floatingRange={[-0.15, 0.15]}
          >
            <RealisticHardcoverBook
              position={[1.2, -3.2, -3]}
              rotation={[-0.4, 0.3, 0.35]}
              scale={[1.1, 1.1, 1.1]}
              coverColor="#1e293b"
              ribbonColor="#f59e0b"
            />
          </Float>

          {/* Library Sunbeam Dust Motes & Atmospheric Glow */}
          <LibrarySunbeamMotes count={isMobile ? 24 : 65} />

        </ParallaxRig>
      </Canvas>
    </div>
  );
}

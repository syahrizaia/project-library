import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OpenLibraryBookProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export default function OpenLibraryBook({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: OpenLibraryBookProps) {
  const flutteringPageRef = useRef<THREE.Mesh>(null);

  // Generate curved open page geometry for the left and right spreads
  const [leftWingGeometry, rightWingGeometry] = useMemo(() => {
    // Left Wing curved open spread
    const leftGeo = new THREE.PlaneGeometry(1.2, 1.6, 16, 8);
    const leftPos = leftGeo.attributes.position;
    for (let i = 0; i < leftPos.count; i++) {
      const x = leftPos.getX(i);
      // Parabolic curve: highest near spine, drooping down toward outer edge
      const z = Math.sin((x / 1.2) * Math.PI * 0.5) * 0.16;
      leftPos.setZ(i, z);
    }
    leftGeo.computeVertexNormals();

    // Right Wing curved open spread
    const rightGeo = new THREE.PlaneGeometry(1.2, 1.6, 16, 8);
    const rightPos = rightGeo.attributes.position;
    for (let i = 0; i < rightPos.count; i++) {
      const x = rightPos.getX(i);
      const z = Math.sin((x / 1.2) * Math.PI * 0.5) * 0.16;
      rightPos.setZ(i, -z);
    }
    rightGeo.computeVertexNormals();

    return [leftGeo, rightGeo];
  }, []);

  // Fluttering top page geometry (animated in useFrame)
  const flutteringPageGeo = useMemo(() => {
    return new THREE.PlaneGeometry(1.18, 1.58, 20, 10);
  }, []);

  // Animate fluttering page softly like an ethereal library breeze
  useFrame((state) => {
    if (!flutteringPageRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = flutteringPageGeo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      if (x > -0.1) {
        // Only outer edge lifts and flutters
        const lift = (x + 0.1) * 0.28;
        const flutter = Math.sin(t * 3.5 + x * 4) * 0.05 * (x + 0.5);
        pos.setZ(i, lift + flutter);
      }
    }
    pos.needsUpdate = true;
    flutteringPageGeo.computeVertexNormals();
  });

  // Procedural printed text line texture on pages
  const textTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fdfbf7';
      ctx.fillRect(0, 0, 256, 512);

      // Fine classical typographic text lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      for (let y = 40; y < 470; y += 14) {
        const lineLen = Math.random() > 0.1 ? 210 : 140;
        ctx.beginPath();
        ctx.moveTo(24, y);
        ctx.lineTo(24 + lineLen, y);
        ctx.stroke();
      }

      // Golden illuminated initial letter at top
      ctx.fillStyle = '#d97706';
      ctx.fillRect(24, 38, 28, 28);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      
      {/* Curved Hardcover Leather Backing Underneath */}
      <mesh position={[0, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[1.35, 1.35, 1.68, 24, 1, false, Math.PI * 0.35, Math.PI * 0.3]}
        />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.4}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center Spine Hinge Bead */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.68, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Open Page Spread */}
      <group position={[-0.58, 0.02, 0]} rotation={[-Math.PI / 2, -0.15, 0]}>
        <mesh geometry={leftWingGeometry}>
          <meshStandardMaterial
            color="#faf8ef"
            map={textTexture || undefined}
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Left Page Block Depth */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[1.15, 1.58, 0.07]} />
          <meshStandardMaterial color="#f5f3e5" roughness={0.9} />
        </mesh>
      </group>

      {/* Right Open Page Spread */}
      <group position={[0.58, 0.02, 0]} rotation={[-Math.PI / 2, 0.15, 0]}>
        <mesh geometry={rightWingGeometry}>
          <meshStandardMaterial
            color="#faf8ef"
            map={textTexture || undefined}
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Right Page Block Depth */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[1.15, 1.58, 0.07]} />
          <meshStandardMaterial color="#f5f3e5" roughness={0.9} />
        </mesh>
      </group>

      {/* Fluttering Right Top Page (Ethereal breeze) */}
      <group position={[0.58, 0.04, 0]} rotation={[-Math.PI / 2, 0.15, 0]}>
        <mesh ref={flutteringPageRef} geometry={flutteringPageGeo}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.3}
            roughness={0.5}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Silk Ribbon Lying in the Gutter & Draping Down */}
      <mesh position={[0, -0.01, 0.9]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.45, 8]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.25}
          roughness={0.3}
        />
      </mesh>

    </group>
  );
}

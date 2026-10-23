import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BankersLampProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export default function ClassicBankersLamp({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: BankersLampProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  // Subtle warm breathing pulse for the banker's lamp bulb
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = Math.sin(t * 1.5) * 0.25;

    if (lightRef.current) {
      lightRef.current.intensity = 2.4 + pulse;
    }
    if (glowMeshRef.current) {
      glowMeshRef.current.scale.set(1 + pulse * 0.1, 1 + pulse * 0.1, 1);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      
      {/* 1. POLISHED BRASS BASE (Tiered weighted library base) */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.08, 32]} />
        <meshPhysicalMaterial
          color="#d97706"
          metalness={0.88}
          roughness={0.2}
          clearcoat={0.6}
        />
      </mesh>
      {/* Upper base bevel ring */}
      <mesh position={[0, -0.94, 0]}>
        <cylinderGeometry args={[0.32, 0.40, 0.05, 32]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          metalness={0.92}
          roughness={0.16}
          clearcoat={0.6}
        />
      </mesh>

      {/* 2. BRASS COLUMN / STEM */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 1.0, 16]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Decorative brass ring on column */}
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[0.07, 0.02, 12, 24]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Top swivel bracket arch */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.15, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Horizontal swivel bar */}
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.85, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.92} roughness={0.16} />
      </mesh>
      {/* Brass end finials */}
      <mesh position={[-0.43, 0.18, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.43, 0.18, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. EMERALD GREEN GLASS HOOD / SHADE (Cased Glass) */}
      <group position={[0, 0.22, 0]} rotation={[0.2, 0, 0]}>
        
        {/* Outer Emerald Glass Curved Shell */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[0.28, 0.28, 0.82, 32, 1, false, 0, Math.PI]}
          />
          <meshPhysicalMaterial
            color="#047857"
            transmission={0.62}
            opacity={0.92}
            transparent
            roughness={0.14}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Opal White Diffuser Layer */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.96, 0.98, 0.96]}>
          <cylinderGeometry
            args={[0.27, 0.27, 0.80, 24, 1, false, 0, Math.PI]}
          />
          <meshStandardMaterial
            color="#ecfdf5"
            emissive="#10b981"
            emissiveIntensity={0.25}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 4. LIGHT BULB & WARM AMBER DESK GLOW */}
        <mesh position={[0, -0.06, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>

        {/* Realistic Point Light Source casting amber library warmth */}
        <pointLight
          ref={lightRef}
          position={[0, -0.15, 0.1]}
          color="#fef08a"
          intensity={2.8}
          distance={7.5}
          decay={2}
        />

        {/* Visible warm light cone / halo beneath shade */}
        <mesh ref={glowMeshRef} position={[0, -0.4, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 32]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 5. BEADED PULL CHAIN WITH BRASS TEARDROP */}
        <mesh position={[0.25, -0.22, -0.05]}>
          <cylinderGeometry args={[0.006, 0.006, 0.38, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.25, -0.42, -0.05]}>
          <coneGeometry args={[0.02, 0.06, 8]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.18} />
        </mesh>

      </group>

    </group>
  );
}

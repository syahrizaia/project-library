import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { getLeatherTexture, getPageEdgesTexture, getGoldEmbossTexture } from './ProceduralTextures';

export interface RealisticBookProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  coverColor?: string;
  ribbonColor?: string;
  hasRibbon?: boolean;
}

export default function RealisticHardcoverBook({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  coverColor = '#0f3a5d', // Deep Midnight Navy default
  ribbonColor = '#06b6d4', // Vibrant Cyan Satin
  hasRibbon = true,
}: RealisticBookProps) {
  // Obtain cached procedural textures safely on client
  const leatherTexture = useMemo(() => getLeatherTexture(), []);
  const pageEdgesTexture = useMemo(() => getPageEdgesTexture(), []);
  const goldTexture = useMemo(() => getGoldEmbossTexture(), []);

  // Spine raised band positions (traditional library bookbinding bands)
  const raisedBandsY = [-0.62, -0.25, 0.25, 0.62];

  // Procedural curved silk bookmark ribbon geometry
  const ribbonCurve = useMemo(() => {
    const points = [
      new THREE.Vector3(0.1, 0.92, 0.05),
      new THREE.Vector3(-0.1, 0.98, 0.06),
      new THREE.Vector3(-0.64, 0.5, 0.08),
      new THREE.Vector3(-0.65, -0.3, 0.09),
      new THREE.Vector3(-0.4, -0.96, 0.12),
      new THREE.Vector3(-0.25, -1.2, 0.15),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 24, 0.022, 6, false);
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      
      {/* 1. FRONT COVER (Beveled Hardcover Board with Squares/Overhang) */}
      <RoundedBox
        args={[1.32, 1.88, 0.038]}
        radius={0.015}
        smoothness={4}
        position={[0.04, 0, 0.125]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={coverColor}
          bumpMap={leatherTexture}
          bumpScale={0.012}
          roughness={0.36}
          metalness={0.12}
          clearcoat={0.35}
          clearcoatRoughness={0.2}
          reflectivity={0.8}
        />
      </RoundedBox>

      {/* Gold Foil Embossed Frame & Insignia on Front Cover */}
      <mesh position={[0.06, 0, 0.146]}>
        <planeGeometry args={[1.1, 1.62]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.2}
          metalness={0.88}
          roughness={0.2}
          alphaMap={goldTexture}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 2. BACK COVER (Beveled Hardcover Board) */}
      <RoundedBox
        args={[1.32, 1.88, 0.038]}
        radius={0.015}
        smoothness={4}
        position={[0.04, 0, -0.125]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={coverColor}
          bumpMap={leatherTexture}
          bumpScale={0.012}
          roughness={0.36}
          metalness={0.12}
          clearcoat={0.35}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* 3. CURVED BOOK SPINE (Cylindrical Arch along Hinge) */}
      <mesh position={[-0.62, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[0.138, 0.138, 1.88, 16, 1, false, Math.PI / 2, Math.PI]}
        />
        <meshPhysicalMaterial
          color={coverColor}
          bumpMap={leatherTexture}
          bumpScale={0.015}
          roughness={0.38}
          metalness={0.12}
          clearcoat={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. RAISED SPINE BANDS (Cincin Punggung Buku Beraksen Emas) */}
      {raisedBandsY.map((y, idx) => (
        <group key={idx} position={[-0.63, y, 0]}>
          {/* Leather Raised Ring */}
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry
              args={[0.148, 0.148, 0.045, 16, 1, false, Math.PI / 2, Math.PI]}
            />
            <meshStandardMaterial
              color={coverColor}
              roughness={0.3}
              metalness={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Gold Filigree Line on Spine Band */}
          <mesh rotation={[0, 0, 0]}>
            <cylinderGeometry
              args={[0.152, 0.152, 0.012, 16, 1, false, Math.PI / 2, Math.PI]}
            />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.3}
              metalness={0.92}
              roughness={0.18}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Gold Title Plate on Spine */}
      <mesh position={[-0.765, 0.02, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.18, 0.32]} />
        <meshStandardMaterial
          color="#d97706"
          emissive="#b45309"
          emissiveIntensity={0.25}
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* 5. RECESSED IVORY PAPER LEAF BLOCK (Thousands of stacked paper leaves) */}
      <mesh position={[0.06, 0, 0]}>
        <boxGeometry args={[1.2, 1.76, 0.21]} />
        <meshStandardMaterial
          color="#fdfcf0"
          roughness={0.75}
          metalness={0.02}
          bumpMap={pageEdgesTexture}
          bumpScale={0.015}
        />
      </mesh>

      {/* Head & Tail Headbands (Jahitan Pembatas Buku Katun) */}
      <mesh position={[-0.56, 0.88, 0]}>
        <boxGeometry args={[0.08, 0.02, 0.22]} />
        <meshStandardMaterial color="#b45309" roughness={0.8} />
      </mesh>
      <mesh position={[-0.56, -0.88, 0]}>
        <boxGeometry args={[0.08, 0.02, 0.22]} />
        <meshStandardMaterial color="#b45309" roughness={0.8} />
      </mesh>

      {/* 6. SILK BOOKMARK RIBBON (Pita Sutra Menjuntai) */}
      {hasRibbon && (
        <group>
          <mesh geometry={ribbonCurve}>
            <meshPhysicalMaterial
              color={ribbonColor}
              emissive={ribbonColor}
              emissiveIntensity={0.2}
              roughness={0.25}
              metalness={0.3}
              clearcoat={0.5}
            />
          </mesh>
          {/* Ribbon Tail V-Cut Tab */}
          <mesh position={[-0.25, -1.22, 0.15]} rotation={[0.2, 0.3, -0.4]}>
            <coneGeometry args={[0.035, 0.08, 3]} />
            <meshStandardMaterial color={ribbonColor} roughness={0.3} />
          </mesh>
        </group>
      )}

    </group>
  );
}

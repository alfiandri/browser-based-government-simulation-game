'use client';

import React from 'react';
import * as THREE from 'three';

export function PresidentialOffice() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor - Polished Light Marble */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* State Red Carpet with Golden Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#881337" roughness={0.8} />
      </mesh>
      {/* Carpet Gold Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[6.8, 7.0, 4]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* North Wall (Back of Desk) */}
      <mesh position={[0, 4, -11]} receiveShadow>
        <boxGeometry args={[22, 8, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      {/* South Wall with Entrance */}
      <mesh position={[-6.5, 4, 11]} receiveShadow>
        <boxGeometry args={[9, 8, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      <mesh position={[6.5, 4, 11]} receiveShadow>
        <boxGeometry args={[9, 8, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      <mesh position={[0, 6.5, 11]} receiveShadow>
        <boxGeometry args={[4, 3, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      {/* East & West Walls */}
      <mesh position={[11, 4, 0]} receiveShadow>
        <boxGeometry args={[0.6, 8, 22]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      <mesh position={[-11, 4, 0]} receiveShadow>
        <boxGeometry args={[0.6, 8, 22]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      {/* Teak Wood Wainscoting / Boiserie along bottom of walls */}
      <mesh position={[0, 1.2, -10.65]}>
        <boxGeometry args={[21.4, 2.4, 0.15]} />
        <meshStandardMaterial color="#451a03" roughness={0.5} />
      </mesh>
      <mesh position={[-10.65, 1.2, 0]}>
        <boxGeometry args={[0.15, 2.4, 21.4]} />
        <meshStandardMaterial color="#451a03" roughness={0.5} />
      </mesh>
      <mesh position={[10.65, 1.2, 0]}>
        <boxGeometry args={[0.15, 2.4, 21.4]} />
        <meshStandardMaterial color="#451a03" roughness={0.5} />
      </mesh>

      {/* Grand Teak Executive Desk */}
      <group position={[0, 0, -4]}>
        {/* Desk Main Top */}
        <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.15, 2.2]} />
          <meshStandardMaterial color="#3b1d11" roughness={0.25} />
        </mesh>
        {/* Leather Writing Inlay on Desk */}
        <mesh position={[0, 1.53, 0.1]}>
          <boxGeometry args={[2.4, 0.02, 1.2]} />
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </mesh>
        {/* Desk Pedestals Left and Right */}
        <mesh position={[-1.7, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.35, 2.0]} />
          <meshStandardMaterial color="#2d150b" roughness={0.4} />
        </mesh>
        <mesh position={[1.7, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.35, 2.0]} />
          <meshStandardMaterial color="#2d150b" roughness={0.4} />
        </mesh>
        {/* Modesty Panel (Front of desk) */}
        <mesh position={[0, 0.8, 0.9]} castShadow>
          <boxGeometry args={[2.6, 1.2, 0.1]} />
          <meshStandardMaterial color="#361a0d" roughness={0.3} />
        </mesh>
        {/* Gold Inlay Trim on Front Panel */}
        <mesh position={[0, 0.8, 0.96]}>
          <boxGeometry args={[2.2, 0.9, 0.02]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Executive Leather Chair behind Desk */}
        <group position={[0, 0, -1.3]}>
          {/* Seat */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <boxGeometry args={[0.9, 0.15, 0.9]} />
            <meshStandardMaterial color="#1c1917" roughness={0.6} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 1.4, -0.4]} castShadow>
            <boxGeometry args={[0.85, 1.2, 0.15]} />
            <meshStandardMaterial color="#1c1917" roughness={0.6} />
          </mesh>
          {/* Chair Base & Stem */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.7, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.08, 16]} />
            <meshStandardMaterial color="#1c1917" roughness={0.4} />
          </mesh>
        </group>

        {/* Desk Accessories */}
        {/* Presidential Computer Terminal */}
        <group position={[-1.2, 1.53, -0.2]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.9, 0.55, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
          {/* Screen Display */}
          <mesh position={[0, 0.35, 0.025]}>
            <planeGeometry args={[0.84, 0.48]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          {/* Stand */}
          <mesh position={[0, 0.1, -0.05]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.2]} />
            <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>

        {/* Presidential State Document Folders */}
        <group position={[1.1, 1.54, 0.2]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.6, 0.04, 0.8]} />
            <meshStandardMaterial color="#991b1b" roughness={0.7} />
          </mesh>
          <mesh position={[0.05, 0.06, -0.05]} rotation={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[0.55, 0.03, 0.75]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
          </mesh>
        </group>

        {/* Presidential Pen Stand */}
        <mesh position={[0.4, 1.58, -0.4]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Golden Garuda Pancasila Emblem on North Wall */}
      <group position={[0, 5.2, -10.6]}>
        {/* Emblem Shield Background */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[1.3, 32]} />
          <meshStandardMaterial color="#991b1b" roughness={0.3} />
        </mesh>
        {/* Golden Ring Frame */}
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[1.25, 1.4, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Stylized Garuda Wings & Body */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.8, 1.2, 0.06]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      {/* Indonesian Flags on Left and Right of Desk */}
      {/* Left: Bendera Merah Putih */}
      <group position={[-3.2, 0, -6.5]}>
        {/* Golden Pole */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 5.0, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Golden Base */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.45, 0.2, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Top Finial */}
        <mesh position={[0, 5.05, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Red Flag Half */}
        <mesh position={[0.7, 4.3, 0]} castShadow>
          <boxGeometry args={[1.4, 0.6, 0.02]} />
          <meshStandardMaterial color="#dc2626" roughness={0.8} />
        </mesh>
        {/* White Flag Half */}
        <mesh position={[0.7, 3.7, 0]} castShadow>
          <boxGeometry args={[1.4, 0.6, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
      </group>

      {/* Right: Bendera Kepresidenan Indonesia (Kuning Emas dengan Bintang) */}
      <group position={[3.2, 0, -6.5]}>
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 5.0, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.45, 0.2, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 5.05, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[-0.7, 4.0, 0]} castShadow>
          <boxGeometry args={[1.4, 1.2, 0.02]} />
          <meshStandardMaterial color="#fef08a" roughness={0.6} />
        </mesh>
      </group>

      {/* Side Wall Map of Indonesia on West Wall */}
      <group position={[-10.6, 4.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6.4, 3.4, 0.1]} />
          <meshStandardMaterial color="#451a03" roughness={0.4} />
        </mesh>
        {/* Map Canvas Background (Sea Blue) */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[6.0, 3.0]} />
          <meshStandardMaterial color="#0284c7" roughness={0.5} />
        </mesh>
        {/* Stylized Island Masses */}
        {/* Sumatra */}
        <mesh position={[-1.8, 0.4, 0.08]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[1.6, 0.45, 0.05]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        {/* Java */}
        <mesh position={[-0.8, -0.5, 0.08]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[1.8, 0.35, 0.05]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        {/* Kalimantan */}
        <mesh position={[-0.4, 0.5, 0.08]}>
          <boxGeometry args={[1.2, 1.0, 0.05]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        {/* Sulawesi */}
        <mesh position={[0.7, 0.2, 0.08]}>
          <boxGeometry args={[0.8, 0.9, 0.05]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        {/* Papua */}
        <mesh position={[2.0, 0.1, 0.08]}>
          <boxGeometry args={[1.5, 0.8, 0.05]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
      </group>

      {/* Classic Bookshelf on East Wall */}
      <group position={[10.3, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Shelf Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.5, 5.0, 0.9]} />
          <meshStandardMaterial color="#2d150b" roughness={0.5} />
        </mesh>
        {/* Books Rows */}
        {[-1.5, -0.5, 0.5, 1.5].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.25]}>
            <boxGeometry args={[4.0, 0.65, 0.4]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#831843' : '#1e3a8a'} roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}


'use client';

import React from 'react';

export function PressRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor - Slate Gray Tile */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>

      {/* Stage Area (Raised Stage for President) */}
      <mesh position={[0, 0.3, -7]} receiveShadow castShadow>
        <boxGeometry args={[16, 0.6, 7]} />
        <meshStandardMaterial color="#881337" roughness={0.7} />
      </mesh>

      {/* Back Wall with Official State Press Backdrop */}
      <mesh position={[0, 4.5, -10.5]} receiveShadow>
        <boxGeometry args={[24, 9, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* Official Blue Press Backdrop Board */}
      <group position={[0, 4.2, -10.2]}>
        <mesh castShadow>
          <boxGeometry args={[14, 6.2, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.5} />
        </mesh>
        {/* Presidential State Seal Center */}
        <mesh position={[0, 1.4, 0.09]}>
          <circleGeometry args={[1.1, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Banner Strip */}
        <mesh position={[0, -0.6, 0.09]}>
          <planeGeometry args={[12, 0.7]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Presidential Press Podium */}
      <group position={[0, 0.6, -5]}>
        {/* Main Pillar */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[1.2, 1.4, 0.8]} />
          <meshStandardMaterial color="#3b1d11" roughness={0.3} />
        </mesh>
        {/* Podium Slanted Reading Desk */}
        <mesh position={[0, 1.45, 0.05]} rotation={[-0.25, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.1, 1.0]} />
          <meshStandardMaterial color="#451a03" roughness={0.3} />
        </mesh>
        {/* Golden Presidential Emblem on Podium Front */}
        <mesh position={[0, 0.85, 0.41]}>
          <circleGeometry args={[0.28, 24]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Dual Gooseneck Microphones */}
        <mesh position={[-0.3, 1.6, 0]} rotation={[0.2, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0.3, 1.6, 0]} rotation={[0.2, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      </group>

      {/* Journalist Seating & Media Camera Stands */}
      {[-4, -2, 2, 4].map((x, idx) => (
        <group key={idx} position={[x, 0, 3]}>
          {/* Media Camera Tripod */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Broadcast Camera Body */}
          <mesh position={[0, 2.4, 0]} castShadow>
            <boxGeometry args={[0.4, 0.35, 0.8]} />
            <meshStandardMaterial color="#09090b" roughness={0.3} />
          </mesh>
          {/* Camera Lens */}
          <mesh position={[0, 2.4, -0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* East & West Walls */}
      <mesh position={[12, 4.5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 9, 24]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
      <mesh position={[-12, 4.5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 9, 24]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
    </group>
  );
}


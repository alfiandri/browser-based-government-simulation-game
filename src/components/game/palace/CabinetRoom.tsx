'use client';

import React from 'react';
import * as THREE from 'three';

export function CabinetRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor - Teak Parquet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#451a03" roughness={0.3} />
      </mesh>

      {/* Formal Blue Meeting Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#172554" roughness={0.7} />
      </mesh>
      {/* Gold Inlay Trim on Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[8.6, 8.8, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Walls */}
      {/* North Wall with Large Briefing Screen */}
      <mesh position={[0, 4.5, -13]} receiveShadow>
        <boxGeometry args={[26, 9, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      {/* South Wall with Entrance */}
      <mesh position={[-7.5, 4.5, 13]} receiveShadow>
        <boxGeometry args={[11, 9, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      <mesh position={[7.5, 4.5, 13]} receiveShadow>
        <boxGeometry args={[11, 9, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      <mesh position={[0, 7.5, 13]} receiveShadow>
        <boxGeometry args={[4, 3, 0.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      {/* East & West Walls */}
      <mesh position={[13, 4.5, 0]} receiveShadow>
        <boxGeometry args={[0.6, 9, 26]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>
      <mesh position={[-13, 4.5, 0]} receiveShadow>
        <boxGeometry args={[0.6, 9, 26]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      {/* Large Multimedia Briefing Display Screen on North Wall */}
      <group position={[0, 5.0, -12.65]}>
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[10.2, 5.2, 0.15]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Glowing Screen Content */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[9.8, 4.8]} />
          <meshBasicMaterial color="#0369a1" />
        </mesh>
        {/* Stylized Screen Title Banner */}
        <mesh position={[0, 1.8, 0.1]}>
          <planeGeometry args={[8.8, 0.6]} />
          <meshBasicMaterial color="#082f49" />
        </mesh>
      </group>

      {/* Grand Oval Cabinet Conference Table */}
      <group position={[0, 0, -1]}>
        {/* Table Top */}
        <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4.2, 4.2, 0.15, 48]} />
          <meshStandardMaterial color="#2d150b" roughness={0.25} />
        </mesh>
        {/* Central Inlay of Table (Contrasting lighter burl wood) */}
        <mesh position={[0, 1.53, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.02, 32]} />
          <meshStandardMaterial color="#78350f" roughness={0.3} />
        </mesh>
        {/* Center Floral / Microphones Hub */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.12, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Table Base Pillars */}
        <mesh position={[-2, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.9, 1.35, 16]} />
          <meshStandardMaterial color="#1c1917" roughness={0.5} />
        </mesh>
        <mesh position={[2, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.9, 1.35, 16]} />
          <meshStandardMaterial color="#1c1917" roughness={0.5} />
        </mesh>

        {/* 12 Minister Chairs around the Table */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 5.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <group key={i} position={[x, 0, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
              {/* Chair Seat */}
              <mesh position={[0, 0.75, 0]} castShadow>
                <boxGeometry args={[0.75, 0.12, 0.75]} />
                <meshStandardMaterial color="#1e293b" roughness={0.6} />
              </mesh>
              {/* Chair Backrest */}
              <mesh position={[0, 1.3, -0.32]} castShadow>
                <boxGeometry args={[0.7, 1.0, 0.12]} />
                <meshStandardMaterial color="#1e293b" roughness={0.6} />
              </mesh>
              {/* Gold Chrome Armrests */}
              <mesh position={[-0.38, 1.05, -0.05]} castShadow>
                <boxGeometry args={[0.06, 0.5, 0.6]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[0.38, 1.05, -0.05]} castShadow>
                <boxGeometry args={[0.06, 0.5, 0.6]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Stem */}
              <mesh position={[0, 0.35, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.7, 12]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}


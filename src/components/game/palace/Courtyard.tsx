'use client';

import React from 'react';

export function Courtyard() {
  return (
    <group position={[0, 0, 0]}>
      {/* Stone Plaza Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[48, 48]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
      </mesh>

      {/* Manicured Green Lawns Left and Right */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-14, 0.02, 6]} receiveShadow>
        <planeGeometry args={[14, 28]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[14, 0.02, 6]} receiveShadow>
        <planeGeometry args={[14, 28]} />
        <meshStandardMaterial color="#166534" roughness={0.9} />
      </mesh>

      {/* Istana Merdeka Neoclassical Facade (North) */}
      <group position={[0, 0, -14]}>
        {/* Main Palace Portico Base */}
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[36, 9, 4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>

        {/* Triangular Pediment / Gable on top */}
        <mesh position={[0, 10.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[10, 10, 3.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>
        {/* Golden Garuda Crest in Pediment Tympanum */}
        <mesh position={[0, 9.8, 2.0]}>
          <circleGeometry args={[1.2, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* 6 Monumental White Neoclassical Columns in Front */}
        {[-12, -7.2, -2.4, 2.4, 7.2, 12].map((x, i) => (
          <group key={i} position={[x, 0, 2.8]}>
            {/* Column Base */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <boxGeometry args={[1.6, 0.8, 1.6]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            {/* Column Shaft */}
            <mesh position={[0, 4.5, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.65, 7.5, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            {/* Column Capital */}
            <mesh position={[0, 8.5, 0]} castShadow>
              <boxGeometry args={[1.6, 0.6, 1.6]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Grand Palace Front Double Doors */}
        <mesh position={[0, 2.5, 2.05]}>
          <boxGeometry args={[3.2, 5.0, 0.1]} />
          <meshStandardMaterial color="#3b1d11" roughness={0.4} />
        </mesh>
        {/* Gold Handles */}
        <mesh position={[-0.2, 2.5, 2.15]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
        <mesh position={[0.2, 2.5, 2.15]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
      </group>

      {/* Central Marble Fountain */}
      <group position={[0, 0, 2]}>
        {/* Outer Pool Basin */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4.2, 4.4, 0.7, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Water Surface */}
        <mesh position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.8, 32]} />
          <meshStandardMaterial color="#0284c7" metalness={0.3} roughness={0.1} />
        </mesh>
        {/* Center Fountain Column */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 1.8, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Upper Tier Basin */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <cylinderGeometry args={[1.6, 1.4, 0.4, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      </group>

      {/* Monumental Flagpole with Sang Saka Merah Putih (South end of courtyard) */}
      <group position={[0, 0, 14]}>
        {/* Monumental White Stepped Base */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[3.6, 0.5, 3.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[2.4, 0.4, 2.4]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Tall Steel Mast */}
        <mesh position={[0, 7.5, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.16, 14, 16]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Gold Finial */}
        <mesh position={[0, 14.6, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} />
        </mesh>

        {/* Flag Merah Putih waving at top of mast */}
        {/* Red Half */}
        <mesh position={[1.4, 13.5, 0]} castShadow>
          <boxGeometry args={[2.6, 1.0, 0.03]} />
          <meshStandardMaterial color="#dc2626" roughness={0.7} />
        </mesh>
        {/* White Half */}
        <mesh position={[1.4, 12.5, 0]} castShadow>
          <boxGeometry args={[2.6, 1.0, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}


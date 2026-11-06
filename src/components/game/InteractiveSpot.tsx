'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundEngine } from '@/engine/audioEngine';

interface InteractiveSpotProps {
  position: [number, number, number];
  label: string;
  sublabel?: string;
  icon?: string;
  radius?: number;
  playerPos: [number, number, number];
  onInteract: () => void;
}

export function InteractiveSpot({
  position,
  label,
  sublabel,
  radius = 2.5,
  playerPos,
  onInteract,
}: InteractiveSpotProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [isNearby, setIsNearby] = useState(false);

  useFrame((state) => {
    // Pulse animation
    if (ringRef.current) {
      const t = state.clock.getElapsedTime();
      ringRef.current.rotation.z = t * 0.8;
      const s = 1 + Math.sin(t * 3) * 0.08;
      ringRef.current.scale.set(s, s, s);
    }

    // Distance calculation
    const dx = playerPos[0] - position[0];
    const dz = playerPos[2] - position[2];
    const dist = Math.sqrt(dx * dx + dz * dz);
    const nearby = dist <= radius;

    if (nearby !== isNearby) {
      setIsNearby(nearby);
    }
  });

  return (
    <group position={position}>
      {/* Floor Interaction Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[0.7, 0.85, 32]} />
        <meshBasicMaterial
          color={isNearby ? '#fbbf24' : '#60a5fa'}
          transparent
          opacity={isNearby ? 0.85 : 0.45}
        />
      </mesh>

      {/* Floating 3D/HTML Indicator */}
      <Html position={[0, 1.4, 0]} center distanceFactor={10}>
        <div
          onClick={() => {
            soundEngine.playClick();
            onInteract();
          }}
          className={`cursor-pointer transition-all duration-200 select-none ${
            isNearby ? 'scale-105 opacity-100' : 'scale-90 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl border backdrop-blur-md transition-colors ${
                isNearby
                  ? 'bg-amber-500/90 text-navy-950 border-amber-300 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/85 text-slate-100 border-slate-700/80 hover:border-amber-400/60'
              }`}
            >
              <span className="font-bold text-xs bg-slate-950/40 text-amber-200 px-1.5 py-0.5 rounded border border-amber-300/30">
                E
              </span>
              <span className="font-medium text-xs whitespace-nowrap">{label}</span>
            </div>
            {isNearby && sublabel && (
              <span className="text-[10px] text-amber-200 mt-1 bg-black/60 px-2 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm">
                {sublabel}
              </span>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}


'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomLocation } from '@/types/game';

interface PlayerProps {
  currentRoom: RoomLocation;
  onPositionUpdate: (pos: [number, number, number]) => void;
  onInteractClosest: () => void;
}

export function Player({ currentRoom, onPositionUpdate, onInteractClosest }: PlayerProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Key tracking
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if (e.code === 'KeyE') {
        onInteractClosest();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onInteractClosest]);

  // Reset player position when switching rooms
  useEffect(() => {
    if (!groupRef.current) return;
    if (currentRoom === 'office') {
      groupRef.current.position.set(0, 0, 2);
    } else if (currentRoom === 'cabinet') {
      groupRef.current.position.set(0, 0, 7);
    } else if (currentRoom === 'press') {
      groupRef.current.position.set(0, 0.6, -3);
    } else if (currentRoom === 'courtyard') {
      groupRef.current.position.set(0, 0, 7);
    }
  }, [currentRoom]);

  // Animation walk cycle bob
  const walkTime = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let moveX = 0;
    let moveZ = 0;

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveZ -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveZ += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveX -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveX += 1;

    const isRunning = keys.current['ShiftLeft'] || keys.current['ShiftRight'];
    const speed = isRunning ? 7.2 : 4.0;

    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (len > 0) {
      moveX /= len;
      moveZ /= len;

      const newX = groupRef.current.position.x + moveX * speed * delta;
      const newZ = groupRef.current.position.z + moveZ * speed * delta;

      // Room boundaries collision clamping
      let limitX = 9.5;
      let limitZ = 9.5;
      if (currentRoom === 'cabinet') {
        limitX = 11.5;
        limitZ = 11.5;
      } else if (currentRoom === 'courtyard') {
        limitX = 22.0;
        limitZ = 20.0;
      }

      groupRef.current.position.x = Math.max(-limitX, Math.min(limitX, newX));
      groupRef.current.position.z = Math.max(-limitZ, Math.min(limitZ, newZ));

      // Face movement direction
      const angle = Math.atan2(moveX, moveZ);
      groupRef.current.rotation.y = angle;

      // Walk cycle bobbing
      walkTime.current += delta * (isRunning ? 14 : 9);
      groupRef.current.position.y = (currentRoom === 'press' ? 0.6 : 0) + Math.abs(Math.sin(walkTime.current)) * 0.08;
    } else {
      groupRef.current.position.y = (currentRoom === 'press' ? 0.6 : 0);
    }

    onPositionUpdate([
      groupRef.current.position.x,
      groupRef.current.position.y,
      groupRef.current.position.z,
    ]);
  });

  return (
    <group ref={groupRef} position={[0, 0, 2]}>
      {/* President 3D Humanoid Model */}

      {/* Legs */}
      {/* Left Leg */}
      <mesh position={[-0.18, 0.45, 0]} castShadow>
        <boxGeometry args={[0.2, 0.9, 0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.18, 0.45, 0]} castShadow>
        <boxGeometry args={[0.2, 0.9, 0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} />
      </mesh>
      {/* Black Shoes */}
      <mesh position={[-0.18, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.1, 0.32]} />
        <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0.18, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.1, 0.32]} />
        <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Torso & Suit Jacket (Jas Formal Hitam Kenegaraan) */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.68, 0.75, 0.38]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      {/* White Shirt Collar */}
      <mesh position={[0, 1.45, 0.18]}>
        <boxGeometry args={[0.22, 0.25, 0.06]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      {/* Red State Tie (Dasi Merah) */}
      <mesh position={[0, 1.25, 0.21]}>
        <boxGeometry args={[0.09, 0.45, 0.04]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      {/* Golden Indonesian Flag Pin on Lapel */}
      <mesh position={[-0.22, 1.45, 0.2]}>
        <boxGeometry args={[0.06, 0.04, 0.02]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.42, 1.2, 0]} castShadow>
        <boxGeometry args={[0.16, 0.7, 0.18]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0.42, 1.2, 0]} castShadow>
        <boxGeometry args={[0.16, 0.7, 0.18]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.42, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
      </mesh>
      <mesh position={[0.42, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
      </mesh>

      {/* Head & Neck */}
      <mesh position={[0, 1.68, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.14, 12]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.86, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
      </mesh>

      {/* Indonesian Traditional Peci / Songkok Hitam */}
      <mesh position={[0, 2.06, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.23, 0.24, 16]} />
        <meshStandardMaterial color="#09090b" roughness={0.8} />
      </mesh>

      {/* Subtle Directional Shadow Indicator underneath */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}


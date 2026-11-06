'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  playerPos: [number, number, number];
  mode: 'third-person' | 'top-down';
}

export function CameraController({ playerPos, mode }: CameraControllerProps) {
  const { camera, gl } = useThree();

  // Mouse orbit angles
  const yaw = useRef(0);
  const pitch = useRef(0.3);
  const distance = useRef(mode === 'top-down' ? 14 : 7);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    distance.current = mode === 'top-down' ? 15 : 7.2;
    pitch.current = mode === 'top-down' ? 1.0 : 0.35;
  }, [mode]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        isDragging.current = true;
        prevMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      yaw.current -= dx * 0.005;
      pitch.current = Math.max(0.1, Math.min(1.4, pitch.current + dy * 0.005));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      distance.current = Math.max(4, Math.min(22, distance.current + e.deltaY * 0.01));
    };

    const dom = gl.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel);

    return () => {
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
    };
  }, [gl]);

  useFrame(() => {
    const targetX = playerPos[0];
    const targetY = playerPos[1] + 1.6;
    const targetZ = playerPos[2];

    const currentDist = distance.current;
    const currentPitch = pitch.current;
    const currentYaw = yaw.current;

    // Calculate desired camera position in spherical coordinates
    const camX = targetX + currentDist * Math.sin(currentYaw) * Math.cos(currentPitch);
    const camY = targetY + currentDist * Math.sin(currentPitch);
    const camZ = targetZ + currentDist * Math.cos(currentYaw) * Math.cos(currentPitch);

    // Smooth lerp camera movement
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.12);
    camera.lookAt(targetX, targetY, targetZ);
  });

  return null;
}


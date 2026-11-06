'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';

export function GameCanvas() {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        dpr={[1, 2]} // Performance clamp
        camera={{ position: [0, 5, 8], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}


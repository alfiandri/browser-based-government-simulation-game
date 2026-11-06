'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGameStore } from '@/store/useGameStore';
import { TopBarHUD } from '@/components/hud/TopBarHUD';
import { TimeControl } from '@/components/hud/TimeControl';
import { QuickNav } from '@/components/hud/QuickNav';
import { NotificationToast } from '@/components/hud/NotificationToast';
import { CrisisModal } from '@/components/hud/CrisisModal';
import { DashboardModal } from '@/components/dashboard/DashboardModal';
import { PauseMenu } from '@/components/menu/PauseMenu';
import { AnnualModal } from '@/components/menu/AnnualModal';
import { EndingScreen } from '@/components/menu/EndingScreen';
import { MainMenu } from '@/components/menu/MainMenu';

// Dynamically import the 3D Canvas with ssr: false to guarantee smooth WebGL client rendering
const GameCanvas = dynamic(
  () => import('@/components/game/GameCanvas').then((mod) => mod.GameCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-3">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
          Mempersiapkan Lingkungan Istana Kepresidenan 3D...
        </span>
      </div>
    ),
  }
);

export default function GamePage() {
  const [inGame, setInGame] = useState(false);
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState(false);

  // Global ESC listener for Pause Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const isDashboardOpen = useGameStore.getState().isDashboardOpen;
        if (!isDashboardOpen && inGame) {
          setIsPauseMenuOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inGame]);

  if (!inGame) {
    return <MainMenu onStartGame={() => setInGame(true)} />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 select-none">
      {/* 3D Viewport Layer */}
      <div className="absolute inset-0 z-0">
        <GameCanvas />
      </div>

      {/* 2D HUD Overlays */}
      <TopBarHUD onOpenPauseMenu={() => setIsPauseMenuOpen(true)} />
      <TimeControl />
      <QuickNav />
      <NotificationToast />

      {/* Contextual & Strategic Management Modals */}
      <CrisisModal />
      <DashboardModal />
      <PauseMenu isOpen={isPauseMenuOpen} onClose={() => setIsPauseMenuOpen(false)} />
      <AnnualModal />
      <EndingScreen />
    </main>
  );
}


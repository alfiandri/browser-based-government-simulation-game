'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Pause, Play, FastForward, SkipForward } from 'lucide-react';
import { TimeSpeed } from '@/types/game';

export function TimeControl() {
  const timeSpeed = useGameStore((state) => state.timeSpeed);
  const setTimeSpeed = useGameStore((state) => state.setTimeSpeed);
  const advanceDay = useGameStore((state) => state.advanceDay);
  const isDashboardOpen = useGameStore((state) => state.isDashboardOpen);

  // Time progression game loop
  useEffect(() => {
    if (timeSpeed === 0) return;

    // Interval time in milliseconds per day:
    // 1x = 1400ms, 2x = 700ms, 4x = 350ms
    const intervalMs = timeSpeed === 1 ? 1400 : timeSpeed === 2 ? 700 : 350;

    const timer = setInterval(() => {
      advanceDay(1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [timeSpeed, advanceDay]);

  const speeds: { speed: TimeSpeed; label: string; icon: React.ReactNode }[] = [
    { speed: 0, label: 'Jeda', icon: <Pause className="w-3.5 h-3.5" /> },
    { speed: 1, label: '1x', icon: <Play className="w-3.5 h-3.5" /> },
    { speed: 2, label: '2x', icon: <FastForward className="w-3.5 h-3.5" /> },
    { speed: 4, label: '4x', icon: <SkipForward className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="absolute top-16 right-3 z-20 pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-xl shadow-2xl">
      {speeds.map((item) => (
        <button
          key={item.speed}
          onClick={() => setTimeSpeed(item.speed)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            timeSpeed === item.speed
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title={`Kecepatan: ${item.label}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}

      <div className="w-[1px] h-4 bg-slate-700 mx-1" />

      {/* Advance 1 Day Button */}
      <button
        onClick={() => advanceDay(1)}
        className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
        title="Lompat 1 Hari"
      >
        +1 Hari
      </button>
    </div>
  );
}


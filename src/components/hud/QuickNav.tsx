'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { RoomLocation } from '@/types/game';
import { Briefcase, Users, Mic, Landmark } from 'lucide-react';

export function QuickNav() {
  const currentRoom = useGameStore((state) => state.currentRoom);
  const setCurrentRoom = useGameStore((state) => state.setCurrentRoom);

  const rooms: { id: RoomLocation; label: string; icon: React.ReactNode }[] = [
    { id: 'office', label: 'Ruang Kerja Presiden', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'cabinet', label: 'Ruang Sidang Kabinet', icon: <Users className="w-4 h-4" /> },
    { id: 'press', label: 'Konferensi Pers', icon: <Mic className="w-4 h-4" /> },
    { id: 'courtyard', label: 'Halaman Istana', icon: <Landmark className="w-4 h-4" /> },
  ];

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center gap-2">
      {/* Room Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-2xl">
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => setCurrentRoom(r.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              currentRoom === r.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            {r.icon}
            <span className="hidden sm:inline">{r.label}</span>
          </button>
        ))}
      </div>

      {/* Keyboard Controls Hint */}
      <div className="flex items-center gap-3 text-[11px] text-slate-400 bg-slate-950/70 backdrop-blur-sm border border-slate-800/80 px-3 py-1 rounded-full select-none">
        <span>
          <strong className="text-amber-300">W, A, S, D</strong> Jalan
        </span>
        <span className="text-slate-600">•</span>
        <span>
          <strong className="text-amber-300">Shift</strong> Lari
        </span>
        <span className="text-slate-600">•</span>
        <span>
          <strong className="text-amber-300">Mouse</strong> Putar Kamera
        </span>
        <span className="text-slate-600">•</span>
        <span>
          <strong className="text-amber-300">E</strong> Interaksi
        </span>
      </div>
    </div>
  );
}


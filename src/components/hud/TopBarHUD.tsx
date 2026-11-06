'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { formatIndonesianDate } from '@/engine/simulationEngine';
import { soundEngine } from '@/engine/audioEngine';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Heart,
  Activity,
  Shield,
  Volume2,
  VolumeX,
  Camera,
  Layers,
  Menu,
} from 'lucide-react';

interface TopBarHUDProps {
  onOpenPauseMenu: () => void;
}

export function TopBarHUD({ onOpenPauseMenu }: TopBarHUDProps) {
  const date = useGameStore((state) => state.date);
  const indicators = useGameStore((state) => state.indicators);
  const budget = useGameStore((state) => state.budget);
  const publicOpinion = useGameStore((state) => state.publicOpinion);
  const toggleDashboard = useGameStore((state) => state.toggleDashboard);
  const cameraMode = useGameStore((state) => state.cameraMode);
  const setCameraMode = useGameStore((state) => state.setCameraMode);

  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleCamera = () => {
    setCameraMode(cameraMode === 'third-person' ? 'top-down' : 'third-person');
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 pointer-events-none p-3 flex flex-col md:flex-row items-center justify-between gap-2.5">
      {/* Left: Presidential Seal & Date */}
      <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-xl shadow-2xl">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md border border-amber-300">
          RI-1
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-amber-400">
              Presiden RI
            </span>
            <span className="text-[10px] bg-red-950/80 text-red-300 border border-red-800/60 px-1.5 py-0.5 rounded font-mono">
              Hari ke-{date.dayOfTerm} / 1800
            </span>
          </div>
          <div className="text-sm font-semibold text-white tracking-wide">
            {formatIndonesianDate(date)}
          </div>
        </div>
      </div>

      {/* Center: Key National Indicators Bar */}
      <div className="pointer-events-auto flex items-center gap-2 md:gap-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-xl shadow-2xl overflow-x-auto max-w-full">
        {/* Approval Rating */}
        <div
          onClick={() => toggleDashboard(true, 'public_opinion')}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/80 px-2.5 py-1 rounded-lg transition-colors"
          title="Tingkat Kepuasan Publik (Approval Rating)"
        >
          <div className="p-1.5 rounded-md bg-rose-500/20 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500/40" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Approval</div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              {publicOpinion.overallApproval}%
              {publicOpinion.overallApproval >= 65 ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-400" />
              )}
            </div>
          </div>
        </div>

        {/* APBN Balance */}
        <div
          onClick={() => toggleDashboard(true, 'budget')}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/80 px-2.5 py-1 rounded-lg transition-colors"
          title="Anggaran Pendapatan dan Belanja Negara (APBN)"
        >
          <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">APBN Belanja</div>
            <div className="text-xs font-bold text-amber-300">
              Rp {budget.totalExpenditure.toLocaleString('id-ID')} T
            </div>
          </div>
        </div>

        {/* GDP Growth */}
        <div
          onClick={() => toggleDashboard(true, 'economy')}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/80 px-2.5 py-1 rounded-lg transition-colors"
          title="Pertumbuhan Ekonomi Tahunan (PDB)"
        >
          <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Pertumbuhan PDB</div>
            <div className="text-xs font-bold text-emerald-300">{indicators.gdpGrowth}%</div>
          </div>
        </div>

        {/* Inflation */}
        <div
          onClick={() => toggleDashboard(true, 'economy')}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/80 px-2.5 py-1 rounded-lg transition-colors"
          title="Tingkat Inflasi Nasional"
        >
          <div className="p-1.5 rounded-md bg-sky-500/20 text-sky-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Inflasi</div>
            <div className="text-xs font-bold text-sky-300">{indicators.inflation}%</div>
          </div>
        </div>

        {/* Political Stability */}
        <div
          onClick={() => toggleDashboard(true, 'politics')}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/80 px-2.5 py-1 rounded-lg transition-colors"
          title="Stabilitas Politik & Parlemen DPR"
        >
          <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Stabilitas</div>
            <div className="text-xs font-bold text-indigo-300">{indicators.politicalStability}%</div>
          </div>
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Dashboard Shortcut Button */}
        <button
          onClick={() => toggleDashboard()}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xl transition-all active:scale-95 border border-amber-300"
        >
          <Layers className="w-4 h-4" />
          <span>Dashboard</span>
          <span className="hidden sm:inline-block bg-slate-950/30 text-slate-950 px-1 py-0.5 rounded text-[10px]">
            TAB
          </span>
        </button>

        {/* Camera Toggle */}
        <button
          onClick={handleToggleCamera}
          className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl shadow-xl transition-colors active:scale-95"
          title={`Mode Kamera: ${cameraMode === 'third-person' ? 'Third Person' : 'Top Down'}`}
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl shadow-xl transition-colors active:scale-95"
          title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Pause / System Menu */}
        <button
          onClick={onOpenPauseMenu}
          className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl shadow-xl transition-colors active:scale-95"
          title="Menu Jeda (Simpan / Pengaturan)"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}


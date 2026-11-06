'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, CheckCircle2, Star } from 'lucide-react';

export function EndingScreen() {
  const presidentialEnding = useGameStore((state) => state.presidentialEnding);
  const resetNewGame = useGameStore((state) => state.resetNewGame);

  useEffect(() => {
    if (!presidentialEnding) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignored if confetti fails
    }
  }, [presidentialEnding]);

  if (!presidentialEnding) return null;

  const { breakdown } = presidentialEnding;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col text-white">
        {/* Presidential Crest Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 p-6 text-center text-slate-950 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-slate-950 text-amber-400 border-2 border-amber-300 flex items-center justify-center mx-auto mb-2 shadow-xl">
            <Award className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-900 block">
            Laporan Akhir 5 Tahun Kepresidenan Republik Indonesia
          </span>
          <h2 className="text-2xl font-black mt-1">{presidentialEnding.title}</h2>
          <div className="inline-block mt-2 bg-slate-950/25 px-4 py-1 rounded-full text-xs font-bold border border-slate-950/30">
            Gelar Kehormatan: {presidentialEnding.rankTitle}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Total Final Score */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Skor Kinerja Keseluruhan:</span>
              <div className="text-3xl font-black text-amber-400 mt-0.5">
                {presidentialEnding.finalScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(presidentialEnding.finalScore / 20)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 6 Category Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Kinerja Ekonomi (25%)</span>
              <span className="text-base font-bold text-white">{breakdown.economy}%</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Kesejahteraan Rakyat (25%)</span>
              <span className="text-base font-bold text-white">{breakdown.welfare}%</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Stabilitas Politik (15%)</span>
              <span className="text-base font-bold text-white">{breakdown.stability}%</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Integritas & Birokrasi (15%)</span>
              <span className="text-base font-bold text-white">{breakdown.integrity}%</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Pembangunan Fisik (10%)</span>
              <span className="text-base font-bold text-white">{breakdown.infrastructure}%</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Diplomasi Luar Negeri (10%)</span>
              <span className="text-base font-bold text-white">{breakdown.diplomacy}%</span>
            </div>
          </div>

          {/* Legacy Summary */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Warisan Sejarah (Presidential Legacy)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {presidentialEnding.summary}
            </p>
            <p className="text-xs text-slate-400 italic leading-relaxed pt-2 border-t border-slate-800/80">
              "{presidentialEnding.legacyText}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-6 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Terima kasih telah memimpin Republik Indonesia.
          </span>
          <button
            onClick={resetNewGame}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-xl transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Periode Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
}


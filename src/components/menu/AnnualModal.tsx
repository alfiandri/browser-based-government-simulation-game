'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Award, CheckCircle2, ChevronRight } from 'lucide-react';

export function AnnualModal() {
  const currentAnnualModal = useGameStore((state) => state.currentAnnualModal);
  const dismissAnnualModal = useGameStore((state) => state.dismissAnnualModal);

  if (!currentAnnualModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 px-6 py-4 flex items-center justify-between text-slate-950">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 fill-slate-950" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900">
                Laporan Kenegaraan Tahunan
              </span>
              <h3 className="text-lg font-black leading-tight">
                Evaluasi Kinerja Tahun ke-{currentAnnualModal.year}
              </h3>
            </div>
          </div>

          <div className="text-center bg-slate-950/20 px-3 py-1 rounded-xl border border-slate-950/30">
            <div className="text-[10px] font-bold uppercase">Predikat</div>
            <div className="text-2xl font-black">{currentAnnualModal.overallGrade}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {currentAnnualModal.summary}
          </p>

          {/* Scores Matrix */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Ekonomi (25%)</span>
              <span className="font-bold text-white">{currentAnnualModal.economicScore} / 100</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Kesejahteraan (25%)</span>
              <span className="font-bold text-white">{currentAnnualModal.welfareScore} / 100</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Stabilitas (15%)</span>
              <span className="font-bold text-white">{currentAnnualModal.stabilityScore} / 100</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Integritas (15%)</span>
              <span className="font-bold text-white">{currentAnnualModal.integrityScore} / 100</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Infrastruktur (10%)</span>
              <span className="font-bold text-white">{currentAnnualModal.infrastructureScore} / 100</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Diplomasi (10%)</span>
              <span className="font-bold text-white">{currentAnnualModal.diplomacyScore} / 100</span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Catatan Dewan Pertimbangan Presiden:
            </span>
            {currentAnnualModal.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={dismissAnnualModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <span>Lanjutkan Kepemimpinan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


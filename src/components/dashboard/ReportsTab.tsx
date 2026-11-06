'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Award, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function ReportsTab() {
  const annualEvaluations = useGameStore((state) => state.annualEvaluations);
  const date = useGameStore((state) => state.date);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Laporan Kinerja Tahunan & Evaluasi Kepresidenan</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Rekam evaluasi formal setiap akhir tahun masa jabatan berdasarkan 6 pilar penilaian konstitusional.
        </p>
      </div>

      {annualEvaluations.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-xl space-y-2">
          <FileText className="w-8 h-8 text-slate-500 mx-auto" />
          <h4 className="text-sm font-bold text-slate-200">
            Evaluasi Tahun Pertama Sedang Berjalan
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Laporan resmi Tahun ke-1 akan otomatis diumumkan saat kalender in-game menyelesaikan hari ke-360. Terus jalankan pemerintahan dan jaga stabilitas nasional.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {annualEvaluations.map((evalItem) => (
            <div
              key={evalItem.year}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4"
            >
              {/* Year Header & Grade */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-400">
                    Evaluasi Akhir Tahun
                  </span>
                  <h4 className="text-base font-bold text-white">Tahun ke-{evalItem.year} Masa Jabatan</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Predikat Kinerja:</span>
                  <span
                    className={`text-xl font-black px-3 py-1 rounded-xl border ${
                      evalItem.overallGrade === 'A'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                        : evalItem.overallGrade === 'B'
                        ? 'bg-amber-950 text-amber-300 border-amber-600'
                        : 'bg-rose-950 text-rose-400 border-rose-600'
                    }`}
                  >
                    {evalItem.overallGrade}
                  </span>
                </div>
              </div>

              {/* 6 Category Scores */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Ekonomi (25%)</span>
                  <span className="font-bold text-white text-sm">{evalItem.economicScore} / 100</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Kesejahteraan (25%)</span>
                  <span className="font-bold text-white text-sm">{evalItem.welfareScore} / 100</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Stabilitas (15%)</span>
                  <span className="font-bold text-white text-sm">{evalItem.stabilityScore} / 100</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Integritas (15%)</span>
                  <span className="font-bold text-white text-sm">{evalItem.integrityScore} / 100</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Infrastruktur (10%)</span>
                  <span className="font-bold text-white text-sm">{evalItem.infrastructureScore} / 100</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Diplomasi (10%)</span>
                  <span className="font-bold text-white text-sm">{evalItem.diplomacyScore} / 100</span>
                </div>
              </div>

              {/* Summary Text */}
              <p className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl leading-relaxed border border-slate-800/80">
                {evalItem.summary}
              </p>

              {/* Recommendations */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Rekomendasi Strategis Tahun Depan:
                </span>
                {evalItem.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


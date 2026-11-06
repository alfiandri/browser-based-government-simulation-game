'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Heart, Users, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

export function PublicOpinionTab() {
  const publicOpinion = useGameStore((state) => state.publicOpinion);
  const segments = Object.values(publicOpinion.segments);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950/30 border border-slate-700/80 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Survei Kepuasan Rakyat Nasional
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Tingkat Kepuasan Publik (Approval Rating): {publicOpinion.overallApproval}%
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Data disimulasikan dari 8 segmen demografis penduduk Indonesia berdasarkan bobot populasi dan respons terhadap kebijakan harga, subsidi, upah, dan fasilitas publik.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-700/80 p-3.5 rounded-xl text-center shadow-inner shrink-0">
          <div className="text-[11px] text-slate-400">Status Kepemimpinan</div>
          <div className="text-lg font-bold text-amber-300 mt-0.5">
            {publicOpinion.overallApproval >= 75
              ? 'Sangat Dicintai Rakyat'
              : publicOpinion.overallApproval >= 60
              ? 'Dukungan Mayoritas Solid'
              : 'Perlu Konsolidasi Sosial'}
          </div>
        </div>
      </div>

      {/* 8 Segments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((seg) => {
          const isHigh = seg.approval >= 70;
          const isMid = seg.approval >= 50 && seg.approval < 70;

          return (
            <div
              key={seg.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-xs text-white">{seg.name}</h4>
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Bobot: {Math.round(seg.populationWeight * 100)}%
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className={`text-2xl font-bold ${
                      isHigh ? 'text-emerald-400' : isMid ? 'text-amber-300' : 'text-rose-400'
                    }`}
                  >
                    {seg.approval}%
                  </span>
                  <span className="text-[11px] text-slate-400">Tingkat Kepuasan</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden mb-3 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isHigh ? 'bg-emerald-500' : isMid ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${seg.approval}%` }}
                  />
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-400 block mb-0.5">Isu Utama / Tuntutan:</span>
                <span className="text-xs text-slate-200 font-medium">{seg.primaryConcern}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


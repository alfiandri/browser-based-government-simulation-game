'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Minister, Ministry } from '@/types/game';
import {
  UserCheck,
  Shield,
  Award,
  AlertTriangle,
  RefreshCw,
  X,
  CheckCircle,
} from 'lucide-react';

export function CabinetTab() {
  const ministries = useGameStore((state) => state.ministries);
  const ministers = useGameStore((state) => state.ministers);
  const candidatePool = useGameStore((state) => state.candidatePool);
  const reshuffleMinister = useGameStore((state) => state.reshuffleMinister);

  const [selectedMinistryId, setSelectedMinistryId] = useState<string | null>(null);

  const activeMinistry = ministries.find((m) => m.id === selectedMinistryId);
  const activeMinister = ministers.find((m) => m.ministryId === selectedMinistryId);

  const handleExecuteReshuffle = (candidateIdx: number) => {
    if (!selectedMinistryId) return;
    reshuffleMinister(selectedMinistryId, candidateIdx);
    setSelectedMinistryId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">Susunan Kabinet & Jajaran Kementerian</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola 12 kementerian negara. Pantau kompetensi, integritas, dan lakukan perombakan (reshuffle) bila diperlukan.
          </p>
        </div>
      </div>

      {/* 12 Ministries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ministries.map((min) => {
          const minister = ministers.find((m) => m.ministryId === min.id);
          if (!minister) return null;

          const isIntegrityLow = minister.attributes.integrity < 75;

          return (
            <div
              key={min.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Ministry Title */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {min.name}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{minister.name}</h4>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded capitalize">
                    {minister.background}
                  </span>
                </div>

                {/* Party & Tenure */}
                <div className="text-[11px] text-slate-400 flex items-center justify-between mb-3 bg-slate-950/60 p-2 rounded-lg">
                  <span>Afiliasi: <strong className="text-slate-200">{minister.partyAffiliation}</strong></span>
                  <span>Masa Kerja: <strong className="text-slate-200">{minister.tenureMonths} bln</strong></span>
                </div>

                {/* 6 Key Minister Attributes */}
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kompetensi:</span>
                    <span className="font-bold text-white">{minister.attributes.competency}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Integritas:</span>
                    <span
                      className={`font-bold ${
                        isIntegrityLow ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {minister.attributes.integrity}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Loyalitas:</span>
                    <span className="font-bold text-white">{minister.attributes.loyalty}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kepemimpinan:</span>
                    <span className="font-bold text-white">{minister.attributes.leadership}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pengaruh Politik:</span>
                    <span className="font-bold text-white">{minister.attributes.politicalInfluence}%</span>
                  </div>
                </div>

                {isIntegrityLow && (
                  <div className="mt-3 p-2 bg-amber-950/40 border border-amber-800/60 rounded-lg flex items-center gap-1.5 text-[10px] text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Integritas sedang; berisiko memicu skandal atau kebocoran tender.</span>
                  </div>
                )}
              </div>

              {/* Action Button: Reshuffle */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Kinerja: <strong className="text-white">{min.performanceScore}%</strong>
                </div>
                <button
                  onClick={() => setSelectedMinistryId(min.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reshuffle</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reshuffle Selection Modal */}
      {selectedMinistryId && activeMinistry && activeMinister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-400">
                  Keputusan Reshuffle Kabinet
                </span>
                <h3 className="text-base font-bold text-white">
                  Pilih Menteri Baru untuk {activeMinistry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMinistryId(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Minister Preview */}
            <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Menteri Saat Ini:</span>
                <div className="font-bold text-sm text-white">{activeMinister.name}</div>
              </div>
              <div className="text-xs text-slate-300">
                Kompetensi: <strong className="text-amber-300">{activeMinister.attributes.competency}%</strong> | Integritas: <strong className="text-emerald-400">{activeMinister.attributes.integrity}%</strong>
              </div>
            </div>

            {/* Candidate Pool List */}
            <div className="p-5 flex-1 overflow-y-auto space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Daftar Tokoh Calon Menteri Tersedia ({candidatePool.length} Tokoh)
              </h4>

              {candidatePool.map((cand, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-xl hover:bg-slate-800 hover:border-amber-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-sm text-white">{cand.name}</h5>
                      <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded capitalize">
                        {cand.background}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{cand.title}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-300">
                      <span>Kompetensi: <strong className="text-white">{cand.attributes.competency}%</strong></span>
                      <span>Integritas: <strong className="text-emerald-400">{cand.attributes.integrity}%</strong></span>
                      <span>Loyalitas: <strong className="text-white">{cand.attributes.loyalty}%</strong></span>
                      <span>Afiliasi: <strong className="text-amber-300">{cand.partyAffiliation}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExecuteReshuffle(idx)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Lantik Menteri</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import {
  Building2,
  HardHat,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  DollarSign,
  Play,
} from 'lucide-react';

export function DevelopmentTab() {
  const projects = useGameStore((state) => state.projects);
  const startInfrastructureProject = useGameStore((state) => state.startInfrastructureProject);

  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const ongoingCount = projects.filter((p) => p.status === 'ongoing').length;

  return (
    <div className="space-y-6">
      {/* Header & Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Proyek Sedang Dikerjakan</span>
            <HardHat className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-300">{ongoingCount} Proyek</div>
          <div className="text-[11px] text-slate-400 mt-1">Konstruksi aktif di lapangan</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Proyek Telah Selesai</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{completedCount} Proyek</div>
          <div className="text-[11px] text-slate-400 mt-1">Telah beroperasi penuh untuk rakyat</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Portofolio Proyek</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{projects.length} Proyek</div>
          <div className="text-[11px] text-slate-400 mt-1">Mencakup seluruh koridor kepulauan</div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj) => {
          const progressPct = Math.min(100, Math.round((proj.progressDays / proj.durationDays) * 100));
          const isOngoing = proj.status === 'ongoing';
          const isCompleted = proj.status === 'completed';

          return (
            <div
              key={proj.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-300 border border-slate-700 px-2 py-0.5 rounded">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{proj.region}</span>
                  </div>
                  {isCompleted ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Selesai & Beroperasi
                    </span>
                  ) : isOngoing ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded flex items-center gap-1">
                      <HardHat className="w-3 h-3 text-amber-400" /> Sedang Konstruksi
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Tahap Perencanaan
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white">{proj.name}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{proj.description}</p>

                {/* Economic Yields */}
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    Biaya: <strong className="text-white">Rp {proj.costTrillion} T</strong>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Dampak PDB: +{proj.gdpBoost}%
                  </span>
                  <span>
                    Lapangan Kerja: <strong className="text-white">+{proj.employmentBoost}%</strong>
                  </span>
                  <span>
                    Approval Rakyat: <strong className="text-amber-300">+{proj.approvalBoost}%</strong>
                  </span>
                </div>

                {/* Progress Bar for Ongoing or Completed */}
                {(isOngoing || isCompleted) && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Progres Pembangunan: {proj.progressDays} / {proj.durationDays} Hari</span>
                      <span className="font-bold text-amber-300">{progressPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-amber-400'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {proj.status === 'planning' && (
                <div className="shrink-0">
                  <button
                    onClick={() => startInfrastructureProject(proj.id)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Mulai Konstruksi</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


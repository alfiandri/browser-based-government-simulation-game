'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { formatIndonesianDate } from '@/engine/simulationEngine';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Heart,
  Shield,
  Activity,
  Users,
  Building2,
  CheckCircle,
  Briefcase,
} from 'lucide-react';

export function OverviewTab() {
  const indicators = useGameStore((state) => state.indicators);
  const budget = useGameStore((state) => state.budget);
  const publicOpinion = useGameStore((state) => state.publicOpinion);
  const date = useGameStore((state) => state.date);
  const ministers = useGameStore((state) => state.ministers);
  const projects = useGameStore((state) => state.projects);
  const toggleDashboard = useGameStore((state) => state.toggleDashboard);

  const avgIntegrity = Math.round(
    ministers.reduce((acc, m) => acc + m.attributes.integrity, 0) / ministers.length
  );
  const ongoingProjects = projects.filter((p) => p.status === 'ongoing').length;

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 border border-slate-700/80 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Laporan Eksekutif Kenegaraan
            </span>
            <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              Tahun ke-{date.year - 2028} Masa Jabatan
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Kondisi Umum Republik Indonesia — {formatIndonesianDate(date)}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Stabilitas nasional berada pada tingkat <strong className="text-emerald-400">{indicators.politicalStability}%</strong>. 
            Defisit APBN terkendali pada <strong className="text-amber-300">{budget.deficitPctGdp}% PDB</strong> (di bawah pagu aman 3.0%). 
            Sebanyak {ongoingProjects} proyek strategis nasional sedang berjalan aktif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleDashboard(true, 'budget')}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg"
          >
            Atur APBN
          </button>
          <button
            onClick={() => toggleDashboard(true, 'cabinet')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
          >
            Sidang Kabinet
          </button>
        </div>
      </div>

      {/* 6 Key Executive Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* PDB Nominal */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">PDB Nasional</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base font-bold text-white">
            Rp {(indicators.gdpNominal / 1000).toFixed(1)}k T
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+{indicators.gdpGrowth}% YoY</span>
          </div>
        </div>

        {/* Inflasi */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">Inflasi Tahunan</span>
            <Activity className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-base font-bold text-white">{indicators.inflation}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Target Bank Indonesia 2.5±1%</div>
        </div>

        {/* Pengangguran */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">Pengangguran</span>
            <Users className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-base font-bold text-white">{indicators.unemployment}%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Terkendali rendah</div>
        </div>

        {/* Kemiskinan */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">Kemiskinan</span>
            <Heart className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-base font-bold text-white">{indicators.povertyRate}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Target jangka panjang &lt;7%</div>
        </div>

        {/* Kurs USD */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">Kurs USD/IDR</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-white">
            Rp {indicators.exchangeRate.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Cadangan devisa kuat</div>
        </div>

        {/* Approval Rating */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium">Approval Presiden</span>
            <Shield className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base font-bold text-amber-300">
            {publicOpinion.overallApproval}%
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Mayoritas puas</div>
        </div>
      </div>

      {/* Two Column Layout: Quick Agenda & Cabinet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Agenda Prioritas 100 Hari */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>Program Prioritas Kepresidenan</span>
              </h3>
              <span className="text-[11px] text-slate-400">Target 2029 - 2034</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">Swasembada & Ketahanan Pangan</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Revitalisasi irigasi dan subsidi pupuk tepat sasaran.
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  Berjalan
                </span>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">Hilirisasi Nikel & Baterai Hijau</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Peningkatan nilai tambah ekspor industri manufaktur.
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  Berjalan
                </span>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">Pemerataan Layanan Kesehatan Daerah 3T</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    RS rujukan lengkap spesialis di Indonesia Timur.
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded">
                  Dalam Rencana
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan Kabinet & Integritas */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Kinerja & Integritas Kabinet</span>
              </h3>
              <span className="text-[11px] text-slate-400">12 Kementerian</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Rata-Rata Integritas Kabinet</span>
                  <span className="font-bold text-white">{avgIntegrity}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      avgIntegrity >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${avgIntegrity}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Status Koalisi Parlemen</span>
                  <div className="text-xs font-bold text-white mt-0.5">370 dari 500 Kursi DPR (74%)</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  Mayoritas Kuat
                </span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Total Belanja APBN</span>
                  <div className="text-xs font-bold text-amber-300 mt-0.5">
                    Rp {budget.totalExpenditure.toLocaleString('id-ID')} Triliun
                  </div>
                </div>
                <button
                  onClick={() => toggleDashboard(true, 'budget')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Detail Sektor &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import {
  TrendingUp,
  Activity,
  Users,
  Heart,
  DollarSign,
  Briefcase,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export function EconomyTab() {
  const indicators = useGameStore((state) => state.indicators);
  const addNotification = useGameStore((state) => state.addNotification);

  const handleEnactEconomicPolicy = (name: string, desc: string) => {
    addNotification('Kebijakan Ekonomi Diterapkan', `${name}: ${desc}`);
  };

  return (
    <div className="space-y-6">
      {/* 8 Macroeconomic Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* PDB Nominal */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">PDB Nominal</div>
          <div className="text-xl font-bold text-white mt-1">
            Rp {indicators.gdpNominal.toLocaleString('id-ID')} T
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{indicators.gdpGrowth}% Pertumbuhan</span>
          </div>
        </div>

        {/* Inflasi */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Laju Inflasi</div>
          <div className="text-xl font-bold text-sky-400 mt-1">{indicators.inflation}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Stabilitas harga bahan pokok</div>
        </div>

        {/* Pengangguran */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Tingkat Pengangguran</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{indicators.unemployment}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Tingkat partisipasi angkatan kerja</div>
        </div>

        {/* Kemiskinan */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Angka Kemiskinan</div>
          <div className="text-xl font-bold text-rose-400 mt-1">{indicators.povertyRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Berdasarkan garis kemiskinan BPS</div>
        </div>

        {/* Kurs USD/IDR */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Nilai Tukar Rupiah</div>
          <div className="text-xl font-bold text-white mt-1">
            Rp {indicators.exchangeRate.toLocaleString('id-ID')} / $1
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Pasar valas antarbank</div>
        </div>

        {/* Rasio Utang */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Rasio Utang / PDB</div>
          <div className="text-xl font-bold text-amber-300 mt-1">
            {indicators.nationalDebtPct}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Batas aman UU: maks 60%</div>
        </div>

        {/* Investasi Asing (FDI) */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Investasi Asing Langsung</div>
          <div className="text-xl font-bold text-white mt-1">
            Rp {indicators.foreignInvestment.toLocaleString('id-ID')} T
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Manufaktur & hilirisasi tambang</div>
        </div>

        {/* Daya Beli Masyarakat */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="text-xs text-slate-400 font-medium">Indeks Daya Beli</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {indicators.purchasingPower} / 100
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Konsumsi rumah tangga nasional</div>
        </div>
      </div>

      {/* Strategic Macroeconomic Policy Levers */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-1">Paket Kebijakan Ekonomi Strategis</h3>
        <p className="text-xs text-slate-400 mb-4">
          Terapkan langkah intervensi ekonomi untuk memperkuat iklim industri dan melindungi daya beli rakyat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Insentif Tax Holiday Industri Manufaktur Padat Karya</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Keringanan PPh badan selama 5 tahun bagi investor yang membuka minimal 5.000 lapangan kerja baru.
              </p>
            </div>
            <button
              onClick={() =>
                handleEnactEconomicPolicy(
                  'Tax Holiday Manufaktur',
                  'Keringanan pajak industri padat karya diresmikan.'
                )
              }
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-lg border border-slate-700 whitespace-nowrap"
            >
              Terapkan
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kewajiban Repatriasi Devisa Hasil Ekspor (DHE)</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Wajibkan eksportir SDA menempatkan valuta asing minimal 3 bulan di perbankan dalam negeri guna memperkuat kurs Rupiah.
              </p>
            </div>
            <button
              onClick={() =>
                handleEnactEconomicPolicy(
                  'Wajib Devisa Ekspor DHE',
                  'Aturan penempatan devisa valas ekspor diperketat.'
                )
              }
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold text-xs rounded-lg border border-slate-700 whitespace-nowrap"
            >
              Terapkan
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Digitalisasi Rantai Pasok Pangan Antar-Pulau</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Integrasi logistik tol laut dengan pusat distribusi bahan pokok daerah guna memangkas disparitas harga.
              </p>
            </div>
            <button
              onClick={() =>
                handleEnactEconomicPolicy(
                  'Digitalisasi Tol Laut Pangan',
                  'Sistem logistik pangan terpadu diaktifkan.'
                )
              }
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold text-xs rounded-lg border border-slate-700 whitespace-nowrap"
            >
              Terapkan
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-rose-400" />
                <span>Subsidi Bunga Kredit Usaha Rakyat (KUR) 3%</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Bantu permodalan 10 juta UMKM produktif untuk meredam angka pengangguran dan memperluas skala bisnis mikro.
              </p>
            </div>
            <button
              onClick={() =>
                handleEnactEconomicPolicy(
                  'Subsidi KUR UMKM 3%',
                  'Penyaluran KUR berbunga rendah digencarkan.'
                )
              }
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs rounded-lg border border-slate-700 whitespace-nowrap"
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


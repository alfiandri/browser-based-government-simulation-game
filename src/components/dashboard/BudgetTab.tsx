'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { DollarSign, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export function BudgetTab() {
  const budget = useGameStore((state) => state.budget);
  const indicators = useGameStore((state) => state.indicators);
  const updateBudgetAllocations = useGameStore((state) => state.updateBudgetAllocations);

  // Local draft state for allocations so user can tweak sliders before saving
  const [allocations, setAllocations] = useState<{ [id: string]: number }>(() => {
    const map: { [id: string]: number } = {};
    budget.sectors.forEach((s) => {
      map[s.id] = s.allocationTrillion;
    });
    return map;
  });

  const handleSliderChange = (id: string, val: number) => {
    setAllocations((prev) => ({ ...prev, [id]: val }));
  };

  const draftTotalExpenditure = Object.values(allocations).reduce((acc, v) => acc + v, 0);
  const draftDeficit = Math.max(0, draftTotalExpenditure - budget.totalRevenue);
  const draftDeficitPct = Number(((draftDeficit / indicators.gdpNominal) * 100).toFixed(2));
  const isOverStatutoryLimit = draftDeficitPct > 3.0;

  const handleSave = () => {
    const list = Object.entries(allocations).map(([id, amount]) => ({ id, amount }));
    updateBudgetAllocations(list);
  };

  return (
    <div className="space-y-6">
      {/* Revenue & Balance Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Penerimaan Negara */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Pendapatan Negara</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">
            Rp {budget.totalRevenue.toLocaleString('id-ID')} T
          </div>
          <div className="text-[11px] text-slate-400 mt-2 space-y-0.5">
            <div className="flex justify-between">
              <span>Pajak (PPh/PPN):</span>
              <span className="text-white font-mono">Rp {budget.taxRevenue.toLocaleString('id-ID')} T</span>
            </div>
            <div className="flex justify-between">
              <span>Bea & Cukai:</span>
              <span className="text-white font-mono">Rp {budget.customsRevenue.toLocaleString('id-ID')} T</span>
            </div>
            <div className="flex justify-between">
              <span>PNBP (SDA/BUMN):</span>
              <span className="text-white font-mono">Rp {budget.nonTaxRevenue.toLocaleString('id-ID')} T</span>
            </div>
          </div>
        </div>

        {/* Total Belanja Negara */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Rancangan Belanja APBN</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-300">
            Rp {draftTotalExpenditure.toLocaleString('id-ID')} T
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Alokasi di 10 sektor prioritas nasional.
          </div>
        </div>

        {/* Defisit & Batas Statuter */}
        <div
          className={`border p-4 rounded-xl shadow-lg transition-colors ${
            isOverStatutoryLimit
              ? 'bg-red-950/40 border-red-500/80'
              : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Defisit Anggaran</span>
            {isOverStatutoryLimit ? (
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div
            className={`text-xl font-bold ${
              isOverStatutoryLimit ? 'text-red-400' : 'text-white'
            }`}
          >
            Rp {draftDeficit.toLocaleString('id-ID')} T ({draftDeficitPct}%)
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {isOverStatutoryLimit ? (
              <span className="text-red-300 font-semibold">
                Peringatan: Melebihi batas maksimal UU Keuangan Negara (3.0% PDB)!
              </span>
            ) : (
              <span className="text-emerald-400">
                Aman di bawah pagu statuter 3.0% PDB.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sector Allocations Table with Sliders */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Alokasi Belanja 10 Pos APBN</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Geser nilai untuk menyesuaikan alokasi. Tiap pos memengaruhi sektor ekonomi dan kepuasan masyarakat.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Sahkan Alokasi APBN</span>
          </button>
        </div>

        <div className="space-y-4">
          {budget.sectors.map((sector) => {
            const currentVal = allocations[sector.id] || sector.allocationTrillion;
            const pctOfBudget = ((currentVal / draftTotalExpenditure) * 100).toFixed(1);

            return (
              <div
                key={sector.id}
                className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{sector.name}</span>
                    {sector.minMandatedPct && (
                      <span className="text-[10px] bg-sky-950 text-sky-300 border border-sky-800 px-1.5 py-0.2 rounded">
                        Mandat UUD min {sector.minMandatedPct}%
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-300">
                    Rp {currentVal.toLocaleString('id-ID')} T ({pctOfBudget}%)
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                  {sector.description}
                </p>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={Math.max(10, Math.round(sector.allocationTrillion * 0.4))}
                    max={Math.round(sector.allocationTrillion * 2.2)}
                    step={5}
                    value={currentVal}
                    onChange={(e) => handleSliderChange(sector.id, Number(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSliderChange(sector.id, Math.max(10, currentVal - 10))}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => handleSliderChange(sector.id, currentVal + 10)}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


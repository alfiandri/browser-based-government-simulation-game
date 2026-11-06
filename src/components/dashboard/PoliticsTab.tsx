'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { soundEngine } from '@/engine/audioEngine';
import {
  Shield,
  FileText,
  CheckCircle2,
  Users,
  Vote,
  Scale,
} from 'lucide-react';

export function PoliticsTab() {
  const factions = useGameStore((state) => state.factions);
  const indicators = useGameStore((state) => state.indicators);
  const addNotification = useGameStore((state) => state.addNotification);

  const [passedBills, setPassedBills] = useState<string[]>([]);

  const coalitionSeats = factions
    .filter((f) => f.isCoalition)
    .reduce((acc, f) => acc + f.seats, 0);
  const oppositionSeats = 500 - coalitionSeats;
  const coalitionPct = ((coalitionSeats / 500) * 100).toFixed(1);

  const bills = [
    {
      id: 'ruu-aset',
      name: 'RUU Perampasan Aset Hasil Tindak Pidana Korupsi',
      desc: 'Memungkinkan negara menyita aset kekayaan koruptor tanpa menunggu putusan pidana yang berkepanjangan.',
      supportEstimate: 68,
      impact: 'Meningkatkan Integritas & Approval Publik +6%',
    },
    {
      id: 'ruu-energi',
      name: 'RUU Transisi Energi Baru Terbarukan (EBT)',
      desc: 'Memberikan kepastian insentif tarif listrik hijau dan kewajiban phased-out PLTU batu bara.',
      supportEstimate: 74,
      impact: 'Meningkatkan Investasi Asing +Rp 35 T & Mengurangi Emisi',
    },
    {
      id: 'ruu-fiskal',
      name: 'RUU Harmonisasi Kebijakan Fiskal Pusat & Daerah',
      desc: 'Menyelaraskan alokasi belanja modal pemerintah daerah dengan target proyek strategis nasional.',
      supportEstimate: 82,
      impact: 'Mempercepat Penyelesaian Infrastruktur Daerah +15%',
    },
    {
      id: 'ruu-siber',
      name: 'RUU Keamanan Siber & Kedaulatan Data Nasional',
      desc: 'Standarisasi enkripsi institusi negara dan kewajiban lokalisasi server komputasi cloud publik.',
      supportEstimate: 88,
      impact: 'Memperkuat Ketahanan Pertahanan Siber Nasional',
    },
  ];

  const handlePassBill = (billId: string, name: string) => {
    soundEngine.playGavel();
    setPassedBills((prev) => [...prev, billId]);
    addNotification('RUU Disahkan Parlemen DPR', `${name} resmi disetujui dalam Rapat Paripurna DPR RI.`);
  };

  return (
    <div className="space-y-6">
      {/* Header & Seat Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Koalisi Pemerintahan */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Koalisi Pemerintahan</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {coalitionSeats} Kursi ({coalitionPct}%)
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Mayoritas mutlak di parlemen (PPB, PKR, PNB, Pembangunan).
          </div>
        </div>

        {/* Oposisi Parlemen */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Fraksi Oposisi DPR</span>
            <Scale className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">
            {oppositionSeats} Kursi ({(100 - Number(coalitionPct)).toFixed(1)}%)
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Pengawasan kritis kebijakan pemerintah (PGD, Keadilan).
          </div>
        </div>

        {/* Stabilitas Politik */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Indeks Stabilitas Politik</span>
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-300">
            {indicators.politicalStability}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Dukungan parlemen solid untuk pengesahan APBN.
          </div>
        </div>
      </div>

      {/* DPR Seats Visual Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <h3 className="text-sm font-bold text-white mb-2">
          Komposisi 500 Kursi Dewan Perwakilan Rakyat (DPR RI)
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Peta representasi fraksi-fraksi partai politik dalam mendukung agenda legislasi kepresidenan.
        </p>

        {/* Proportional Seat Bar */}
        <div className="w-full h-7 rounded-xl overflow-hidden flex shadow-inner bg-slate-950 p-0.5 border border-slate-800 mb-4">
          {factions.map((f) => (
            <div
              key={f.id}
              style={{ width: `${(f.seats / 500) * 100}%`, backgroundColor: f.color }}
              className="h-full flex items-center justify-center text-[10px] font-bold text-white transition-all hover:opacity-90"
              title={`${f.name} (${f.shortName}): ${f.seats} Kursi`}
            >
              {f.shortName}
            </div>
          ))}
        </div>

        {/* Faction Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {factions.map((f) => (
            <div
              key={f.id}
              className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="font-bold text-xs text-white">{f.shortName}</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {f.seats} Kursi ({f.seatPct}%)
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{f.ideology}</div>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className={f.isCoalition ? 'text-emerald-400' : 'text-rose-400 font-semibold'}>
                  {f.isCoalition ? 'Koalisi' : 'Oposisi'}
                </span>
                <span className="text-slate-400">Loyal: {f.loyalty}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legislative Agenda (RUU) */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Program Legislasi Nasional (Prolegnas) Kepresidenan</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ajukan Rancangan Undang-Undang strategis ke DPR untuk mendorong reformasi tata kelola negara.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {bills.map((bill) => {
            const isPassed = passedBills.includes(bill.id);
            return (
              <div
                key={bill.id}
                className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{bill.name}</h4>
                    {isPassed ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                        Disahkan Menjadi UU
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded">
                        Dukungan Parlemen: ~{bill.supportEstimate}%
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{bill.desc}</p>
                  <p className="text-[10px] text-emerald-400 mt-1 font-medium">
                    Dampak: {bill.impact}
                  </p>
                </div>

                <div>
                  {isPassed ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Berlaku Sah</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePassBill(bill.id, bill.name)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
                    >
                      <Vote className="w-3.5 h-3.5" />
                      <span>Ajukan ke Paripurna</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


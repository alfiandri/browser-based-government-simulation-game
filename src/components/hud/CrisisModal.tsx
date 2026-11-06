'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { AlertTriangle, MapPin, DollarSign, CheckCircle2, ShieldAlert } from 'lucide-react';

export function CrisisModal() {
  const activeCrisisEvent = useGameStore((state) => state.activeCrisisEvent);
  const resolveEventChoice = useGameStore((state) => state.resolveEventChoice);

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  if (!activeCrisisEvent) return null;

  const currentSelection = activeCrisisEvent.choices.find((c) => c.id === selectedChoiceId);

  const handleEnact = () => {
    if (!selectedChoiceId) return;
    resolveEventChoice(activeCrisisEvent.id, selectedChoiceId);
    setSelectedChoiceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-red-600/80 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-950 px-6 py-4 flex items-center justify-between border-b border-red-700/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-200 border border-red-400/30 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-300">
                Peringatan Darurat Kepresidenan
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {activeCrisisEvent.title}
              </h3>
            </div>
          </div>
          {activeCrisisEvent.location && (
            <div className="flex items-center gap-1.5 bg-black/40 text-red-200 px-3 py-1 rounded-full text-xs border border-red-500/30">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{activeCrisisEvent.location}</span>
            </div>
          )}
        </div>

        {/* Narrative Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <h4 className="font-semibold text-amber-300 text-sm mb-1.5">
              {activeCrisisEvent.headline}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeCrisisEvent.description}
            </p>
          </div>

          <div className="space-y-2.5">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pilihan Instruksi & Tindakan Presiden
            </h5>

            <div className="space-y-2">
              {activeCrisisEvent.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <div
                    key={choice.id}
                    onClick={() => setSelectedChoiceId(choice.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-amber-400 bg-amber-500 text-slate-950'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                          </div>
                          <span className="font-bold text-sm text-white">{choice.label}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2 ml-6 leading-relaxed">
                          {choice.description}
                        </p>
                      </div>

                      {choice.costTrillion > 0 && (
                        <div className="flex items-center gap-1 bg-red-950/60 text-red-300 border border-red-800/40 px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Rp {choice.costTrillion} T</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {selectedChoiceId
              ? 'Pilihan siap diterapkan ke sistem kenegaraan.'
              : 'Pilih salah satu tindakan di atas untuk melanjutkan.'}
          </span>
          <button
            onClick={handleEnact}
            disabled={!selectedChoiceId}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              selectedChoiceId
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl cursor-pointer active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Terapkan Keputusan Presiden</span>
          </button>
        </div>
      </div>
    </div>
  );
}


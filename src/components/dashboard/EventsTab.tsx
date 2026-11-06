'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { NATIONAL_EVENT_BANK } from '@/engine/eventSystem';
import { AlertTriangle, CheckCircle2, History, MapPin } from 'lucide-react';

export function EventsTab() {
  const resolvedEventIds = useGameStore((state) => state.resolvedEventIds);
  const activeEvents = useGameStore((state) => state.activeEvents);

  const resolvedEvents = NATIONAL_EVENT_BANK.filter((e) => resolvedEventIds.includes(e.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Rekam Jejak Krisis & Peristiwa Kenegaraan</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Daftar seluruh krisis ekonomi, politik, sosial, dan bencana alam yang telah dihadapi serta ditangani oleh pemerintah.
        </p>
      </div>

      {/* Active Events (if any) */}
      {activeEvents.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            <span>Peristiwa Aktif Membutuhkan Keputusan Segera</span>
          </h4>

          {activeEvents.map((event) => (
            <div
              key={event.id}
              className="bg-red-950/30 border border-red-600/60 p-4 rounded-xl flex items-center justify-between"
            >
              <div>
                <h5 className="font-bold text-sm text-white">{event.title}</h5>
                <p className="text-xs text-slate-300 mt-0.5">{event.headline}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-red-900 text-red-200 border border-red-700 rounded-lg">
                Darurat
              </span>
            </div>
          ))}
        </div>
      )}

      {/* History of Resolved Events */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-4 h-4 text-slate-400" />
          <span>Peristiwa yang Berhasil Diselesaikan ({resolvedEvents.length})</span>
        </h4>

        {resolvedEvents.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
            Belum ada krisis besar yang tercatat. Seiring berjalannya waktu dan dinamika negara, peristiwa nasional akan muncul dan dicatat di sini.
          </div>
        ) : (
          <div className="space-y-3">
            {resolvedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-700">
                      {event.category}
                    </span>
                    {event.location && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-sm text-white">{event.title}</h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{event.description}</p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tertangani</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


'use client';

import React, { useRef, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import {
  Play,
  Save,
  Download,
  Upload,
  RotateCcw,
  X,
  CheckCircle,
  HardDrive,
} from 'lucide-react';

interface PauseMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PauseMenu({ isOpen, onClose }: PauseMenuProps) {
  const saveGame = useGameStore((state) => state.saveGame);
  const loadGame = useGameStore((state) => state.loadGame);
  const saveSlots = useGameStore((state) => state.saveSlots);
  const exportSaveFile = useGameStore((state) => state.exportSaveFile);
  const importSaveFile = useGameStore((state) => state.importSaveFile);
  const resetNewGame = useGameStore((state) => state.resetNewGame);
  const date = useGameStore((state) => state.date);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'main' | 'save' | 'load'>('main');

  if (!isOpen) return null;

  const handleExport = () => {
    const json = exportSaveFile();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Presiden_Simulasi_Hari_${date.dayOfTerm}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importSaveFile(content);
        if (ok) onClose();
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              RI
            </div>
            <h3 className="font-bold text-sm text-white">Menu Jeda Kepresidenan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content View */}
        <div className="p-6 space-y-3">
          {activeTab === 'main' && (
            <>
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Lanjutkan Permainan</span>
              </button>

              <button
                onClick={() => setActiveTab('save')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Simpan Permainan (Save Slot)</span>
              </button>

              <button
                onClick={() => setActiveTab('load')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                <HardDrive className="w-4 h-4 text-sky-400" />
                <span>Muat Permainan (Load Slot)</span>
              </button>

              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-1.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium text-xs rounded-xl border border-slate-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor JSON</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-medium text-xs rounded-xl border border-slate-800 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Impor JSON</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (confirm('Yakin ingin mereset dan mengulang periode kepresidenan dari awal?')) {
                      resetNewGame();
                      onClose();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-rose-400 hover:bg-rose-950/40 rounded-xl text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mulai Ulang Periode (New Game)</span>
                </button>
              </div>
            </>
          )}

          {activeTab === 'save' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Pilih Slot Simpanan</span>
                <button
                  onClick={() => setActiveTab('main')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  &larr; Kembali
                </button>
              </div>

              {['slot-1', 'slot-2', 'slot-3'].map((slotId, idx) => {
                const existing = saveSlots.find((s) => s.id === slotId);
                return (
                  <div
                    key={slotId}
                    className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">Slot {idx + 1}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {existing ? `${existing.label} (${existing.savedAt})` : 'Slot Kosong'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        saveGame(slotId, `Slot ${idx + 1}: Hari ke-${date.dayOfTerm}`);
                        setActiveTab('main');
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
                    >
                      Simpan
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'load' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Pilih Slot Muat</span>
                <button
                  onClick={() => setActiveTab('main')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  &larr; Kembali
                </button>
              </div>

              {['slot-1', 'slot-2', 'slot-3'].map((slotId, idx) => {
                const existing = saveSlots.find((s) => s.id === slotId);
                return (
                  <div
                    key={slotId}
                    className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">Slot {idx + 1}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {existing ? `${existing.label} (${existing.savedAt})` : 'Slot Kosong'}
                      </div>
                    </div>
                    {existing ? (
                      <button
                        onClick={() => {
                          loadGame(slotId);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg"
                      >
                        Muat
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500">Kosong</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


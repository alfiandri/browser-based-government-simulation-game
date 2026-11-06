'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Play, RotateCcw, Info, HelpCircle, Award, Landmark } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
}

export function MainMenu({ onStartGame }: MainMenuProps) {
  const saveSlots = useGameStore((state) => state.saveSlots);
  const loadGame = useGameStore((state) => state.loadGame);
  const resetNewGame = useGameStore((state) => state.resetNewGame);

  const [showHelp, setShowHelp] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const hasSavedGame = saveSlots.length > 0;

  const handleContinue = () => {
    if (saveSlots.length > 0) {
      loadGame(saveSlots[0].id);
    }
    onStartGame();
  };

  const handleNewGame = () => {
    resetNewGame();
    onStartGame();
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 flex flex-col items-center justify-between p-6 select-none overflow-hidden">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-slate-950 to-black pointer-events-none" />

      {/* Decorative Golden Line Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

      {/* Top Seal */}
      <div className="relative z-10 pt-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-1 shadow-2xl mb-4 border-2 border-amber-300 animate-pulse">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400">
            <Landmark className="w-10 h-10" />
          </div>
        </div>

        <div className="inline-block bg-red-950/80 text-red-300 border border-red-700/60 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
          3D Political & Government Simulation
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase drop-shadow-lg">
          Presiden: Simulasi Indonesia
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-lg leading-relaxed">
          Pimpin 280 juta rakyat Indonesia. Kelola APBN, kendalikan kementerian, hadapi parlemen DPR, dan tentukan arah masa depan bangsa.
        </p>
      </div>

      {/* Menu Actions */}
      <div className="relative z-10 w-full max-w-sm space-y-3">
        {hasSavedGame && (
          <button
            onClick={handleContinue}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-2xl shadow-2xl transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2 border border-amber-300"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Lanjutkan Permainan</span>
          </button>
        )}

        <button
          onClick={handleNewGame}
          className={`w-full py-3.5 px-6 font-black text-sm rounded-2xl shadow-xl transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2 border ${hasSavedGame
              ? 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 border-amber-300'
            }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mulai Periode Baru (2029 - 2034)</span>
        </button>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => setShowHelp(true)}
            className="py-2.5 px-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Panduan Main</span>
          </button>

          <button
            onClick={() => setShowCredits(true)}
            className="py-2.5 px-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Award className="w-4 h-4 text-sky-400" />
            <span>Tentang Game</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-slate-500 pb-2">
        <span>Presiden: Simulasi Indonesia • Versi 1.0 (MVP) • Single Player Browser Game</span>
      </footer>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-200 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Panduan Kontrol & Gameplay</span>
            </h3>
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">Navigasi 3D Karakter Presiden:</strong>
                <p>• <strong>W, A, S, D</strong> atau Tombol Panah: Menggerakkan Presiden di Istana.</p>
                <p>• <strong>Shift</strong>: Berlari.</p>
                <p>• <strong>Mouse Drag</strong>: Memutar pandangan kamera secara orbital.</p>
                <p>• <strong>Tombol E</strong>: Berinteraksi dengan Meja Kerja, Peta, atau Ruang Sidang.</p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-300 block mb-1">Pusat Kendali Pemerintahan (Dashboard):</strong>
                <p>• Tekan tombol <strong>TAB</strong> atau klik tombol Dashboard untuk membuka APBN, Kabinet, Politik DPR, dan Opini Publik.</p>
                <p>• Jalankan waktu di pojok kanan atas (1x, 2x, 4x) untuk melihat dampak ekonomi dan memicu event nasional.</p>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400"
            >
              Mengerti & Kembali
            </button>
          </div>
        </div>
      )}

      {/* Credits Modal */}
      {showCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-200 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-400" />
              <span>Tentang Game & Visi Produk</span>
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              <strong>Presiden: Simulasi Indonesia</strong> adalah game simulasi 3D berbasis peramban (browser) yang menghadirkan pengalaman mendalam dalam tata kelola pemerintahan, kebijakan fiskal APBN, stabilitas politik, dan dinamika sosial masyarakat Indonesia.
            </p>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">Pengembang</span>
              <p className="text-xs font-semibold text-amber-400">Alfiandri Putra Perdana</p>
            </div>
            <p className="text-xs text-slate-400 italic">
              "Menjadi Presiden bukan hanya tentang memiliki kekuasaan, tetapi tentang mengambil keputusan dan bertanggung jawab atas konsekuensinya."
            </p>
            <button
              onClick={() => setShowCredits(false)}
              className="w-full py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-700 border border-slate-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


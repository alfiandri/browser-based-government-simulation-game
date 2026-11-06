'use client';

import React, { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { OverviewTab } from './OverviewTab';
import { BudgetTab } from './BudgetTab';
import { EconomyTab } from './EconomyTab';
import { CabinetTab } from './CabinetTab';
import { PoliticsTab } from './PoliticsTab';
import { DevelopmentTab } from './DevelopmentTab';
import { PublicOpinionTab } from './PublicOpinionTab';
import { EventsTab } from './EventsTab';
import { ReportsTab } from './ReportsTab';
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  Heart,
  AlertTriangle,
  FileText,
  X,
  Landmark,
} from 'lucide-react';

export function DashboardModal() {
  const isDashboardOpen = useGameStore((state) => state.isDashboardOpen);
  const activeDashboardTab = useGameStore((state) => state.activeDashboardTab);
  const toggleDashboard = useGameStore((state) => state.toggleDashboard);

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Modern Web Guidance: Native dialog with showModal/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDashboardOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isDashboardOpen]);

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        toggleDashboard();
      }
      if (e.key === 'Escape' && isDashboardOpen) {
        e.preventDefault();
        toggleDashboard(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDashboardOpen, toggleDashboard]);

  if (!isDashboardOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Ikhtisar Negara', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'budget', label: 'Anggaran APBN', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'economy', label: 'Perekonomian', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'cabinet', label: 'Kabinet Menteri', icon: <Users className="w-4 h-4" /> },
    { id: 'politics', label: 'Politik & DPR', icon: <Landmark className="w-4 h-4" /> },
    { id: 'development', label: 'Pembangunan', icon: <Building2 className="w-4 h-4" /> },
    { id: 'public_opinion', label: 'Opini Publik', icon: <Heart className="w-4 h-4" /> },
    { id: 'events', label: 'Krisis & Peristiwa', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'reports', label: 'Laporan Kinerja', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <dialog
      ref={dialogRef}
      onClose={() => toggleDashboard(false)}
      className="m-auto w-[95vw] max-w-6xl h-[90vh] bg-slate-950/95 text-slate-100 border border-slate-700/80 rounded-2xl shadow-2xl p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm overflow-hidden flex flex-col overscroll-contain animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Top Modal Header */}
      <header className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md border border-amber-300">
            RI-1
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Pusat Kendali Pemerintahan Republik Indonesia</span>
              <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-slate-700">
                Dashboard Kepresidenan
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Sistem Simulasi Pengambilan Keputusan Strategis Nasional
            </p>
          </div>
        </div>

        <button
          onClick={() => toggleDashboard(false)}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="Tutup Dashboard (ESC / TAB)"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Main Body with Sidebar + Tab Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Navigation Sidebar */}
        <nav className="w-full md:w-56 bg-slate-900/60 border-r border-slate-800/80 p-2.5 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
          {tabs.map((tab) => {
            const isActive = activeDashboardTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => toggleDashboard(true, tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Active Tab Content Viewport */}
        <main className="flex-1 p-5 md:p-6 overflow-y-auto overscroll-contain">
          {activeDashboardTab === 'overview' && <OverviewTab />}
          {activeDashboardTab === 'budget' && <BudgetTab />}
          {activeDashboardTab === 'economy' && <EconomyTab />}
          {activeDashboardTab === 'cabinet' && <CabinetTab />}
          {activeDashboardTab === 'politics' && <PoliticsTab />}
          {activeDashboardTab === 'development' && <DevelopmentTab />}
          {activeDashboardTab === 'public_opinion' && <PublicOpinionTab />}
          {activeDashboardTab === 'events' && <EventsTab />}
          {activeDashboardTab === 'reports' && <ReportsTab />}
        </main>
      </div>
    </dialog>
  );
}


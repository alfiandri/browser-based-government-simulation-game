import { create } from 'zustand';
import {
  NationalIndicators,
  StateBudget,
  PublicOpinion,
  PoliticalFaction,
  InfrastructureProject,
  Minister,
  Ministry,
  GameEvent,
  GameDate,
  TimeSpeed,
  RoomLocation,
  AnnualEvaluation,
  PresidentialEnding,
  GameSaveSlot,
} from '@/types/game';
import {
  INITIAL_INDICATORS,
  INITIAL_BUDGET,
  INITIAL_FACTIONS,
  INITIAL_PUBLIC_OPINION,
  INITIAL_PROJECTS,
  INITIAL_DATE,
} from './initialState';
import { INITIAL_MINISTRIES, INITIAL_MINISTERS, CANDIDATE_MINISTERS_POOL } from '@/engine/cabinetSystem';
import {
  advanceDateByDays,
  advanceInfrastructureProjects,
  checkEventTrigger,
  generateAnnualEvaluation,
  computePresidentialEnding,
} from '@/engine/simulationEngine';
import {
  simulateEconomicStep,
  simulatePublicOpinionStep,
  calculateBudgetRevenues,
  calculateBudgetBalance,
} from '@/engine/economyFormulas';
import { soundEngine } from '@/engine/audioEngine';

interface GameState {
  // Game World State
  indicators: NationalIndicators;
  budget: StateBudget;
  ministries: Ministry[];
  ministers: Minister[];
  candidatePool: typeof CANDIDATE_MINISTERS_POOL;
  factions: PoliticalFaction[];
  publicOpinion: PublicOpinion;
  projects: InfrastructureProject[];
  activeEvents: GameEvent[];
  resolvedEventIds: string[];
  date: GameDate;
  timeSpeed: TimeSpeed;
  currentRoom: RoomLocation;
  cameraMode: 'third-person' | 'top-down';

  // UI Navigation
  isDashboardOpen: boolean;
  activeDashboardTab: string;
  activeCrisisEvent: GameEvent | null;
  annualEvaluations: AnnualEvaluation[];
  currentAnnualModal: AnnualEvaluation | null;
  presidentialEnding: PresidentialEnding | null;
  saveSlots: GameSaveSlot[];
  notifications: { id: string; title: string; message: string; timestamp: number }[];

  // Actions
  setTimeSpeed: (speed: TimeSpeed) => void;
  advanceDay: (days?: number) => void;
  setCurrentRoom: (room: RoomLocation) => void;
  setCameraMode: (mode: 'third-person' | 'top-down') => void;
  toggleDashboard: (open?: boolean, tab?: string) => void;
  updateBudgetAllocations: (allocations: { id: string; amount: number }[]) => void;
  reshuffleMinister: (ministryId: string, candidateIndex: number) => void;
  startInfrastructureProject: (projectId: string) => void;
  resolveEventChoice: (eventId: string, choiceId: string) => void;
  dismissAnnualModal: () => void;
  addNotification: (title: string, message: string) => void;
  dismissNotification: (id: string) => void;

  // Persistence
  saveGame: (slotId: string, label?: string) => void;
  loadGame: (slotId: string) => boolean;
  exportSaveFile: () => string;
  importSaveFile: (jsonString: string) => boolean;
  resetNewGame: () => void;
}

const STORAGE_KEY_SLOTS = 'presiden_sim_save_slots';

function getStoredSlots(): GameSaveSlot[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SLOTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  indicators: INITIAL_INDICATORS,
  budget: INITIAL_BUDGET,
  ministries: INITIAL_MINISTRIES,
  ministers: INITIAL_MINISTERS,
  candidatePool: CANDIDATE_MINISTERS_POOL,
  factions: INITIAL_FACTIONS,
  publicOpinion: INITIAL_PUBLIC_OPINION,
  projects: INITIAL_PROJECTS,
  activeEvents: [],
  resolvedEventIds: [],
  date: INITIAL_DATE,
  timeSpeed: 1,
  currentRoom: 'office',
  cameraMode: 'third-person',

  isDashboardOpen: false,
  activeDashboardTab: 'overview',
  activeCrisisEvent: null,
  annualEvaluations: [],
  currentAnnualModal: null,
  presidentialEnding: null,
  saveSlots: getStoredSlots(),
  notifications: [
    {
      id: 'notif-welcome',
      title: 'Selamat Bertugas, Bapak/Ibu Presiden!',
      message: 'Anda resmi dilantik sebagai Presiden Republik Indonesia. Jelajahi Istana dan tentukan arah masa depan bangsa.',
      timestamp: Date.now(),
    },
  ],

  setTimeSpeed: (speed) => {
    soundEngine.playClick();
    set({ timeSpeed: speed });
  },

  setCurrentRoom: (room) => {
    soundEngine.playClick();
    set({ currentRoom: room });
  },

  setCameraMode: (mode) => {
    soundEngine.playClick();
    set({ cameraMode: mode });
  },

  toggleDashboard: (open, tab) => {
    soundEngine.playClick();
    set((state) => ({
      isDashboardOpen: open !== undefined ? open : !state.isDashboardOpen,
      activeDashboardTab: tab || state.activeDashboardTab,
    }));
  },

  dismissAnnualModal: () => {
    soundEngine.playClick();
    set({ currentAnnualModal: null });
  },

  addNotification: (title, message) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    set((state) => ({
      notifications: [
        { id, title, message, timestamp: Date.now() },
        ...state.notifications.slice(0, 4), // Keep max 5 recent notifications
      ],
    }));
  },

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  advanceDay: (daysToAdd = 1) => {
    const state = get();
    if (state.presidentialEnding) return; // Game term ended

    // 1. Advance Calendar
    const { newDate, isNewMonth, isNewYear, isTermComplete } = advanceDateByDays(state.date, daysToAdd);

    // 2. Average Cabinet Competency
    const avgCompetency = state.ministers.reduce((acc, m) => acc + m.attributes.competency, 0) / state.ministers.length;
    const activeProjectsCount = state.projects.filter((p) => p.status === 'ongoing').length;

    // 3. Economy & Budget Simulation
    const updatedIndicators = simulateEconomicStep(
      state.indicators,
      state.budget,
      activeProjectsCount,
      avgCompetency,
      daysToAdd
    );

    // Recalculate tax revenues and budget balances
    const revenues = calculateBudgetRevenues(updatedIndicators.gdpNominal, updatedIndicators);
    const updatedBudget: StateBudget = {
      ...state.budget,
      ...revenues,
    };
    const balance = calculateBudgetBalance(updatedBudget, updatedIndicators.gdpNominal);
    updatedBudget.totalExpenditure = balance.totalExpenditure;
    updatedBudget.deficitTrillion = balance.deficitTrillion;
    updatedBudget.deficitPctGdp = balance.deficitPctGdp;

    // 4. Public Opinion Simulation
    const updatedOpinion = simulatePublicOpinionStep(
      state.publicOpinion,
      updatedIndicators,
      updatedBudget,
      daysToAdd
    );

    // 5. Advance Infrastructure Projects
    const { updatedProjects, newlyCompleted } = advanceInfrastructureProjects(state.projects, daysToAdd);

    if (newlyCompleted.length > 0) {
      newlyCompleted.forEach((p) => {
        state.addNotification('Proyek Strategis Selesai!', `${p.name} di ${p.region} telah rampung dan mulai beroperasi.`);
      });
      soundEngine.playSuccess();
    }

    // 6. Check for Dynamic National Events
    let activeCrisis = state.activeCrisisEvent;
    let newActiveEvents = [...state.activeEvents];

    if (!activeCrisis) {
      const triggeredEvent = checkEventTrigger(newDate.dayOfTerm, state.activeEvents, state.resolvedEventIds);
      if (triggeredEvent) {
        activeCrisis = triggeredEvent;
        newActiveEvents.push(triggeredEvent);
        soundEngine.playAlert();
        state.addNotification('PERISTIWA NASIONAL MENDESAK', triggeredEvent.headline);
      }
    }

    // 7. Check for Year End Evaluation
    let newEvaluations = [...state.annualEvaluations];
    let modalEval = state.currentAnnualModal;

    if (isNewYear) {
      const yearIndex = state.date.year - 2028;
      const evaluation = generateAnnualEvaluation(
        yearIndex,
        updatedIndicators,
        updatedOpinion,
        updatedProjects,
        state.ministers
      );
      newEvaluations.push(evaluation);
      modalEval = evaluation;
      soundEngine.playSuccess();
    }

    // 8. Check for 5-Year Term Completion (Final Ending)
    let ending: PresidentialEnding | null = null;
    if (isTermComplete) {
      ending = computePresidentialEnding(
        updatedIndicators,
        updatedOpinion,
        updatedProjects,
        state.ministers
      );
      soundEngine.playSuccess();
    }

    // Auto-save monthly
    if (isNewMonth) {
      get().saveGame('autosave', 'Auto Save Bulanan');
    }

    set({
      date: newDate,
      indicators: updatedIndicators,
      budget: updatedBudget,
      publicOpinion: updatedOpinion,
      projects: updatedProjects,
      activeEvents: newActiveEvents,
      activeCrisisEvent: activeCrisis,
      annualEvaluations: newEvaluations,
      currentAnnualModal: modalEval,
      presidentialEnding: ending,
    });
  },

  updateBudgetAllocations: (allocations) => {
    soundEngine.playGavel();
    set((state) => {
      const updatedSectors = state.budget.sectors.map((sector) => {
        const found = allocations.find((a) => a.id === sector.id);
        if (found) {
          return { ...sector, allocationTrillion: found.amount };
        }
        return sector;
      });

      const updatedBudget = { ...state.budget, sectors: updatedSectors };
      const balance = calculateBudgetBalance(updatedBudget, state.indicators.gdpNominal);
      updatedBudget.totalExpenditure = balance.totalExpenditure;
      updatedBudget.deficitTrillion = balance.deficitTrillion;
      updatedBudget.deficitPctGdp = balance.deficitPctGdp;

      return { budget: updatedBudget };
    });
  },

  reshuffleMinister: (ministryId, candidateIndex) => {
    soundEngine.playSign();
    set((state) => {
      const candidate = state.candidatePool[candidateIndex];
      if (!candidate) return state;

      const currentMinister = state.ministers.find((m) => m.ministryId === ministryId);
      const ministry = state.ministries.find((m) => m.id === ministryId);

      const newMinister: Minister = {
        ...candidate,
        id: `m-res-${Date.now()}`,
        ministryId,
        title: ministry?.name || 'Menteri',
        tenureMonths: 1,
      };

      const updatedMinisters = state.ministers.map((m) => (m.ministryId === ministryId ? newMinister : m));

      // Swap candidate pool: outgoing minister enters candidate pool
      const newPool = [...state.candidatePool];
      newPool.splice(candidateIndex, 1);
      if (currentMinister) {
        newPool.push({
          name: currentMinister.name,
          title: `Mantan ${currentMinister.title}`,
          avatarSeed: currentMinister.avatarSeed,
          attributes: currentMinister.attributes,
          background: currentMinister.background,
          partyAffiliation: currentMinister.partyAffiliation,
        });
      }

      state.addNotification('Keputusan Presiden: Reshuffle Kabinet', `${newMinister.name} resmi dilantik memimpin ${ministry?.name}.`);

      return {
        ministers: updatedMinisters,
        candidatePool: newPool,
      };
    });
  },

  startInfrastructureProject: (projectId) => {
    soundEngine.playGavel();
    set((state) => {
      const project = state.projects.find((p) => p.id === projectId);
      if (!project || project.status !== 'planning') return state;

      const updatedProjects = state.projects.map((p) =>
        p.id === projectId ? { ...p, status: 'ongoing' as const } : p
      );

      state.addNotification('Peletakan Batu Pertama Proyek', `Konstruksi ${project.name} resmi dimulai.`);

      return { projects: updatedProjects };
    });
  },

  resolveEventChoice: (eventId, choiceId) => {
    soundEngine.playSign();
    set((state) => {
      const event = state.activeEvents.find((e) => e.id === eventId);
      if (!event) return state;

      const choice = event.choices.find((c) => c.id === choiceId);
      if (!choice) return state;

      const impact = choice.impacts;

      // Apply Impacts
      const indicators = { ...state.indicators };
      if (impact.approvalDelta) {
        const newOverall = Math.max(10, Math.min(95, state.publicOpinion.overallApproval + impact.approvalDelta));
        state.publicOpinion.overallApproval = newOverall;
      }
      if (impact.gdpGrowthDelta) indicators.gdpGrowth = Number((indicators.gdpGrowth + impact.gdpGrowthDelta).toFixed(2));
      if (impact.inflationDelta) indicators.inflation = Number((indicators.inflation + impact.inflationDelta).toFixed(2));
      if (impact.unemploymentDelta) indicators.unemployment = Number((indicators.unemployment + impact.unemploymentDelta).toFixed(2));
      if (impact.politicalStabilityDelta) indicators.politicalStability = Math.max(10, Math.min(100, indicators.politicalStability + impact.politicalStabilityDelta));
      if (impact.publicTrustDelta) indicators.publicTrust = Math.max(10, Math.min(100, indicators.publicTrust + impact.publicTrustDelta));

      state.addNotification('Keputusan Kepresidenan Diterapkan', impact.message);

      return {
        indicators,
        publicOpinion: { ...state.publicOpinion },
        activeCrisisEvent: null,
        activeEvents: state.activeEvents.filter((e) => e.id !== eventId),
        resolvedEventIds: [...state.resolvedEventIds, eventId],
      };
    });
  },

  saveGame: (slotId, label) => {
    const state = get();
    soundEngine.playSign();
    const dataToSave = {
      indicators: state.indicators,
      budget: state.budget,
      ministries: state.ministries,
      ministers: state.ministers,
      candidatePool: state.candidatePool,
      factions: state.factions,
      publicOpinion: state.publicOpinion,
      projects: state.projects,
      resolvedEventIds: state.resolvedEventIds,
      date: state.date,
      annualEvaluations: state.annualEvaluations,
    };

    const slot: GameSaveSlot = {
      id: slotId,
      label: label || `Sesi Hari ke-${state.date.dayOfTerm} (${state.date.year})`,
      savedAt: new Date().toLocaleString('id-ID'),
      dayOfTerm: state.date.dayOfTerm,
      year: state.date.year,
      approval: state.publicOpinion.overallApproval,
      data: JSON.stringify(dataToSave),
    };

    const existingSlots = state.saveSlots.filter((s) => s.id !== slotId);
    const updatedSlots = [slot, ...existingSlots];

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_SLOTS, JSON.stringify(updatedSlots));
      } catch (e) {
        console.error('Save game failed to write localStorage', e);
      }
    }

    set({ saveSlots: updatedSlots });
    state.addNotification('Permainan Disimpan', `Penyimpanan ${slot.label} berhasil dicatat.`);
  },

  loadGame: (slotId) => {
    const state = get();
    const slot = state.saveSlots.find((s) => s.id === slotId);
    if (!slot) return false;

    try {
      const parsed = JSON.parse(slot.data);
      soundEngine.playSuccess();
      set({
        indicators: parsed.indicators,
        budget: parsed.budget,
        ministries: parsed.ministries,
        ministers: parsed.ministers,
        candidatePool: parsed.candidatePool,
        factions: parsed.factions,
        publicOpinion: parsed.publicOpinion,
        projects: parsed.projects,
        resolvedEventIds: parsed.resolvedEventIds,
        date: parsed.date,
        annualEvaluations: parsed.annualEvaluations,
        activeCrisisEvent: null,
        activeEvents: [],
        presidentialEnding: null,
      });
      state.addNotification('Permainan Dimuat', `Memuat data sesi ${slot.label}.`);
      return true;
    } catch (e) {
      console.error('Failed to parse save data', e);
      return false;
    }
  },

  exportSaveFile: () => {
    const state = get();
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      indicators: state.indicators,
      budget: state.budget,
      ministries: state.ministries,
      ministers: state.ministers,
      candidatePool: state.candidatePool,
      factions: state.factions,
      publicOpinion: state.publicOpinion,
      projects: state.projects,
      resolvedEventIds: state.resolvedEventIds,
      date: state.date,
      annualEvaluations: state.annualEvaluations,
    };
    return JSON.stringify(exportData, null, 2);
  },

  importSaveFile: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.indicators || !parsed.date) return false;

      soundEngine.playSuccess();
      set({
        indicators: parsed.indicators,
        budget: parsed.budget,
        ministries: parsed.ministries,
        ministers: parsed.ministers,
        candidatePool: parsed.candidatePool,
        factions: parsed.factions,
        publicOpinion: parsed.publicOpinion,
        projects: parsed.projects,
        resolvedEventIds: parsed.resolvedEventIds,
        date: parsed.date,
        annualEvaluations: parsed.annualEvaluations || [],
        activeCrisisEvent: null,
        activeEvents: [],
        presidentialEnding: null,
      });
      get().addNotification('File Impor Berhasil', 'Data kepresidenan berhasil diimpor.');
      return true;
    } catch {
      return false;
    }
  },

  resetNewGame: () => {
    soundEngine.playClick();
    set({
      indicators: INITIAL_INDICATORS,
      budget: INITIAL_BUDGET,
      ministries: INITIAL_MINISTRIES,
      ministers: INITIAL_MINISTERS,
      candidatePool: CANDIDATE_MINISTERS_POOL,
      factions: INITIAL_FACTIONS,
      publicOpinion: INITIAL_PUBLIC_OPINION,
      projects: INITIAL_PROJECTS,
      activeEvents: [],
      resolvedEventIds: [],
      date: INITIAL_DATE,
      timeSpeed: 1,
      currentRoom: 'office',
      isDashboardOpen: false,
      activeCrisisEvent: null,
      annualEvaluations: [],
      currentAnnualModal: null,
      presidentialEnding: null,
    });
  },
}));


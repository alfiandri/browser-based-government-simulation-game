export type TimeSpeed = 0 | 1 | 2 | 4;

export type RoomLocation = 'office' | 'cabinet' | 'press' | 'courtyard';

export interface NationalIndicators {
  gdpNominal: number; // in Trillion IDR (e.g. 22500)
  gdpGrowth: number; // in % (e.g. 5.12)
  inflation: number; // in % (e.g. 2.95)
  unemployment: number; // in % (e.g. 5.2)
  povertyRate: number; // in % (e.g. 9.1)
  exchangeRate: number; // IDR per 1 USD (e.g. 15750)
  nationalDebtPct: number; // Debt as % of GDP (e.g. 39.4)
  foreignInvestment: number; // FDI in Trillion IDR (e.g. 750)
  purchasingPower: number; // Index 0-100 (e.g. 72)
  politicalStability: number; // Index 0-100 (e.g. 76)
  publicTrust: number; // Index 0-100 (e.g. 68)
}

export interface BudgetSector {
  id: string;
  name: string;
  category: 'mandated' | 'development' | 'security' | 'social' | 'governance';
  allocationTrillion: number; // in Trillion IDR
  minMandatedPct?: number; // e.g. 20% for education
  description: string;
}

export interface StateBudget {
  // Revenues
  taxRevenue: number; // PPh, PPN, PBB
  customsRevenue: number; // Bea & Cukai
  nonTaxRevenue: number; // SDA Migas, Tambang, Dividen BUMN
  totalRevenue: number;

  // Expenditures by sectors
  sectors: BudgetSector[];
  totalExpenditure: number;

  // Balance
  deficitTrillion: number; // positive means deficit
  deficitPctGdp: number; // % of GDP, statutory cap is 3.0%
}

export interface MinisterAttributes {
  competency: number; // 0 - 100: Ministry effectiveness
  integrity: number; // 0 - 100: Lower value raises scandal/corruption chance
  loyalty: number; // 0 - 100: Loyalty to President
  leadership: number; // 0 - 100: Speed of policy implementation
  publicReputation: number; // 0 - 100: Media & public opinion
  politicalInfluence: number; // 0 - 100: Sway in DPR & parties
}

export type MinisterBackground = 'teknokrat' | 'politisi' | 'militer' | 'akademisi' | 'profesional';

export interface Minister {
  id: string;
  name: string;
  ministryId: string;
  title: string;
  avatarSeed: string;
  attributes: MinisterAttributes;
  background: MinisterBackground;
  partyAffiliation: string; // Party shortName or 'Non-Partai'
  tenureMonths: number;
}

export interface Ministry {
  id: string;
  name: string;
  ministerId: string;
  budgetTrillion: number;
  performanceScore: number; // 0 - 100
  scandalRisk: number; // 0 - 100
  description: string;
  focusTarget: 'growth' | 'efficiency' | 'equity' | 'stability';
}

export interface PoliticalFaction {
  id: string;
  name: string;
  shortName: string;
  seats: number; // Total seats in DPR = 500
  seatPct: number;
  isCoalition: boolean;
  loyalty: number; // 0 - 100
  ideology: string;
  leaderName: string;
  color: string;
}

export interface DemographicSegment {
  id: string;
  name: string;
  populationWeight: number; // 0 - 1
  approval: number; // 0 - 100
  primaryConcern: string;
}

export interface PublicOpinion {
  overallApproval: number; // 0 - 100
  segments: {
    pekerja: DemographicSegment;
    pengusaha: DemographicSegment;
    petani: DemographicSegment;
    nelayan: DemographicSegment;
    mahasiswa: DemographicSegment;
    asn: DemographicSegment;
    perkotaan: DemographicSegment;
    pedesaan: DemographicSegment;
  };
}

export interface InfrastructureProject {
  id: string;
  name: string;
  category: 'Transportasi' | 'Pendidikan' | 'Kesehatan' | 'Energi' | 'Kawasan Industri';
  region: string;
  costTrillion: number;
  durationDays: number;
  progressDays: number;
  status: 'planning' | 'ongoing' | 'completed';
  gdpBoost: number;
  employmentBoost: number;
  approvalBoost: number;
  description: string;
}

export interface GameEventImpact {
  approvalDelta?: number;
  gdpGrowthDelta?: number;
  inflationDelta?: number;
  unemploymentDelta?: number;
  politicalStabilityDelta?: number;
  publicTrustDelta?: number;
  budgetCostTrillion?: number;
  message: string;
}

export interface GameEventChoice {
  id: string;
  label: string;
  description: string;
  costTrillion: number;
  impacts: GameEventImpact;
  requiredSupportPct?: number; // Required DPR support
}

export interface GameEvent {
  id: string;
  title: string;
  category: 'economy' | 'politics' | 'social' | 'disaster' | 'diplomatic';
  headline: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'crisis';
  dateTriggered: string;
  choices: GameEventChoice[];
  resolvedChoiceId?: string;
  location?: string;
}

export interface GameDate {
  day: number; // 1 - 30
  month: number; // 1 - 12
  year: number; // 2029 - 2034
  dayOfTerm: number; // 1 - 1825
  hour: number; // 8 - 18
}

export interface AnnualEvaluation {
  year: number;
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  economicScore: number;
  welfareScore: number;
  stabilityScore: number;
  integrityScore: number;
  infrastructureScore: number;
  diplomacyScore: number;
  summary: string;
  recommendations: string[];
}

export interface PresidentialEnding {
  type: 'transformational' | 'successful' | 'economic_failure' | 'political_crisis' | 'corrupt_administration';
  title: string;
  rankTitle: string;
  finalScore: number; // 0 - 100
  summary: string;
  legacyText: string;
  breakdown: {
    economy: number;
    welfare: number;
    stability: number;
    integrity: number;
    infrastructure: number;
    diplomacy: number;
  };
}

export interface GameSaveSlot {
  id: string;
  label: string;
  savedAt: string;
  dayOfTerm: number;
  year: number;
  approval: number;
  data: string; // Serialized JSON string of the state
}


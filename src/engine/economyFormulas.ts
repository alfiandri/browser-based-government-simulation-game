import { NationalIndicators, StateBudget, PublicOpinion } from '../types/game';

/**
 * Calculates national tax and non-tax revenues based on current GDP and economic state
 */
export function calculateBudgetRevenues(gdpNominal: number, indicators: NationalIndicators): {
  taxRevenue: number;
  customsRevenue: number;
  nonTaxRevenue: number;
  totalRevenue: number;
} {
  // Indonesia Tax Ratio is around 10.2% - 11.5% of GDP
  const baseTaxRatio = 0.105;
  const growthModifier = 1 + (indicators.gdpGrowth - 5.0) * 0.05;
  const taxRevenue = Math.round(gdpNominal * baseTaxRatio * growthModifier);

  // Customs (Bea Cukai) ~ 1.2% of GDP
  const customsRevenue = Math.round(gdpNominal * 0.013);

  // Non-Tax State Revenue (PNBP: Natural Resources, Mining, State Enterprise Dividends) ~ 2.4%
  const nonTaxRevenue = Math.round(gdpNominal * 0.024 * (indicators.purchasingPower / 70));

  const totalRevenue = taxRevenue + customsRevenue + nonTaxRevenue;

  return {
    taxRevenue,
    customsRevenue,
    nonTaxRevenue,
    totalRevenue,
  };
}

/**
 * Calculates budget balance and statutory deficit limit ratio
 */
export function calculateBudgetBalance(budget: StateBudget, gdpNominal: number) {
  const totalExpenditure = budget.sectors.reduce((acc, s) => acc + s.allocationTrillion, 0);
  const deficitTrillion = Math.max(0, totalExpenditure - budget.totalRevenue);
  const deficitPctGdp = Number(((deficitTrillion / gdpNominal) * 100).toFixed(2));

  return {
    totalExpenditure,
    deficitTrillion,
    deficitPctGdp,
    isOverStatutoryCap: deficitPctGdp > 3.0, // Indonesian Law No. 17/2003 sets max deficit 3.0%
  };
}

/**
 * Deterministic Macroeconomic Tick
 * Computes updated national indicators based on budget priorities and past performance
 */
export function simulateEconomicStep(
  current: NationalIndicators,
  budget: StateBudget,
  activeProjectsCount: number,
  avgCabinetCompetency: number,
  deltaDays: number = 1
): NationalIndicators {
  const daysFactor = deltaDays / 30; // Scale to monthly impact

  // 1. Sector Spending Impact
  const infraSector = budget.sectors.find((s) => s.id === 'infrastruktur')?.allocationTrillion || 400;
  const eduSector = budget.sectors.find((s) => s.id === 'pendidikan')?.allocationTrillion || 660;
  const subsidySector = budget.sectors.find((s) => s.id === 'subsidi')?.allocationTrillion || 320;
  const bansosSector = budget.sectors.find((s) => s.id === 'bansos')?.allocationTrillion || 250;

  // 2. GDP Growth Drivers: Infra + Investment + Competency
  const infraBoost = (infraSector - 380) * 0.0015;
  const competenceMultiplier = avgCabinetCompetency / 75;
  const investmentTrend = (current.foreignInvestment - 700) * 0.0008;

  let targetGdpGrowth = 5.05 + infraBoost * competenceMultiplier + investmentTrend + (activeProjectsCount * 0.06);
  targetGdpGrowth = Math.max(1.5, Math.min(7.8, targetGdpGrowth));

  const newGdpGrowth = Number((current.gdpGrowth + (targetGdpGrowth - current.gdpGrowth) * 0.08 * daysFactor).toFixed(2));

  // 3. Nominal GDP Accumulation (Daily compound)
  const annualGrowthMultiplier = 1 + (newGdpGrowth / 100);
  const dailyGrowthMultiplier = Math.pow(annualGrowthMultiplier, deltaDays / 365);
  const newGdpNominal = Math.round(current.gdpNominal * dailyGrowthMultiplier);

  // 4. Inflation Dynamics:
  // Subsidies stabilize inflation; low subsidies cause short-term inflation spike
  const subsidyRelief = (subsidySector - 300) * 0.003;
  const exchangeRatePressure = (current.exchangeRate - 15500) * 0.0004;
  let targetInflation = 3.1 - subsidyRelief + exchangeRatePressure;
  targetInflation = Math.max(1.2, Math.min(8.5, targetInflation));
  const newInflation = Number((current.inflation + (targetInflation - current.inflation) * 0.06 * daysFactor).toFixed(2));

  // 5. Unemployment:
  // Stimulated by GDP growth and infrastructure activity
  const jobCreationFactor = (newGdpGrowth - 4.5) * 0.12 + (activeProjectsCount * 0.08);
  let targetUnemployment = 5.3 - jobCreationFactor;
  targetUnemployment = Math.max(3.2, Math.min(9.5, targetUnemployment));
  const newUnemployment = Number((current.unemployment + (targetUnemployment - current.unemployment) * 0.05 * daysFactor).toFixed(2));

  // 6. Poverty Rate:
  // Driven by bansos safety net, inflation burden, and unemployment
  const bansosRelief = (bansosSector - 230) * 0.004;
  const inflationPenalty = Math.max(0, (newInflation - 3.5) * 0.2);
  let targetPoverty = 9.2 - bansosRelief + inflationPenalty - (jobCreationFactor * 0.3);
  targetPoverty = Math.max(4.5, Math.min(14.0, targetPoverty));
  const newPovertyRate = Number((current.povertyRate + (targetPoverty - current.povertyRate) * 0.04 * daysFactor).toFixed(2));

  // 7. Purchasing Power (0-100)
  const realIncomeGrowth = (newGdpGrowth - newInflation);
  let targetPurchasingPower = 70 + realIncomeGrowth * 3.5 - (newUnemployment - 5.0) * 3;
  targetPurchasingPower = Math.max(30, Math.min(95, targetPurchasingPower));
  const newPurchasingPower = Math.round(current.purchasingPower + (targetPurchasingPower - current.purchasingPower) * 0.05 * daysFactor);

  // 8. Exchange Rate (USD/IDR)
  const tradeStrength = (current.foreignInvestment - 700) * 0.4;
  const inflationDiff = (newInflation - 2.5) * 45;
  let targetExchange = 15800 - tradeStrength + inflationDiff;
  targetExchange = Math.max(14000, Math.min(17500, targetExchange));
  const newExchangeRate = Math.round(current.exchangeRate + (targetExchange - current.exchangeRate) * 0.04 * daysFactor);

  // 9. Debt % of GDP
  const balance = calculateBudgetBalance(budget, newGdpNominal);
  let newDebtPct = current.nationalDebtPct;
  if (balance.deficitTrillion > 0) {
    const annualDeficitRatio = balance.deficitPctGdp;
    newDebtPct = Number((current.nationalDebtPct + (annualDeficitRatio - (newGdpGrowth * 0.4)) * (deltaDays / 365)).toFixed(2));
    newDebtPct = Math.max(25, Math.min(65, newDebtPct));
  }

  // 10. Foreign Investment (FDI)
  const stabilityBonus = (current.politicalStability - 70) * 3;
  let targetFdi = 750 + (newGdpGrowth - 5.0) * 40 + stabilityBonus;
  targetFdi = Math.max(400, Math.min(1300, targetFdi));
  const newForeignInvestment = Math.round(current.foreignInvestment + (targetFdi - current.foreignInvestment) * 0.05 * daysFactor);

  return {
    ...current,
    gdpNominal: newGdpNominal,
    gdpGrowth: newGdpGrowth,
    inflation: newInflation,
    unemployment: newUnemployment,
    povertyRate: newPovertyRate,
    exchangeRate: newExchangeRate,
    nationalDebtPct: newDebtPct,
    foreignInvestment: newForeignInvestment,
    purchasingPower: newPurchasingPower,
  };
}

/**
 * Calculates updated public opinion across demographic segments and overall approval
 */
export function simulatePublicOpinionStep(
  opinion: PublicOpinion,
  indicators: NationalIndicators,
  budget: StateBudget,
  deltaDays: number = 1
): PublicOpinion {
  const daysFactor = deltaDays / 30;
  const segs = { ...opinion.segments };

  // Helper to nudge segment approval
  const nudge = (current: number, target: number, speed: number = 0.08) => {
    const val = current + (target - current) * speed * daysFactor;
    return Math.max(15, Math.min(95, Math.round(val)));
  };

  // 1. Workers: care about job market, inflation, and purchasing power
  const workersTarget = 60 + (indicators.purchasingPower - 70) * 0.6 - (indicators.unemployment - 5.0) * 4 - (indicators.inflation - 3.0) * 3;
  segs.pekerja.approval = nudge(segs.pekerja.approval, workersTarget);

  // 2. Business: care about GDP growth, FDI, low inflation, exchange rate stability
  const businessTarget = 62 + (indicators.gdpGrowth - 5.0) * 5 + (indicators.foreignInvestment - 750) * 0.04 - (indicators.nationalDebtPct > 45 ? 6 : 0);
  segs.pengusaha.approval = nudge(segs.pengusaha.approval, businessTarget);

  // 3. Farmers: care about fertilizer subsidies, agriculture budget
  const agSector = budget.sectors.find((s) => s.id === 'pertanian')?.allocationTrillion || 120;
  const farmersTarget = 64 + (agSector - 110) * 0.15 - (indicators.inflation > 4.5 ? 4 : 0);
  segs.petani.approval = nudge(segs.petani.approval, farmersTarget);

  // 4. Fishermen: care about coastal development and fuel subsidy
  const fuelSubsidy = budget.sectors.find((s) => s.id === 'subsidi')?.allocationTrillion || 300;
  const fishTarget = 60 + (fuelSubsidy - 280) * 0.08;
  segs.nelayan.approval = nudge(segs.nelayan.approval, fishTarget);

  // 5. Students: care about anti-corruption, education budget, political freedom
  const eduSector = budget.sectors.find((s) => s.id === 'pendidikan')?.allocationTrillion || 660;
  const studentsTarget = 65 + (eduSector - 640) * 0.05 + (indicators.publicTrust - 68) * 0.4;
  segs.mahasiswa.approval = nudge(segs.mahasiswa.approval, studentsTarget);

  // 6. Civil Servants (ASN): care about governance budget and salary stability
  const adminSector = budget.sectors.find((s) => s.id === 'administrasi')?.allocationTrillion || 310;
  const asnTarget = 70 + (adminSector - 300) * 0.06;
  segs.asn.approval = nudge(segs.asn.approval, asnTarget);

  // 7. Urban: care about infrastructure, public transport, inflation
  const urbanTarget = 60 + (indicators.purchasingPower - 70) * 0.5 - (indicators.inflation - 3.0) * 4;
  segs.perkotaan.approval = nudge(segs.perkotaan.approval, urbanTarget);

  // 8. Rural: care about bansos, village fund transfers, poverty reduction
  const transferSector = budget.sectors.find((s) => s.id === 'transfer_daerah')?.allocationTrillion || 850;
  const ruralTarget = 66 + (transferSector - 820) * 0.05 - (indicators.povertyRate - 9.0) * 3;
  segs.pedesaan.approval = nudge(segs.pedesaan.approval, ruralTarget);

  // Weighted overall approval
  const totalWeighted = Object.values(segs).reduce((acc, seg) => acc + seg.approval * seg.populationWeight, 0);
  const overallApproval = Math.max(15, Math.min(95, Math.round(totalWeighted)));

  return {
    overallApproval,
    segments: segs,
  };
}

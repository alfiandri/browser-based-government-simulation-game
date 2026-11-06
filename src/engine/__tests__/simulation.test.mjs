import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateBudgetRevenues,
  calculateBudgetBalance,
  simulateEconomicStep,
  simulatePublicOpinionStep,
} from '../economyFormulas.ts';

import {
  advanceDateByDays,
  advanceInfrastructureProjects,
  generateAnnualEvaluation,
  computePresidentialEnding,
} from '../simulationEngine.ts';

import { NATIONAL_EVENT_BANK } from '../eventSystem.ts';
import { INITIAL_MINISTRIES, INITIAL_MINISTERS } from '../cabinetSystem.ts';

test('calculateBudgetRevenues calculates realistic Indonesian tax and non-tax revenues', () => {
  const gdp = 22500;
  const indicators = {
    gdpNominal: gdp,
    gdpGrowth: 5.1,
    inflation: 3.0,
    unemployment: 5.2,
    povertyRate: 9.1,
    exchangeRate: 15750,
    nationalDebtPct: 39.2,
    foreignInvestment: 750,
    purchasingPower: 72,
    politicalStability: 78,
    publicTrust: 70,
  };

  const rev = calculateBudgetRevenues(gdp, indicators);
  assert.ok(rev.totalRevenue > 2500, 'Total revenue should be substantial for 22.5k T GDP');
  assert.ok(rev.taxRevenue > 2000, 'Tax revenue should be over 2000 T');
  assert.equal(rev.totalRevenue, rev.taxRevenue + rev.customsRevenue + rev.nonTaxRevenue);
});

test('calculateBudgetBalance identifies statutory cap violations (> 3% GDP)', () => {
  const budget = {
    taxRevenue: 2400,
    customsRevenue: 300,
    nonTaxRevenue: 500,
    totalRevenue: 3200,
    sectors: [
      { id: 's1', name: 'Sektor A', category: 'mandated', allocationTrillion: 2000, description: '' },
      { id: 's2', name: 'Sektor B', category: 'mandated', allocationTrillion: 2000, description: '' },
    ],
    totalExpenditure: 4000,
    deficitTrillion: 800,
    deficitPctGdp: 3.55,
  };

  const balance = calculateBudgetBalance(budget, 22500);
  assert.equal(balance.totalExpenditure, 4000);
  assert.equal(balance.deficitTrillion, 800);
  assert.ok(balance.isOverStatutoryCap, 'Deficit 800 T on 22.5k T GDP is 3.55%, exceeding 3% limit');
});

test('simulateEconomicStep maintains realistic macroeconomic bounds', () => {
  const initial = {
    gdpNominal: 22500,
    gdpGrowth: 5.1,
    inflation: 3.0,
    unemployment: 5.2,
    povertyRate: 9.1,
    exchangeRate: 15750,
    nationalDebtPct: 39.2,
    foreignInvestment: 750,
    purchasingPower: 72,
    politicalStability: 78,
    publicTrust: 70,
  };

  const budget = {
    taxRevenue: 2400,
    customsRevenue: 300,
    nonTaxRevenue: 500,
    totalRevenue: 3200,
    sectors: [
      { id: 'infrastruktur', name: 'Infrastruktur', category: 'development', allocationTrillion: 420, description: '' },
      { id: 'pendidikan', name: 'Pendidikan', category: 'mandated', allocationTrillion: 660, description: '' },
      { id: 'subsidi', name: 'Subsidi', category: 'social', allocationTrillion: 320, description: '' },
      { id: 'bansos', name: 'Bansos', category: 'social', allocationTrillion: 250, description: '' },
    ],
    totalExpenditure: 1650,
    deficitTrillion: 0,
    deficitPctGdp: 0,
  };

  const updated = simulateEconomicStep(initial, budget, 2, 85, 30);
  assert.ok(updated.gdpNominal >= initial.gdpNominal, 'Nominal GDP should accumulate with positive growth');
  assert.ok(updated.gdpGrowth > 2.0 && updated.gdpGrowth < 8.0, 'GDP growth bounded in reasonable range');
  assert.ok(updated.inflation > 1.0 && updated.inflation < 9.0, 'Inflation bounded in reasonable range');
  assert.ok(updated.unemployment > 3.0 && updated.unemployment < 10.0, 'Unemployment bounded');
});

test('advanceDateByDays rolls over months and completes 5-year term', () => {
  const start = { day: 29, month: 12, year: 2029, dayOfTerm: 359, hour: 10 };
  const res = advanceDateByDays(start, 2);

  assert.equal(res.newDate.day, 1);
  assert.equal(res.newDate.month, 1);
  assert.equal(res.newDate.year, 2030);
  assert.ok(res.isNewYear, 'Should trigger new year');
  assert.ok(res.isNewMonth, 'Should trigger new month');

  // Term completion check at 1800 days
  const nearEnd = { day: 30, month: 12, year: 2034, dayOfTerm: 1799, hour: 10 };
  const termRes = advanceDateByDays(nearEnd, 2);
  assert.ok(termRes.isTermComplete, 'Should mark presidential term complete after 1800 days');
});

test('NATIONAL_EVENT_BANK has rich valid choices and positive/negative impacts', () => {
  assert.ok(NATIONAL_EVENT_BANK.length >= 8, 'Event bank should have multiple scenarios');
  NATIONAL_EVENT_BANK.forEach((ev) => {
    assert.ok(ev.id, 'Event must have id');
    assert.ok(ev.title, 'Event must have title');
    assert.ok(ev.choices.length >= 2, 'Event must offer at least 2 choices');
    ev.choices.forEach((c) => {
      assert.ok(c.id, 'Choice must have id');
      assert.ok(c.label, 'Choice must have label');
      assert.ok(typeof c.costTrillion === 'number', 'Choice must have numeric cost');
      assert.ok(c.impacts.message, 'Choice must have impact message');
    });
  });
});

test('INITIAL_MINISTRIES and INITIAL_MINISTERS are aligned 1-to-1', () => {
  assert.equal(INITIAL_MINISTRIES.length, 12, 'Must have 12 ministries as specified in PRD');
  assert.equal(INITIAL_MINISTERS.length, 12, 'Must have 12 ministers');

  INITIAL_MINISTRIES.forEach((m) => {
    const minister = INITIAL_MINISTERS.find((min) => min.ministryId === m.id);
    assert.ok(minister, `Ministry ${m.id} must have an appointed minister`);
    assert.ok(minister.attributes.competency > 0, 'Competency must be positive');
    assert.ok(minister.attributes.integrity > 0, 'Integrity must be positive');
  });
});


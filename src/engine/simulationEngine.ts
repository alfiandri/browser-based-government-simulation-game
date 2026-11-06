import {
  GameDate,
  NationalIndicators,
  StateBudget,
  PublicOpinion,
  InfrastructureProject,
  Minister,
  Ministry,
  GameEvent,
  AnnualEvaluation,
  PresidentialEnding,
} from '../types/game';
import { simulateEconomicStep, simulatePublicOpinionStep } from './economyFormulas';
import { NATIONAL_EVENT_BANK } from './eventSystem';

/**
 * Format game date to Indonesian string (e.g. "20 Oktober 2029")
 */
export function formatIndonesianDate(date: GameDate): string {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${date.day} ${months[date.month - 1]} ${date.year}`;
}

/**
 * Progresses the game date by 1 day and handles monthly/yearly roll-overs
 */
export function advanceDateByDays(current: GameDate, daysToAdd: number = 1): {
  newDate: GameDate;
  isNewMonth: boolean;
  isNewYear: boolean;
  isTermComplete: boolean;
} {
  let day = current.day + daysToAdd;
  let month = current.month;
  let year = current.year;
  const dayOfTerm = current.dayOfTerm + daysToAdd;
  let isNewMonth = false;
  let isNewYear = false;

  // Simplification: each month has 30 days for clean, balanced game simulation
  while (day > 30) {
    day -= 30;
    month += 1;
    isNewMonth = true;
    if (month > 12) {
      month = 1;
      year += 1;
      isNewYear = true;
    }
  }

  // 5 Years = 5 * 360 = 1800 days (or 1825 days)
  const isTermComplete = dayOfTerm >= 1800;

  return {
    newDate: {
      day,
      month,
      year,
      dayOfTerm,
      hour: 10,
    },
    isNewMonth,
    isNewYear,
    isTermComplete,
  };
}

/**
 * Advances ongoing infrastructure projects
 */
export function advanceInfrastructureProjects(
  projects: InfrastructureProject[],
  deltaDays: number = 1
): {
  updatedProjects: InfrastructureProject[];
  newlyCompleted: InfrastructureProject[];
} {
  const newlyCompleted: InfrastructureProject[] = [];

  const updatedProjects = projects.map((proj) => {
    if (proj.status !== 'ongoing') return proj;

    const newProgress = proj.progressDays + deltaDays;
    if (newProgress >= proj.durationDays) {
      const completedProj: InfrastructureProject = {
        ...proj,
        progressDays: proj.durationDays,
        status: 'completed',
      };
      newlyCompleted.push(completedProj);
      return completedProj;
    }

    return {
      ...proj,
      progressDays: newProgress,
    };
  });

  return { updatedProjects, newlyCompleted };
}

/**
 * Selects an event from the bank to trigger based on game conditions
 */
export function checkEventTrigger(
  dayOfTerm: number,
  activeEvents: GameEvent[],
  resolvedEventIds: string[]
): GameEvent | null {
  // Trigger an event approximately every 35-50 days if no active event is waiting
  if (activeEvents.length > 0) return null;

  // Find events not yet resolved
  const available = NATIONAL_EVENT_BANK.filter((e) => !resolvedEventIds.includes(e.id));
  if (available.length === 0) return null;

  // Check random chance per day (~1 in 40 days)
  const chance = Math.random();
  if (chance < 0.025 || dayOfTerm === 15) {
    const selected = available[Math.floor(Math.random() * available.length)];
    return {
      ...selected,
      dateTriggered: `Hari ke-${dayOfTerm}`,
    };
  }

  return null;
}

/**
 * Computes Annual Evaluation for the year
 */
export function generateAnnualEvaluation(
  yearIndex: number,
  indicators: NationalIndicators,
  opinion: PublicOpinion,
  projects: InfrastructureProject[],
  ministers: Minister[]
): AnnualEvaluation {
  const avgIntegrity = ministers.reduce((acc, m) => acc + m.attributes.integrity, 0) / ministers.length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;

  // Scores 0-100
  const economicScore = Math.round(
    Math.min(100, Math.max(20, (indicators.gdpGrowth / 7.0) * 50 + (10 - indicators.inflation) * 5))
  );
  const welfareScore = Math.round(
    Math.min(100, Math.max(20, opinion.overallApproval * 0.7 + (15 - indicators.povertyRate) * 3))
  );
  const stabilityScore = Math.round(indicators.politicalStability);
  const integrityScore = Math.round(avgIntegrity);
  const infrastructureScore = Math.min(100, 50 + completedProjects * 12);
  const diplomacyScore = Math.round(
    Math.min(100, Math.max(30, (indicators.foreignInvestment / 1000) * 80 + 20))
  );

  const weightedTotal =
    economicScore * 0.25 +
    welfareScore * 0.25 +
    stabilityScore * 0.15 +
    integrityScore * 0.15 +
    infrastructureScore * 0.10 +
    diplomacyScore * 0.10;

  let grade: 'A' | 'B' | 'C' | 'D' | 'E' = 'C';
  if (weightedTotal >= 85) grade = 'A';
  else if (weightedTotal >= 72) grade = 'B';
  else if (weightedTotal >= 58) grade = 'C';
  else if (weightedTotal >= 45) grade = 'D';
  else grade = 'E';

  const summary = `Evaluasi Pemerintahan Tahun ke-${yearIndex}: Negara mencatatkan nilai rata-rata kinerja ${weightedTotal.toFixed(1)}/100 (Predikat: ${grade}). ` +
    (grade === 'A'
      ? 'Pertumbuhan ekonomi kokoh, kepuasan publik tinggi, dan kabinet menunjukkan stabilitas kepemimpinan yang teladan.'
      : grade === 'B'
      ? 'Kondisi makroekonomi dan sosial terkendali dengan baik, perlu percepatan pada beberapa proyek strategis nasional.'
      : 'Pemerintah menghadapi tantangan serius pada daya beli rakyat dan koordinasi antarkementerian.');

  const recommendations = [
    indicators.inflation > 4.0 ? 'Kendalikan lonjakan harga pangan dan bahan pokok melalui operasi pasar.' : 'Pertahankan stabilitas inflasi yang ramah investasi.',
    indicators.politicalStability < 65 ? 'Perkuat jembatan lobi dengan fraksi parlemen DPR untuk mengamankan persetujuan anggaran.' : 'Konsolidasi koalisi DPR berjalan solid.',
    avgIntegrity < 75 ? 'Pertimbangkan reshuffle kabinet untuk menteri yang terindikasi rawan skandal integritas.' : 'Integritas kabinet diapresiasi oleh masyarakat.',
  ];

  return {
    year: yearIndex,
    overallGrade: grade,
    economicScore,
    welfareScore,
    stabilityScore,
    integrityScore,
    infrastructureScore,
    diplomacyScore,
    summary,
    recommendations,
  };
}

/**
 * Computes 5-Year Final Presidential Evaluation and Ending
 */
export function computePresidentialEnding(
  indicators: NationalIndicators,
  opinion: PublicOpinion,
  projects: InfrastructureProject[],
  ministers: Minister[]
): PresidentialEnding {
  const avgIntegrity = ministers.reduce((acc, m) => acc + m.attributes.integrity, 0) / ministers.length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;

  const eco = Math.round(Math.min(100, Math.max(20, (indicators.gdpGrowth / 6.5) * 60 + (10 - indicators.inflation) * 4)));
  const wel = Math.round(opinion.overallApproval);
  const sta = Math.round(indicators.politicalStability);
  const int = Math.round(avgIntegrity);
  const inf = Math.min(100, 50 + completedProjects * 10);
  const dip = Math.round(Math.min(100, Math.max(30, (indicators.foreignInvestment / 1000) * 85 + 15)));

  const finalScore = Number(
    (eco * 0.25 + wel * 0.25 + sta * 0.15 + int * 0.15 + inf * 0.10 + dip * 0.10).toFixed(1)
  );

  let type: PresidentialEnding['type'] = 'successful';
  let title = 'Presiden Berprestasi & Pemersatu Bangsa';
  let rankTitle = 'Bapak / Ibu Pembangunan Inklusif';
  let summary = 'Selama lima tahun memimpin, Anda berhasil menavigasi dinamika politik dan menjaga stabilitas ekonomi Indonesia.';
  let legacyText = 'Rakyat mengenang masa jabatan Anda sebagai era kemajuan yang membawa rasa aman, pemerataan pembangunan, dan optimisme bangsa.';

  if (finalScore >= 84 && int >= 80 && eco >= 80) {
    type = 'transformational';
    title = 'Presiden Transformasional & Negarawan Sejati';
    rankTitle = 'Sang Pembaharu Nusantara';
    summary = 'Kepemimpinan luar biasa yang mereformasi birokrasi, mencetak rekor pertumbuhan ekonomi, dan mengangkat martabat Indonesia di panggung dunia.';
    legacyText = 'Nama Anda diabadikan dalam buku sejarah nasional sebagai teladan kepala negara yang berani, bersih, dan berpihak kepada rakyat.';
  } else if (sta < 45) {
    type = 'political_crisis';
    title = 'Kepemimpinan Terguncang Krisis Politik';
    rankTitle = 'Presiden di Pusaran Konflik Parlemen';
    summary = 'Kerapuhan koalisi dan polarisasi parlemen membuat program kerja pemerintah terhambat oleh manuver politik.';
    legacyText = 'Masa jabatan berakhir di tengah gejolak demonstrasi dan perdebatan sengit tentang arah konstitusi negara.';
  } else if (eco < 50 || indicators.povertyRate > 11.5) {
    type = 'economic_failure';
    title = 'Era Stagflasi & Beban Utang Negara';
    rankTitle = 'Kepemimpinan di Tengah Badai Ekonomi';
    summary = 'Defisit anggaran yang membengkak dan inflasi tak terkendali menekan daya beli masyarakat luas.';
    legacyText = 'Pemerintahan berikutnya mewarisi tantangan fiskal berat untuk memulihkan stabilitas moneter dan kesejahteraan.';
  } else if (int < 60) {
    type = 'corrupt_administration';
    title = 'Kabinet Terseret Skandal Pengadaan';
    rankTitle = 'Pemerintahan Oligarki Terbuka';
    summary = 'Kurangnya pengawasan independen memicu rangkaian skandal gratifikasi yang mengikis kepercayaan masyarakat sipil.';
    legacyText = 'Rakyat menuntut reformasi total terhadap lembaga penegak hukum dan sistem rekrutmen pejabat negara.';
  }

  return {
    type,
    title,
    rankTitle,
    finalScore,
    summary,
    legacyText,
    breakdown: {
      economy: eco,
      welfare: wel,
      stability: sta,
      integrity: int,
      infrastructure: inf,
      diplomacy: dip,
    },
  };
}

import {
  NationalIndicators,
  StateBudget,
  PublicOpinion,
  PoliticalFaction,
  InfrastructureProject,
  GameDate,
} from '@/types/game';
import { INITIAL_MINISTRIES, INITIAL_MINISTERS } from '@/engine/cabinetSystem';

export const INITIAL_INDICATORS: NationalIndicators = {
  gdpNominal: 22500, // Triliun Rupiah
  gdpGrowth: 5.15, // %
  inflation: 2.85, // %
  unemployment: 5.10, // %
  povertyRate: 9.15, // %
  exchangeRate: 15750, // Rp / USD
  nationalDebtPct: 39.2, // % of GDP
  foreignInvestment: 750, // Triliun Rupiah
  purchasingPower: 72, // Index 0-100
  politicalStability: 78, // Index 0-100
  publicTrust: 70, // Index 0-100
};

export const INITIAL_BUDGET: StateBudget = {
  taxRevenue: 2420,
  customsRevenue: 295,
  nonTaxRevenue: 545,
  totalRevenue: 3260,
  sectors: [
    {
      id: 'pendidikan',
      name: 'Pendidikan & Kebudayaan',
      category: 'mandated',
      allocationTrillion: 665,
      minMandatedPct: 20.0,
      description: 'Amanat UUD 1945 alokasi minimal 20% APBN: BOS sekolah, KIP Kuliah, dan gaji guru.',
    },
    {
      id: 'kesehatan',
      name: 'Kesehatan Masyarakat',
      category: 'mandated',
      allocationTrillion: 188,
      minMandatedPct: 5.0,
      description: 'Subsidi iuran BPJS PBI, sarana RSUD daerah, penanganan stunting, dan obat terjangkau.',
    },
    {
      id: 'infrastruktur',
      name: 'Infrastruktur & PUPR',
      category: 'development',
      allocationTrillion: 425,
      description: 'Jalan tol, bendungan irigasi, konektivitas pelabuhan, dan sanitasi permukiman.',
    },
    {
      id: 'pertahanan',
      name: 'Pertahanan Nasional (TNI)',
      category: 'security',
      allocationTrillion: 142,
      description: 'Modernisasi alutsista darat/laut/udara, radar perbatasan, dan kesejahteraan prajurit.',
    },
    {
      id: 'keamanan',
      name: 'Keamanan & Ketertiban (Polri)',
      category: 'security',
      allocationTrillion: 126,
      description: 'Pemeliharaan kamtibmas, penegakan hukum, satgas siber, dan pengamanan pemilu.',
    },
    {
      id: 'subsidi',
      name: 'Subsidi BBM & Listrik',
      category: 'social',
      allocationTrillion: 335,
      description: 'Subsidi solar, minyak tanah, LPG 3kg, dan kompensasi tarif listrik rumah tangga rentan.',
    },
    {
      id: 'bansos',
      name: 'Bantuan Sosial & Perlinsos',
      category: 'social',
      allocationTrillion: 265,
      description: 'Program Keluarga Harapan (PKH), Kartu Sembako pangan, dan jaring pengaman kemiskinan ekstrem.',
    },
    {
      id: 'administrasi',
      name: 'Administrasi Pemerintahan',
      category: 'governance',
      allocationTrillion: 310,
      description: 'Gaji ASN, operasional kementerian/lembaga negara, dan pelayanan digital birokrasi.',
    },
    {
      id: 'ristek',
      name: 'Riset, Inovasi & BRIN',
      category: 'development',
      allocationTrillion: 38,
      description: 'Riset teknologi nasional, bioteknologi tropis, hilirisasi energi terbarukan, dan paten domestik.',
    },
    {
      id: 'transfer_daerah',
      name: 'Transfer ke Daerah (TKD) & Dana Desa',
      category: 'development',
      allocationTrillion: 865,
      description: 'Dana Alokasi Umum (DAU), Dana Alokasi Khusus (DAK), dan Dana Desa untuk 75.000 desa.',
    },
  ],
  totalExpenditure: 3359,
  deficitTrillion: 99,
  deficitPctGdp: 0.44,
};

export const INITIAL_FACTIONS: PoliticalFaction[] = [
  {
    id: 'ppb',
    name: 'Partai Persatuan Bangsa',
    shortName: 'PPB',
    seats: 132,
    seatPct: 26.4,
    isCoalition: true,
    loyalty: 90,
    ideology: 'Nasionalis Kerakyatan',
    leaderName: 'Prabowo Subianto Jr.',
    color: '#d97706',
  },
  {
    id: 'pkr',
    name: 'Partai Kesejahteraan Rakyat',
    shortName: 'PKR',
    seats: 112,
    seatPct: 22.4,
    isCoalition: true,
    loyalty: 82,
    ideology: 'Sosial Demokrasi Marhaen',
    leaderName: 'Puan Maharani Putri',
    color: '#dc2626',
  },
  {
    id: 'pnb',
    name: 'Partai Nusantara Baru',
    shortName: 'PNB',
    seats: 64,
    seatPct: 12.8,
    isCoalition: true,
    loyalty: 78,
    ideology: 'Restorasi & Inovasi',
    leaderName: 'Surya Paloh Jr.',
    color: '#1d4ed8',
  },
  {
    id: 'pbb',
    name: 'Partai Pembangunan Bersama',
    shortName: 'Pembangunan',
    seats: 62,
    seatPct: 12.4,
    isCoalition: true,
    loyalty: 80,
    ideology: 'Moderat Agamis',
    leaderName: 'Zulkifli Hasan Jr.',
    color: '#059669',
  },
  {
    id: 'pgd',
    name: 'Partai Garda Demokrasi',
    shortName: 'PGD',
    seats: 76,
    seatPct: 15.2,
    isCoalition: false,
    loyalty: 35,
    ideology: 'Konservatif Nasionalis',
    leaderName: 'Agus Harimurti Jr.',
    color: '#4338ca',
  },
  {
    id: 'pkm',
    name: 'Partai Keadilan Moral',
    shortName: 'Keadilan',
    seats: 54,
    seatPct: 10.8,
    isCoalition: false,
    loyalty: 25,
    ideology: 'Moral Islam Modern',
    leaderName: 'Ahmad Syaikhu Jr.',
    color: '#ea580c',
  },
];

export const INITIAL_PUBLIC_OPINION: PublicOpinion = {
  overallApproval: 68,
  segments: {
    pekerja: { id: 'pekerja', name: 'Buruh & Pekerja Swasta', populationWeight: 0.22, approval: 65, primaryConcern: 'Upah Minimum & Stabilitas Harga' },
    pengusaha: { id: 'pengusaha', name: 'Pelaku Usaha & Investor', populationWeight: 0.08, approval: 74, primaryConcern: 'Kepastian Hukum & Pajak' },
    petani: { id: 'petani', name: 'Petani & Perkebunan', populationWeight: 0.18, approval: 69, primaryConcern: 'Subsidi Pupuk & Harga Panen' },
    nelayan: { id: 'nelayan', name: 'Nelayan & Pesisir', populationWeight: 0.06, approval: 63, primaryConcern: 'Subsidi Solar & Bantuan Kapal' },
    mahasiswa: { id: 'mahasiswa', name: 'Mahasiswa & Pemuda', populationWeight: 0.12, approval: 67, primaryConcern: 'Lapangan Kerja & Kebebasan' },
    asn: { id: 'asn', name: 'Aparatur Sipil Negara (ASN)', populationWeight: 0.06, approval: 79, primaryConcern: 'Kesejahteraan & Tunjangan Kinerja' },
    perkotaan: { id: 'perkotaan', name: 'Masyarakat Perkotaan', populationWeight: 0.15, approval: 66, primaryConcern: 'Transportasi Publik & Inflasi' },
    pedesaan: { id: 'pedesaan', name: 'Masyarakat Pedesaan', populationWeight: 0.13, approval: 72, primaryConcern: 'Dana Desa & Akses Kesehatan' },
  },
};

export const INITIAL_PROJECTS: InfrastructureProject[] = [
  {
    id: 'proj-tol-sumatra',
    name: 'Jalan Tol Trans-Sumatra Tahap III',
    category: 'Transportasi',
    region: 'Sumatra Bagian Selatan & Riau',
    costTrillion: 28.5,
    durationDays: 180,
    progressDays: 45,
    status: 'ongoing',
    gdpBoost: 0.15,
    employmentBoost: 0.2,
    approvalBoost: 4,
    description: 'Penyambungan koridor tol tulang punggung menghubungkan lumbung pangan dan perkebunan Sumatra ke pelabuhan penyeberangan.',
  },
  {
    id: 'proj-pelabuhan-makassar',
    name: 'New Makassar Port Hub Maritim Timur',
    category: 'Transportasi',
    region: 'Sulawesi Selatan',
    costTrillion: 16.2,
    durationDays: 240,
    progressDays: 90,
    status: 'ongoing',
    gdpBoost: 0.18,
    employmentBoost: 0.15,
    approvalBoost: 5,
    description: 'Pusat transshipment peti kemas berstandar internasional untuk memangkas biaya logistik wilayah Indonesia Timur.',
  },
  {
    id: 'proj-plts-cirata',
    name: 'PLTS Terapung Waduk Cirata Ekspansi 500 MW',
    category: 'Energi',
    region: 'Jawa Barat',
    costTrillion: 9.8,
    durationDays: 150,
    progressDays: 0,
    status: 'planning',
    gdpBoost: 0.08,
    employmentBoost: 0.1,
    approvalBoost: 4,
    description: 'Pembangkit listrik tenaga surya terapung ramah lingkungan untuk transisi emisi nol bersih dan pasokan industri hijau.',
  },
  {
    id: 'proj-rs-papua',
    name: 'RSUD Rujukan Modern Terpadu Papua',
    category: 'Kesehatan',
    region: 'Papua Tengah & Pegunungan',
    costTrillion: 7.4,
    durationDays: 160,
    progressDays: 0,
    status: 'planning',
    gdpBoost: 0.05,
    employmentBoost: 0.12,
    approvalBoost: 6,
    description: 'Pusat pelayanan kesehatan jantung, kanker, dan trauma bedah rujukan lengkap untuk pemerataan akses medis di Tanah Papua.',
  },
  {
    id: 'proj-sekolah-3t',
    name: 'Jaringan Sekolah Digital Nusantara 3T',
    category: 'Pendidikan',
    region: 'Daerah Terdepan, Terluar, Tertinggal',
    costTrillion: 8.6,
    durationDays: 120,
    progressDays: 0,
    status: 'planning',
    gdpBoost: 0.07,
    employmentBoost: 0.08,
    approvalBoost: 5,
    description: 'Penyediaan laboratorium komputer berdaya satelit internet dan pembangkit mikrohidro/surya untuk 2.500 sekolah pelosok.',
  },
  {
    id: 'proj-food-estate',
    name: 'Sentra Kawasan Pangan Terpadu Merauke',
    category: 'Kawasan Industri',
    region: 'Papua Selatan',
    costTrillion: 19.5,
    durationDays: 210,
    progressDays: 0,
    status: 'planning',
    gdpBoost: 0.14,
    employmentBoost: 0.22,
    approvalBoost: 4,
    description: 'Pengembangan 1 juta hektar sawah mekanisasi modern dan lumbung tebu untuk mengunci kedaulatan pangan dan bioetanol.',
  },
];

export const INITIAL_DATE: GameDate = {
  day: 20,
  month: 10,
  year: 2029, // Pelantikan Presiden
  dayOfTerm: 1,
  hour: 10,
};


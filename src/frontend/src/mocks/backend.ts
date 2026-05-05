import type { backendInterface } from "../backend.d";
import {
  ArticleStatus,
  Category,
  SortBy,
  UserRole,
} from "../backend.d";

const NOW = BigInt(Date.now()) * BigInt(1_000_000);
const WEEK_AGO = NOW - BigInt(7 * 24 * 60 * 60) * BigInt(1_000_000_000);
const MONTH_AGO = NOW - BigInt(30 * 24 * 60 * 60) * BigInt(1_000_000_000);

const sampleArticles = [
  {
    id: BigInt(0),
    title: "Optimizing Kiln Efficiency Through Advanced Process Control",
    slug: "optimizing-kiln-efficiency-process-control",
    excerpt:
      "Modern cement kilns waste up to 30% of their potential energy. This guide covers advanced process control techniques to dramatically improve thermal efficiency.",
    content: `<h2>Introduction to Kiln Process Control</h2>
<p>Rotary kilns are the heart of any cement plant, converting raw meal into clinker through a complex series of chemical reactions. Achieving optimal thermal efficiency requires balancing multiple process variables simultaneously.</p>
<h2>Key Control Parameters</h2>
<p>The primary variables affecting kiln efficiency include: feed rate, kiln speed, fuel flow, secondary air temperature, and clinker cooler operation. Modern expert systems can monitor and adjust these parameters in real time.</p>
<h2>Implementation Results</h2>
<p>Plants that have implemented advanced process control systems report 4–8% reductions in specific heat consumption and significant improvements in clinker quality consistency.</p>`,
    metaDescription:
      "Learn how advanced process control systems can improve cement kiln efficiency by up to 8%.",
    authorName: "Dr. Stefan Müller",
    category: Category.Kiln,
    status: ArticleStatus.published,
    publishDate: WEEK_AGO,
    lastUpdated: WEEK_AGO,
    viewCount: BigInt(150),
    featuredImageUrl: undefined,
  },
  {
    id: BigInt(1),
    title: "AFR Co-Processing: Reducing Costs While Meeting Emissions Targets",
    slug: "afr-co-processing-emissions-targets",
    excerpt:
      "Alternative fuels and raw materials (AFR) offer cement producers an opportunity to cut fuel costs by 20–40% while simultaneously reducing their carbon footprint.",
    content: `<h2>What is AFR Co-Processing?</h2>
<p>Co-processing refers to the simultaneous recovery of energy and material from waste by using it as a substitute for primary fuels and raw materials in cement manufacturing.</p>
<h2>Approved AFR Materials</h2>
<p>Common AFR materials include waste-derived fuels (WDF), tire-derived fuel (TDF), industrial solvents, biomass waste, and municipal solid waste fractions. Each requires careful quality control and pre-processing.</p>
<h2>Regulatory Compliance</h2>
<p>Successful AFR programs require a robust monitoring framework to ensure emissions remain within permitted limits. Real-time CEMS data is essential for operational confidence.</p>`,
    metaDescription:
      "A practical guide to implementing AFR co-processing in cement plants to reduce costs and emissions.",
    authorName: "Maria Santos",
    category: Category.AFR,
    status: ArticleStatus.published,
    publishDate: MONTH_AGO,
    lastUpdated: MONTH_AGO,
    viewCount: BigInt(120),
    featuredImageUrl: undefined,
  },
  {
    id: BigInt(2),
    title: "Vertical Roller Mills: Energy Savings in Cement Grinding",
    slug: "vertical-roller-mills-energy-savings",
    excerpt:
      "Vertical roller mills (VRM) consume up to 40% less energy than traditional ball mills while delivering superior particle size control and product consistency.",
    content: `<h2>VRM vs. Ball Mill: A Performance Comparison</h2>
<p>Vertical roller mills have become the dominant technology for cement grinding due to their superior energy efficiency, lower noise levels, and integrated drying capability.</p>
<h2>Operational Best Practices</h2>
<p>Key to VRM performance is maintaining stable bed depth, optimal mill differential pressure, and correct nozzle ring velocity. Deviations from target values quickly translate to increased specific power consumption.</p>
<h2>Maintenance Considerations</h2>
<p>Regular inspection of grinding rollers and table liners is essential. Predictive maintenance programs using vibration analysis can extend component life by 15–25%.</p>`,
    metaDescription:
      "How vertical roller mills deliver 40% energy savings over ball mills in cement grinding operations.",
    authorName: "James Chen",
    category: Category.CementMill,
    status: ArticleStatus.published,
    publishDate: WEEK_AGO,
    lastUpdated: WEEK_AGO,
    viewCount: BigInt(85),
    featuredImageUrl: undefined,
  },
  {
    id: BigInt(3),
    title: "Raw Mill Optimization: Homogeneity and Energy Efficiency",
    slug: "raw-mill-optimization-homogeneity",
    excerpt:
      "Consistent raw meal chemistry is fundamental to stable kiln operation. Advanced raw mill control strategies improve LSF, SM, and AM compliance while saving energy.",
    content: `<h2>The Importance of Raw Meal Homogeneity</h2>
<p>Variations in raw meal chemistry translate directly into clinker quality fluctuations and kiln instability. The lime saturation factor (LSF), silica modulus (SM), and alumina modulus (AM) must be maintained within tight bands.</p>
<h2>Automated Sampling and Analysis</h2>
<p>Modern plants rely on online X-ray fluorescence (XRF) analyzers to provide real-time raw meal chemistry data. These systems enable automated corrective adjustments to proportioning feeders within minutes.</p>`,
    metaDescription:
      "Strategies for optimizing raw mill operation to improve raw meal homogeneity and reduce energy consumption.",
    authorName: "Dr. Aisha Patel",
    category: Category.RawMill,
    status: ArticleStatus.published,
    publishDate: MONTH_AGO,
    lastUpdated: MONTH_AGO,
    viewCount: BigInt(67),
    featuredImageUrl: undefined,
  },
  {
    id: BigInt(4),
    title: "Waste Heat Recovery Systems: Turning Exhaust Into Power",
    slug: "waste-heat-recovery-systems-power",
    excerpt:
      "Cement plants reject up to 35% of input energy as waste heat. Organic Rankine Cycle and steam-based WHR systems can recover 25–40 kWh per tonne of clinker.",
    content: `<h2>Waste Heat Sources in Cement Plants</h2>
<p>The two primary waste heat sources are the preheater exhaust gas (300–380°C) and the clinker cooler vent air (250–400°C). Both can be utilized for power generation or process heat applications.</p>
<h2>WHR Technology Selection</h2>
<p>Steam-based Rankine cycle systems are suitable for larger plants with stable operations. Organic Rankine Cycle (ORC) systems offer advantages for lower temperature applications and intermittent operation.</p>`,
    metaDescription:
      "How waste heat recovery systems generate electricity from cement plant exhaust streams.",
    authorName: "Lars Eriksson",
    category: Category.EnergyOptimization,
    status: ArticleStatus.published,
    publishDate: WEEK_AGO,
    lastUpdated: WEEK_AGO,
    viewCount: BigInt(95),
    featuredImageUrl: undefined,
  },
  {
    id: BigInt(5),
    title: "Draft: Future of Low-Carbon Clinker Production",
    slug: "future-low-carbon-clinker-production",
    excerpt:
      "Emerging technologies including calcined clay blending, carbon capture, and electrification are reshaping the path to net-zero cement production.",
    content: `<h2>The Decarbonization Challenge</h2>
<p>Cement production accounts for approximately 8% of global CO2 emissions. Two-thirds of these emissions are process-related (calcination of limestone) and cannot be eliminated without fundamental changes to chemistry or carbon capture.</p>`,
    metaDescription:
      "Technologies driving the transition to low-carbon cement manufacturing.",
    authorName: "Dr. Stefan Müller",
    category: Category.Kiln,
    status: ArticleStatus.draft,
    publishDate: NOW,
    lastUpdated: NOW,
    viewCount: BigInt(0),
    featuredImageUrl: undefined,
  },
];

export const mockBackend: backendInterface = {
  adminLogin: async (username: string, _passwordHash: string) => {
    if (username === "admin") {
      return { __kind__: "ok", ok: "mock-admin-token-123" };
    }
    return { __kind__: "err", err: "Invalid credentials" };
  },

  adminLogout: async (_token: string) => undefined,

  adminVerifyToken: async (token: string) => token === "mock-admin-token-123",

  assignCallerUserRole: async () => undefined,

  createArticle: async (_token, _input) => BigInt(sampleArticles.length),

  deleteArticle: async () => undefined,

  getArticle: async (id: bigint) => {
    return sampleArticles.find((a) => a.id === id) ?? null;
  },

  getArticleBySlug: async (slug: string) => {
    return sampleArticles.find((a) => a.slug === slug) ?? null;
  },

  getCallerUserRole: async () => UserRole.guest,

  getLatestArticles: async (n: bigint) => {
    return sampleArticles
      .filter((a) => a.status === ArticleStatus.published)
      .slice(0, Number(n));
  },

  getPopularArticles: async (n: bigint) => {
    return [...sampleArticles]
      .filter((a) => a.status === ArticleStatus.published)
      .sort((a, b) => Number(b.viewCount - a.viewCount))
      .slice(0, Number(n));
  },

  incrementViewCount: async () => undefined,

  isAdmin: async (token) => token === "mock-admin-token-123",

  isCallerAdmin: async () => false,

  listArticles: async (filter) => {
    let filtered = [...sampleArticles];

    if (filter.status) {
      filtered = filtered.filter((a) => a.status === filter.status);
    }
    if (filter.category) {
      filtered = filtered.filter((a) => a.category === filter.category);
    }
    if (filter.sortBy === SortBy.viewCount) {
      filtered.sort((a, b) => Number(b.viewCount - a.viewCount));
    } else {
      filtered.sort((a, b) => Number(b.publishDate - a.publishDate));
    }

    const page = Number(filter.page);
    const pageSize = Number(filter.pageSize);
    const start = page * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      total: BigInt(filtered.length),
      articles: paginated,
      page: filter.page,
      pageSize: filter.pageSize,
    };
  },

  searchArticles: async (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    return sampleArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term) ||
        a.content.toLowerCase().includes(term)
    );
  },

  updateArticle: async () => undefined,
};

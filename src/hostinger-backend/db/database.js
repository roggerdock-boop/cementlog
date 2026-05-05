'use strict';

const path = require('path');
const { Low } = require('lowdb');
const { JSONFileSync } = require('lowdb/node');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, 'data.json');

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------
const SEED_ARTICLES = [
  {
    id: uuidv4(),
    title: 'Understanding Kiln Thermal Efficiency in Cement Production',
    slug: 'understanding-kiln-thermal-efficiency',
    content:
      '<h2>Heat Balance Fundamentals</h2><p>Rotary kiln thermal efficiency depends on maintaining an optimal heat balance between heat input from fuel combustion and heat output for clinker formation. The theoretical heat of clinker formation is approximately 420 kcal/kg clinker, but actual kilns consume 700-850 kcal/kg due to various losses.</p><h2>Primary Sources of Heat Loss</h2><p>Exit gas losses account for 15-25% of total heat input. The gas temperature at the preheater exit is the most critical indicator — for every 10°C reduction in exit gas temperature, specific heat consumption improves by approximately 5-7 kcal/kg. Kiln shell radiation losses typically range from 3-5% depending on refractory condition. Thermal imaging cameras are invaluable for identifying hot spots and tracking refractory wear patterns.</p><h2>Preheater Cyclone Efficiency</h2><p>Modern preheater towers with 5-6 cyclone stages can achieve exit gas temperatures below 300°C. Cyclone separation efficiency directly impacts dust recirculation and, consequently, the thermal load on the system. Regular inspection and maintenance of cyclone apex valves and material distribution devices is essential.</p><h2>Combustion Management</h2><p>Excess air control is paramount. Each 1% increase in excess O2 at the kiln inlet penalizes heat consumption by approximately 2-3 kcal/kg. Regular calibration of O2 analyzers and consistent monitoring of CO levels helps maintain optimal combustion conditions.</p><h2>Clinker Cooler Performance</h2><p>An efficient grate cooler can recover 65-75% of the clinker heat back into the system as secondary and tertiary air. Poor cooler performance not only increases heat consumption but also affects clinker quality and cement grinding efficiency.</p>',
    excerpt:
      'Kiln thermal efficiency is the cornerstone of clinker production economics. In this guide, we break down heat balance principles, identify the top sources of heat loss, and show how operators can improve specific heat consumption through targeted interventions.',
    authorName: 'Dr. Ahmed Al-Rashidi',
    category: 'Kiln',
    metaDescription:
      'Learn how to improve rotary kiln thermal efficiency in cement plants. Covers heat balance fundamentals, specific heat consumption KPIs, and practical operator guidelines.',
    featuredImageUrl: '',
    status: 'published',
    publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 0,
  },
  {
    id: uuidv4(),
    title: 'Raw Mill Operation Best Practices for Cement Plants',
    slug: 'raw-mill-operation-best-practices',
    content:
      '<h2>Feed Chemistry Control</h2><p>Consistent kiln feed chemistry is the primary goal of raw mill operation. The three key chemical ratios — Lime Saturation Factor (LSF), Silica Ratio (SR), and Alumina Ratio (AR) — must be maintained within tight tolerances. Online XRF analyzers enable real-time feed composition adjustment, dramatically reducing quality deviations versus manual sampling.</p><h2>Vertical Roller Mill (VRM) Optimization</h2><p>For VRM operations, maintaining the correct grinding pressure profile is critical. Too low a pressure results in poor grinding efficiency; too high causes vibration and accelerated wear. The optimal dam ring height should be adjusted seasonally based on material moisture content. Monitoring the differential pressure across the mill provides a reliable indicator of bed stability.</p><h2>Moisture Management</h2><p>Raw material moisture above 6-8% significantly impacts grinding throughput. Hot gas generators or kiln exit gas utilization for drying should be optimized to maintain exit temperature in the 80-90°C range. Excessive drying temperatures cause material build-up on separator blades and reduce separator efficiency.</p><h2>Separator Tuning</h2><p>Dynamic separators with variable speed drives allow fine-tuning of product fineness. The separator cut point should be calibrated quarterly using particle size analysis. A well-tuned separator reduces circulating load by 15-20%, directly improving mill throughput and specific power consumption.</p><h2>Shift Handover Procedures</h2><p>Disciplined shift handovers are underrated contributors to raw mill performance. Key parameters to document: feed rate (tph), product fineness (90μm residue), mill differential pressure, separator speed (rpm), and any abnormal observations. Consistent data recording enables trend analysis and early detection of equipment deterioration.</p>',
    excerpt:
      'A well-operated raw mill is the foundation of consistent kiln feed chemistry. This practical guide covers grinding circuit optimization, moisture management, separator efficiency tuning, and shift handover procedures that leading cement plants use to maximize raw mill output while minimizing specific power consumption.',
    authorName: 'Eng. Priya Nair',
    category: 'RawMill',
    metaDescription:
      'Practical raw mill operation guide for cement plant operators. Covers feed chemistry control, VRM grinding efficiency, moisture management, and separator tuning.',
    featuredImageUrl: '',
    status: 'published',
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 0,
  },
  {
    id: uuidv4(),
    title: 'Reducing Specific Heat Consumption in Cement Plants: Proven Strategies',
    slug: 'reducing-specific-heat-consumption-cement-plants',
    content:
      '<h2>The Business Case for SHC Reduction</h2><p>At a 3,000 tpd cement plant burning coal at $120/ton, a 10 kcal/kg improvement in specific heat consumption translates to approximately $150,000-200,000 in annual fuel savings. The potential gains from systematic optimization programs typically range from 30-80 kcal/kg, representing substantial ROI on the required engineering investment.</p><h2>Diagnostic Framework</h2><p>Before implementing improvements, a rigorous diagnostic is essential. Start with a comprehensive instrument audit to ensure measurement accuracy. Then perform a full heat balance calculation covering all inputs and outputs. Finally, benchmark against world-class operations (typically 700-750 kcal/kg for a dry process 5-stage preheater kiln).</p><h2>Preheater Optimization</h2><p>Preheater performance improvements typically offer the highest return. For each 10°C reduction in stage-5 exit gas temperature, expect 5-7 kcal/kg improvement. Common interventions: replacing worn cyclone apex valves, optimizing meal distribution, repairing gas leakages at inspection doors and flap valves, and upgrading to high-efficiency cyclone designs.</p><h2>Combustion Management</h2><p>Excess air control is one of the most cost-effective levers. Target 1.5-2.5% O2 at the kiln inlet. Each 1% reduction in excess O2 saves approximately 2-3 kcal/kg. Invest in reliable O2 analyzers with automatic calibration and train operators on combustion management principles.</p><h2>Sustaining Gains</h2><p>Many plants achieve improvements only to see them erode within 6-12 months due to inadequate monitoring and accountability. Establish a daily KPI dashboard visible to all shift supervisors. Implement a formal deviation response procedure for when SHC exceeds target by more than 10 kcal/kg. Monthly performance reviews with plant management ensure sustained focus.</p>',
    excerpt:
      'Specific heat consumption (SHC) is one of the most impactful cost drivers in cement manufacturing. This article presents a systematic framework for diagnosing high SHC, prioritizing improvement projects, and sustaining gains through operational discipline — drawing on plant data and industry benchmarks.',
    authorName: 'Eng. Carlos Mendes',
    category: 'Kiln',
    metaDescription:
      'Systematic guide to reducing specific heat consumption (SHC) in cement plants. Covers heat balance diagnostics, preheater optimization, combustion management, and cooler efficiency improvements.',
    featuredImageUrl: '',
    status: 'published',
    publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 0,
  },
];

// ---------------------------------------------------------------------------
// DB initialisation (synchronous — safe for Express request handlers)
// ---------------------------------------------------------------------------
let _db = null;

function getDb() {
  if (_db) return _db;

  const adapter = new JSONFileSync(DB_PATH);
  _db = new Low(adapter, { articles: [] });
  _db.read();

  // Seed on first run
  if (!_db.data.articles || _db.data.articles.length === 0) {
    _db.data.articles = SEED_ARTICLES;
    _db.write();
  }

  return _db;
}

module.exports = { getDb };

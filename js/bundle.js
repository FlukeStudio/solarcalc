// SolarCalc Bundle
const SolarCalc = window.SolarCalc || {};


// js/data.js
/**
 * SolarCalc — Data Layer
 * 
 * All state-level data lives here. To update data (pricing changes, new rates, etc.),
 * edit this file only — no code changes needed anywhere else.
 * 
 * Data sources:
 *   PSH: NREL PVWatts v8 / NSRDB (2026) via thegreenwatt.com
 *   Rate: US EIA July 2026 via electricchoice.com (cents/kWh)
 *   CostW: EnergySage Q1 2026 marketplace data via electricchoice.com ($/watt)
 */

const STATE_DATA = {
  AL: { name: 'Alabama',        psh: 5.21, rate: 17.41, costW: 2.65 },
  AK: { name: 'Alaska',         psh: 3.17, rate: 27.35, costW: 2.80 },
  AZ: { name: 'Arizona',        psh: 6.54, rate: 15.48, costW: 2.16 },
  AR: { name: 'Arkansas',       psh: 5.18, rate: 14.16, costW: 2.62 },
  CA: { name: 'California',     psh: 6.08, rate: 35.25, costW: 2.80 },
  CO: { name: 'Colorado',       psh: 5.66, rate: 16.54, costW: 2.68 },
  CT: { name: 'Connecticut',    psh: 4.53, rate: 32.24, costW: 2.95 },
  DE: { name: 'Delaware',       psh: 4.80, rate: 18.79, costW: 2.72 },
  DC: { name: 'District of Columbia', psh: 4.90, rate: 25.41, costW: 2.95 },
  FL: { name: 'Florida',        psh: 5.48, rate: 15.38, costW: 2.19 },
  GA: { name: 'Georgia',        psh: 5.17, rate: 15.37, costW: 2.48 },
  HI: { name: 'Hawaii',         psh: 5.82, rate: 46.62, costW: 2.70 },
  ID: { name: 'Idaho',          psh: 5.22, rate: 12.70, costW: 2.56 },
  IL: { name: 'Illinois',       psh: 4.51, rate: 20.47, costW: 2.82 },
  IN: { name: 'Indiana',        psh: 4.66, rate: 17.90, costW: 2.60 },
  IA: { name: 'Iowa',           psh: 4.75, rate: 13.86, costW: 2.80 },
  KS: { name: 'Kansas',         psh: 5.39, rate: 15.78, costW: 2.56 },
  KY: { name: 'Kentucky',       psh: 4.79, rate: 15.02, costW: 2.45 },
  LA: { name: 'Louisiana',      psh: 5.32, rate: 14.44, costW: 2.70 },
  ME: { name: 'Maine',          psh: 4.55, rate: 28.42, costW: 2.85 },
  MD: { name: 'Maryland',       psh: 4.88, rate: 22.07, costW: 2.82 },
  MA: { name: 'Massachusetts',  psh: 4.70, rate: 29.45, costW: 3.35 },
  MI: { name: 'Michigan',       psh: 4.47, rate: 21.39, costW: 2.78 },
  MN: { name: 'Minnesota',      psh: 4.61, rate: 16.39, costW: 2.84 },
  MS: { name: 'Mississippi',    psh: 5.26, rate: 16.76, costW: 2.70 },
  MO: { name: 'Missouri',       psh: 5.03, rate: 14.01, costW: 2.54 },
  MT: { name: 'Montana',        psh: 4.76, rate: 13.90, costW: 2.68 },
  NE: { name: 'Nebraska',       psh: 4.98, rate: 13.28, costW: 2.80 },
  NV: { name: 'Nevada',         psh: 6.41, rate: 14.29, costW: 2.36 },
  NH: { name: 'New Hampshire',  psh: 4.58, rate: 27.24, costW: 3.18 },
  NJ: { name: 'New Jersey',     psh: 4.66, rate: 23.53, costW: 2.88 },
  NM: { name: 'New Mexico',     psh: 6.42, rate: 15.15, costW: 2.44 },
  NY: { name: 'New York',       psh: 4.50, rate: 29.45, costW: 3.18 },
  NC: { name: 'North Carolina', psh: 5.25, rate: 16.25, costW: 2.52 },
  ND: { name: 'North Dakota',   psh: 4.45, rate: 12.35, costW: 2.75 },
  OH: { name: 'Ohio',           psh: 4.54, rate: 19.49, costW: 2.58 },
  OK: { name: 'Oklahoma',       psh: 5.50, rate: 13.31, costW: 2.60 },
  OR: { name: 'Oregon',         psh: 4.06, rate: 15.78, costW: 2.62 },
  PA: { name: 'Pennsylvania',   psh: 4.79, rate: 21.47, costW: 2.70 },
  RI: { name: 'Rhode Island',   psh: 4.70, rate: 28.30, costW: 3.10 },
  SC: { name: 'South Carolina', psh: 5.33, rate: 17.06, costW: 2.50 },
  SD: { name: 'South Dakota',   psh: 4.86, rate: 14.52, costW: 2.70 },
  TN: { name: 'Tennessee',      psh: 4.82, rate: 14.94, costW: 2.52 },
  TX: { name: 'Texas',          psh: 5.22, rate: 16.99, costW: 2.24 },
  UT: { name: 'Utah',           psh: 5.39, rate: 13.29, costW: 2.48 },
  VT: { name: 'Vermont',        psh: 4.36, rate: 24.56, costW: 3.05 },
  VA: { name: 'Virginia',       psh: 5.01, rate: 17.38, costW: 2.62 },
  WA: { name: 'Washington',     psh: 3.95, rate: 14.36, costW: 2.58 },
  WV: { name: 'West Virginia',  psh: 4.57, rate: 16.06, costW: 2.60 },
  WI: { name: 'Wisconsin',      psh: 4.58, rate: 19.21, costW: 2.80 },
  WY: { name: 'Wyoming',        psh: 5.36, rate: 14.68, costW: 2.70 }
};

/** Sorted state list for dropdowns (alphabetical by name) */
const SORTED_STATES = Object.entries(STATE_DATA)
  .sort((a, b) => a[1].name.localeCompare(b[1].name));

// ========== Constants ==========

/** Federal ITC rate (30% through 2032 per Inflation Reduction Act) */
const FED_ITC = 0.30;

/** Panel wattage options (watts per panel) */
const PANEL_OPTIONS = [
  { value: 350, label: '350W' },
  { value: 400, label: '400W (standard 2026)' },
  { value: 450, label: '450W (high-efficiency)' }
];

/** Roof direction / tilt efficiency factors */
const TILT_FACTORS = [
  { value: 1.00, label: 'South-facing (optimal)' },
  { value: 0.93, label: 'Southeast / Southwest' },
  { value: 0.85, label: 'East / West' },
  { value: 0.70, label: 'North-facing' }
];

/** System derate factors */
const DERATE_FACTORS = [
  { value: 0.70, label: 'Older roof / partial shade (0.70)' },
  { value: 0.77, label: 'Standard (0.77 — NREL default)' },
  { value: 0.82, label: 'Premium equipment (0.82)' }
];

/** Quick-fill monthly bill presets */
const BILL_PRESETS = [80, 150, 250, 400];

/** Default state (California — most searches come from CA) */
const DEFAULT_STATE = 'CA';

/** Default panel wattage */
const DEFAULT_PANEL_W = 400;


// js/engine.js
/**
 * SolarCalc — Calculation Engine
 * 
 * All business logic lives here, as pure functions with zero DOM dependencies.
 * Every function takes inputs → returns outputs. No side effects.
 * 
 * To add a new calculator module (e.g. battery ROI, EV charging),
 * add a new object to SolarCalc.Engine following the same pattern.
 */

SolarCalc.Engine = (function() {

  // ---- Helpers ----
  function fmt(n)     { return Math.round(n).toLocaleString('en-US'); }
  function fmt1(n)    { return n.toLocaleString('en-US', { maximumFractionDigits: 1 }); }
  function fmtMoney(n){ return '$' + fmt(n); }

  /**
   * Core solar calculation.
   * 
   * @param {Object}  inputs
   * @param {number}  inputs.monthlyBill   - Average monthly electric bill ($)
   * @param {string}  inputs.stateCode     - 2-letter state code
   * @param {number}  inputs.tiltFactor    - Roof direction efficiency (0.7-1.0)
   * @param {number}  inputs.derateFactor  - System loss factor (0.7-0.82)
   * @param {number}  inputs.panelWattage  - Watts per panel
   * @returns {Object} Full calculation results
   */
  function solarEstimate(inputs) {
    const { monthlyBill, stateCode, tiltFactor, derateFactor, panelWattage } = inputs;
    const d = STATE_DATA[stateCode];
    if (!d) throw new Error('Unknown state: ' + stateCode);

    // Derive annual kWh from monthly bill and local electricity rate
    const monthlyKwh = monthlyBill / (d.rate / 100);
    const annualKwh  = monthlyKwh * 12;

    // System size needed: annual_kWh / (PSH × 365 × derate × tilt)
    const systemSizeKw = annualKwh / (d.psh * 365 * derateFactor * tiltFactor);
    const numPanels    = Math.ceil((systemSizeKw * 1000) / panelWattage);
    const actualSystemKw = (numPanels * panelWattage) / 1000;

    // Annual production from the sized system
    const annualProduction = actualSystemKw * d.psh * 365 * derateFactor * tiltFactor;

    // Costs
    const grossCost  = actualSystemKw * d.costW * 1000;
    const itcSavings = grossCost * FED_ITC;
    const netCost    = grossCost - itcSavings;

    // Savings
    const annualSavings   = annualProduction * (d.rate / 100);
    const paybackYears    = annualSavings > 0 ? netCost / annualSavings : Infinity;
    const savings25Year   = (annualSavings * 25) - netCost;

    // Coverage: what % of annual usage is covered by solar
    const coveragePct = Math.min(100, (annualProduction / annualKwh) * 100);

    return {
      // Inputs echoed
      state:        d,
      monthlyBill,
      annualKwh,

      // System sizing
      systemSizeKw:   actualSystemKw,
      numPanels,
      panelWattage,

      // Production
      annualProduction,

      // Costs
      costPerWatt:    d.costW,
      grossCost,
      itcSavings,
      netCost,

      // Savings
      annualSavings,
      paybackYears,
      savings25Year,
      coveragePct,

      // Metadata
      tiltFactor,
      derateFactor,
      electricityRate: d.rate,
      peakSunHours:    d.psh
    };
  }

  /**
   * Battery storage ROI estimator.
   * Placeholder for future module.
   * 
   * @param {Object} inputs
   * @param {number} inputs.dailyUsageKwh   - Daily household electricity use
   * @param {number} inputs.outageHours     - Average outage hours per year
   * @param {number} inputs.batteryCapacityKwh - Desired battery capacity
   * @returns {Object} Battery ROI results
   */
  function batteryEstimate(inputs) {
    // TODO: Implement when Battery module is built
    return {
      message: 'Battery calculator coming soon.',
      placeholder: true
    };
  }

  /**
   * Incentives lookup by state.
   * Placeholder for future module.
   * 
   * @param {string} stateCode - 2-letter state code
   * @returns {Object} State-level incentives
   */
  function incentivesByState(stateCode) {
    // TODO: Populate with DSIRE data
    return {
      state: STATE_DATA[stateCode]?.name || 'Unknown',
      federalITC: '30% through 2032',
      stateRebates: 'Coming soon',
      netMetering: 'Coming soon',
      propertyTaxExemption: 'Coming soon',
      placeholder: true
    };
  }

  /**
   * Generate a structured key takeaway for AEO (Answer Engine Optimization).
   * This text is designed to be easily parsed and cited by AI answer engines.
   * 
   * @param {Object} d - solarEstimate() result
   * @returns {string} Structured key takeaway
   */
  function generateTakeaway(d) {
    const rating = d.paybackYears < 6  ? 'Excellent'
                : d.paybackYears < 9  ? 'Strong'
                : d.paybackYears < 12 ? 'Moderate'
                : 'Long-term investment';
    return `In ${d.state.name}, a ${fmt1(d.systemSizeKw)} kW solar system (${d.numPanels} panels) costs approximately ${fmtMoney(d.grossCost)} before incentives, or ${fmtMoney(d.netCost)} after the 30% federal tax credit. It produces an estimated ${fmt(d.annualProduction)} kWh annually, covering ${fmt1(d.coveragePct)}% of your electricity usage. Annual savings are ${fmtMoney(d.annualSavings)} at current electricity rates (${d.electricityRate.toFixed(1)}¢/kWh), with a payback period of ${fmt1(d.paybackYears)} years. The 25-year net savings is ${fmtMoney(d.savings25Year)}. Rating: ${rating}.`;
  }

  /**
   * Generate structured data object for JSON-LD FAQ injection.
   * Returns a list of {question, answer} pairs keyed to the specific calculation.
   */
  function generateFAQItems(d) {
    return [
      {
        question: `How much does a ${fmt1(d.systemSizeKw)} kW solar system cost in ${d.state.name}?`,
        answer: `A ${fmt1(d.systemSizeKw)} kW solar system in ${d.state.name} costs approximately ${fmtMoney(d.grossCost)} before incentives, or ${fmtMoney(d.netCost)} after the 30% federal Investment Tax Credit (ITC). The average installation cost in ${d.state.name} is about $${d.costPerWatt} per watt.`
      },
      {
        question: `What is the solar payback period in ${d.state.name}?`,
        answer: `In ${d.state.name}, with an electricity rate of ${d.electricityRate.toFixed(1)}¢/kWh and ${d.peakSunHours} peak sun hours per day, a solar system typically pays for itself in approximately ${fmt1(d.paybackYears)} years. Annual savings are estimated at ${fmtMoney(d.annualSavings)}.`
      },
      {
        question: `How many solar panels do I need for a $${fmt(d.monthlyBill)} monthly electric bill in ${d.state.name}?`,
        answer: `For a $${fmt(d.monthlyBill)} monthly electric bill in ${d.state.name} (approximately ${fmt(d.annualKwh)} kWh/year), you need about ${d.numPanels} solar panels rated at ${d.panelWattage}W each, totaling a ${fmt1(d.systemSizeKw)} kW system.`
      }
    ];
  }

  // ---- Public API ----
  return {
    solarEstimate,
    batteryEstimate,
    incentivesByState,
    generateTakeaway,
    generateFAQItems,
    fmt,
    fmt1,
    fmtMoney,
    FED_ITC
  };

})();



// js/ui.js
/**
 * SolarCalc — UI Layer v2
 * 
 * Premium rendering with AEO-optimized output blocks.
 * All DOM manipulation lives here.
 */

SolarCalc.UI = (function() {
  const E = SolarCalc.Engine;

  let $resultsContainer, $takeaway, $breakdown, $resultState;
  let resultRefs = {};

  function cacheElements() {
    $resultsContainer = document.getElementById('resultsContainer');
    $takeaway        = document.getElementById('takeaway');
    $breakdown       = document.getElementById('breakdown');
    $resultState     = document.getElementById('resultState');

    resultRefs = {
      systemSize:  document.getElementById('rSystemSize'),
      panels:      document.getElementById('rPanels'),
      grossCost:   document.getElementById('rGrossCost'),
      netCost:     document.getElementById('rNetCost'),
      annualProd:  document.getElementById('rAnnualProd'),
      annualSave:  document.getElementById('rAnnualSave'),
      payback:     document.getElementById('rPayback'),
      savings25yr: document.getElementById('r25yr')
    };
  }

  // ═══════════════ FORM BUILDERS ═══════════════

  function buildStateDropdown(defaultState) {
    return SORTED_STATES.map(([code, d]) => {
      const sel = code === defaultState ? ' selected' : '';
      return `<option value="${code}"${sel}>${d.name}</option>`;
    }).join('');
  }

  function buildBillPills() {
    return BILL_PRESETS.map(v =>
      `<button type="button" onclick="SolarCalc.App.setMonthlyBill(${v})">$${v}</button>`
    ).join('');
  }

  function buildTiltSelect() {
    return TILT_FACTORS.map(t =>
      `<option value="${t.value}">${t.label}</option>`
    ).join('');
  }

  function buildDerateSelect() {
    return DERATE_FACTORS.map((d, i) => {
      const sel = i === 1 ? ' selected' : '';
      return `<option value="${d.value}"${sel}>${d.label}</option>`;
    }).join('');
  }

  function buildPanelSelect() {
    return PANEL_OPTIONS.map((p, i) => {
      const sel = i === 1 ? ' selected' : '';
      return `<option value="${p.value}"${sel}>${p.label}</option>`;
    }).join('');
  }

  // ═══════════════ RENDER RESULTS ═══════════════

  function renderSolarResults(data) {
    $resultsContainer.classList.remove('hidden');
    $resultState.textContent = data.state.name;

    resultRefs.systemSize.textContent  = E.fmt1(data.systemSizeKw) + ' kW';
    resultRefs.panels.textContent      = data.numPanels + ' panels';
    resultRefs.grossCost.textContent   = E.fmtMoney(data.grossCost);
    resultRefs.netCost.textContent     = E.fmtMoney(data.netCost);
    resultRefs.annualProd.textContent  = E.fmt(data.annualProduction) + ' kWh';
    resultRefs.annualSave.textContent  = E.fmtMoney(data.annualSavings) + '/yr';
    resultRefs.payback.textContent     = E.fmt1(data.paybackYears) + ' years';
    resultRefs.savings25yr.textContent = E.fmtMoney(data.savings25Year);

    // Coverage percentage + bar
    const covEl = document.getElementById('rCoverage');
    if (covEl) covEl.textContent = E.fmt1(data.coveragePct) + '%';
    const covBar = document.getElementById('coverageBarFill');
    if (covBar) covBar.style.width = data.coveragePct + '%';

    // AEO key takeaway
    if ($takeaway) {
      $takeaway.textContent = E.generateTakeaway(data);
    }

    // Detailed breakdown
    renderBreakdown(data);

    // Inject dynamic FAQ JSON-LD
    injectDynamicFAQ(data);

    // Smooth scroll to results
    $resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderBreakdown(data) {
    const d = data;
    const ratingHtml = getRatingBadge(d.paybackYears);
    $breakdown.innerHTML = `
      <div class="breakdown-header">📋 Detailed Breakdown</div>
      <div class="breakdown-body">
        <div class="breakdown-row b-meta"><span>— Your Inputs —</span><span></span></div>
        <div class="breakdown-row"><span>Monthly electric bill</span><span>${E.fmtMoney(d.monthlyBill)}</span></div>
        <div class="breakdown-row"><span>Estimated annual usage</span><span>${E.fmt(d.annualKwh)} kWh</span></div>
        <div class="breakdown-row"><span>Local electricity rate</span><span>${d.electricityRate.toFixed(1)}¢/kWh</span></div>
        <div class="breakdown-row"><span>Peak sun hours (${d.state.name})</span><span>${d.peakSunHours} hrs/day</span></div>
        <div class="breakdown-divider"></div>
        <div class="breakdown-row b-meta"><span>— System Design —</span><span></span></div>
        <div class="breakdown-row"><span>System size</span><span>${E.fmt1(d.systemSizeKw)} kW</span></div>
        <div class="breakdown-row"><span>Panels (${d.panelWattage}W each)</span><span>${d.numPanels}</span></div>
        <div class="breakdown-row"><span>Installation cost</span><span>$${d.costPerWatt}/watt</span></div>
        <div class="breakdown-divider"></div>
        <div class="breakdown-row b-meta"><span>— Financials —</span><span></span></div>
        <div class="breakdown-row"><span>Gross system cost</span><span>${E.fmtMoney(d.grossCost)}</span></div>
        <div class="breakdown-row"><span>Federal ITC (30%)</span><span class="b-neg">−${E.fmtMoney(d.itcSavings)}</span></div>
        <div class="breakdown-row highlight"><span>Net cost after tax credit</span><span class="b-total">${E.fmtMoney(d.netCost)}</span></div>
        <div class="breakdown-divider"></div>
        <div class="breakdown-row"><span>Annual solar production</span><span>${E.fmt(d.annualProduction)} kWh</span></div>
        <div class="breakdown-row"><span>Usage covered by solar</span><span><strong>${E.fmt1(d.coveragePct)}%</strong></span></div>
        <div class="breakdown-row"><span>Annual electricity savings</span><span class="b-pos">${E.fmtMoney(d.annualSavings)}/yr</span></div>
        <div class="breakdown-row highlight"><span>Payback period</span><span class="b-total">${E.fmt1(d.paybackYears)} years ${ratingHtml}</span></div>
        <div class="breakdown-row highlight"><span>25-year net savings</span><span class="b-total" style="color:var(--green-deep)">${E.fmtMoney(d.savings25Year)}</span></div>
        <div class="breakdown-divider"></div>
        <div class="breakdown-row b-meta"><span>Roof direction factor</span><span>${(d.tiltFactor*100).toFixed(0)}%</span></div>
        <div class="breakdown-row b-meta"><span>System efficiency (derate)</span><span>${d.derateFactor}</span></div>
      </div>
    `;
  }

  function getRatingBadge(years) {
    if (years < 6)  return '<span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:700;">EXCELLENT</span>';
    if (years < 9)  return '<span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:700;">GOOD</span>';
    if (years < 12) return '<span style="background:#fef9e7;color:#8b6914;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:700;">AVERAGE</span>';
    return '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:700;">LONG-TERM</span>';
  }

  // ═══════════════ AEO: Dynamic JSON-LD FAQ ═══════════════

  function injectDynamicFAQ(data) {
    // Remove previous dynamic FAQ script if exists
    const old = document.getElementById('dynamic-faq-jsonld');
    if (old) old.remove();

    const faqItems = E.generateFAQItems(data);
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.id = 'dynamic-faq-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(script);
  }

  // ═══════════════ PLACEHOLDER PANELS ═══════════════

  function renderBatteryPanel(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-size:1.6rem;">🔋</span>
        <span class="step-badge amber">Coming Soon</span>
      </div>
      <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.65;">
        <strong>Home battery storage ROI calculator</strong> — under active development.
        Estimate the right battery capacity for your home, additional installation cost,
        backup power duration, and whether storage makes financial sense under your state's
        net metering or net billing policy.
      </p>
      <div class="key-takeaway" style="margin-top:16px;">
        <strong>Quick fact:</strong> With NEM 3.0 in California and similar
        net-billing policies spreading across the US, pairing solar with battery storage
        can <strong>reduce payback time by 2–4 years</strong> compared to solar-only systems
        in many markets. Battery attachment rates exceeded 25% nationally in 2025
        and are projected to reach 50% by 2028.
        <div class="source-cite mt-8">Source: SEIA US Solar Market Insight 2025, Wood Mackenzie</div>
      </div>
    `;
  }

  function renderIncentivesPanel(containerId, stateCode) {
    const name = STATE_DATA[stateCode]?.name || 'your state';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-size:1.6rem;">💰</span>
        <span class="step-badge green">Coming Soon</span>
      </div>
      <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.65;">
        <strong>State-specific incentives lookup for ${name}</strong> — under development.
        We're compiling data from DSIRE, state energy offices, and utility providers
        to show every incentive available to you: net metering rates, state tax credits,
        SREC markets, property tax exemptions, and local utility rebates.
      </p>
      <div class="key-takeaway" style="margin-top:16px;">
        <strong>The federal ITC (30%) applies everywhere.</strong> Beyond that,
        states like New York, Massachusetts, New Jersey, and California offer
        additional incentives that can reduce your net cost by another 10–25%.
        The federal credit is locked at 30% through 2032 under the Inflation Reduction Act.
        <div class="source-cite mt-8">Source: DSIRE (Database of State Incentives for Renewables & Efficiency), IRS Section 25D</div>
      </div>
    `;
  }

  function renderComparePanel(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-size:1.6rem;">📊</span>
        <span class="step-badge blue">Action</span>
      </div>
      <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.65;">
        <strong>Getting multiple quotes is the single most effective way to save on solar.</strong>
        Prices for identical systems can vary by <strong>$5,000+</strong> in the same zip code.
        Independent marketplaces like EnergySage let you compare quotes from pre-screened
        installers without sharing your phone number.
      </p>
      <div class="cta-box" style="margin-top:18px;">
        <p><strong>Ready to compare real quotes?</strong></p>
        <p style="font-size:0.85rem;">EnergySage is the largest independent solar marketplace.</p>
        <a class="cta-link" href="https://www.energysage.com/solar/cost-calculator/" target="_blank" rel="nofollow noopener">
          Compare Free Quotes →
        </a>
      </div>
    `;
  }

  // ═══════════════ PUBLIC API ═══════════════

  return {
    cacheElements,
    buildStateDropdown,
    buildBillPills,
    buildTiltSelect,
    buildDerateSelect,
    buildPanelSelect,
    renderSolarResults,
    renderBatteryPanel,
    renderIncentivesPanel,
    renderComparePanel
  };

})();



// modules/battery.js
/**
 * SolarCalc — Battery Storage Module
 * 
 * Interactive calculator for home battery ROI.
 * Estimates recommended capacity, cost, and whether storage
 * makes financial sense given solar export compensation rates.
 * 
 * Load after engine.js, before app.js
 */

SolarCalc.Battery = (function() {
  const E = SolarCalc.Engine;
  const UI = SolarCalc.UI;

  // ═══════════════ CONSTANTS ═══════════════
  const AVG_COST_PER_KWH = 1050;  // installed $/kWh (2026 average)
  const DEFAULT_USAGE_PCT = 0.50; // default: cover 50% of daily usage
  const ITC = 0.30;
  const WARRANTY_YEARS = 10;

  // State-specific: net metering export rate as % of retail rate
  // 1.0 = full retail net metering, 0.25 = NEM 3.0 style
  function getExportRate(stateCode) {
    const rates = {
      CA: 0.25, HI: 0.30, AZ: 0.40, NV: 0.50,
      NY: 0.95, NJ: 0.90, MA: 0.95, CT: 0.95,
      RI: 0.90, VT: 0.90, ME: 0.85, NH: 0.75,
      FL: 1.00, TX: 0.50, NC: 0.85, SC: 0.85,
      GA: 0.70, AL: 0.50, MS: 0.50, LA: 0.60,
      IL: 0.95, OH: 0.50, MI: 0.50, IN: 0.50,
      WI: 0.60, MN: 0.75, IA: 0.60, MO: 0.50,
      KS: 0.50, NE: 0.50, SD: 0.50, ND: 0.50,
      CO: 0.80, UT: 0.50, WY: 0.50, MT: 0.50,
      ID: 0.50, WA: 0.85, OR: 0.75, AK: 0.50,
      NM: 0.65, OK: 0.50, AR: 0.50, TN: 0.50,
      KY: 0.50, WV: 0.50, VA: 0.75, MD: 0.90,
      DE: 0.85, DC: 0.95, PA: 0.85
    };
    return rates[stateCode] || 0.50;
  }

  function getStateIncentivesNOTE(stateCode) {
    const notes = {
      CA: 'SGIP rebate: $200–$850/kWh for battery storage. NEM 3.0 export rates are low — battery almost essential for good ROI.',
      NY: 'NY-Sun incentive + state tax credit (25% up to $5,000). Strong net metering.',
      MA: 'SMART program + ConnectedSolutions VPP ($200–$400/kW/year). Excellent battery economics.',
      NJ: 'SuSI program successor + strong net metering. Battery SREC-like payments available.',
      HI: 'Battery Bonus program. Extremely high electricity rates make storage compelling.',
      TX: 'Deregulated market. No state incentive but VPP programs (Tesla Electric, Shell, Octopus) pay for grid services.',
      FL: 'Full retail net metering. Battery less critical financially but valuable for hurricane backup.',
      CO: 'Xcel Energy battery rebate + strong net metering.',
      IL: 'Smart Inverter Rebate + strong net metering under Illinois Shines.',
      AZ: 'Limited export rates under new NEM rules. TOU arbitrage can improve battery payback.'
    };
    return notes[stateCode] || 'Federal ITC 30% applies. Check with local utility for demand response or VPP programs.';
  }

  // ═══════════════ CALCULATION ENGINE ═══════════════

  function calculateBattery(inputs) {
    const { stateCode, systemSizeKw, dailyUsageKwh, coveragePct } = inputs;
    const d = STATE_DATA[stateCode];
    const exportRate = getExportRate(stateCode);

    // Recommended battery capacity: cover usage% of daily consumption
    const recCapacity = Math.round(dailyUsageKwh * coveragePct);
    const roundedCapacity = Math.round(recCapacity / 5) * 5; // round to nearest 5 kWh
    const finalCapacity = Math.max(5, Math.min(30, roundedCapacity));

    // Cost
    const grossCost = finalCapacity * AVG_COST_PER_KWH;
    const itcSaving = grossCost * ITC;
    const netCost = grossCost - itcSaving;

    // Production that would be exported (vs consumed) — estimated
    const hourlyProd = systemSizeKw * d.psh / 24;
    const dailyExported = hourlyProd * 5 * (1 - 0.40); // peak 5 hrs, 40% self-consume
    const annualExported = dailyExported * 365;

    // With battery: capture more self-consumption
    const extraSelfConsume = Math.min(finalCapacity * 0.8, dailyExported * 0.7);
    const annualExtraSavings = extraSelfConsume * 365 * (d.rate / 100) * (1 - exportRate);

    // Outage value: estimated outages per year
    const outageHours = 8; // average US household
    const outageValue = finalCapacity * (d.rate / 100) * 1.5; // 1.5x rate for resilience premium

    // TOU arbitrage savings (significant in CA, AZ, NV, etc.)
    const hasTOU = ['CA','AZ','NV','HI','MA','NY','NJ','CT','RI','CO','TX'].includes(stateCode);
    const touSavings = hasTOU ? finalCapacity * 0.3 * 100 : 0; // ~$100/kWh-year for TOU markets

    const totalAnnualValue = annualExtraSavings + outageValue + touSavings;
    const paybackYears = totalAnnualValue > 0 ? netCost / totalAnnualValue : Infinity;

    return {
      state: d,
      recCapacity: finalCapacity,
      grossCost,
      itcSaving,
      netCost,
      exportRate,
      annualExtraSavings,
      outageValue,
      touSavings,
      totalAnnualValue,
      paybackYears,
      hasTOU,
      stateNote: getStateIncentivesNOTE(stateCode)
    };
  }

  // ═══════════════ RENDER ═══════════════

  function render() {
    const container = document.getElementById('batteryPanel');
    if (!container) return;
    container.innerHTML = buildHTML();
    bindEvents();
    autoCalculate();
  }

  function buildHTML() {
    return `
      <span class="step-badge amber">🔋 Battery Storage</span>
      <h2>Home Battery ROI Calculator</h2>
      <p style="font-size:0.84rem;color:var(--text-muted);margin:6px 0 16px;">
        Estimate the right battery size, additional cost, and whether storage makes financial sense.
        <strong>Battery value depends heavily on your state's solar export compensation rate.</strong>
      </p>

      <div class="form-row">
        <div class="form-group">
          <label for="batState">Your State</label>
          <select id="batState"></select>
        </div>
        <div class="form-group">
          <label for="batDailyKwh">Daily Household Usage <span class="hint">(kWh)</span></label>
          <input type="number" id="batDailyKwh" placeholder="e.g. 30" min="5" max="100" value="30">
          <div class="quick-fill" id="batKwhPills">
            <button type="button" onclick="SolarCalc.Battery.setDailyKwh(15)">15 kWh</button>
            <button type="button" onclick="SolarCalc.Battery.setDailyKwh(30)">30 kWh</button>
            <button type="button" onclick="SolarCalc.Battery.setDailyKwh(50)">50 kWh</button>
            <button type="button" onclick="SolarCalc.Battery.setDailyKwh(75)">75 kWh</button>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="batCoverage">Battery Coverage Goal <span class="hint">(% of daily usage)</span></label>
          <select id="batCoverage">
            <option value="0.3">30% — Essentials only (fridge, lights, WiFi)</option>
            <option value="0.5" selected>50% — Extended essentials + some AC</option>
            <option value="0.75">75% — Most appliances</option>
            <option value="1.0">100% — Whole-home backup</option>
          </select>
        </div>
        <div class="form-group">
          <label for="batSystemKw">Solar System Size <span class="hint">(kW, from calculator)</span></label>
          <input type="number" id="batSystemKw" placeholder="e.g. 7.2" min="2" max="30" step="0.1" value="7.2">
        </div>
      </div>

      <button class="btn-primary btn-block" id="batCalcBtn" style="margin-top:8px;">
        Calculate Battery ROI →
      </button>

      <div id="batResults" class="hidden" style="margin-top:20px;">
        <div class="key-takeaway" id="batTakeaway"></div>

        <!-- Result cards -->
        <div class="results-grid" style="margin-top:16px;">
          <div class="result-card featured">
            <div class="r-value" id="batCapacity">—</div>
            <div class="r-label">Recommended Battery</div>
          </div>
          <div class="result-card">
            <div class="r-value" id="batGrossCost">—</div>
            <div class="r-label">Gross Battery Cost</div>
          </div>
          <div class="result-card featured-alt">
            <div class="r-value" id="batNetCost">—</div>
            <div class="r-label">After 30% ITC</div>
          </div>
          <div class="result-card">
            <div class="r-value" id="batAnnualValue">—</div>
            <div class="r-label">Annual Battery Value</div>
          </div>
          <div class="result-card">
            <div class="r-value" id="batPayback">—</div>
            <div class="r-label">Payback Period</div>
          </div>
        </div>

        <!-- Breakdown -->
        <div class="breakdown" id="batBreakdown"></div>

        <!-- State note -->
        <div id="batStateNote" style="margin-top:14px;padding:14px 18px;background:var(--blue-light);border-radius:var(--radius);font-size:0.84rem;color:var(--text);"></div>
      </div>
    `;
  }

  function bindEvents() {
    ['batState','batDailyKwh','batCoverage','batSystemKw'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', recalculate);
    });
    const btn = document.getElementById('batCalcBtn');
    if (btn) btn.addEventListener('click', recalculate);
  }

  function autoCalculate() {
    // Populate state dropdown
    const sel = document.getElementById('batState');
    if (sel) {
      sel.innerHTML = SORTED_STATES.map(([code, d]) => {
        const def = code === DEFAULT_STATE ? ' selected' : '';
        return `<option value="${code}"${def}>${d.name}</option>`;
      }).join('');
    }
    // Sync with main calculator if possible
    const mainState = document.getElementById('state');
    if (mainState && sel) sel.value = mainState.value;
    const mainBill = document.getElementById('bill');
    if (mainBill) {
      const bill = parseFloat(mainBill.value) || 150;
      const stateCode = sel?.value || DEFAULT_STATE;
      const rate = STATE_DATA[stateCode]?.rate || 18;
      const dailyKwh = Math.round((bill / (rate/100)) / 30);
      const dailyEl = document.getElementById('batDailyKwh');
      if (dailyEl) dailyEl.value = dailyKwh;
    }
    recalculate();
  }

  function recalculate() {
    const stateEl    = document.getElementById('batState');
    const dailyEl    = document.getElementById('batDailyKwh');
    const covEl      = document.getElementById('batCoverage');
    const sysEl      = document.getElementById('batSystemKw');

    if (!stateEl || !dailyEl) return;

    const inputs = {
      stateCode:     stateEl.value,
      dailyUsageKwh: parseFloat(dailyEl.value) || 30,
      coveragePct:   parseFloat(covEl?.value) || 0.5,
      systemSizeKw:  parseFloat(sysEl?.value) || 7.2
    };

    const d = calculateBattery(inputs);
    renderResults(d);
  }

  function renderResults(d) {
    const container = document.getElementById('batResults');
    if (container) container.classList.remove('hidden');

    const capEl = document.getElementById('batCapacity');
    if (capEl) capEl.textContent = d.recCapacity + ' kWh';
    const gcEl = document.getElementById('batGrossCost');
    if (gcEl) gcEl.textContent = E.fmtMoney(d.grossCost);
    const ncEl = document.getElementById('batNetCost');
    if (ncEl) ncEl.textContent = E.fmtMoney(d.netCost);
    const avEl = document.getElementById('batAnnualValue');
    if (avEl) avEl.textContent = E.fmtMoney(d.totalAnnualValue) + '/yr';
    const pbEl = document.getElementById('batPayback');
    if (pbEl) pbEl.textContent = d.paybackYears === Infinity ? '20+ years' : E.fmt1(d.paybackYears) + ' years';

    // Takeaway
    const takeEl = document.getElementById('batTakeaway');
    if (takeEl) {
      const verdict = d.paybackYears < 8 ? 'financially attractive' : d.paybackYears < 15 ? 'a resilience investment' : 'primarily for backup power';
      takeEl.textContent = `In ${d.state.name}, a ${d.recCapacity} kWh home battery costs approximately ${E.fmtMoney(d.grossCost)} before incentives (${E.fmtMoney(d.netCost)} after 30% ITC) and provides roughly ${E.fmtMoney(d.totalAnnualValue)} in annual value through self-consumption savings, outage protection, and ${d.hasTOU ? 'time-of-use arbitrage' : 'demand management'}. With a payback of ${d.paybackYears === Infinity ? '20+' : E.fmt1(d.paybackYears)} years, battery storage in ${d.state.name} is ${verdict}. ${d.state.note}.`;
    }

    // Breakdown
    const bdEl = document.getElementById('batBreakdown');
    if (bdEl) {
      bdEl.innerHTML = `
        <div class="breakdown-header">📋 Battery Cost & Value Breakdown</div>
        <div class="breakdown-body">
          <div class="breakdown-row b-meta"><span>— Battery Specs —</span><span></span></div>
          <div class="breakdown-row"><span>Recommended capacity</span><span><strong>${d.recCapacity} kWh</strong></span></div>
          <div class="breakdown-row"><span>Avg installed cost</span><span>~$${AVG_COST_PER_KWH}/kWh</span></div>
          <div class="breakdown-row"><span>Gross battery cost</span><span>${E.fmtMoney(d.grossCost)}</span></div>
          <div class="breakdown-row"><span>Federal ITC (30%)</span><span class="b-neg">−${E.fmtMoney(d.itcSaving)}</span></div>
          <div class="breakdown-row highlight"><span>Net battery cost</span><span class="b-total">${E.fmtMoney(d.netCost)}</span></div>
          <div class="breakdown-divider"></div>
          <div class="breakdown-row b-meta"><span>— Annual Value —</span><span></span></div>
          <div class="breakdown-row"><span>Extra self-consumption savings</span><span class="b-pos">+${E.fmtMoney(d.annualExtraSavings)}</span></div>
          <div class="breakdown-row"><span>Outage resilience value</span><span class="b-pos">+${E.fmtMoney(d.outageValue)}</span></div>
          <div class="breakdown-row"><span>Time-of-use arbitrage</span><span class="b-pos">+${E.fmtMoney(d.touSavings)}</span></div>
          <div class="breakdown-row highlight"><span>Total annual battery value</span><span class="b-total" style="color:var(--green-deep)">${E.fmtMoney(d.totalAnnualValue)}/yr</span></div>
          <div class="breakdown-divider"></div>
          <div class="breakdown-row b-meta"><span>— ROI —</span><span></span></div>
          <div class="breakdown-row"><span>Solar export rate (% of retail)</span><span>${(d.exportRate*100).toFixed(0)}%</span></div>
          <div class="breakdown-row highlight"><span>Battery payback period</span><span class="b-total">${d.paybackYears === Infinity ? '20+ years' : E.fmt1(d.paybackYears) + ' years'}</span></div>
          <div class="breakdown-row b-meta"><span>Warranty</span><span>10 years / 70% capacity</span></div>
        </div>
      `;
    }

    // State note
    const snEl = document.getElementById('batStateNote');
    if (snEl) snEl.innerHTML = `<strong>💡 ${d.state.name} note:</strong> ${d.stateNote}`;

    // Scroll
    const results = document.getElementById('batResults');
    if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ═══════════════ QUICK FILL ═══════════════

  function setDailyKwh(val) {
    const el = document.getElementById('batDailyKwh');
    if (el) { el.value = val; recalculate(); }
  }

  // ═══════════════ PUBLIC API ═══════════════

  return {
    render,
    recalculate,
    setDailyKwh,
    calculateBattery
  };

})();



// modules/incentives.js
/**
 * SolarCalc — State Incentives Module
 * 
 * Displays federal + state-level solar incentives.
 * Data compiled from DSIRE, state energy offices, and utility filings.
 * 
 * Load after engine.js, before app.js
 */

SolarCalc.Incentives = (function() {
  const E = SolarCalc.Engine;

  // ═══════════════ INCENTIVE DATA ═══════════════

  const INCENTIVES = {
    // Federal (applies to all)
    _FEDERAL: {
      name: 'Federal Investment Tax Credit (ITC)',
      description: '30% of total system cost credited against federal income tax. Through 2032. No cap. Solar + battery both qualify when battery is charged by solar.',
      type: 'Tax Credit',
      value: '30% of system cost',
      expires: '2032 (steps to 26% in 2033, 22% in 2034)',
      source: 'IRS Section 25D / Inflation Reduction Act'
    },

    // State-specific
    CA: [
      { name: 'SGIP (Self-Generation Incentive Program)', description: 'Rebate for battery storage based on capacity and equity tier.', value: '$150–$1,000/kWh', type: 'Rebate', source: 'CPUC' },
      { name: 'Property Tax Exclusion', description: 'Solar + battery value excluded from property tax assessment.', value: '100% exemption', type: 'Tax Exemption', source: 'CA Revenue & Taxation Code' },
      { name: 'NEM 3.0 Net Billing', description: 'Export compensation at ~25% of retail rate. Battery strongly recommended.', value: '~7.5¢/kWh export', type: 'Net Metering', source: 'CPUC Decision 22-12-056' }
    ],
    NY: [
      { name: 'NY-Sun Incentive', description: 'Upfront incentive per watt for residential solar.', value: '$0.20–$0.40/W', type: 'Rebate', source: 'NYSERDA' },
      { name: 'State Solar Tax Credit', description: '25% of system cost credited against NY state taxes.', value: '25% (max $5,000)', type: 'Tax Credit', source: 'NY Tax Law §606' },
      { name: 'Net Metering', description: 'Full retail rate for exported solar. Excellent for solar-only ROI.', value: 'Retail rate credit', type: 'Net Metering', source: 'NY PSC' }
    ],
    MA: [
      { name: 'SMART Program', description: 'Fixed incentive per kWh produced over 10 years.', value: 'Varies by utility block', type: 'Performance-Based', source: 'MA DOER' },
      { name: 'ConnectedSolutions VPP', description: 'Utility pays you for allowing battery dispatch during peak events.', value: '$200–$400/kW/year', type: 'VPP', source: 'National Grid/Eversource' },
      { name: 'Net Metering', description: 'Full retail net metering with cap.', value: 'Retail rate credit', type: 'Net Metering', source: 'MA DPU' }
    ],
    NJ: [
      { name: 'SuSI Program (Successor)', description: 'SREC-based incentive for solar production.', value: '~$90/SREC', type: 'Performance-Based', source: 'NJ BPU' },
      { name: 'Property Tax Exemption', description: '100% exemption on added home value from solar.', value: '100% exemption', type: 'Tax Exemption', source: 'NJ Statutes' },
      { name: 'Net Metering', description: 'Strong net metering with annual true-up.', value: 'Retail rate credit', type: 'Net Metering', source: 'NJ BPU' }
    ],
    TX: [
      { name: 'No State Incentive', description: 'Texas has no state-level solar incentive. Federal ITC applies.', value: 'N/A', type: '—', source: '—' },
      { name: 'Property Tax Exemption', description: 'Solar value exempt from property tax.', value: '100% exemption', type: 'Tax Exemption', source: 'TX Tax Code §11.27' },
      { name: 'VPP Programs', description: 'Tesla Electric, Shell, Octopus offer grid service payments for battery owners.', value: '$10–$40/month', type: 'VPP', source: 'Various REPs' }
    ],
    FL: [
      { name: 'Net Metering', description: 'Full retail rate net metering. No state cap.', value: 'Retail rate credit', type: 'Net Metering', source: 'FL PSC' },
      { name: 'Property Tax Exemption', description: '100% exemption on solar improvements.', value: '100% exemption', type: 'Tax Exemption', source: 'FL Statutes §196.175' },
      { name: 'Sales Tax Exemption', description: 'No sales tax on solar equipment purchase.', value: '6% savings', type: 'Tax Exemption', source: 'FL Statutes' }
    ],
    CO: [
      { name: 'Xcel Energy Solar*Rewards', description: 'Upfront rebate for residential solar.', value: '$0.75/W (up to 7kW)', type: 'Rebate', source: 'Xcel Energy' },
      { name: 'Net Metering', description: 'Retail rate credit with annual true-up.', value: 'Retail rate credit', type: 'Net Metering', source: 'CO PUC' },
      { name: 'Property Tax Exemption', description: 'Solar value exempt from property tax.', value: '100% exemption', type: 'Tax Exemption', source: 'CO Rev. Stat.' }
    ],
    AZ: [
      { name: 'State Solar Tax Credit', description: '25% of system cost.', value: '25% (max $1,000)', type: 'Tax Credit', source: 'AZ Dept. of Revenue' },
      { name: 'Net Billing', description: 'Export compensated below retail. Battery recommended.', value: '~7.5¢/kWh', type: 'Net Metering', source: 'APS/SRP' }
    ],
    NV: [
      { name: 'Net Metering 2.0', description: '75% of retail rate for export.', value: '75% of retail', type: 'Net Metering', source: 'NV Energy' },
      { name: 'Property Tax Abatement', description: 'Full abatement for solar improvements.', value: '100%', type: 'Tax Exemption', source: 'NV Statutes' }
    ],
    HI: [
      { name: 'Battery Bonus Program', description: 'Cash incentive for adding battery to solar system.', value: 'Up to $4,250', type: 'Rebate', source: 'Hawaiian Electric' },
      { name: 'State Tax Credit', description: '35% of system cost.', value: '35% (max $5,000)', type: 'Tax Credit', source: 'HI Dept. of Taxation' }
    ],
    IL: [
      { name: 'Illinois Shines (SREC)', description: 'SREC payments for solar production over 15 years.', value: 'Varies by project', type: 'Performance-Based', source: 'IL Commerce Commission' },
      { name: 'Net Metering', description: 'Full retail net metering.', value: 'Retail rate credit', type: 'Net Metering', source: 'IL Commerce Commission' }
    ]
  };

  // States with notable incentives (otherwise show default)
  const NOTABLE_STATES = new Set(Object.keys(INCENTIVES).filter(k => k !== '_FEDERAL'));

  // ═══════════════ RENDER ═══════════════

  function render() {
    const container = document.getElementById('incentivesPanel');
    if (!container) return;
    container.innerHTML = buildHTML();
    bindEvents();
    showState(DEFAULT_STATE);
  }

  function buildHTML() {
    return `
      <span class="step-badge green">💰 State Incentives</span>
      <h2>Solar Incentives & Rebates by State</h2>
      <p style="font-size:0.84rem;color:var(--text-muted);margin:6px 0 16px;">
        Every US homeowner qualifies for the 30% federal tax credit. Many states offer additional
        incentives that can cut your net cost by <strong>20–40% more</strong>.
      </p>

      <div class="form-row">
        <div class="form-group">
          <label for="incState">Select Your State</label>
          <select id="incState"></select>
        </div>
      </div>

      <div id="incFederalBlock" style="margin-top:16px;padding:16px 20px;background:var(--accent-light);border:1px solid var(--accent-border);border-radius:var(--radius);">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.3rem;">🇺🇸</span>
          <div>
            <strong style="font-size:0.9rem;">Federal Investment Tax Credit (ITC)</strong>
            <span style="display:inline-block;margin-left:8px;font-size:0.7rem;font-weight:700;background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;">ALL STATES</span>
          </div>
        </div>
        <p style="font-size:0.84rem;color:var(--text);margin-top:6px;">${INCENTIVES._FEDERAL.description}</p>
        <div style="display:flex;gap:20px;flex-wrap:wrap;margin-top:6px;font-size:0.8rem;color:var(--text-muted);">
          <span><strong>Value:</strong> ${INCENTIVES._FEDERAL.value}</span>
          <span><strong>Expires:</strong> ${INCENTIVES._FEDERAL.expires}</span>
          <span style="font-size:0.72rem;font-style:italic;">Source: ${INCENTIVES._FEDERAL.source}</span>
        </div>
      </div>

      <div id="incStateBlock" style="margin-top:16px;"></div>
    `;
  }

  function bindEvents() {
    const sel = document.getElementById('incState');
    if (sel) {
      sel.innerHTML = SORTED_STATES.map(([code, d]) => {
        const def = code === DEFAULT_STATE ? ' selected' : '';
        const star = NOTABLE_STATES.has(code) ? ' ⭐' : '';
        return `<option value="${code}"${def}>${d.name}${star}</option>`;
      }).join('');
      sel.addEventListener('change', function() {
        showState(this.value);
      });
    }
  }

  function showState(stateCode) {
    const container = document.getElementById('incStateBlock');
    if (!container) return;

    const name = STATE_DATA[stateCode]?.name || 'your state';
    const stateIncentives = INCENTIVES[stateCode] || [];

    if (stateIncentives.length === 0) {
      container.innerHTML = `
        <div style="padding:20px;background:var(--bg-alt);border-radius:var(--radius);text-align:center;">
          <p style="font-size:0.9rem;color:var(--text-muted);">
            <strong>${name}</strong> has no additional state-level solar incentives beyond the federal ITC.
          </p>
          <p style="font-size:0.82rem;color:var(--text-faint);margin-top:4px;">
            However, the 30% federal tax credit still applies, and net metering may be available through your local utility.
            Check <a href="https://www.dsireusa.org/" target="_blank" rel="nofollow" style="color:var(--accent-deep);">DSIRE</a> for the latest.
          </p>
        </div>
      `;
      return;
    }

    let html = `<h3 style="font-size:0.95rem;font-weight:650;margin-bottom:10px;">⭐ ${name} — State Incentives</h3>`;
    stateIncentives.forEach(inc => {
      const typeColors = {
        'Rebate':      'background:#dcfce7;color:#15803d;',
        'Tax Credit':  'background:#fef3c7;color:#92400e;',
        'Tax Exemption':'background:#dbeafe;color:#1e40af;',
        'Net Metering':'background:#f3e8ff;color:#6b21a8;',
        'Performance-Based': 'background:#fce7f3;color:#9d174d;',
        'VPP':         'background:#e0f2fe;color:#0c4a6e;',
        '—':           'background:#f3f4f6;color:#6b7280;'
      };
      const style = typeColors[inc.type] || typeColors['—'];
      html += `
        <div style="padding:14px 16px;margin-bottom:8px;background:var(--card);border:1px solid var(--border-light);border-radius:var(--radius-sm);">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <strong style="font-size:0.88rem;">${inc.name}</strong>
            <span style="font-size:0.68rem;font-weight:600;padding:2px 8px;border-radius:4px;${style}">${inc.type}</span>
            <span style="font-size:0.78rem;font-weight:700;color:var(--accent-deep);">${inc.value}</span>
          </div>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;">${inc.description}</p>
          <span style="font-size:0.7rem;color:var(--text-faint);font-style:italic;">Source: ${inc.source}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ═══════════════ PUBLIC API ═══════════════

  return {
    render
  };

})();



// js/app.js
/**
 * SolarCalc — App Entry Point
 * 
 * Orchestrates all modules. Handles event binding, tab navigation,
 * and the "calculate" flow.
 * 
 * To add a new feature module:
 *   1. Create modules/your-module.js
 *   2. Add it to the tab-nav in index.html
 *   3. Add its tab-panel in index.html
 *   4. Register the module here
 */

SolarCalc.App = (function() {
  const UI = SolarCalc.UI;
  const E  = SolarCalc.Engine;

  let currentTab = 'solar';

  // ==========================================
  //  INIT
  // ==========================================

  function init() {
    UI.cacheElements();
    populateForm();
    bindEvents();
    calculate(); // auto-calculate on load
  }

  function populateForm() {
    // State dropdown
    document.getElementById('state').innerHTML = UI.buildStateDropdown(DEFAULT_STATE);
    // Bill pills
    document.getElementById('billPills').innerHTML = UI.buildBillPills();
    // Advanced options
    document.getElementById('tiltSelect').innerHTML = UI.buildTiltSelect();
    document.getElementById('derateSelect').innerHTML = UI.buildDerateSelect();
    document.getElementById('panelSelect').innerHTML = UI.buildPanelSelect();
  }

  function bindEvents() {
    // Auto-calculate on input change
    ['bill', 'state', 'tiltSelect', 'derateSelect', 'panelSelect'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', calculate);
    });

    // Calculate button
    const btn = document.getElementById('calcBtn');
    if (btn) btn.addEventListener('click', calculate);

    // Tab navigation — use BOTH onclick attribute fallback AND addEventListener
    var tabButtons = document.querySelectorAll('.tab-nav button');
    tabButtons.forEach(function(btn) {
      // Direct onclick for maximum compatibility
      btn.onclick = function(e) {
        e.preventDefault();
        switchTab(btn.getAttribute('data-tab'));
        return false;
      };
      // Also addEventListener as backup
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        switchTab(btn.getAttribute('data-tab'));
      });
    });
  }

  // ==========================================
  //  CALCULATE
  // ==========================================

  function calculate() {
    const inputs = readInputs();
    if (!inputs) return;

    // Run core solar calculation
    const data = E.solarEstimate(inputs);
    UI.renderSolarResults(data);

    // Also update module panels that depend on state selection
    UI.renderBatteryPanel('batteryPanel');
    UI.renderIncentivesPanel('incentivesPanel', inputs.stateCode);
  }

  function readInputs() {
    const billEl    = document.getElementById('bill');
    const stateEl   = document.getElementById('state');
    const tiltEl    = document.getElementById('tiltSelect');
    const derateEl  = document.getElementById('derateSelect');
    const panelEl   = document.getElementById('panelSelect');

    if (!billEl || !stateEl) return null;

    return {
      monthlyBill:  parseFloat(billEl.value) || 150,
      stateCode:    stateEl.value,
      tiltFactor:   tiltEl    ? parseFloat(tiltEl.value)    : 1.0,
      derateFactor: derateEl  ? parseFloat(derateEl.value)  : 0.77,
      panelWattage: panelEl   ? parseInt(panelEl.value)     : DEFAULT_PANEL_W
    };
  }

  // ==========================================
  //  TAB NAVIGATION
  // ==========================================

  function switchTab(tabId) {
    if (!tabId) return;

    // Update nav buttons
    var navButtons = document.querySelectorAll('.tab-nav button');
    for (var i = 0; i < navButtons.length; i++) {
      var btn = navButtons[i];
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }

    // Update panels
    var panels = document.querySelectorAll('.tab-panel');
    var targetId = 'tab-' + tabId;
    for (var j = 0; j < panels.length; j++) {
      var panel = panels[j];
      if (panel.id === targetId) {
        panel.classList.add('active');
        panel.style.display = 'block';
      } else {
        panel.classList.remove('active');
        panel.style.display = 'none';
      }
    }

    // Render modules
    try {
      if (tabId === 'battery' && SolarCalc.Battery) SolarCalc.Battery.render();
      if (tabId === 'incentives' && SolarCalc.Incentives) SolarCalc.Incentives.render();
      if (tabId === 'compare' && SolarCalc.UI) SolarCalc.UI.renderComparePanel('comparePanel');
    } catch(e) {}
  }

  // ==========================================
  //  QUICK-FILL (called from onclick in HTML)
  // ==========================================

  function setMonthlyBill(val) {
    const el = document.getElementById('bill');
    if (el) {
      el.value = val;
      calculate();
    }
  }

  // ==========================================
  //  ADVANCED TOGGLE (called from onclick in HTML)
  // ==========================================

  function toggleAdvanced() {
    const panel = document.getElementById('advOptions');
    const toggle = document.getElementById('advToggle');
    if (!panel || !toggle) return;
    const isOpen = panel.classList.toggle('open');
    if (isOpen) {
      toggle.classList.add('open');
      toggle.querySelector('span').textContent = '▲ Hide advanced options';
    } else {
      toggle.classList.remove('open');
      toggle.querySelector('span').textContent = '▼ Advanced options';
    }
  }

  // ==========================================
  //  MODULE REGISTRY (extend here for new features)
  // ==========================================

  function registerModule(name, initFn) {
    // Future: dynamically load and init modules
    console.log(`[SolarCalc] Module registered: ${name}`);
    if (typeof initFn === 'function') initFn();
  }

    // ---- Public API ----
    return {
      init,
      calculate,
      setMonthlyBill,
      toggleAdvanced,
      switchTab,
      registerModule
    };

  })();

  // ---- Auto-init (runs immediately since script is at end of <body>) ----
  window.SolarCalc = SolarCalc;
  if (document.readyState !== 'loading') {
    SolarCalc.App.init();
  } else {
    document.addEventListener('DOMContentLoaded', function() { SolarCalc.App.init(); });
  }


window.SolarCalc = SolarCalc;

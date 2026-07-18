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

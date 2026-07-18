/**
 * SolarCalc — Battery Storage Module
 * 
 * Interactive calculator for home battery ROI.
 * Estimates recommended capacity, cost, and whether storage
 * makes financial sense given solar export compensation rates.
 * 
 * Load after engine.js, before app.js
 */

const SolarCalc = window.SolarCalc || {};
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

window.SolarCalc = SolarCalc;

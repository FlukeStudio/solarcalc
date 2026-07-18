/**
 * SolarCalc — UI Layer v2
 * 
 * Premium rendering with AEO-optimized output blocks.
 * All DOM manipulation lives here.
 */

const SolarCalc = window.SolarCalc || {};
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

window.SolarCalc = SolarCalc;

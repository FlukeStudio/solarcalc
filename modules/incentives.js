/**
 * SolarCalc — State Incentives Module
 * 
 * Displays federal + state-level solar incentives.
 * Data compiled from DSIRE, state energy offices, and utility filings.
 * 
 * Load after engine.js, before app.js
 */

const SolarCalc = window.SolarCalc || {};
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

window.SolarCalc = SolarCalc;

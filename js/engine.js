/**
 * SolarCalc — Calculation Engine
 * 
 * All business logic lives here, as pure functions with zero DOM dependencies.
 * Every function takes inputs → returns outputs. No side effects.
 * 
 * To add a new calculator module (e.g. battery ROI, EV charging),
 * add a new object to SolarCalc.Engine following the same pattern.
 */

const SolarCalc = window.SolarCalc || {};
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

window.SolarCalc = SolarCalc;

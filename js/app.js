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

const SolarCalc = window.SolarCalc || {};
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
  }

  // ==========================================
  //  SHARE RESULTS (called from share buttons)
  // ==========================================

  function shareResults(platform) {
    var url    = window.location.href;
    var title  = document.title;
    var text   = '';
    var takeEl = document.getElementById('takeaway');
    if (takeEl) text = takeEl.textContent.substring(0, 200) + '...';

    if (platform === 'twitter') {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank');
    } else if (platform === 'facebook') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(function() {
        alert('Link copied! Share it anywhere.');
      }).catch(function() {
        prompt('Copy this link:', url);
      });
    }
  }

  // ---- Public API ----
  return {
    init,
    calculate,
    setMonthlyBill,
    toggleAdvanced,
    switchTab,
    shareResults,
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

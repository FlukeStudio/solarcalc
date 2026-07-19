# SolarCalc

Free, independent solar panel cost & savings calculator for US homeowners. No email, no phone, no sales calls — just the numbers.

**[Live → solarcalc.cmprly.com](https://solarcalc.cmprly.com)**

## Features

| Tab | Description |
|-----|-------------|
| ☀️ **Calculator** | System sizing, cost after 30% federal tax credit, annual savings, payback period, 25-year net savings. Covers all 50 US states + DC. |
| 🔋 **Battery** | Home battery sizing & ROI with state-specific solar export compensation rates, TOU arbitrage, and outage resilience value. |
| 💰 **Incentives** | Federal ITC details + state-level rebates, tax credits, net metering policies for all notable solar states. |
| 📊 **Quotes** | Direct link to compare installer quotes — the #1 way to save on solar. |

## Data Sources (All 2026)

| Data | Source |
|------|--------|
| Peak Sun Hours | NREL PVWatts v8 / NSRDB |
| Electricity Rates | US EIA Electric Power Monthly (July 2026) |
| Installation Costs | SEIA / EnergySage Q1 2026 Marketplace Data |
| Federal Tax Credit | IRS Section 25D — 30% ITC through 2032 |
| State Incentives | DSIRE, state energy offices, utility filings |
| Battery Costs | EnergySage marketplace (Feb 2026), NREL ATB |

## SEO & AEO

- **JSON-LD structured data** — `WebApplication` + `FAQPage` with dynamic state-specific Q&A
- **Key Takeaway summaries** — structured text blocks optimized for AI answer engine citations
- **Semantic HTML** — `h1`–`h3` hierarchy, `<strong>` emphasis, data source citations
- **sitemap.xml + robots.txt** — Google-ready

## Tech Stack

Pure static site — **zero dependencies, zero APIs, zero backend, zero cost.**

- HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- Modular architecture: data → engine → UI → app
- JSON-LD for SEO & AEO (Answer Engine Optimization)
- Mobile-responsive, print-friendly (`@media print`)
- No frameworks, no build step, no npm
- Single `bundle.js` for deployment; individual source files for development

## Project Structure

```
solarcalc/
├── index.html              # Main page (thin shell + layout)
├── css/
│   └── style.css           # Design system (Solar Gold theme)
├── js/
│   ├── data.js             # 50-state database + constants
│   ├── engine.js           # Calculation engine (pure functions)
│   ├── ui.js               # UI rendering layer
│   ├── app.js              # App entry point + tab navigation
│   └── bundle.js           # Combined (single file for deployment)
├── modules/                # Pluggable feature modules
│   ├── battery.js          # Battery ROI calculator
│   └── incentives.js       # State incentives lookup
├── sitemap.xml             # Google Search Console ready
├── robots.txt              # Crawler directives
├── .gitignore
└── README.md
```

## Adding a New Module

Three steps, zero changes to existing code:

1. **Create** `modules/your-module.js` — follow the `SolarCalc.YourModule = (function() { … })()` pattern
2. **Add** `<script src="modules/your-module.js">` to `index.html`
3. **Register** in `app.js` — add a tab button + `switchTab` case

Each module is fully independent. See existing `battery.js` and `incentives.js` for reference.

## Deployment

**Cloudflare Pages (recommended — free, global CDN, auto-HTTPS):**

1. Push to GitHub
2. Cloudflare Pages → Connect to Git → select repo
3. Framework preset: **None** | Build command: *(empty)* | Output directory: `/`
4. Deploy — `git push` to auto-deploy thereafter

**Also works on:** GitHub Pages, Netlify, Vercel, or any static file server.

## License

MIT — use it, modify it, ship it.

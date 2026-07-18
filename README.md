# SolarCalc

Free, independent solar panel cost & savings calculator for US homeowners. No email, no phone, no sales calls — just the numbers.

**Live demo:** [solarcalc.pages.dev](https://solarcalc.pages.dev) *(after Cloudflare Pages setup)*

## Features

- ☀️ **Solar Calculator** — System sizing, cost after 30% federal tax credit, annual savings, payback period, 25-year ROI
- 🔋 **Battery Storage** — Home battery sizing & ROI calculator with state-specific export rates
- 💰 **State Incentives** — Federal ITC + state-level rebates, tax credits, net metering policies
- 📊 **Quote Comparison** — Direct link to compare installer quotes

## Data Sources

- **Peak Sun Hours** — NREL PVWatts v8 / NSRDB (2026)
- **Electricity Rates** — US EIA Electric Power Monthly (July 2026)
- **Installation Costs** — SEIA / EnergySage Q1 2026 Marketplace Data
- **Tax Credit** — IRS Section 25D, 30% ITC through 2032

## Tech Stack

Pure static site — zero dependencies, zero APIs, zero backend.

- HTML5 + CSS3 + Vanilla JavaScript
- Modular architecture (data → engine → UI → app)
- JSON-LD structured data for SEO & AEO
- Mobile-responsive, print-friendly
- No frameworks, no build step

## Project Structure

```
solarcalc/
├── index.html              # Main page
├── css/style.css            # Design system
├── js/
│   ├── data.js              # 50-state database
│   ├── engine.js            # Calculation engine
│   ├── ui.js                # UI rendering
│   ├── app.js               # App entry point
│   └── bundle.js            # Combined (for deployment)
├── modules/
│   ├── battery.js           # Battery ROI calculator
│   └── incentives.js        # State incentives lookup
└── .gitignore
```

## Deployment

1. Push to GitHub
2. Connect to Cloudflare Pages (free)
3. Done — zero config needed

Or deploy anywhere that serves static files: GitHub Pages, Netlify, Vercel, S3, etc.

## License

MIT

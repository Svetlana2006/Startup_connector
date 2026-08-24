# GovBridge — Procurement Hub

GovBridge is a high-fidelity, role-based procurement portal designed for the Maharashtra State Innovation Society (MSInS) and the state's DPIIT startup ecosystem. It streamlines the government procurement process by connecting state departments with vetted startups, ensuring full compliance with GFR Rule 173(i) waivers.

## Features (Tier 1)
- **Role-based Access:** Dashboards tailored for Department Officials, Startup Providers, Expert Evaluators, and Platform Admins.
- **Problem Statement Builder:** A 3-step wizard to help departments transform vague pain points into outcome-based procurement requirements.
- **Startup Discovery:** Search and filter DPIIT-recognized startups based on past performance, sector, and match score.
- **Eligibility Screening:** Automated verification checklists and GFR Rule 173(i) exemption badges.
- **Evaluator Scoring:** A rubric-based scoring interface with a live consensus leaderboard.
- **Pilot Execution Tracker:** Timeline visualization for tracking pilot milestones and simulated payment disbursements.
- **Public Transparency Log:** An immutable, hash-backed activity log ensuring transparency in the procurement lifecycle.

## Architecture

This project is built as an **npm workspaces** monorepo to ensure clean separation of concerns and maintainability.

### Monorepo Structure
```text
Startup_connector/
├── packages/
│   ├── client/       # Main React + Vite Frontend App
│   │   ├── src/      # Pages, routing, styles
│   │   └── ...       # Vite/Tailwind configurations
│   ├── data/         # Shared Data Layer (@govbridge/data)
│   │   └── src/      # Seed data, constants, mock APIs
│   └── ui/           # Shared Design System (@govbridge/ui)
│       └── src/      # Core layout components (SideNav, TopNav, AppFooter)
├── plan.md           # Project plan and specifications
└── package.json      # Root workspace configuration
```

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Material Symbols
- **Fonts:** Public Sans (Primary), Inter (Secondary)
- **Package Management:** NPM Workspaces

## How to Run Locally

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation
From the root of the repository, run the following command to install dependencies across all workspace packages and link them properly:

```bash
npm install
```

### Running the Development Server
To start the Vite development server for the frontend application, run:

```bash
npm run dev
```

This script automatically triggers the dev server from the `@govbridge/client` workspace. 
Once running, open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production
To create a production-ready build, run:

```bash
npm run build
```
The bundled files will be generated in `packages/client/dist`.

---
*Developed for the Maharashtra State Innovation Society.*

# Project Plan: Startup-Friendly Public Procurement Mechanism

### Smart India Hackathon 2026 | Problem Statement SIH26136

---

## 1. Problem Statement Overview

**PS ID:** SIH26136
**Organization:** Government of Maharashtra
**Department:** Maharashtra State Innovation Society (MSInS), Department of Skills, Employment, Entrepreneurship and Innovation
**Category:** Software
**Theme:** Smart Automation

**Title:** Startup-friendly public procurement mechanism that enables government departments to identify, pilot, procure, and scale innovative solutions from eligible startups.

### 1.1 The Core Problem, in Plain English

Government buys standardized things (pens, cars, furniture) through a system built for standardized things: write specs, take the lowest qualified bid from an experienced vendor, pay after delivery. That system breaks the moment the "thing" being bought is an unproven idea from a two-year-old startup.

**From the government side:**

- Departments can't turn a messy real-world problem ("we lose track of stray cattle causing accidents") into a clear, outcome-based problem statement
- No structured way to discover which startups exist and are relevant
- No safe, bounded way to test an unproven technology before committing real budget
- Unclear who owns the IP/data generated during a pilot
- No independent way to verify whether a pilot actually worked
- No defined path from "pilot succeeded" to "now legally procure and scale it"

**From the startup side:**

- Traditional tenders require 3+ years of experience and crore-level turnover — most startups don't qualify on paper, even with GFR exemptions technically available
- Government sales cycles run 12–18+ months — most startups can't survive the wait
- Payment milestones are vague — cash flow is unpredictable
- No visibility into what problems departments actually need solved, until a formal tender (which they can't win anyway) opens

### 1.2 What Success Looks Like

A transparent, competitive, legally compliant pathway that takes a department from _"we have a problem"_ to _"a startup solved it and we're scaling it statewide"_ — fast, fair, and accountable at every step.

---

## 2. Our Solution: One-Line Pitch

**"A single platform that turns government problems into startup opportunities — and turns successful pilots into real contracts — through a transparent, milestone-driven workflow built around how Indian government actually works, not just how procurement theoretically should."**

That last clause is our edge. Most teams will build a generic "job portal for govt-startup matching." We're building one that accounts for the real reasons these pilots die in practice — officer transfers, budget cycles, and trust deficits — not just the textbook version of the problem.

---

## 3. End-to-End Workflow (The Backbone)

Every feature in this plan maps to one of these 9 stages:

```
1. PROBLEM POSTING        → Department posts an outcome-based problem
2. STARTUP DISCOVERY      → Eligible startups discover and apply
3. ELIGIBILITY SCREENING  → Auto-checks DPIIT recognition, waives turnover/experience
4. EXPERT EVALUATION      → Panel scores applicants on a transparent rubric
5. PILOT / SANDBOX DESIGN → Bounded, low-risk trial co-defined
6. MILESTONE CONTRACTING  → Contract auto-generated, payments tied to milestones
7. PILOT EXECUTION        → Progress, budget, KPIs tracked live
8. INDEPENDENT VALIDATION → Outcome verified against original success criteria
9. SCALE-UP DECISION      → Evidence-based decision to procure/scale statewide
```

---

## 4. Why Our Approach Is Different

Most teams solving this will build 8 shallow CRUD modules that all look like forms, or lean entirely on "AI matching" as their one gimmick. We're doing three things differently:

1. **We designed for how pilots actually die in India** — not officer indifference or bad tech, but things like transfers wiping institutional memory, and budgets lapsing before a startup can be onboarded. These are real, well-known failure modes in Indian public administration that almost no student team thinks to design around.
2. **We cited real rules, not invented ones** — GFR Rule 173(i), DPIIT recognition criteria, GeM Startup Runway norms. This tells evaluators we did the domain homework most teams skip.
3. **We built one feature that compounds over time** (Startup Passport) instead of every feature resetting to zero for each new problem statement — showing we understand this needs to work as a _system_, not a one-off transaction tool.

---

## 5. Feature List by Tier

Tiers are ordered by build priority for a **2-day vibecoded prototype**. Tier 1 must work end-to-end and be demoable; everything after it is added only once Tier 1 is stable.

### TIER 1 — Core Spine (build first, non-negotiable)

_Goal: one complete, working problem → pilot → scale-up journey. This is what makes the platform look real at all._

| #   | Feature                             | What It Does                                                                                      | Why It's Tier 1                                                        |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1.1 | **Role-based landing (mock login)** | Department / Startup / Evaluator / Admin dashboards, fake auth is fine                            | Makes the platform _feel_ like a real multi-sided system in seconds    |
| 1.2 | **Problem Statement Builder**       | Guided wizard converts a vague pain point into a structured, outcome-based statement              | This is explicitly named as an expected outcome in the brief           |
| 1.3 | **Startup Discovery + Matching**    | Searchable list seeded with real Maharashtra DPIIT startups, matched by sector/tag                | Solves the "departments can't find startups" problem directly          |
| 1.4 | **Eligibility Screening**           | Auto-checks DPIIT recognition, shows "waived under GFR Rule 173(i)" instead of generic validation | Solves the #1 named startup barrier — turnover/experience requirements |
| 1.5 | **Evaluator Scoring Screen**        | Rubric-based scoring (3–5 criteria), auto-ranked shortlist                                        | Makes evaluation transparent and defensible                            |
| 1.6 | **Pilot Tracker with Milestones**   | Timeline view, "Mark Complete" triggers a simulated payment release                               | Solves "unclear payment milestones," the sharpest startup pain point   |
| 1.7 | **Public Status Tracker**           | Visual progress bar: Posted → Applied → Evaluation → Piloting → Validated → Scaling               | Ties the whole journey together for the demo; signals transparency     |

### TIER S — Niche, High-Impact Differentiators (build 2–3 of these)

_Goal: address failure modes that are real, specific to Indian government workflows, and that almost no other team will think to design for. This is what makes judges say "they actually get it."_

| #   | Feature                                          | What It Does                                                                                                                                                                                                                                 | Why It's Rare & Needed                                                                                                                                                                                                      |
| --- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S.1 | **Officer Transfer Continuity Engine**           | When a problem statement's owning official changes, auto-generates a one-page handover brief (why it started, current stage, pending items, startup contact) that the new officer must acknowledge before the pilot can be stalled/cancelled | Officer transfers silently killing pilots is one of the most common real reasons government innovation initiatives die — almost never addressed in student prototypes because it's an institutional problem, not a tech one |
| S.2 | **Budget "Use-It-Or-Lose-It" Nudge**             | Departments flag unspent innovation budget nearing fiscal year-end (Jan–Mar rush is real); system proactively surfaces fast-onboarding, pilot-ready startup matches                                                                          | Shows real understanding of how Indian government fiscal-year budgeting works — a detail a state innovation society judge will immediately recognize as authentic                                                           |
| S.3 | **Startup Passport (Portable Reputation Score)** | A single trust score/track record that follows a startup across every department and pilot on the platform, so later departments see verified history instead of evaluating from scratch                                                     | Directly attacks "long sales cycles" — turns every successful pilot into leverage for the next one, so the platform's value compounds instead of resetting per problem statement                                            |

### TIER A — Strong Differentiators (build if Tier 1 + at least 2 Tier S features are solid)

| #   | Feature                               | What It Does                                                                                                                                            | Why It Matters                                                                                                                 |
| --- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| A.1 | **SLA Escalation Clock**              | Each stage has an expected duration; if a stage sits idle past it, it auto-escalates to the MSInS admin dashboard with a visible "days overdue" counter | Structurally prevents delay instead of just visualizing it nicely — a stronger claim than a cosmetic Kanban board              |
| A.2 | **Vernacular (Marathi) Input Layer**  | District officials can type or speak in Marathi; auto-translated/structured into the English outcome-based format                                       | Real accessibility gap outside Mumbai/Pune — shows awareness of who actually uses this system                                  |
| A.3 | **Conflict-of-Interest Network Flag** | Cross-checks evaluator's past employer/affiliations against startup's registered details, flags potential conflicts automatically                       | A genuine fraud-prevention mechanism, not just cosmetic transparency — stronger than a "trust us, it's visible" hash-chain log |

### TIER B — "Wow Moment" Features (pick 1–2, layer on top for the live demo)

_These aren't unique to government workflows, but they're cheap to build and create a strong visible demo moment._

| #   | Feature                                          | What It Does                                                                                                                           |
| --- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| B.1 | **AI Contract Red-Flag Detector**                | LLM scans a generated pilot agreement and flags risky/missing clauses (e.g., "⚠️ No exit clause," "✅ Data protection clause present") |
| B.2 | **Auto-Generated Scale-Up Procurement Document** | One button converts a successful pilot into a GFR/GeM-style procurement document, citing exact rules (Rule 173(i), EMD waiver)         |
| B.3 | **Independent Validation View**                  | Side-by-side comparison: startup self-reported metrics vs. department-verified metrics                                                 |
| B.4 | **Live Transparency Ledger**                     | Every status change is hashed and shown as a scrolling immutable-looking log (simple SHA-256, not real blockchain)                     |

### TIER C — Explicitly Cut for the Prototype (mention only as roadmap/future scope in pitch)

- Real authentication / real payment gateway / real e-signatures
- Cybersecurity checklist, grievance/appeal module, blind evaluation mode
- Multi-department cross-adoption ("adopt this solution" button)
- Founder dropout-risk prediction, silent problem mining, negotiation outcome simulator

---

## 6. Recommended Build Combination for 2 Days

**Tier 1 (all 7 features) + S.1 + S.3 + B.2**

Reasoning: S.1 (Officer Transfer Continuity) and S.3 (Startup Passport) are your "they actually understand government" moments — cheap to build (mostly status fields, summaries, and aggregation views, not new algorithms) but conceptually rare. B.2 (Auto-Generated Procurement Document) is your flashy closing "mic drop" moment, reusing real rule citations you've already researched. Together this gives you a demo that is both _complete_ (full pipeline works) and _differentiated_ (two things nobody else will have thought of, plus one impressive generated artifact).

If you have extra hours: add S.2 (Budget Nudge) — it's a filter + ranked list, very cheap, and adds a third "wait, that's clever" moment.

---

## 7. Supporting Data to Cite in the Pitch

Use these to prove the problem is real and that your design choices are grounded in actual policy, not invented:

- Maharashtra has 35,992 DPIIT-recognized startups (highest of any state, Dec 2025) — out of ~2,07,135 nationally
- Only 2,545 startups nationally have registered on GeM's Startup Runway, supplying ~₹407 crore worth of goods/services — a massive gap relative to Maharashtra's startup base alone
- Public procurement is ~25% of India's GDP — government is the single largest potential buyer for startups
- GFR Rule 173(i) gives DPIIT-recognized startups exemptions on turnover, experience, and EMD — cite this exact rule number in your eligibility/legal module
- GeM product trials run 15 days, service trials 8–16 weeks, requiring ratings from 3+ government buyers — reusable logic for your pilot-duration defaults
- Maharashtra Startup Week gives winning startups direct state work orders up to ₹15 lakh; the MSInS Seed Fund Scheme gives up to ₹10 lakh separately — real numbers to reference for your milestone/payment simulation
- The Maharashtra State Innovative Startup Policy (2018) itself states a dedicated Procurement Policy still needs to be drafted — i.e., the state has admitted in writing that this exact gap exists

**Demo data:** Seed with 15–20 real Maharashtra startup names/sectors from the DPIIT dataset (not Lorem Ipsum), and 3–4 realistic problem statements (stray cattle tracking, irrigation water wastage, e-challan automation).

---

## 8. Suggested Tech Stack

| Layer        | Suggested Tools                                                                                       | Notes                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Frontend     | React + Tailwind CSS                                                                                  | Fast to build, judges respond well to polished dashboards                                             |
| Backend      | Node.js/Express or Python/FastAPI                                                                     | Choose based on team familiarity — speed matters more than "correctness" for a 2-day build            |
| Database     | PostgreSQL (or even a mocked JSON store for pure speed)                                               | Structured data (contracts, milestones) fits relational well, but don't over-engineer for a hackathon |
| AI Layer     | Any LLM API for: problem-statement rewriting, contract red-flag detection, procurement doc generation | Single system prompt per feature is enough — don't build custom ML models                             |
| Hosting/Demo | Vercel/Netlify (frontend) + Render/Railway (backend)                                                  | Fast free-tier deployment for a live demo                                                             |

---

## 9. User Roles

| Role                       | What They Can Do                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Department Official**    | Post problems, review applicants, approve pilots, track milestones, approve payments, hand over to successor officer |
| **Startup**                | Discover problems, apply, track pilot progress, build up Startup Passport score over time                            |
| **Expert Evaluator**       | Score applicants against rubric, flagged for conflicts of interest automatically                                     |
| **Platform Admin (MSInS)** | Oversee SLA escalations, view budget-nudge alerts, cross-department analytics                                        |

---

## 10. Presentation Structure (Suggested Flow for Judges)

1. **Hook (30 sec):** "Government wants innovation. Startups want opportunity. But the system built to buy staplers can't buy ideas — and even when it tries, officer transfers and lapsing budgets quietly kill it before it ever scales."
2. **Problem Explanation (1 min):** Pain points from both sides, using the brief's own language, backed by the 35,992-vs-2,545 startup gap stat.
3. **Solution Overview (1 min):** Walk through the 9-stage pipeline diagram (Section 3).
4. **Live Demo (3–4 min):** One problem statement, full journey — post → match → screen → evaluate → pilot with milestone payment → officer handover triggered mid-demo → validated → auto-generated procurement doc.
5. **The "They Get It" Moment (1 min):** Explicitly call out Officer Transfer Continuity and Startup Passport — name the real-world failure mode each one solves, in one sentence each.
6. **Impact & Scale (30 sec):** How this extends statewide, referencing Maharashtra Startup Week and Seed Fund Scheme integration as future scope.
7. **Close (30 sec):** Return to the one-line pitch.

---

## 11. Key Talking Points to Memorize

- "We didn't just build a portal — we built the full pipeline from problem to scale-up, and we designed for the reasons Indian government pilots actually die: officer transfers and budget cycles, not just bad matching."
- "Every core feature maps directly to a pain point named in the official problem statement. Every differentiator maps to a failure mode we researched, not one we invented."
- "This isn't replacing government procurement — it's a compliant on-ramp into it, citing the exact rules — GFR 173(i) — that already exist on paper but aren't systematized."
- "The Startup Passport means this platform gets more valuable over time — a startup's third pilot is easier to approve than its first, because trust compounds instead of resetting."

---

## 12. Build Checklist

- [ ] Build Tier 1 features first — get the full pipeline click-through working end-to-end
- [ ] Seed real Maharashtra DPIIT startup data + 3–4 realistic problem statements
- [ ] Build Officer Transfer Continuity Engine (S.1)
- [ ] Build Startup Passport (S.3)
- [ ] Build Auto-Generated Procurement Document with rule citations (B.2)
- [ ] If time allows: Budget Use-It-Or-Lose-It Nudge (S.2)
- [ ] Design the Public Status Tracker UI — this will be the most-viewed screen in the demo
- [ ] Rehearse the live demo at least 3 times, timing it to 3–4 minutes
- [ ] Prepare a backup screen-recorded demo video in case of live-demo failure
- [ ] Finalize pitch deck with the data points from Section 7

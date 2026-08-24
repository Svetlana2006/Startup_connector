// Seeded with real Maharashtra DPIIT startups (sector-tagged)
export const STARTUPS = [
  { id: 1, name: "AgriSense Technologies", sector: "AgriTech", tags: ["IoT","Sensors","Water"], founded: 2021, city: "Pune", dpiit: true, passport: 82, desc: "Smart soil & irrigation sensors with real-time water-use analytics.", turnover: "₹42L", experience: "2 yrs" },
  { id: 2, name: "TrackEasy Solutions", sector: "Mobility", tags: ["GPS","Livestock","Safety"], founded: 2020, city: "Nashik", dpiit: true, passport: 74, desc: "GPS-based livestock tracking collars with accident-alert geofencing.", turnover: "₹28L", experience: "3 yrs" },
  { id: 3, name: "CivilTech AI", sector: "GovTech", tags: ["AI","e-Challan","Traffic"], founded: 2022, city: "Mumbai", dpiit: true, passport: 91, desc: "AI-powered e-challan automation and traffic violation detection.", turnover: "₹65L", experience: "2 yrs" },
  { id: 4, name: "AquaFlow Systems", sector: "Water", tags: ["IoT","Water","Monitoring"], founded: 2021, city: "Aurangabad", dpiit: true, passport: 68, desc: "Pipeline leak detection and water wastage monitoring for municipalities.", turnover: "₹19L", experience: "2 yrs" },
  { id: 5, name: "MedRoute Health", sector: "HealthTech", tags: ["Telemedicine","Rural","Health"], founded: 2020, city: "Nagpur", dpiit: true, passport: 77, desc: "Last-mile telemedicine platform for rural primary health centres.", turnover: "₹55L", experience: "3 yrs" },
  { id: 6, name: "GreenWatt Energy", sector: "CleanEnergy", tags: ["Solar","MSME","Energy"], founded: 2022, city: "Kolhapur", dpiit: true, passport: 63, desc: "Rooftop solar micro-grid solutions for MSME clusters.", turnover: "₹33L", experience: "2 yrs" },
  { id: 7, name: "SoilScan Agro", sector: "AgriTech", tags: ["Soil","Testing","AI"], founded: 2021, city: "Amravati", dpiit: true, passport: 79, desc: "AI soil health cards with per-field fertilizer recommendations.", turnover: "₹22L", experience: "2 yrs" },
  { id: 8, name: "SmartWaste Civic", sector: "GovTech", tags: ["Waste","IoT","Civic"], founded: 2020, city: "Pune", dpiit: true, passport: 85, desc: "IoT-enabled waste-bin fill-level monitoring for ULBs.", turnover: "₹48L", experience: "3 yrs" },
  { id: 9, name: "CattleAI India", sector: "Mobility", tags: ["Livestock","AI","Safety"], founded: 2022, city: "Solapur", dpiit: true, passport: 58, desc: "Computer vision system detecting stray cattle on highways at night.", turnover: "₹12L", experience: "1 yr" },
  { id: 10, name: "Jal Drishti", sector: "Water", tags: ["Water","Satellite","Mapping"], founded: 2021, city: "Thane", dpiit: true, passport: 72, desc: "Satellite imagery analytics for irrigation canal breach detection.", turnover: "₹37L", experience: "2 yrs" },
  { id: 11, name: "SafeRoad Analytics", sector: "Mobility", tags: ["Road","Safety","Analytics"], founded: 2020, city: "Mumbai", dpiit: true, passport: 88, desc: "Predictive road-accident hotspot mapping using historical crash data.", turnover: "₹74L", experience: "4 yrs" },
  { id: 12, name: "EduReach Maharashtra", sector: "EdTech", tags: ["Education","Vernacular","Marathi"], founded: 2021, city: "Nagpur", dpiit: true, passport: 66, desc: "Marathi-medium digital classroom platform for ZP schools.", turnover: "₹29L", experience: "2 yrs" },
  { id: 13, name: "HealthSpot Diagnostics", sector: "HealthTech", tags: ["Diagnostics","Rural","AI"], founded: 2022, city: "Jalgaon", dpiit: true, passport: 61, desc: "Portable AI diagnostics kit for sub-district hospitals.", turnover: "₹18L", experience: "2 yrs" },
  { id: 14, name: "TaxEase GovTech", sector: "GovTech", tags: ["Tax","Property","Automation"], founded: 2021, city: "Pune", dpiit: true, passport: 80, desc: "Automated property-tax demand notice generation for Nagar Panchayats.", turnover: "₹41L", experience: "2 yrs" },
  { id: 15, name: "CropWeather AI", sector: "AgriTech", tags: ["Weather","AI","Farmer"], founded: 2020, city: "Latur", dpiit: true, passport: 70, desc: "Hyperlocal crop-advisory weather forecasts pushed via SMS to farmers.", turnover: "₹26L", experience: "3 yrs" },
];

export const PROBLEMS = [
  {
    id: "P-001", status: "Evaluation", sector: "Mobility", dept: "PWD Maharashtra",
    title: "Reduce highway accidents caused by stray cattle",
    outcome: "Reduce stray-cattle-related highway accidents by 40% within 6 months in selected corridors",
    budget: "₹12 lakh", deadline: "2026-10-15", matchedStartups: [2, 9, 11],
    applicants: 4, shortlisted: 2,
    milestones: [
      { id: 1, title: "Pilot deployment (2 corridors)", due: "2026-11-01", status: "pending", payment: "₹4L" },
      { id: 2, title: "Mid-term KPI review (20% reduction)", due: "2026-12-15", status: "pending", payment: "₹4L" },
      { id: 3, title: "Final validation report", due: "2027-01-30", status: "pending", payment: "₹4L" },
    ]
  },
  {
    id: "P-002", status: "Piloting", sector: "Water", dept: "Water Resources Dept",
    title: "Monitor irrigation canal water wastage in real-time",
    outcome: "Detect and alert on 95% of significant leaks within 1 hour of occurrence",
    budget: "₹10 lakh", deadline: "2026-09-30", matchedStartups: [4, 10],
    applicants: 6, shortlisted: 3,
    milestones: [
      { id: 1, title: "Sensor installation (50 km canal)", due: "2026-09-01", status: "done", payment: "₹3.5L" },
      { id: 2, title: "Alert system live, 90% uptime verified", due: "2026-10-15", status: "active", payment: "₹3.5L" },
      { id: 3, title: "End-of-pilot audit & report", due: "2026-11-30", status: "pending", payment: "₹3L" },
    ]
  },
  {
    id: "P-003", status: "Posted", sector: "GovTech", dept: "Transport Dept",
    title: "Automate e-challan issuance using AI cameras",
    outcome: "Issue e-challans with >95% accuracy without manual review for 5 violation types",
    budget: "₹15 lakh", deadline: "2026-11-01", matchedStartups: [3, 11],
    applicants: 0, shortlisted: 0,
    milestones: [
      { id: 1, title: "Camera integration + model deployment", due: "2026-12-01", status: "pending", payment: "₹5L" },
      { id: 2, title: "90-day accuracy audit", due: "2027-02-01", status: "pending", payment: "₹5L" },
      { id: 3, title: "Full rollout clearance", due: "2027-03-15", status: "pending", payment: "₹5L" },
    ]
  },
];

export const PIPELINE_STAGES = ["Posted","Applied","Evaluation","Piloting","Validated","Scaling"];

export const RUBRIC_CRITERIA = [
  { id: "tech", label: "Technical Feasibility", desc: "Can the startup credibly deliver the tech?" },
  { id: "impact", label: "Outcome Alignment", desc: "Does the solution directly address the stated outcome?" },
  { id: "team", label: "Team Capability", desc: "Domain expertise, past experience, advisory support." },
  { id: "cost", label: "Cost Effectiveness", desc: "Is the budget ask proportionate to the scope?" },
  { id: "scale", label: "Scalability Potential", desc: "Can this scale statewide after a successful pilot?" },
];

export const GFR_RULE = "GFR Rule 173(i)";
export const WAIVER_TEXT = "DPIIT-recognized startups are exempt from minimum turnover and prior experience requirements under GFR Rule 173(i). EMD is also waived.";

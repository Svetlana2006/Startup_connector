// packages/data/src/notifications.js

export const SEED_NOTIFICATIONS = [
  {
    id: 1,
    type: 'milestone_due',
    title: 'Milestone Due in 5 Days',
    message: 'Milestone 2 ("Alert System Integration") for Pilot PLT-001 (AquaFlow Systems) is due on Oct 15, 2026.',
    targetRoles: ['department', 'startup'],
    read: false,
    createdAt: '2026-10-10T09:00:00Z',
    link: '/milestones',
    linkedPilotId: 'PLT-001'
  },
  {
    id: 2,
    type: 'evaluation_deadline',
    title: 'Evaluation Pending (Due in 48 hrs)',
    message: 'Expert panel scoring for SafeRoad Analytics (Problem P-001) is pending your review.',
    targetRoles: ['evaluator'],
    read: false,
    createdAt: '2026-10-08T14:30:00Z',
    link: '/evaluation-panel',
    linkedPanelId: 'EVP-002'
  },
  {
    id: 3,
    type: 'milestone_completed',
    title: 'Milestone Approved & Payment Released',
    message: 'Milestone 1 for AquaFlow Systems was approved. Simulated payment of ₹2,50,000 disbursed via GFR Rule 173(i) ledger.',
    targetRoles: ['department', 'startup', 'admin'],
    read: true,
    createdAt: '2026-09-05T11:15:00Z',
    link: '/milestones',
    linkedPilotId: 'PLT-001'
  },
  {
    id: 4,
    type: 'pilot_review',
    title: 'Pilot Mid-Term Review Required',
    message: 'Pilot PLT-001 (Canal Water Wastage) has elapsed 60% of timeline. Please verify updated KPI logs.',
    targetRoles: ['department', 'admin'],
    read: false,
    createdAt: '2026-10-07T08:00:00Z',
    link: '/pilot-sandbox',
    linkedPilotId: 'PLT-001'
  },
  {
    id: 5,
    type: 'evaluation_complete',
    title: 'Expert Consensus Score Ready',
    message: 'All 3 evaluators on Panel EVP-001 (TrackEasy Solutions) submitted scores. Consensus score: 7.4/10.',
    targetRoles: ['department', 'admin'],
    read: true,
    createdAt: '2026-09-22T16:45:00Z',
    link: '/evaluation-panel',
    linkedPanelId: 'EVP-001'
  },
  {
    id: 6,
    type: 'ip_clause_flagged',
    title: 'IP Clause Flagged by Startup',
    message: 'AquaFlow Systems flagged "Derivative Works" clause in Software Pilot Agreement for P-002.',
    targetRoles: ['department'],
    read: false,
    createdAt: '2026-09-18T10:30:00Z',
    link: '/ip-clauses',
    linkedPilotId: 'PLT-001'
  },
  {
    id: 7,
    type: 'milestone_due',
    title: 'Upcoming Pilot Kickoff',
    message: 'Pilot PLT-002 for PWD Maharashtra is scheduled to start deployment on Nov 01, 2026.',
    targetRoles: ['department', 'startup', 'admin'],
    read: false,
    createdAt: '2026-10-15T09:00:00Z',
    link: '/pilot-sandbox',
    linkedPilotId: 'PLT-002'
  },
  {
    id: 8,
    type: 'system',
    title: 'GFR 173(i) Exemption Active',
    message: 'DPIIT startup exemption auto-verified for 15 registered Maharashtra startups in this cycle.',
    targetRoles: ['department', 'startup', 'evaluator', 'admin'],
    read: true,
    createdAt: '2026-09-01T12:00:00Z',
    link: '/eligibility',
    linkedPilotId: null
  }
];


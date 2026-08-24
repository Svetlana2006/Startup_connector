// packages/data/src/evaluationPanels.js

export const EVALUATION_CRITERIA_PANEL = [
  {
    id: 'feasibility',
    name: 'Technical Feasibility',
    description: 'Can the proposed solution be realistically implemented within the specified timeframe and state infrastructure constraints?',
    maxScore: 10
  },
  {
    id: 'innovation',
    name: 'Innovation Quotient',
    description: 'How novel is the approach compared to conventional solutions currently deployed in government workflows?',
    maxScore: 10
  },
  {
    id: 'team',
    name: 'Team Capability & Track Record',
    description: 'Domain expertise, past execution capabilities, and technical depth of core startup engineers.',
    maxScore: 10
  },
  {
    id: 'cost',
    name: 'Cost-Effectiveness & ROI',
    description: 'Value for money — is the budget proportionate to outcomes, with clear OPEX/CAPEX projections?',
    maxScore: 10
  },
  {
    id: 'scalability',
    name: 'Scalability Potential',
    description: 'Can this solution easily scale across all 36 districts of Maharashtra after a successful pilot?',
    maxScore: 10
  },
  {
    id: 'implementation',
    name: 'Implementation & Risk Plan',
    description: 'Clarity of milestones, risk mitigation strategies, and SLA commitments.',
    maxScore: 10
  }
];

export const SEED_EVALUATORS_POOL = [
  { evaluatorId: 'eval-1', name: 'Dr. Anjali Kulkarni', institution: 'IIT Bombay (Computer Science & AI)', email: 'a.kulkarni@iitb.ac.in', expertise: ['AI/ML', 'IoT Systems', 'GovTech'] },
  { evaluatorId: 'eval-2', name: 'Prof. Rakesh Sharma', institution: 'VNIT Nagpur (Civil & Transportation)', email: 'rsharma@vnit.ac.in', expertise: ['Transportation', 'Urban Planning', 'Sensors'] },
  { evaluatorId: 'eval-3', name: 'Dr. Meera Patil', institution: 'COEP Technological University, Pune', email: 'patil.meera@coep.ac.in', expertise: ['Embedded Systems', 'Water Tech', 'Edge Devices'] },
  { evaluatorId: 'eval-4', name: 'Dr. Suresh Joshi', institution: 'IISc Bangalore (Sustainable Tech)', email: 'suresh.j@iisc.ac.in', expertise: ['CleanTech', 'Energy', 'Public Policy'] },
  { evaluatorId: 'eval-5', name: 'Sanjay Deshmukh', institution: 'MSInS Technical Advisory Board', email: 's.deshmukh@msins.gov.in', expertise: ['Procurement Law', 'GFR Compliance', 'SaaS'] }
];

export const SEED_EVALUATION_PANELS = [
  {
    panelId: 'EVP-001',
    problemId: 'P-001',
    problemTitle: 'Reduce highway accidents caused by stray cattle',
    dept: 'PWD Maharashtra',
    startupId: 2,
    startupName: 'TrackEasy Solutions',
    assignedDate: '2026-09-18',
    evaluators: [
      {
        evaluatorId: 'eval-1',
        name: 'Dr. Anjali Kulkarni',
        institution: 'IIT Bombay',
        scores: { feasibility: 8, innovation: 7, team: 8, cost: 7, scalability: 6, implementation: 8 },
        comments: 'Strong GPS collar hardware and geofence triggering. Cattle behavior modeling in night conditions needs fine-tuning.',
        submitted: true,
        submittedDate: '2026-09-20'
      },
      {
        evaluatorId: 'eval-2',
        name: 'Prof. Rakesh Sharma',
        institution: 'VNIT Nagpur',
        scores: { feasibility: 7, innovation: 8, team: 7, cost: 8, scalability: 7, implementation: 7 },
        comments: 'Innovative alert integration with highway patrol. Budget ask of ₹12L is reasonable for 2 high-density corridors.',
        submitted: true,
        submittedDate: '2026-09-21'
      },
      {
        evaluatorId: 'eval-3',
        name: 'Dr. Meera Patil',
        institution: 'COEP Pune',
        scores: { feasibility: 9, innovation: 7, team: 8, cost: 6, scalability: 8, implementation: 7 },
        comments: 'Extremely feasible along Pune-Solapur stretch. Recommending acceptance for pilot sandbox trial.',
        submitted: true,
        submittedDate: '2026-09-22'
      }
    ],
    allSubmitted: true,
    finalScore: 7.4 // Average score out of 10
  },
  {
    panelId: 'EVP-002',
    problemId: 'P-001',
    problemTitle: 'Reduce highway accidents caused by stray cattle',
    dept: 'PWD Maharashtra',
    startupId: 11,
    startupName: 'SafeRoad Analytics',
    assignedDate: '2026-09-21',
    evaluators: [
      {
        evaluatorId: 'eval-1',
        name: 'Dr. Anjali Kulkarni',
        institution: 'IIT Bombay',
        scores: { feasibility: 9, innovation: 9, team: 8, cost: 7, scalability: 9, implementation: 8 },
        comments: 'High-quality predictive crash modeling using multi-year Maharashtra highway police data.',
        submitted: true,
        submittedDate: '2026-09-23'
      },
      {
        evaluatorId: 'eval-2',
        name: 'Prof. Rakesh Sharma',
        institution: 'VNIT Nagpur',
        scores: {},
        comments: '',
        submitted: false,
        submittedDate: null
      },
      {
        evaluatorId: 'eval-4',
        name: 'Dr. Suresh Joshi',
        institution: 'IISc Bangalore',
        scores: {},
        comments: '',
        submitted: false,
        submittedDate: null
      }
    ],
    allSubmitted: false,
    finalScore: null
  }
];


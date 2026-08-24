// packages/data/src/milestoneContracts.js

export const SEED_MILESTONE_CONTRACTS = [
  {
    pilotId: 'PLT-001',
    problemId: 'P-002',
    startupId: 4,
    startupName: 'AquaFlow Systems',
    problemTitle: 'Monitor irrigation canal water wastage in real-time',
    dept: 'Water Resources Dept',
    totalBudget: 1000000, // ₹10 Lakh
    currency: 'INR',
    milestones: [
      {
        id: 1,
        name: 'Sensor Network Deployment',
        description: 'Install IoT sensor nodes across 50 km of irrigation canal in Aurangabad district.',
        dueDate: '2026-09-01',
        amount: 250000,
        percentage: 25,
        status: 'paid',
        deliverableUrl: 'https://govbridge.maharashtra.gov.in/docs/sensor_network_dpr.pdf',
        submittedDate: '2026-08-28',
        approvedDate: '2026-09-03',
        paidDate: '2026-09-05'
      },
      {
        id: 2,
        name: 'Alert System Integration',
        description: 'Integrate real-time leak detection alerts with department SCADA dashboard and SMS gateway.',
        dueDate: '2026-10-15',
        amount: 300000,
        percentage: 30,
        status: 'submitted', // Set to submitted so "Approve & Disburse" is immediately actionable
        deliverableUrl: 'https://govbridge.maharashtra.gov.in/docs/alert_api_spec.pdf',
        submittedDate: '2026-10-10',
        approvedDate: null,
        paidDate: null
      },
      {
        id: 3,
        name: 'Performance Validation',
        description: 'Achieve and verify 95% leak detection accuracy with sub-1 hour response across monitored stretch.',
        dueDate: '2026-11-15',
        amount: 250000,
        percentage: 25,
        status: 'in_progress',
        deliverableUrl: '',
        submittedDate: null,
        approvedDate: null,
        paidDate: null
      },
      {
        id: 4,
        name: 'Final Audit & Handover',
        description: 'Submit independent technical audit report and complete O&M training for department engineers.',
        dueDate: '2026-11-30',
        amount: 200000,
        percentage: 20,
        status: 'pending',
        deliverableUrl: '',
        submittedDate: null,
        approvedDate: null,
        paidDate: null
      }
    ],
    paymentRecords: [
      {
        milestoneId: 1,
        amount: 250000,
        date: '2026-09-05',
        reference: 'GFR/PAY/2026/0891',
        status: 'completed',
        notes: 'Simulated disbursement released under GFR Rule 173(i) pilot allocation'
      }
    ]
  },
  {
    pilotId: 'PLT-002',
    problemId: 'P-001',
    startupId: 2,
    startupName: 'TrackEasy Solutions',
    problemTitle: 'Reduce highway accidents caused by stray cattle',
    dept: 'PWD Maharashtra',
    totalBudget: 1200000, // ₹12 Lakh
    currency: 'INR',
    milestones: [
      {
        id: 1,
        name: 'Pilot Deployment (2 Corridors)',
        description: 'Deploy GPS collars and geofencing beacons on Nashik-Mumbai & Pune-Solapur accident hotspots.',
        dueDate: '2026-11-01',
        amount: 400000,
        percentage: 33.33,
        status: 'submitted', // Ready for review & approval
        deliverableUrl: 'https://govbridge.maharashtra.gov.in/docs/collar_geofence_report.pdf',
        submittedDate: '2026-10-18',
        approvedDate: null,
        paidDate: null
      },
      {
        id: 2,
        name: 'Mid-Term KPI Review',
        description: 'Demonstrate at least 20% accident reduction in designated pilot corridors over 45 days.',
        dueDate: '2026-12-15',
        amount: 400000,
        percentage: 33.33,
        status: 'in_progress',
        deliverableUrl: '',
        submittedDate: null,
        approvedDate: null,
        paidDate: null
      },
      {
        id: 3,
        name: 'Final Validation Report',
        description: 'Submit third-party safety validation, cost-benefit analysis, and state-wide scale proposal.',
        dueDate: '2027-01-30',
        amount: 400000,
        percentage: 33.34,
        status: 'pending',
        deliverableUrl: '',
        submittedDate: null,
        approvedDate: null,
        paidDate: null
      }
    ],
    paymentRecords: []
  }
];

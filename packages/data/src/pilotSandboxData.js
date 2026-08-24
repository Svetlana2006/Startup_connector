// packages/data/src/pilotSandboxData.js

export const SEED_PILOT_TRACKING = [
  {
    pilotId: 'PLT-001',
    problemId: 'P-002',
    startupId: 4,
    startupName: 'AquaFlow Systems',
    problemTitle: 'Monitor irrigation canal water wastage in real-time',
    dept: 'Water Resources Dept',
    pilotType: 'Software',
    startDate: '2026-08-15',
    endDate: '2026-11-30',
    status: 'Piloting',
    budgetAllocated: 1000000,
    kpis: [
      {
        id: 'kpi-1',
        name: 'Canal Leak Detection Accuracy',
        description: 'Percentage of confirmed breaches/leaks identified within target zone',
        target: 95,
        current: 82,
        unit: '%',
        lastUpdated: '2026-09-10'
      },
      {
        id: 'kpi-2',
        name: 'Alert Response Latency',
        description: 'Time taken from leak onset to automated alert trigger at division office',
        target: 60,
        current: 85,
        unit: 'minutes',
        lastUpdated: '2026-09-10',
        inverse: true // lower is better
      },
      {
        id: 'kpi-3',
        name: 'Canal Stretch Sensor Coverage',
        description: 'Active monitored canal length with operational telemetry',
        target: 50,
        current: 38,
        unit: 'km',
        lastUpdated: '2026-09-08'
      },
      {
        id: 'kpi-4',
        name: 'Telemetry System Uptime',
        description: 'Continuous uptime of IoT gateway and telemetry network',
        target: 99,
        current: 97.2,
        unit: '%',
        lastUpdated: '2026-09-12'
      }
    ],
    checkIns: [
      { date: '2026-08-30', title: 'Kickoff Review', reviewer: 'Executive Engineer (Water Dept)', status: 'Approved', notes: 'Sensors deployed in Corridor A (15km). Initial telemetry stable.' },
      { date: '2026-09-15', title: 'Sprint 2 Telemetry Check', reviewer: 'Technical Officer (MSInS)', status: 'Approved', notes: 'Alert gateway tested with simulated breach. Latency is improving.' }
    ]
  },
  {
    pilotId: 'PLT-002',
    problemId: 'P-001',
    startupId: 2,
    startupName: 'TrackEasy Solutions',
    problemTitle: 'Reduce highway accidents caused by stray cattle',
    dept: 'PWD Maharashtra',
    pilotType: 'Hardware',
    startDate: '2026-11-01',
    endDate: '2027-01-30',
    status: 'Piloting',
    budgetAllocated: 1200000,
    kpis: [
      {
        id: 'kpi-1',
        name: 'Accident Frequency Reduction',
        description: 'Decrease in stray cattle collisions along Pune-Solapur & Nashik corridors',
        target: 40,
        current: 12,
        unit: '%',
        lastUpdated: '2026-11-10'
      },
      {
        id: 'kpi-2',
        name: 'Collar Telemetry Active Rate',
        description: 'Operational status of deployed GPS smart tags',
        target: 98,
        current: 95,
        unit: '%',
        lastUpdated: '2026-11-08'
      },
      {
        id: 'kpi-3',
        name: 'Geofence Patrol Alert Precision',
        description: 'True-positive rate of highway patrol hazard dispatch notifications',
        target: 90,
        current: 74,
        unit: '%',
        lastUpdated: '2026-11-12'
      }
    ],
    checkIns: [
      { date: '2026-11-02', title: 'Hardware Deployment Inspection', reviewer: 'Superintending Engineer (PWD Pune)', status: 'Approved', notes: 'First batch of 150 GPS collars tagged.' }
    ]
  }
];


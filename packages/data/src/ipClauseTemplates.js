// packages/data/src/ipClauseTemplates.js

export const IP_CLAUSE_TEMPLATES = [
  // --- SOFTWARE ---
  {
    id: 'clause-sw-01',
    category: 'IP & Source Code',
    title: 'Pre-existing Background IP & Solution Ownership',
    text: 'The Startup retains all exclusive rights, title, and interest in its pre-existing background intellectual property, core software algorithms, and proprietary models utilized during the pilot sandbox.',
    pilotTypes: ['Software', 'Hybrid'],
    mandatory: true,
    recommendation: 'Protects startup core technology from being expropriated under public procurement terms.'
  },
  {
    id: 'clause-sw-02',
    category: 'Licensing',
    title: 'Perpetual Non-Exclusive Government License (State of Maharashtra)',
    text: 'Upon successful pilot completion and validation, the Department is granted a non-exclusive, perpetual, royalty-free license to utilize the customized software deliverables within the jurisdiction of Maharashtra.',
    pilotTypes: ['Software', 'Hybrid'],
    mandatory: true,
    recommendation: 'Ensures state department can continue operations post-pilot without vendor lock-in fees.'
  },
  {
    id: 'clause-sw-03',
    category: 'IP & Source Code',
    title: 'Derivative Works & Bespoke Department Customizations',
    text: 'Any bespoke workflows, schemas, or departmental integrations specifically financed under the pilot fund shall be jointly owned, with the Department retaining unhindered rights for internal government replication.',
    pilotTypes: ['Software', 'Hybrid', 'Data-Sharing'],
    mandatory: false,
    recommendation: 'Distinguishes between standard vendor codebase and specific state-funded adaptations.'
  },
  {
    id: 'clause-sw-04',
    category: 'Licensing',
    title: 'API Access & Interoperability Guarantees',
    text: 'The Startup shall provide open, documented REST/gRPC APIs ensuring seamless bidirectional interoperability with MahaGov State Data Centre (SDC) and DigiLocker systems.',
    pilotTypes: ['Software', 'Hybrid', 'Data-Sharing'],
    mandatory: true,
    recommendation: 'Standard requirement for e-Governance compliance in Maharashtra.'
  },

  // --- HARDWARE ---
  {
    id: 'clause-hw-01',
    category: 'IP & Patent Rights',
    title: 'Hardware Schematic & Firmware IP Retained by Startup',
    text: 'All patents, PCB layouts, firmware binaries, and industrial tooling blueprints developed prior to or during the pilot remain the sole intellectual property of the Startup.',
    pilotTypes: ['Hardware', 'Hybrid'],
    mandatory: true,
    recommendation: 'Crucial for hardware tech startups manufacturing sensors and IoT controllers.'
  },
  {
    id: 'clause-hw-02',
    category: 'Maintenance & Warranty',
    title: 'Sandbox Field Maintenance & Defect Rectification SLA',
    text: 'The Startup guarantees 48-hour physical on-site rectification for any hardware controller, sensor node, or telemetry beacon failures throughout the pilot duration.',
    pilotTypes: ['Hardware', 'Hybrid'],
    mandatory: true,
    recommendation: 'Guarantees uptime during field testing on public infrastructure.'
  },
  {
    id: 'clause-hw-03',
    category: 'IP & Patent Rights',
    title: 'Government Reproduction & Manufacturing Rights Exclusion',
    text: 'Procurement of pilot hardware does not confer manufacturing or reverse-engineering rights to the Department or any affiliated state PSUs.',
    pilotTypes: ['Hardware', 'Hybrid'],
    mandatory: false,
    recommendation: 'Prevents unauthorized cloning of IoT sensors by third-party contractors.'
  },

  // --- DATA SHARING ---
  {
    id: 'clause-data-01',
    category: 'Data Ownership',
    title: 'State Data Sovereignty & Sole Ownership',
    text: 'All raw, processed, telemetry, and citizen-identifiable data generated during the pilot execution is the sole and exclusive property of the Government of Maharashtra.',
    pilotTypes: ['Software', 'Hardware', 'Data-Sharing', 'Hybrid'],
    mandatory: true,
    recommendation: 'Strict compliance with the Digital Personal Data Protection (DPDP) Act 2023.'
  },
  {
    id: 'clause-data-02',
    category: 'Data Security',
    title: 'Mandatory Anonymization for ML Model Training',
    text: 'The Startup may use anonymized, aggregated telemetry metadata solely for retraining internal algorithms, subject to written sign-off from the Department Data Protection Officer.',
    pilotTypes: ['Software', 'Data-Sharing', 'Hybrid'],
    mandatory: false,
    recommendation: 'Permits startup model improvement while strictly safeguarding sensitive state telemetry.'
  },
  {
    id: 'clause-data-03',
    category: 'Data Security',
    title: 'Data Retention, Purging, and Sandbox Exit Protocol',
    text: 'Within 30 calendar days of pilot completion or termination, the Startup shall deliver a complete cryptographic dump of all state data and securely purge all transient caches.',
    pilotTypes: ['Software', 'Hardware', 'Data-Sharing', 'Hybrid'],
    mandatory: true,
    recommendation: 'Standard government offboarding security protocol.'
  },

  // --- UNIVERSAL / CONFIDENTIALITY ---
  {
    id: 'clause-gen-01',
    category: 'Confidentiality',
    title: 'Mutual Non-Disclosure & Sensitive State Infrastructure Shield',
    text: 'Both parties agree to treat all architectural diagrams, SCADA topology, vulnerability assessments, and procurement pricing details as strictly confidential for a period of 5 years.',
    pilotTypes: ['Software', 'Hardware', 'Data-Sharing', 'Hybrid'],
    mandatory: true,
    recommendation: 'Protects critical state infrastructure and vendor trade secrets.'
  },
  {
    id: 'clause-gen-02',
    category: 'Audit & Compliance',
    title: 'Right to Independent Technical & CAG Audit',
    text: 'The Department and authorized state auditors (including CAG/MSInS) reserve the right to inspect pilot logs, test benchmarks, and compliance evidence upon 3 business days notice.',
    pilotTypes: ['Software', 'Hardware', 'Data-Sharing', 'Hybrid'],
    mandatory: true,
    recommendation: 'Mandated under GFR 2017 public audit rules.'
  }
];

export const SEED_IP_SELECTIONS = [
  {
    pilotId: 'PLT-001',
    pilotType: 'Software',
    finalized: false,
    clauses: [
      { clauseId: 'clause-sw-01', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-sw-02', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-sw-03', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-sw-04', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-data-01', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-data-02', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-data-03', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-gen-01', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' },
      { clauseId: 'clause-gen-02', departmentStatus: 'pending', startupStatus: 'pending', flagNote: '' }
    ]
  }
];


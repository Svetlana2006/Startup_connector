import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const STATS = [
  { label: 'Active Problem Statements', value: '3', icon: 'edit_document', color: 'text-primary', bg: 'bg-primary-container' },
  { label: 'Startups Shortlisted', value: '12', icon: 'rocket_launch', color: 'text-secondary', bg: 'bg-secondary-container' },
  { label: 'Pending Evaluations', value: '5', icon: 'rate_review', color: 'text-tertiary', bg: 'bg-tertiary-container' },
  { label: 'Active Pilots', value: '2', icon: 'analytics', color: 'text-success', bg: 'bg-success-container' },
]

const PROBLEMS = [
  { id: 'P-001', title: 'Reduce highway accidents caused by stray cattle', stage: 'Evaluation', updated: 'Oct 20, 2026', applicant: 'TrackEasy Solutions' },
  { id: 'P-002', title: 'Monitor irrigation canal water wastage in real-time', stage: 'Piloting', updated: 'Oct 24, 2026', applicant: 'AquaFlow Systems' },
  { id: 'P-003', title: 'Automate e-challan issuance using AI cameras', stage: 'Posted', updated: 'Oct 28, 2026', applicant: 'CivilTech AI' },
]

const STAGE_COLORS = {
  'Posted': 'bg-surface-container text-on-surface-variant border border-outline-variant',
  'Evaluation': 'bg-warning-container text-on-warning-container',
  'Piloting': 'bg-success-container text-on-success-container',
}

export default function DepartmentDashboard({ user, onLogout }) {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <SideNav activeHref="/department" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          <div className="mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-primary">Department Dashboard</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">Welcome, {user?.name || 'Official'} · {user?.dept || 'PWD Maharashtra'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">
            {STATS.map(s => (
              <div key={s.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md flex flex-col gap-sm">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${s.color} fill-icon`}>{s.icon}</span>
                </div>
                <p className="text-display-lg font-display-lg text-on-surface leading-none">{s.value}</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tier 2 Core Modules Grid */}
          <div className="mb-lg">
            <h2 className="text-headline-md font-bold text-primary mb-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">tune</span>
              Procurement & Sandbox Operations (Tier 2 Modules)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <Link
                to="/milestones"
                className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">2.1 Workflow</span>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                  <h3 className="font-bold text-label-md text-on-surface">Milestone Contracting</h3>
                  <p className="text-[12px] text-on-surface-variant mt-1">Jointly define deliverables, review submissions & release simulated payments.</p>
                </div>
                <span className="text-[11px] text-success font-bold mt-3">2 Active Contracts →</span>
              </Link>

              <Link
                to="/evaluation-panel"
                className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">2.2 Panel</span>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                  <h3 className="font-bold text-label-md text-on-surface">Expert Evaluation Panel</h3>
                  <p className="text-[12px] text-on-surface-variant mt-1">Independent blind scoring rubric with consensus auto-aggregation.</p>
                </div>
                <span className="text-[11px] text-warning font-bold mt-3">1 Panel Awaiting Score →</span>
              </Link>

              <Link
                to="/pilot-sandbox"
                className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">2.3 Sandbox</span>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                  <h3 className="font-bold text-label-md text-on-surface">Sandbox & KPI Tracker</h3>
                  <p className="text-[12px] text-on-surface-variant mt-1">Live timeline progress, budget burn rate & telemetry KPI monitors.</p>
                </div>
                <span className="text-[11px] text-primary font-bold mt-3">Inspect P-002 Telemetry →</span>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-md mb-lg flex-wrap">
            <Link to="/problem-builder" className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span> New Problem Statement
            </Link>
            <Link to="/discover" className="bg-secondary text-on-secondary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">search</span> Discover Startups
            </Link>
            <Link to="/ip-clauses" className="border border-primary text-primary font-label-md text-label-md px-md py-sm rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">shield</span> IP Clause Generator (2.4)
            </Link>
            <Link to="/notifications" className="border border-outline text-on-surface font-label-md text-label-md px-md py-sm rounded-lg hover:bg-surface-container flex items-center gap-sm transition-colors">
              <span className="material-symbols-outlined text-[18px]">notifications</span> Alert Center (2.5)
            </Link>
          </div>

          {/* Problem Statements Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-md border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-headline-md font-headline-md text-primary">Department Challenges & Pipelines</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-label-md font-label-md text-on-surface-variant border-b border-outline-variant">
                  <th className="p-md font-semibold">ID</th>
                  <th className="p-md font-semibold">Problem Title</th>
                  <th className="p-md font-semibold">Matched Vendor</th>
                  <th className="p-md font-semibold">Stage</th>
                  <th className="p-md font-semibold">Last Updated</th>
                  <th className="p-md font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md">
                {PROBLEMS.map(p => (
                  <tr key={p.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="p-md font-mono text-label-md text-primary font-bold">{p.id}</td>
                    <td className="p-md text-on-surface font-medium">{p.title}</td>
                    <td className="p-md text-label-sm font-bold text-on-surface">{p.applicant}</td>
                    <td className="p-md">
                      <span className={`px-sm py-xs rounded-full text-label-sm font-label-sm font-bold ${STAGE_COLORS[p.stage]}`}>{p.stage}</span>
                    </td>
                    <td className="p-md text-on-surface-variant text-label-sm font-label-sm">{p.updated}</td>
                    <td className="p-md">
                      <div className="flex items-center gap-2 text-label-sm font-bold">
                        {p.stage === 'Piloting' ? (
                          <Link to="/pilot-sandbox" className="text-primary hover:underline">Track Sandbox →</Link>
                        ) : p.stage === 'Evaluation' ? (
                          <Link to="/evaluation-panel" className="text-primary hover:underline">Review Scores →</Link>
                        ) : (
                          <Link to="/discover" className="text-primary hover:underline">Match Startups →</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  )
}

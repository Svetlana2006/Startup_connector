import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const STATS = [
  { label: 'Active Problem Statements', value: '3', icon: 'edit_document', color: 'text-primary', bg: 'bg-primary-container' },
  { label: 'Startups Shortlisted', value: '12', icon: 'rocket_launch', color: 'text-secondary', bg: 'bg-secondary-container' },
  { label: 'Pending Evaluations', value: '5', icon: 'rate_review', color: 'text-tertiary', bg: 'bg-tertiary-container' },
  { label: 'Active Pilots', value: '2', icon: 'analytics', color: 'text-success', bg: 'bg-success-container' },
]

const PROBLEMS = [
  { id: 'PS-2024-04', title: 'Rural Healthcare Data Delivery', stage: 'Evaluation', updated: 'Oct 20, 2024' },
  { id: 'PS-2024-07', title: 'Traffic Signal AI Optimization', stage: 'Piloting', updated: 'Oct 24, 2024' },
  { id: 'PS-2024-11', title: 'Waste Water Detection Sensors', stage: 'Posted', updated: 'Oct 28, 2024' },
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
            <p className="text-body-md font-body-md text-on-surface-variant">Welcome, {user?.name || 'Official'} · {user?.dept}</p>
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

          {/* Quick Actions */}
          <div className="flex gap-md mb-lg flex-wrap">
            <Link to="/problem-builder" className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span> New Problem Statement
            </Link>
            <Link to="/discover" className="bg-secondary text-on-secondary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">search</span> Discover Startups
            </Link>
            <Link to="/tracker" className="border border-primary text-primary font-label-md text-label-md px-md py-sm rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">analytics</span> Public Tracker
            </Link>
          </div>

          {/* Problem Statements Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-md border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-headline-md font-headline-md text-primary">My Problem Statements</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-label-md font-label-md text-on-surface-variant border-b border-outline-variant">
                  <th className="p-md font-semibold">ID</th>
                  <th className="p-md font-semibold">Problem Title</th>
                  <th className="p-md font-semibold">Stage</th>
                  <th className="p-md font-semibold">Last Updated</th>
                  <th className="p-md font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md">
                {PROBLEMS.map(p => (
                  <tr key={p.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="p-md font-mono text-label-md text-on-surface-variant">{p.id}</td>
                    <td className="p-md text-on-surface font-medium">{p.title}</td>
                    <td className="p-md">
                      <span className={`px-sm py-xs rounded-full text-label-sm font-label-sm font-bold ${STAGE_COLORS[p.stage]}`}>{p.stage}</span>
                    </td>
                    <td className="p-md text-on-surface-variant text-label-sm font-label-sm">{p.updated}</td>
                    <td className="p-md">
                      <Link to="/discover" className="text-primary hover:underline text-label-md font-label-md">View →</Link>
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

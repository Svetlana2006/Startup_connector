import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const PLATFORM_STATS = [
  { label: 'Total Startups', value: '35,992', sub: 'DPIIT-registered Maharashtra', icon: 'rocket_launch', bg: 'bg-primary-container', color: 'text-on-primary-container' },
  { label: 'Active Pilots', value: '12', sub: '3 in final milestone', icon: 'analytics', bg: 'bg-success-container', color: 'text-success' },
  { label: 'SLA Breaches', value: '2', sub: 'Require immediate action', icon: 'warning', bg: 'bg-error-container', color: 'text-error' },
  { label: 'Budget Utilized', value: '₹4.2Cr', sub: 'of ₹12Cr allocated', icon: 'payments', bg: 'bg-secondary-container', color: 'text-on-secondary-container' },
]

const SLA_ALERTS = [
  { dept: 'Dept. of Transport', ps: 'PS-2024-07', days: 5, stage: 'Evaluation' },
  { dept: 'Dept. of Health', ps: 'PS-2024-04', days: 2, stage: 'Approval' },
]

export default function AdminDashboard({ user, onLogout }) {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <SideNav activeHref="/admin" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          <div className="mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-primary">Platform Admin Console</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">System-wide health · Maharashtra State Innovation Society</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-lg">
            {PLATFORM_STATS.map(s => (
              <div key={s.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-sm">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${s.color} fill-icon`}>{s.icon}</span>
                </div>
                <p className="text-display-lg font-display-lg text-on-surface leading-none">{s.value}</p>
                <p className="text-label-md font-label-md text-on-surface">{s.label}</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* SLA Alerts */}
          <div className="bg-error-container border border-error/20 rounded-xl p-md mb-lg">
            <h2 className="text-headline-md font-headline-md text-error flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined fill-icon">warning</span> SLA Breach Alerts
            </h2>
            <div className="space-y-sm">
              {SLA_ALERTS.map(a => (
                <div key={a.ps} className="bg-surface-container-lowest rounded-lg p-md flex justify-between items-center border border-outline-variant">
                  <div>
                    <p className="text-label-md font-label-md font-bold text-on-surface">{a.dept} · {a.ps}</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Stuck at {a.stage} for {a.days} days past deadline</p>
                  </div>
                  <button className="bg-error text-on-error text-label-sm font-label-sm px-md py-xs rounded hover:opacity-90 transition-opacity">
                    Escalate
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex gap-md flex-wrap">
            <Link to="/discover" className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 flex items-center gap-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">search</span> Startup Registry
            </Link>
            <Link to="/evaluate" className="border border-primary text-primary font-label-md text-label-md px-md py-sm rounded-lg hover:bg-primary-fixed flex items-center gap-sm transition-colors">
              <span className="material-symbols-outlined text-[18px]">rate_review</span> Evaluation Queue
            </Link>
            <Link to="/tracker" className="border border-outline text-on-surface font-label-md text-label-md px-md py-sm rounded-lg hover:bg-surface-container flex items-center gap-sm transition-colors">
              <span className="material-symbols-outlined text-[18px]">analytics</span> Public Tracker
            </Link>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  )
}

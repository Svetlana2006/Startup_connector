import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

export default function StartupDashboard({ user, onLogout }) {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <SideNav activeHref="/startup" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          <div className="mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-primary">Startup Dashboard</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">Welcome, {user?.name || 'Rohan Mehta'} · {user?.company || 'TrackEasy Solutions'}</p>
          </div>
          {/* Passport Score Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
            <div className="bg-primary-container text-on-primary-container rounded-xl p-lg col-span-1 flex flex-col gap-sm shadow-sm">
              <span className="text-label-sm font-label-sm uppercase tracking-wider opacity-70">Startup Passport Score</span>
              <span className="text-display-lg font-display-lg leading-none">850</span>
              <span className="text-label-sm font-label-sm opacity-80">Top 12% of DPIIT startups</span>
              <div className="w-full bg-on-primary-container/20 rounded-full h-2 mt-sm">
                <div className="bg-on-primary-container h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm shadow-sm">
              <div className="w-10 h-10 bg-success-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-success fill-icon">verified</span>
              </div>
              <p className="text-display-lg font-display-lg text-on-surface leading-none">3</p>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Active Applications</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm shadow-sm">
              <div className="w-10 h-10 bg-warning-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-warning fill-icon">pending_actions</span>
              </div>
              <p className="text-display-lg font-display-lg text-on-surface leading-none">1</p>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Active Pilot Sandbox</p>
            </div>
          </div>

          {/* Tier 2 Quick Workflows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
            <Link to="/milestones" className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Feature 2.1</span>
                <h3 className="font-bold text-label-md text-on-surface mt-2">Submit Milestone Deliverables</h3>
                <p className="text-[12px] text-on-surface-variant mt-1">Upload technical DPRs & trigger escrow milestone payments.</p>
              </div>
              <span className="text-primary font-bold text-[12px] mt-3">Open Milestones →</span>
            </Link>

            <Link to="/ip-clauses" className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">Feature 2.4</span>
                <h3 className="font-bold text-label-md text-on-surface mt-2">Review IP & Data Clauses</h3>
                <p className="text-[12px] text-on-surface-variant mt-1">Verify background IP ownership and state data sovereignty terms.</p>
              </div>
              <span className="text-secondary font-bold text-[12px] mt-3">Review IP Terms →</span>
            </Link>

            <Link to="/pilot-sandbox" className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-success bg-success/10 px-2 py-0.5 rounded">Feature 2.3</span>
                <h3 className="font-bold text-label-md text-on-surface mt-2">Live Sandbox Telemetry</h3>
                <p className="text-[12px] text-on-surface-variant mt-1">View real-time canal/traffic metrics & burn rate.</p>
              </div>
              <span className="text-success font-bold text-[12px] mt-3">View Sandbox →</span>
            </Link>
          </div>

          {/* GFR Waiver Banner */}
          <div className="bg-success-container border border-[#bbf7d0] rounded-lg p-md flex items-center gap-md mb-lg">
            <span className="material-symbols-outlined text-success fill-icon">gavel</span>
            <div>
              <p className="text-label-md font-label-md font-bold text-on-success-container">You are DPIIT-recognized</p>
              <p className="text-label-sm font-label-sm text-on-success-container">Turnover, EMD, and prior experience requirements are <strong>waived under GFR Rule 173(i)</strong> for all your applications.</p>
            </div>
          </div>

          <div className="flex gap-md flex-wrap">
            <Link to="/discover" className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">search</span> Browse Opportunities
            </Link>
            <Link to="/tracker" className="border border-primary text-primary font-label-md text-label-md px-md py-sm rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">analytics</span> Track My Applications
            </Link>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  )
}

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
            <p className="text-body-md font-body-md text-on-surface-variant">Welcome, {user?.name} · {user?.company}</p>
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
              <p className="text-label-sm font-label-sm text-on-surface-variant">Active Pilot</p>
            </div>
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

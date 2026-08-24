import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '@govbridge/data'

export function SideNav({ activeHref }) {
  const location = useLocation()
  return (
    <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 pt-20 pb-md overflow-y-auto w-64 border-r border-outline-variant bg-surface-container-low z-40">
      <div className="px-md mb-lg">
        <h1 className="text-label-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">assured_workload</span>
          GovBridge Hub
        </h1>
        <p className="text-label-sm text-on-surface-variant mt-xs">MSInS Public Procurement</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-2">
        <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">
          Core Workflows
        </div>
        {NAV_LINKS.map((l, i) => {
          const isActive = activeHref === l.href || (activeHref === undefined && location.pathname === l.href)
          return (
            <Link
              key={i}
              to={l.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-label-md font-label-md ${
                isActive
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-icon' : ''}`}>{l.icon}</span>
              <span className="truncate">{l.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto border-t border-outline-variant p-3 space-y-1">
        <div className="bg-primary/5 p-2 rounded-lg border border-primary/10 mb-2">
          <p className="text-[11px] font-bold text-primary">GFR Rule 173(i) Compliant</p>
          <p className="text-[10px] text-on-surface-variant">Turnover & EMD exemptions active</p>
        </div>
        <Link to="/tracker" className="flex items-center gap-2 px-3 py-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-label-sm font-label-sm">
          <span className="material-symbols-outlined text-[16px]">public</span> Public Transparency
        </Link>
      </div>
    </aside>
  )
}

export function TopNav({ user, onLogout, unreadCount = 4 }) {
  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-lg py-sm w-full sticky top-0 z-50">
      <div className="flex items-center gap-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
            GB
          </div>
          <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">MSInS Procurement Portal</span>
        </Link>
        <span className="hidden lg:inline-flex items-center gap-1 text-[11px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded-full border border-secondary/20">
          <span className="material-symbols-outlined text-[14px] fill-icon">verified</span> Govt of Maharashtra
        </span>
      </div>
      <div className="flex items-center gap-lg">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-label-sm font-bold text-on-surface">{user?.name || 'Department Official'}</span>
          <span className="text-[11px] text-on-surface-variant uppercase tracking-wider">
            {user?.role === 'department' ? 'Dept. Official' : user?.role === 'startup' ? 'Startup Provider' : user?.role === 'evaluator' ? 'Expert Evaluator' : 'Platform Admin'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <Link
            to="/notifications"
            className="relative p-2 hover:bg-surface-container-low rounded-full transition-colors flex items-center justify-center text-primary"
            title="Notifications & Alerts (2.5)"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
          <div
            className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm ml-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onLogout}
            title="Sign out"
          >
            {user?.name?.[0] || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}

export function AppFooter() {
  return (
    <footer className="bg-surface-container-highest flex flex-col md:flex-row justify-between items-center px-xl py-md w-full mt-auto border-t border-outline-variant">
      <div className="text-label-sm font-bold mb-sm md:mb-0 text-on-surface">
        © 2026 Maharashtra State Innovation Society (MSInS) · SIH 2026 Problem SIH26136
      </div>
      <div className="flex flex-wrap gap-md justify-center">
        <span className="text-label-sm text-on-surface-variant">DPIIT Exemption Active</span>
        <span className="text-label-sm text-outline">|</span>
        <span className="text-label-sm text-on-surface-variant">GFR Rule 173(i)</span>
        <span className="text-label-sm text-outline">|</span>
        <span className="text-label-sm text-on-surface-variant">Gov of Maharashtra</span>
      </div>
    </footer>
  )
}

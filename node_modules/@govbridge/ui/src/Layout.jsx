import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '@govbridge/data'

export function SideNav({ activeHref }) {
  const location = useLocation()
  return (
    <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 pt-20 pb-md overflow-y-auto w-64 border-r border-outline-variant bg-surface-container-low z-40">
      <div className="px-md mb-lg">
        <h1 className="text-label-md font-bold text-primary">Procurement Hub</h1>
        <p className="text-label-sm text-on-surface-variant mt-xs">Workflow Management</p>
      </div>
      <button className="mx-md mb-lg bg-secondary text-on-secondary py-sm px-md rounded font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-sm">
        <span className="material-symbols-outlined text-sm">add</span> New Application
      </button>
      <nav className="flex-1 flex flex-col gap-unit">
        {NAV_LINKS.map((l, i) => {
          const isActive = activeHref === l.href || (activeHref === undefined && location.pathname === l.href)
          return (
            <Link
              key={i}
              to={l.href}
              className={`flex items-center gap-md p-md mb-xs mx-2 rounded-lg transition-all text-label-md font-label-md ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined${isActive ? ' fill-icon' : ''}`}>{l.icon}</span>
              {l.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto border-t border-outline-variant pt-sm">
        <a href="#" className="flex items-center gap-md p-md mb-xs mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-label-md font-label-md">
          <span className="material-symbols-outlined">help</span> Help Center
        </a>
        <a href="#" className="flex items-center gap-md p-md mb-xs mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-label-md font-label-md">
          <span className="material-symbols-outlined">description</span> Policy Docs
        </a>
      </div>
    </aside>
  )
}

export function TopNav({ user, onLogout }) {
  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-lg py-sm w-full sticky top-0 z-50">
      <div className="flex items-center gap-md">
        <span className="text-headline-md font-headline-md font-bold text-primary">MSInS Procurement Portal</span>
      </div>
      <div className="flex items-center gap-lg">
        <div className="hidden md:flex gap-md text-label-md font-label-md">
          <span className="text-on-surface-variant">Role: {user?.role === 'department' ? 'Dept. Official' : user?.role === 'startup' ? 'Startup' : user?.role === 'evaluator' ? 'Evaluator' : 'Admin'}</span>
        </div>
        <div className="flex items-center gap-sm text-primary">
          <span className="material-symbols-outlined p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer">notifications</span>
          <span className="material-symbols-outlined p-2 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer">settings</span>
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm ml-2 cursor-pointer" onClick={onLogout} title="Sign out">
            {user?.name?.[0] || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}

export function AppFooter() {
  return (
    <footer className="bg-surface-container-highest flex flex-col md:flex-row justify-between items-center px-xl py-lg w-full mt-auto border-t border-outline-variant">
      <div className="text-label-md font-bold mb-md md:mb-0 text-on-surface">
        © 2024 Maharashtra State Innovation Society (MSInS). All rights reserved.
      </div>
      <div className="flex flex-wrap gap-lg justify-center">
        <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">DPIIT</a>
        <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">GFR 173(i) Policy</a>
        <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Accessibility</a>
        <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
      </div>
    </footer>
  )
}

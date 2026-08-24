// 1.1 — Role-based Landing (portal_entry_role_selection)
const ROLES = [
  {
    role: 'department', icon: 'account_balance', name: 'Department Official',
    desc: 'Post problem statements, evaluate proposals, and manage pilot projects securely.',
    borderHover: 'hover:border-primary', textColor: 'text-primary',
    bg: 'bg-primary-container', iconColor: 'text-on-primary-container',
    orb: 'bg-primary-fixed-dim/20',
  },
  {
    role: 'startup', icon: 'rocket_launch', name: 'Startup Provider',
    desc: 'Discover government opportunities, submit bids, and track your Startup Passport.',
    borderHover: 'hover:border-secondary', textColor: 'text-secondary',
    bg: 'bg-secondary-container', iconColor: 'text-on-secondary-container',
    orb: 'bg-secondary-fixed/30',
  },
  {
    role: 'evaluator', icon: 'fact_check', name: 'Expert Evaluator',
    desc: 'Provide rubric-based scoring and technical assessments for incoming proposals.',
    borderHover: 'hover:border-tertiary', textColor: 'text-tertiary',
    bg: 'bg-tertiary-container', iconColor: 'text-on-tertiary-container',
    orb: 'bg-tertiary-fixed/40',
  },
  {
    role: 'admin', icon: 'admin_panel_settings', name: 'Platform Admin',
    desc: 'Monitor system SLAs, manage users, and review platform-wide analytics.',
    borderHover: 'hover:border-outline', textColor: 'text-on-surface-variant',
    bg: 'bg-surface-variant', iconColor: 'text-on-surface-variant',
    orb: 'bg-surface-container-high',
  },
]

const USERS = {
  department: { name: 'Priya Desai', dept: 'PWD Maharashtra' },
  startup: { name: 'Rohan Mehta', company: 'TrackEasy Solutions' },
  evaluator: { name: 'Dr. Anjali Kulkarni', institution: 'IIT Bombay' },
  admin: { name: 'MSInS Desk', dept: 'Maharashtra State Innovation Society' },
}

export default function LoginPage({ onLogin }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md antialiased selection:bg-primary selection:text-on-primary">
      {/* TopNav */}
      <header className="bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-lg py-sm w-full sticky top-0 z-50">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary-container fill-icon">assured_workload</span>
          </div>
          <h1 className="text-headline-md font-headline-md font-bold text-primary tracking-tight">MSInS Procurement Portal</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-md md:px-lg py-xl">
        {/* Hero */}
        <section className="mb-xl relative rounded-xl overflow-hidden hero-pattern border border-outline-variant bg-surface-container-lowest">
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/90 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/5 p-lg md:p-xl flex flex-col gap-lg">
              <div className="inline-flex items-center gap-sm bg-primary-container/10 px-sm py-xs rounded-full self-start border border-primary/20">
                <span className="material-symbols-outlined text-primary text-sm fill-icon">verified</span>
                <span className="font-label-md text-label-md text-primary font-semibold">Maharashtra State Innovation Society</span>
              </div>
              <h2 className="text-display-lg font-display-lg text-primary text-headline-lg-mobile md:text-display-lg leading-tight">
                Bridging the gap between government problems and{' '}
                <span className="text-secondary">startup solutions</span>.
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                A secure, role-based platform designed to streamline public procurement under GFR Rule 173(i). Select your designated role below to securely access your workspace.
              </p>
            </div>
            <div className="w-full md:w-2/5 p-lg hidden md:block">
              <div className="w-full aspect-[4/3] rounded-lg border border-outline-variant bg-gradient-to-br from-primary-fixed via-surface-container to-secondary-fixed flex items-center justify-center">
                <div className="text-center">
                  <span className="material-symbols-outlined text-primary fill-icon" style={{ fontSize: 80 }}>assured_workload</span>
                  <p className="text-label-md font-bold text-primary mt-2">GFR Rule 173(i)</p>
                  <p className="text-label-sm text-on-surface-variant">Compliant Procurement</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles grid */}
        <section className="mb-xl">
          <div className="flex items-center justify-between mb-lg border-b border-outline-variant pb-sm">
            <h3 className="text-headline-md font-headline-md text-primary">Select Your Role</h3>
            <span className="text-label-md font-label-md text-on-surface-variant">Secure Entry Point</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {ROLES.map(r => (
              <button
                key={r.role}
                onClick={() => onLogin({ role: r.role, ...USERS[r.role] })}
                className={`group text-left bg-surface-container-lowest rounded-xl border border-outline-variant p-lg card-shadow card-hover-shadow transition-all duration-300 relative overflow-hidden flex flex-col h-full ${r.borderHover}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${r.orb} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />
                <div className={`w-12 h-12 ${r.bg} rounded-lg flex items-center justify-center mb-md shrink-0 relative z-10`}>
                  <span className={`material-symbols-outlined ${r.iconColor} text-2xl fill-icon`}>{r.icon}</span>
                </div>
                <h4 className={`text-headline-md font-headline-md ${r.textColor} mb-sm relative z-10 text-xl`}>{r.name}</h4>
                <p className="text-body-md font-body-md text-on-surface-variant mb-lg flex-grow relative z-10">{r.desc}</p>
                <div className={`flex items-center ${r.textColor} font-label-md text-label-md group-hover:gap-2 transition-all mt-auto relative z-10 font-bold`}>
                  <span>Access Portal</span>
                  <span className="material-symbols-outlined text-sm ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  )
}

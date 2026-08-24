import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const PENDING = [
  { id: 'EVP-002', title: 'Reduce highway accidents caused by stray cattle', company: 'SafeRoad Analytics', due: 'In 48 Hours', stage: 'Blind Review' },
  { id: 'EVP-001', title: 'Reduce highway accidents caused by stray cattle', company: 'TrackEasy Solutions', due: 'Completed', stage: 'Consensus 7.4/10' },
]

export default function EvaluatorDashboard({ user, onLogout }) {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <SideNav activeHref="/evaluation-panel" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          <div className="mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-primary">Evaluator Workspace</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">Welcome, {user?.name || 'Dr. Anjali Kulkarni'} · {user?.institution || 'IIT Bombay'}</p>
          </div>

          <div className="grid grid-cols-3 gap-gutter mb-lg">
            {[['Pending Review Panels','1','pending_actions','bg-warning-container','text-warning'],
              ['Completed Panels','3','task_alt','bg-success-container','text-success'],
              ['Average Score Given','7.8 / 10','leaderboard','bg-primary-container','text-on-primary-container']].map(([l,v,i,bg,tc]) => (
              <div key={l} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-sm">
                <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${tc} fill-icon`}>{i}</span>
                </div>
                <p className="text-display-lg font-display-lg text-on-surface leading-none">{v}</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">{l}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-lg">
            <div className="p-md border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-headline-md font-headline-md text-primary">Assigned Evaluation Panels (Feature 2.2)</h2>
              <span className="text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded">
                Blind Scoring Active
              </span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-label-md font-label-md text-on-surface-variant border-b border-outline-variant">
                  <th className="p-md font-semibold">Panel ID</th>
                  <th className="p-md font-semibold">Problem Challenge</th>
                  <th className="p-md font-semibold">Startup Vendor</th>
                  <th className="p-md font-semibold">Status / Deadline</th>
                  <th className="p-md font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {PENDING.map(p => (
                  <tr key={p.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="p-md font-mono text-label-md text-primary font-bold">{p.id}</td>
                    <td className="p-md text-on-surface font-medium">{p.title}</td>
                    <td className="p-md text-on-surface font-bold">{p.company}</td>
                    <td className="p-md">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        p.due === 'Completed' ? 'bg-success-container text-on-success-container' : 'bg-warning-container text-on-warning-container'
                      }`}>
                        {p.stage}
                      </span>
                    </td>
                    <td className="p-md text-right">
                      <Link to="/evaluation-panel" className="bg-primary text-on-primary text-label-md font-bold px-md py-1.5 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">rate_review</span>
                        Open Rubric
                      </Link>
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

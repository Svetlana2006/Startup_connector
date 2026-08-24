import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const PENDING = [
  { id: 'PRQ-2024-891', title: 'Urban Traffic AI Optimization', company: 'Nexus Analytics Solutions', due: 'Nov 15', score: 30 },
  { id: 'PRQ-2024-872', title: 'Rural Healthcare Data Delivery', company: 'MediSync Innovators', due: 'Nov 18', score: null },
]

export default function EvaluatorDashboard({ user, onLogout }) {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <SideNav activeHref="/evaluate" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          <div className="mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-primary">Evaluator Dashboard</h1>
            <p className="text-body-md font-body-md text-on-surface-variant">Welcome, {user?.name} · {user?.institution}</p>
          </div>
          <div className="grid grid-cols-3 gap-gutter mb-lg">
            {[['Pending Reviews','2','pending_actions','bg-warning-container','text-warning'],
              ['Completed','4','task_alt','bg-success-container','text-success'],
              ['Avg Score Given','31.5','leaderboard','bg-primary-container','text-on-primary-container']].map(([l,v,i,bg,tc]) => (
              <div key={l} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-sm">
                <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${tc} fill-icon`}>{i}</span>
                </div>
                <p className="text-display-lg font-display-lg text-on-surface leading-none">{v}</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">{l}</p>
              </div>
            ))}
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-md border-b border-outline-variant">
              <h2 className="text-headline-md font-headline-md text-primary">Pending Reviews</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-label-md font-label-md text-on-surface-variant border-b border-outline-variant">
                  <th className="p-md font-semibold">RFP ID</th>
                  <th className="p-md font-semibold">Proposal</th>
                  <th className="p-md font-semibold">Company</th>
                  <th className="p-md font-semibold">Due</th>
                  <th className="p-md font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {PENDING.map(p => (
                  <tr key={p.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="p-md font-mono text-label-md text-on-surface-variant">{p.id}</td>
                    <td className="p-md text-on-surface font-medium">{p.title}</td>
                    <td className="p-md text-on-surface-variant">{p.company}</td>
                    <td className="p-md"><span className="text-warning font-bold text-label-sm">{p.due}</span></td>
                    <td className="p-md">
                      <Link to="/evaluate" className="bg-primary text-on-primary text-label-md font-label-md px-md py-xs rounded hover:opacity-90 transition-opacity">
                        Score Now
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

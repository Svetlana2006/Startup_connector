// 1.6 — Pilot Tracker with Milestones (pilot_milestone_tracker)
import { useState, useRef } from 'react'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const INITIAL_MILESTONES = [
  { id: 1, title: 'Sandbox Setup',    date: 'Completed Oct 12', status: 'done',    payment: '₹2.5L', icon: 'check' },
  { id: 2, title: 'First Beta Release', date: 'Due Nov 15',     status: 'active',  payment: '₹4.0L', icon: 'play_arrow' },
  { id: 3, title: 'Validation Report', date: 'Pending',         status: 'pending', payment: '₹3.5L', icon: 'description' },
  { id: 4, title: 'Final Handover',   date: 'Pending',          status: 'pending', payment: '₹2.0L', icon: 'flag' },
]

const TOTAL = 1200000
const INITIAL_DISBURSED = 250000

function showToastEl(container, message) {
  // handled in React state instead
}

export default function PilotTracker({ user, onLogout }) {
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES)
  const [disbursed, setDisbursed] = useState(INITIAL_DISBURSED)
  const [transactions, setTransactions] = useState([{ label: 'Sandbox Setup', amount: '₹2.5L' }])
  const [toast, setToast] = useState(null)

  function markComplete(id, payment) {
    setMilestones(ms => ms.map(m => m.id === id ? { ...m, status: 'done', icon: 'check' } : m))
    const amount = parseFloat(payment.replace('₹', '').replace('L', '')) * 100000
    setDisbursed(d => d + amount)
    setTransactions(t => [...t, { label: milestones.find(m => m.id === id)?.title, amount: payment }])
    setToast(`Milestone completed! ${payment} payment released via GFR gateway.`)
    setTimeout(() => setToast(null), 4000)
  }

  const pct = Math.round((disbursed / TOTAL) * 100)

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <SideNav activeHref="/pilot" />
        <main className="flex-1 md:ml-64 overflow-y-auto bg-surface relative">
          <div className="max-w-[1280px] mx-auto p-md md:p-lg space-y-lg">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
              <div>
                <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary">Pilot Execution Tracker</h1>
                <p className="text-body-md font-body-md text-on-surface-variant mt-sm">Project: AI Governance Sandbox (ID: MS-24-091A)</p>
              </div>
              <span className="inline-flex items-center gap-sm px-sm py-xs bg-warning-container text-on-warning-container rounded-full text-label-sm font-label-sm">
                <span className="material-symbols-outlined text-[16px]">pending_actions</span> Active Phase
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Timeline Card */}
              <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg">
                <div className="border-b border-outline-variant pb-md mb-xl flex justify-between items-center">
                  <h2 className="text-headline-md font-headline-md text-primary">Deployment Milestones</h2>
                  <button className="text-primary hover:bg-primary-container hover:text-on-primary-container px-sm py-xs rounded-lg text-label-sm font-label-sm transition-colors flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Edit Timeline
                  </button>
                </div>
                <div className="relative w-full overflow-x-auto pb-lg pt-sm">
                  <div className="flex justify-between min-w-[700px] relative px-xl">
                    {milestones.map((m, idx) => (
                      <div key={m.id} className={`relative flex flex-col items-center w-1/4 z-10 group ${m.status === 'pending' ? 'opacity-60' : ''}`}>
                        {idx < milestones.length - 1 && (
                          <div className={`timeline-connector${m.status === 'done' ? ' active' : ''}`} />
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md mb-md relative z-10 border-4 border-surface-container-lowest ${
                          m.status === 'done' ? 'bg-primary text-on-primary'
                          : m.status === 'active' ? 'bg-white border-2 border-primary text-primary shadow-sm'
                          : 'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          <span className="material-symbols-outlined">{m.icon}</span>
                        </div>
                        <div className="text-center">
                          <h3 className={`text-label-md font-label-md mb-xs ${m.status === 'done' ? 'text-primary' : m.status === 'active' ? 'text-primary' : 'text-on-surface-variant'}`}>{m.title}</h3>
                          <p className={`text-label-sm font-label-sm mb-sm ${m.status === 'pending' ? 'text-outline' : 'text-on-surface-variant'}`}>{m.date}</p>
                          {m.status === 'done' && (
                            <span className="inline-flex items-center gap-xs text-success text-label-sm font-label-sm bg-success-container px-2 py-1 rounded-md">
                              <span className="material-symbols-outlined text-[14px]">payments</span> {m.payment} Released
                            </span>
                          )}
                          {m.status === 'active' && (
                            <button
                              className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-md py-sm rounded-lg text-label-sm font-label-sm font-bold shadow-sm transition-all flex items-center gap-xs mx-auto"
                              onClick={() => markComplete(m.id, m.payment)}
                            >
                              Mark Complete
                            </button>
                          )}
                          {m.status === 'pending' && (
                            <div className="text-label-sm font-label-sm text-outline flex items-center justify-center gap-xs">
                              <span className="material-symbols-outlined text-[14px]">lock</span> {m.payment} Locked
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Budget Panel */}
              <div className="lg:col-span-4 flex flex-col gap-gutter">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-md flex-1">
                  <div className="border-b border-outline-variant pb-xs mb-md">
                    <h2 className="text-label-md font-label-md font-bold text-on-surface-variant uppercase tracking-wider">Financial Overview</h2>
                  </div>
                  <div className="space-y-lg">
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant mb-xs">Total Budget Allocated</p>
                      <p className="text-headline-md font-headline-md text-primary">₹{(TOTAL / 100000).toFixed(0)} Lakh</p>
                    </div>
                    <div className="relative pt-sm">
                      <div className="flex justify-between mb-xs">
                        <span className="text-label-sm font-label-sm text-success font-bold">₹{(disbursed/100000).toFixed(1)}L Disbursed</span>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">₹{((TOTAL - disbursed)/100000).toFixed(1)}L Remaining</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-success transition-all duration-1000 ease-out rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant">
                      <h4 className="text-label-sm font-label-sm font-bold text-primary mb-sm flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span> Recent Transactions
                      </h4>
                      <ul className="space-y-sm">
                        {transactions.map((t, i) => (
                          <li key={i} className="flex justify-between items-center text-label-sm font-label-sm border-b border-outline-variant pb-xs last:border-0 last:pb-0">
                            <span className="text-on-surface-variant">{t.label}</span>
                            <span className="text-success font-bold">{t.amount}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-xl right-xl z-[100]">
              <div className="flex items-center gap-md px-md py-sm rounded-lg shadow-lg border-l-4 bg-success-container text-on-success-container border-success toast-enter max-w-sm">
                <span className="material-symbols-outlined fill-icon">task_alt</span>
                <span className="text-label-md font-label-md">{toast}</span>
              </div>
            </div>
          )}
        </main>
      </div>
      <AppFooter />
    </div>
  )
}

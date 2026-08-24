// packages/client/src/pages/PilotSandboxTracker.jsx
// Tier 2.3 — Pilot / Sandbox Tracker
import { useState } from 'react'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'
import { useAppContext } from '../AppContext'

export default function PilotSandboxTracker({ user, onLogout }) {
  const { pilotTracking, updateKPI, milestoneContracts, notifications } = useAppContext()
  const [selectedPilotId, setSelectedPilotId] = useState('PLT-001')
  const [editingKpiId, setEditingKpiId] = useState(null)
  const [kpiVal, setKpiVal] = useState('')
  const [toast, setToast] = useState(null)

  const activePilot = pilotTracking.find(p => p.pilotId === selectedPilotId) || pilotTracking[0]
  const activeContract = milestoneContracts.find(c => c.pilotId === selectedPilotId)

  // Budget calculations from 2.1 milestone payments
  const budgetAllocated = activeContract?.totalBudget || activePilot.budgetAllocated || 1000000
  const budgetBurned = activeContract?.milestones
    ?.filter(m => m.status === 'paid' || m.status === 'approved')
    ?.reduce((acc, m) => acc + m.amount, 0) || 0
  const budgetBurnPercent = Math.round((budgetBurned / budgetAllocated) * 100)

  // Timeline calculations
  const start = new Date(activePilot.startDate).getTime()
  const end = new Date(activePilot.endDate).getTime()
  const now = new Date('2026-09-25').getTime() // Simulated current demo date
  const totalDuration = Math.max(end - start, 1)
  const elapsedDuration = Math.max(0, Math.min(now - start, totalDuration))
  const percentElapsed = Math.round((elapsedDuration / totalDuration) * 100)

  function triggerToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  function handleSaveKpi(kpiId) {
    if (!kpiVal) return
    updateKPI(activePilot.pilotId, kpiId, Number(kpiVal))
    setEditingKpiId(null)
    setKpiVal('')
    triggerToast('KPI telemetry updated successfully.')
  }

  const unreadAlerts = notifications.filter(n => !n.read && n.targetRoles.includes(user.role)).length
  const canEditKpi = user.role === 'department' || user.role === 'startup' || user.role === 'admin'

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} unreadCount={unreadAlerts} />
      <div className="flex flex-1">
        <SideNav activeHref="/pilot-sandbox" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded border border-primary/20">
                  Feature 2.3
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Live Pilot & Sandbox Performance Engine
                </span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-primary">
                Pilot Sandbox Tracker
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Real-time timeline progression, dynamic budget burn (from 2.1 milestones), and multi-metric KPI tracking.
              </p>
            </div>

            {/* Pilot Selector */}
            <div className="flex items-center gap-3">
              <label className="text-label-sm font-bold text-on-surface-variant">Sandbox Trial:</label>
              <select
                value={selectedPilotId}
                onChange={e => setSelectedPilotId(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-label-md font-bold text-primary focus:ring-2 focus:ring-primary outline-none"
              >
                {pilotTracking.map(p => (
                  <option key={p.pilotId} value={p.pilotId}>
                    {p.pilotId}: {p.startupName} ({p.dept})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Top 3 Core Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
            {/* 1. Timeline Card */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-sm">
                  <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                    Timeline Progress
                  </span>
                  <span className="text-[11px] font-bold bg-primary-fixed text-primary px-2 py-0.5 rounded-full">
                    {percentElapsed}% Elapsed
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-label-sm">
                    <span className="text-on-surface-variant">Start: {activePilot.startDate}</span>
                    <span className="text-on-surface font-bold">End: {activePilot.endDate}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${percentElapsed}%` }} />
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant mt-3 text-label-sm text-on-surface-variant flex justify-between">
                <span>Total Trial: 3.5 Months</span>
                <span className="text-primary font-bold">Phase: Deployment & Testing</span>
              </div>
            </div>

            {/* 2. Budget Allocated vs. Burned Card */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-sm">
                  <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-success text-[18px]">payments</span>
                    Budget Burned (Live from 2.1)
                  </span>
                  <span className="text-[11px] font-bold bg-success-container text-on-success-container px-2 py-0.5 rounded-full">
                    {budgetBurnPercent}% Released
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-label-sm font-bold">
                    <span className="text-success">₹{(budgetBurned / 100000).toFixed(1)}L Disbursed</span>
                    <span className="text-on-surface-variant">Cap: ₹{(budgetAllocated / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                    <div className="bg-success h-full rounded-full transition-all duration-700" style={{ width: `${budgetBurnPercent}%` }} />
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant mt-3 text-label-sm text-on-surface-variant flex justify-between">
                <span>Remaining: ₹{((budgetAllocated - budgetBurned) / 100000).toFixed(1)} Lakh</span>
                <span className="text-success font-bold">GFR 173(i) Milestone Linked</span>
              </div>
            </div>

            {/* 3. Startup & Pilot Metadata */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-sm">
                  <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    Sandbox Entity
                  </span>
                  <span className="text-[11px] font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full border border-secondary/20">
                    {activePilot.pilotType} Track
                  </span>
                </div>
                <h3 className="text-headline-md font-bold text-primary">{activePilot.startupName}</h3>
                <p className="text-label-sm text-on-surface-variant truncate">{activePilot.problemTitle}</p>
              </div>
              <div className="pt-3 border-t border-outline-variant mt-3 text-label-sm text-on-surface-variant flex justify-between">
                <span>Dept: {activePilot.dept}</span>
                <span className="text-success font-bold">Active Sandbox</span>
              </div>
            </div>
          </div>

          {/* Section: Live KPI Performance Cards */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg mb-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm pb-md border-b border-outline-variant mb-md">
              <div>
                <h2 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">speed</span>
                  Pilot Success Metrics & KPIs ({activePilot.kpis.length})
                </h2>
                <p className="text-label-sm text-on-surface-variant">
                  Quantifiable performance benchmarks agreed at pilot kickoff.
                </p>
              </div>
              <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full">
                Role View: {user.role === 'admin' ? 'Read-only Auditor' : 'Interactive Telemetry'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
              {activePilot.kpis.map(kpi => {
                const target = kpi.target
                const current = kpi.current
                let pct = kpi.inverse
                  ? Math.max(0, Math.min(100, Math.round(((target * 1.5 - current) / target) * 100)))
                  : Math.max(0, Math.min(100, Math.round((current / target) * 100)))

                const isMeetingTarget = kpi.inverse ? current <= target : current >= target

                return (
                  <div key={kpi.id} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono font-bold text-on-surface-variant">{kpi.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isMeetingTarget ? 'bg-success-container text-on-success-container' : 'bg-warning-container text-on-warning-container'
                        }`}>
                          {isMeetingTarget ? 'Target Met' : 'In Progress'}
                        </span>
                      </div>
                      <h4 className="font-bold text-label-md text-on-surface mb-1">{kpi.name}</h4>
                      <p className="text-[11px] text-on-surface-variant mb-3">{kpi.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] text-on-surface-variant uppercase">Current</span>
                          <p className="text-headline-md font-bold text-primary leading-none">
                            {current} <span className="text-label-sm font-normal text-on-surface-variant">{kpi.unit}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-on-surface-variant uppercase">Target</span>
                          <p className="text-label-md font-bold text-on-surface leading-none">
                            {target} {kpi.unit}
                          </p>
                        </div>
                      </div>

                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isMeetingTarget ? 'bg-success' : 'bg-primary'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2 text-[11px] text-on-surface-variant">
                        <span>Updated: {kpi.lastUpdated}</span>
                        {canEditKpi && (
                          <button
                            onClick={() => {
                              setEditingKpiId(kpi.id)
                              setKpiVal(String(kpi.current))
                            }}
                            className="text-primary font-bold hover:underline"
                          >
                            Update
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Section: Sandbox Check-ins & Audit Reviews */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg mb-lg">
            <h3 className="text-headline-md font-headline-md text-primary flex items-center gap-2 mb-sm">
              <span className="material-symbols-outlined text-primary">fact_check</span>
              Sandbox Check-In Logs & Field Audits ({activePilot.checkIns?.length || 0})
            </h3>
            <p className="text-label-sm text-on-surface-variant mb-md">
              Periodic field check-ins conducted jointly by department engineers and MSInS observers.
            </p>

            <div className="space-y-sm">
              {activePilot.checkIns?.map((ci, i) => (
                <div key={i} className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-label-md text-on-surface">{ci.title}</span>
                      <span className="text-[11px] bg-success-container text-on-success-container font-bold px-2 py-0.5 rounded">
                        {ci.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-0.5">
                      Reviewer: {ci.reviewer} · Date: {ci.date}
                    </p>
                    <p className="text-label-sm text-on-surface mt-1 italic">
                      "{ci.notes}"
                    </p>
                  </div>
                  <span className="text-[11px] text-primary font-bold shrink-0">Verified Check-in ✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal: Quick KPI Update with Explicit Width */}
          {editingKpiId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div
                style={{ width: '100%', maxWidth: '440px', minWidth: '300px' }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden flex flex-col mx-auto my-auto"
              >
                <h3 className="text-headline-md font-bold text-primary mb-sm">Update Telemetry Value</h3>
                <p className="text-label-sm text-on-surface-variant mb-md">
                  Enter latest measured value from field telemetry/audit for <strong>{editingKpiId}</strong>:
                </p>
                <input
                  type="number"
                  step="0.1"
                  value={kpiVal}
                  onChange={e => setKpiVal(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-headline-md font-bold text-primary mb-md outline-none"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingKpiId(null)}
                    className="px-3.5 py-1.5 border border-outline rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveKpi(editingKpiId)}
                    className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90 shadow-sm"
                  >
                    Save Telemetry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast Notification */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div className="bg-primary text-on-primary px-4 py-3 rounded-lg shadow-lg border border-primary-container flex items-center gap-2 text-label-md font-bold">
                <span className="material-symbols-outlined text-secondary-container">task_alt</span>
                {toast}
              </div>
            </div>
          )}
        </main>
      </div>
      <AppFooter />
    </div>
  )
}

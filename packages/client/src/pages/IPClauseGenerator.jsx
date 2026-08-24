// packages/client/src/pages/IPClauseGenerator.jsx
// Tier 2.4 — IP & Data Clause Generator
import { useState } from 'react'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'
import { useAppContext } from '../AppContext'

const PILOT_TYPES = ['Software', 'Hardware', 'Data-Sharing', 'Hybrid']

const QUICK_FLAG_REASONS = [
  'Scope of Pre-existing Background IP',
  'DPDP Act 2023 Data Anonymization Terms',
  '48-Hour Field Repair SLA Window',
  'Exclusion of Reverse Engineering / PSU Rights',
  'Bespoke Schema Ownership Ambiguity'
]

export default function IPClauseGenerator({ user, onLogout }) {
  const { ipClauseTemplates, ipClauseSelections, updateClauseStatus, initClausesForPilot, notifications } = useAppContext()
  const [selectedPilotId, setSelectedPilotId] = useState('PLT-001')
  const [pilotType, setPilotType] = useState('Software')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Reviewer perspective toggle for easy demo testing
  const [actingRole, setActingRole] = useState(user?.role === 'department' ? 'department' : 'startup')

  // Flag modal state
  const [flaggingClause, setFlaggingClause] = useState(null)
  const [flagNote, setFlagNote] = useState('')
  const [toast, setToast] = useState(null)

  const activeSelection = ipClauseSelections.find(s => s.pilotId === selectedPilotId) || {
    pilotId: selectedPilotId,
    pilotType: pilotType,
    clauses: []
  }

  function triggerToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  function handleTypeChange(newType) {
    setPilotType(newType)
    initClausesForPilot(selectedPilotId, newType)
    triggerToast(`Applied standard ${newType} IP & Data legal framework.`)
  }

  function handleAcceptClause(clauseId) {
    updateClauseStatus(selectedPilotId, clauseId, actingRole, 'accepted', '')
    triggerToast(`Clause ${clauseId} marked as ACCEPTED by ${actingRole === 'startup' ? 'Startup Provider' : 'Department Official'}.`)
  }

  function handleOpenFlagModal(clause) {
    setFlaggingClause(clause)
    const existing = activeSelection.clauses.find(c => c.clauseId === clause.id)
    setFlagNote(existing?.flagNote || '')
  }

  function handleConfirmFlag() {
    if (!flaggingClause) return
    const noteToSave = flagNote.trim() || 'Clarification requested by ' + (actingRole === 'startup' ? 'Startup' : 'Department')
    updateClauseStatus(selectedPilotId, flaggingClause.id, actingRole, 'flagged', noteToSave)
    setFlaggingClause(null)
    setFlagNote('')
    triggerToast(`Clause ${flaggingClause.id} FLAGGED with negotiation note.`)
  }

  function handleResetClause(clauseId) {
    updateClauseStatus(selectedPilotId, clauseId, actingRole, 'pending', '')
    triggerToast(`Clause status reset to pending for ${actingRole}.`)
  }

  // Filter templates matching current pilotType
  const relevantTemplates = ipClauseTemplates.filter(t => t.pilotTypes.includes(pilotType))
  const categories = ['all', ...new Set(relevantTemplates.map(t => t.category))]
  const filteredTemplates = categoryFilter === 'all'
    ? relevantTemplates
    : relevantTemplates.filter(t => t.category === categoryFilter)

  // Acceptance tally
  const totalClauses = relevantTemplates.length
  let deptAccepted = 0
  let startupAccepted = 0
  relevantTemplates.forEach(t => {
    const sel = activeSelection.clauses.find(c => c.clauseId === t.id)
    if (sel?.departmentStatus === 'accepted') deptAccepted++
    if (sel?.startupStatus === 'accepted') startupAccepted++
  })

  const isFullyAccepted = totalClauses > 0 && deptAccepted === totalClauses && startupAccepted === totalClauses
  const unreadAlerts = notifications.filter(n => !n.read && n.targetRoles.includes(user.role)).length

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} unreadCount={unreadAlerts} />
      <div className="flex flex-1">
        <SideNav activeHref="/ip-clauses" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded border border-primary/20">
                  Feature 2.4
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Rules-Based IP & Data Governance Engine
                </span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-primary">
                IP & Data Clause Generator
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Auto-generate tailored intellectual property and state data sovereignty clauses based on sandbox architecture.
              </p>
            </div>

            {/* Pilot Selector & Reviewer Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Reviewer Switcher */}
              <div className="bg-surface-container-low p-1 rounded-lg border border-outline-variant flex items-center gap-1 text-[12px] font-bold">
                <span className="px-2 text-on-surface-variant">Reviewing As:</span>
                <button
                  onClick={() => setActingRole('startup')}
                  className={`px-3 py-1 rounded transition-all flex items-center gap-1 ${
                    actingRole === 'startup'
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                  Startup Provider
                </button>
                <button
                  onClick={() => setActingRole('department')}
                  className={`px-3 py-1 rounded transition-all flex items-center gap-1 ${
                    actingRole === 'department'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">account_balance</span>
                  Dept. Official
                </button>
              </div>

              <select
                value={selectedPilotId}
                onChange={e => setSelectedPilotId(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-label-md font-bold text-primary focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="PLT-001">PLT-001: AquaFlow Systems</option>
                <option value="PLT-002">PLT-002: TrackEasy Solutions</option>
              </select>
            </div>
          </div>

          {/* Rules Engine Configurator Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg mb-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-md pb-md border-b border-outline-variant">
              <div>
                <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                  Pilot Architecture Classification (Rules Engine Trigger)
                </span>
                <p className="text-label-sm text-on-surface-variant mt-0.5">
                  Selecting a deployment type automatically composes mandatory DPDP Act 2023, GFR, and background IP safeguards.
                </p>
              </div>

              {/* Pilot Type Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {PILOT_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`px-3 py-1.5 rounded-lg text-label-md font-bold transition-all ${
                      pilotType === type
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {type} Track
                  </button>
                ))}
              </div>
            </div>

            {/* Bilateral Acceptance Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md pt-md">
              <div className={`p-3 rounded-lg border transition-all ${
                actingRole === 'department' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant'
              }`}>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase">Department Official Review</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-headline-md font-bold text-primary">
                    {deptAccepted} / {totalClauses}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    deptAccepted === totalClauses ? 'bg-success text-on-primary' : 'bg-warning-container text-on-warning-container'
                  }`}>
                    {deptAccepted === totalClauses ? 'All Accepted ✓' : 'In Review'}
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-lg border transition-all ${
                actingRole === 'startup' ? 'bg-secondary/10 border-secondary ring-1 ring-secondary' : 'bg-surface-container-low border-outline-variant'
              }`}>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase">Startup Provider Review</span>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-headline-md font-bold text-secondary">
                    {startupAccepted} / {totalClauses}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    startupAccepted === totalClauses ? 'bg-success text-on-primary' : 'bg-warning-container text-on-warning-container'
                  }`}>
                    {startupAccepted === totalClauses ? 'All Accepted ✓' : 'In Review'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col justify-between">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase">Contract Finalization Status</span>
                <button
                  disabled={!isFullyAccepted}
                  onClick={() => triggerToast('Pilot IP & Data Agreement finalized and locked into immutable contract record!')}
                  className={`w-full py-2 px-3 rounded-lg text-label-md font-bold transition-all flex items-center justify-center gap-1 ${
                    isFullyAccepted
                      ? 'bg-success text-on-primary shadow-sm hover:bg-emerald-700 cursor-pointer animate-pulse'
                      : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFullyAccepted ? 'verified' : 'lock'}
                  </span>
                  {isFullyAccepted ? 'Finalize IP Agreement ✓' : 'Awaiting Dual Acceptance'}
                </button>
              </div>
            </div>
          </div>

          {/* Clause Category Filter Tabs */}
          <div className="flex items-center gap-2 mb-md overflow-x-auto pb-1">
            <span className="text-label-sm font-bold text-on-surface-variant shrink-0">Filter by Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-label-sm font-bold capitalize whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {cat === 'all' ? `All (${relevantTemplates.length})` : cat}
              </button>
            ))}
          </div>

          {/* Clauses List */}
          <div className="space-y-md mb-lg">
            {filteredTemplates.map((clause) => {
              const sel = activeSelection.clauses.find(c => c.clauseId === clause.id)
              const deptStatus = sel?.departmentStatus || 'pending'
              const startStatus = sel?.startupStatus || 'pending'
              const flagText = sel?.flagNote || ''

              const currentActorStatus = actingRole === 'startup' ? startStatus : deptStatus
              const isAccepted = currentActorStatus === 'accepted'
              const isFlagged = currentActorStatus === 'flagged'

              return (
                <div
                  key={clause.id}
                  className={`p-md md:p-lg bg-surface-container-lowest rounded-xl border transition-all ${
                    isAccepted
                      ? 'border-emerald-500 bg-emerald-50/20 shadow-sm'
                      : isFlagged
                      ? 'border-amber-500 bg-amber-50/30 shadow-md ring-1 ring-amber-400'
                      : 'border-outline-variant shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-label-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {clause.id}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                        {clause.category}
                      </span>
                      {clause.mandatory && (
                        <span className="text-[10px] font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded">
                          Mandatory
                        </span>
                      )}
                    </div>

                    {/* Dual Review Status Badges */}
                    <div className="flex items-center gap-2 text-[12px]">
                      <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/60">
                        <span className="text-on-surface-variant font-medium">Dept:</span>
                        <span className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${
                          deptStatus === 'accepted'
                            ? 'bg-success text-on-primary'
                            : deptStatus === 'flagged'
                            ? 'bg-warning text-on-warning'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {deptStatus === 'accepted' ? 'Accepted ✓' : deptStatus === 'flagged' ? 'Flagged ⚑' : 'Pending'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/60">
                        <span className="text-on-surface-variant font-medium">Startup:</span>
                        <span className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${
                          startStatus === 'accepted'
                            ? 'bg-success text-on-primary'
                            : startStatus === 'flagged'
                            ? 'bg-warning text-on-warning'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {startStatus === 'accepted' ? 'Accepted ✓' : startStatus === 'flagged' ? 'Flagged ⚑' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-headline-md font-bold text-on-surface mb-2">{clause.title}</h3>
                  <p className="text-body-md text-on-surface leading-relaxed mb-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                    "{clause.text}"
                  </p>

                  <p className="text-[12px] text-on-surface-variant mb-3 flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[16px]">gavel</span>
                    <strong>Statutory Rationale:</strong> {clause.recommendation}
                  </p>

                  {/* Flag Note Banner */}
                  {flagText && (
                    <div className="mb-3 p-3 bg-amber-100/70 border border-amber-400 rounded-xl text-label-sm text-amber-900 shadow-sm flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold flex items-center gap-1.5 text-amber-950">
                          <span className="material-symbols-outlined text-amber-600 text-[18px]">flag</span>
                          Active Negotiation Flag:
                        </p>
                        <p className="mt-1 italic font-medium">"{flagText}"</p>
                      </div>
                      <button
                        onClick={() => handleOpenFlagModal(clause)}
                        className="text-xs text-amber-900 font-bold underline hover:text-amber-950 shrink-0"
                      >
                        Edit Note
                      </button>
                    </div>
                  )}

                  {/* Action Buttons for Current Active Reviewer */}
                  <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-outline-variant/70">
                    <span className="text-[12px] text-on-surface-variant">
                      Reviewing as: <strong className="text-primary capitalize">{actingRole}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Flag button */}
                      <button
                        onClick={() => handleOpenFlagModal(clause)}
                        className={`px-3.5 py-1.5 rounded-lg text-label-sm font-bold transition-all flex items-center gap-1.5 ${
                          isFlagged
                            ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                            : 'border border-amber-500 text-amber-700 hover:bg-amber-50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">flag</span>
                        {isFlagged ? 'Flagged ⚑' : 'Flag / Add Note'}
                      </button>

                      {/* Accept button */}
                      <button
                        onClick={() => handleAcceptClause(clause.id)}
                        className={`px-4 py-1.5 rounded-lg text-label-sm font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          isAccepted
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                            : 'bg-emerald-700 text-white hover:bg-emerald-800'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        {isAccepted ? 'Accepted ✓' : 'Accept Clause'}
                      </button>

                      {/* Reset option */}
                      {(isAccepted || isFlagged) && (
                        <button
                          onClick={() => handleResetClause(clause.id)}
                          className="p-1.5 hover:bg-surface-container-high rounded-full text-on-surface-variant"
                          title="Reset to pending"
                        >
                          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Modal: Flag Clause & Attach Note */}
          {flaggingClause && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div
                style={{ width: '100%', maxWidth: '580px', minWidth: '320px' }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col mx-auto my-auto"
              >
                {/* Header */}
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-4 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-[22px]">flag</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">Flag Clause for Negotiation</h3>
                      <p className="text-xs font-medium text-amber-800 mt-0.5">
                        <span className="font-mono font-bold">{flaggingClause.id}</span> · {flaggingClause.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFlaggingClause(null)}
                    className="w-8 h-8 rounded-full hover:bg-amber-200/60 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-white">
                  {/* Clause Excerpt Box */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
                    <strong className="not-italic text-slate-900 block mb-1">Clause Text:</strong>
                    "{flaggingClause.text}"
                  </div>

                  {/* Quick Reason Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Standard Reason (Quick Insert):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_FLAG_REASONS.map(reason => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => setFlagNote(reason)}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors border border-slate-200 text-left"
                        >
                          + {reason}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Negotiation / Clarification Note: *
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Specify required amendment, clarification on IP bounds, or SLA adjustments..."
                      value={flagNote}
                      onChange={e => setFlagNote(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      autoFocus
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      This note will be transmitted to the other party and logged into the pilot negotiation registry.
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setFlaggingClause(null)}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-sm transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmFlag}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">flag</span>
                    Save & Flag Clause
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div className="bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl border border-primary-container flex items-center gap-2 text-label-md font-bold">
                <span className="material-symbols-outlined text-secondary-container">shield</span>
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

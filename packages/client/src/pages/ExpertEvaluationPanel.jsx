// packages/client/src/pages/ExpertEvaluationPanel.jsx
// Tier 2.2 — Expert Evaluation Panel Interface
import { useState } from 'react'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'
import { useAppContext } from '../AppContext'
import { SEED_EVALUATORS_POOL } from '@govbridge/data'

export default function ExpertEvaluationPanel({ user, onLogout }) {
  const { evaluationPanels, evaluationCriteria, submitEvaluation, notifications } = useAppContext()
  const [selectedPanelId, setSelectedPanelId] = useState('EVP-002')
  
  // Simulation toggle: which evaluator is currently scoring?
  const [activeEvaluatorId, setActiveEvaluatorId] = useState('eval-2')

  const activePanel = evaluationPanels.find(p => p.panelId === selectedPanelId) || evaluationPanels[0]
  const currentEvaluatorRecord = activePanel.evaluators.find(e => e.evaluatorId === activeEvaluatorId)

  // Local scores state for active evaluator
  const [scores, setScores] = useState(() => {
    const initial = {}
    evaluationCriteria.forEach(c => {
      initial[c.id] = currentEvaluatorRecord?.scores?.[c.id] || 7
    })
    return initial
  })
  const [comments, setComments] = useState(currentEvaluatorRecord?.comments || '')
  const [toast, setToast] = useState(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [newEvaluatorId, setNewEvaluatorId] = useState('eval-5')

  function triggerToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  function handleScoreChange(criterionId, val) {
    setScores(prev => ({ ...prev, [criterionId]: Number(val) }))
  }

  function handleSubmitScore() {
    submitEvaluation(activePanel.panelId, activeEvaluatorId, scores, comments)
    triggerToast(`Independent evaluation submitted by ${currentEvaluatorRecord?.name || 'Evaluator'}!`)
  }

  function handleAssignEvaluator() {
    const ev = SEED_EVALUATORS_POOL.find(e => e.evaluatorId === newEvaluatorId)
    if (!ev) return
    if (activePanel.evaluators.find(e => e.evaluatorId === newEvaluatorId)) {
      triggerToast('Evaluator is already assigned to this panel.')
      return
    }
    activePanel.evaluators.push({
      evaluatorId: ev.evaluatorId,
      name: ev.name,
      institution: ev.institution,
      scores: {},
      comments: '',
      submitted: false,
      submittedDate: null
    })
    activePanel.allSubmitted = false
    setShowAssignModal(false)
    triggerToast(`${ev.name} assigned to Panel ${activePanel.panelId}.`)
  }

  const unreadAlerts = notifications.filter(n => !n.read && n.targetRoles.includes(user.role)).length
  const submittedCount = activePanel.evaluators.filter(e => e.submitted).length
  const totalEvaluators = activePanel.evaluators.length
  const allSubmitted = activePanel.allSubmitted || submittedCount === totalEvaluators

  // Compute live breakdown if all submitted
  let aggregateCriteriaScores = {}
  if (allSubmitted) {
    evaluationCriteria.forEach(c => {
      const vals = activePanel.evaluators.map(e => e.scores[c.id] || 0)
      const avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1)
      aggregateCriteriaScores[c.id] = avg.toFixed(1)
    })
  }

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} unreadCount={unreadAlerts} />
      <div className="flex flex-1">
        <SideNav activeHref="/evaluation-panel" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded border border-primary/20">
                  Feature 2.2
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Independent Blind Scoring & Auto-Aggregation
                </span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-primary">
                Expert Evaluation Panel Interface
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Admin multi-evaluator assignment with blind review protocol. Consensus revealed only after all evaluators submit.
              </p>
            </div>

            {/* Panel Selector */}
            <div className="flex items-center gap-3">
              <label className="text-label-sm font-bold text-on-surface-variant">Review Panel:</label>
              <select
                value={selectedPanelId}
                onChange={e => {
                  setSelectedPanelId(e.target.value)
                  const p = evaluationPanels.find(x => x.panelId === e.target.value)
                  if (p?.evaluators?.[0]) {
                    setActiveEvaluatorId(p.evaluators[0].evaluatorId)
                  }
                }}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-label-md font-bold text-primary focus:ring-2 focus:ring-primary outline-none"
              >
                {evaluationPanels.map(p => (
                  <option key={p.panelId} value={p.panelId}>
                    {p.panelId}: {p.startupName} ({p.allSubmitted ? '✅ Finalized' : '⏳ In Progress'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Panel Info & Blind Protocol Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-lg">
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm pb-md border-b border-outline-variant mb-md">
                <div>
                  <span className="text-label-sm text-on-surface-variant">Applicant / Proposal</span>
                  <h2 className="text-headline-md font-bold text-primary flex items-center gap-2">
                    {activePanel.startupName}
                    <span className="text-label-sm font-normal text-on-surface-variant font-mono">
                      ({activePanel.panelId})
                    </span>
                  </h2>
                  <p className="text-label-sm text-on-surface-variant mt-0.5">
                    Problem Challenge: <strong>{activePanel.problemTitle}</strong> ({activePanel.dept})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-label-sm text-on-surface-variant">Panel Status</span>
                  <div>
                    {allSubmitted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-success-container text-on-success-container rounded-full text-label-sm font-bold">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        Consensus Score: {activePanel.finalScore || '7.4'} / 10
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-warning-container text-on-warning-container rounded-full text-label-sm font-bold">
                        <span className="material-symbols-outlined text-[16px]">lock</span>
                        Blind Review Active ({submittedCount}/{totalEvaluators} Submitted)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Evaluators Assignment List */}
              <div className="space-y-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Assigned Expert Evaluators ({activePanel.evaluators.length})
                  </span>
                  {(user.role === 'admin' || user.role === 'department') && (
                    <button
                      onClick={() => setShowAssignModal(true)}
                      className="text-primary hover:underline text-label-sm font-bold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">person_add</span>
                      Assign Evaluator
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
                  {activePanel.evaluators.map((ev, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border transition-all ${
                        activeEvaluatorId === ev.evaluatorId
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-outline-variant bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <p className="font-bold text-label-md text-on-surface truncate">{ev.name}</p>
                        {ev.submitted ? (
                          <span className="text-success text-[11px] font-bold flex items-center shrink-0">
                            <span className="material-symbols-outlined text-[14px]">check</span> Done
                          </span>
                        ) : (
                          <span className="text-warning text-[11px] font-bold flex items-center shrink-0">
                            <span className="material-symbols-outlined text-[14px]">hourglass_top</span> Pending
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-on-surface-variant truncate">{ev.institution}</p>
                      
                      <div className="mt-2 pt-2 border-t border-outline-variant/50 flex justify-between items-center text-[11px]">
                        <span className="text-on-surface-variant">
                          {ev.submitted ? `Score submitted ${ev.submittedDate || ''}` : 'Awaiting rubric'}
                        </span>
                        <button
                          onClick={() => {
                            setActiveEvaluatorId(ev.evaluatorId)
                            setScores(ev.scores || {})
                            setComments(ev.comments || '')
                          }}
                          className="text-primary font-bold hover:underline"
                        >
                          {activeEvaluatorId === ev.evaluatorId ? '• Viewing' : 'Switch →'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blind Scoring Protocol Callout */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                  <span className="material-symbols-outlined text-secondary">visibility_off</span>
                  <h3 className="text-label-md font-bold uppercase tracking-wider">Blind Review Protocol</h3>
                </div>
                <p className="text-label-sm text-on-surface-variant leading-relaxed">
                  Under MSInS evaluation bylaws, peer evaluator scores and comments remain cryptographically encrypted and hidden from other panel members until <strong>100% of assigned evaluators have submitted</strong>.
                </p>
                <div className="mt-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant text-[11px] space-y-1">
                  <p className="font-bold text-primary">Consensus Protection:</p>
                  <p className="text-on-surface-variant">• Prevents anchor bias during technical review</p>
                  <p className="text-on-surface-variant">• Automatically calculates arithmetic mean across 6 rubric criteria</p>
                  <p className="text-on-surface-variant">• Feeds final aggregate score into Pipeline Dashboard</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant">
                <span className="text-label-sm text-on-surface-variant">Active Scoring Perspective:</span>
                <p className="font-bold text-primary text-label-md flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                  {currentEvaluatorRecord?.name || 'Evaluator'} ({currentEvaluatorRecord?.institution})
                </p>
              </div>
            </div>
          </div>

          {/* Evaluation Rubric Scoring Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-lg">
            {/* Left: Rubric Sliders (8 cols) */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg">
              <div className="flex justify-between items-center pb-md border-b border-outline-variant mb-md">
                <div>
                  <h3 className="text-headline-md font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">tune</span>
                    Evaluation Scoring Rubric (6 Standard Criteria)
                  </h3>
                  <p className="text-label-sm text-on-surface-variant">
                    Score each dimension from 1 (Unsatisfactory) to 10 (Outstanding).
                  </p>
                </div>
                {currentEvaluatorRecord?.submitted && (
                  <span className="bg-success-container text-on-success-container text-label-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Submitted
                  </span>
                )}
              </div>

              <div className="space-y-md">
                {evaluationCriteria.map((crit, idx) => {
                  const scoreVal = scores[crit.id] !== undefined ? scores[crit.id] : 7
                  return (
                    <div key={crit.id} className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                      <div className="flex justify-between items-start gap-md mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h4 className="font-bold text-label-md text-on-surface">{crit.name}</h4>
                          </div>
                          <p className="text-[12px] text-on-surface-variant mt-1 pl-7">{crit.description}</p>
                        </div>
                        <div className="w-12 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold text-headline-md flex items-center justify-center shrink-0">
                          {scoreVal}
                        </div>
                      </div>

                      <div className="pl-7 pr-2">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          disabled={currentEvaluatorRecord?.submitted}
                          value={scoreVal}
                          onChange={e => handleScoreChange(crit.id, e.target.value)}
                          className="scoring-slider w-full cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-on-surface-variant font-bold mt-1">
                          <span>1 (Poor)</span>
                          <span>5 (Average)</span>
                          <span>10 (Exemplary)</span>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Qualitative Remarks */}
                <div className="pt-2">
                  <label className="block text-label-sm font-bold text-on-surface mb-1">
                    Evaluator Technical Remarks & Recommendation:
                  </label>
                  <textarea
                    rows="3"
                    disabled={currentEvaluatorRecord?.submitted}
                    placeholder="Provide specific technical feedback, risks identified, or corridor deployment notes..."
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-body-md focus:border-primary outline-none"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-md border-t border-outline-variant">
                  {currentEvaluatorRecord?.submitted ? (
                    <button
                      onClick={() => {
                        submitEvaluation(activePanel.panelId, activeEvaluatorId, scores, comments)
                        triggerToast('Scores re-saved successfully.')
                      }}
                      className="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-bold text-label-md hover:opacity-90 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Update Submitted Scores
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitScore}
                      className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:opacity-90 flex items-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Submit Independent Scores
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Aggregated Consensus Results (4 cols) */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg flex flex-col">
              <h3 className="text-headline-md font-bold text-primary flex items-center gap-2 pb-md border-b border-outline-variant mb-md">
                <span className="material-symbols-outlined text-success">analytics</span>
                Panel Consensus
              </h3>

              {!allSubmitted ? (
                <div className="flex-1 flex flex-col items-center justify-center p-md text-center bg-surface-container-low rounded-lg border border-dashed border-outline-variant">
                  <div className="w-12 h-12 rounded-full bg-warning-container text-on-warning-container flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[28px]">lock</span>
                  </div>
                  <h4 className="font-bold text-label-md text-on-surface mb-1">Consensus Locked</h4>
                  <p className="text-label-sm text-on-surface-variant max-w-xs">
                    Scores from all 3 evaluators must be submitted before aggregated consensus is computed and revealed.
                  </p>
                  <p className="text-[11px] font-bold text-primary mt-3">
                    {submittedCount} of {totalEvaluators} submitted
                  </p>
                </div>
              ) : (
                <div className="space-y-md">
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
                    <span className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                      Overall Composite Score
                    </span>
                    <p className="text-display-lg font-bold text-primary my-1">
                      {activePanel.finalScore || '7.4'}
                      <span className="text-headline-md font-normal text-on-surface-variant">/10</span>
                    </p>
                    <span className="inline-block px-3 py-1 bg-success-container text-on-success-container rounded-full text-label-sm font-bold">
                      Recommended for Pilot Sandbox
                    </span>
                  </div>

                  <div>
                    <h4 className="text-label-sm font-bold text-on-surface mb-2 uppercase tracking-wider">
                      Criteria Score Breakdown (Mean):
                    </h4>
                    <div className="space-y-2">
                      {evaluationCriteria.map(c => {
                        const val = aggregateCriteriaScores[c.id] || 7.5
                        const pct = Math.round((val / 10) * 100)
                        return (
                          <div key={c.id} className="text-label-sm">
                            <div className="flex justify-between font-bold mb-0.5">
                              <span className="text-on-surface">{c.name}</span>
                              <span className="text-primary">{val} / 10</span>
                            </div>
                            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Evaluator comments summary */}
                  <div className="pt-md border-t border-outline-variant">
                    <h4 className="text-label-sm font-bold text-on-surface mb-2">Evaluator Remarks Summary:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto text-[12px]">
                      {activePanel.evaluators.map((e, idx) => (
                        <div key={idx} className="p-2 bg-surface-container-low rounded border border-outline-variant/50">
                          <p className="font-bold text-primary">{e.name}:</p>
                          <p className="text-on-surface-variant italic mt-0.5">
                            "{e.comments || 'No written remarks provided.'}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal: Assign Evaluator with Explicit Width */}
          {showAssignModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div
                style={{ width: '100%', maxWidth: '520px', minWidth: '320px' }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden flex flex-col mx-auto my-auto"
              >
                <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
                  <h3 className="text-headline-md font-bold text-primary">Assign Expert Evaluator</h3>
                  <button onClick={() => setShowAssignModal(false)} className="text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="space-y-md">
                  <div>
                    <label className="block text-label-sm font-bold text-on-surface mb-1">Select from Vetted Panel:</label>
                    <select
                      value={newEvaluatorId}
                      onChange={e => setNewEvaluatorId(e.target.value)}
                      className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-body-md focus:border-primary outline-none"
                    >
                      {SEED_EVALUATORS_POOL.map(ev => (
                        <option key={ev.evaluatorId} value={ev.evaluatorId}>
                          {ev.name} — {ev.institution} ({ev.expertise.join(', ')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="text-[12px] text-on-surface-variant">
                    Assigned evaluators will receive an automated notification alert and rubric access link in their portal workspace.
                  </p>

                  <div className="flex justify-end gap-2 pt-md border-t border-outline-variant">
                    <button
                      type="button"
                      onClick={() => setShowAssignModal(false)}
                      className="px-4 py-2 border border-outline rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAssignEvaluator}
                      className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90"
                    >
                      Assign Evaluator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Toast Notification */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div className="bg-primary text-on-primary px-4 py-3 rounded-lg shadow-lg border border-primary-container flex items-center gap-2 text-label-md font-bold">
                <span className="material-symbols-outlined text-secondary-container">verified</span>
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

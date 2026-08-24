// AppContext.jsx — Shared state for Tier 2 features
import { createContext, useContext, useState, useCallback } from 'react'
import {
  SEED_MILESTONE_CONTRACTS,
  SEED_EVALUATION_PANELS,
  EVALUATION_CRITERIA_PANEL,
  SEED_PILOT_TRACKING,
  IP_CLAUSE_TEMPLATES,
  SEED_IP_SELECTIONS,
  SEED_NOTIFICATIONS,
} from '@govbridge/data'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── Milestone Contracts (2.1) ──
  const [milestoneContracts, setMilestoneContracts] = useState(SEED_MILESTONE_CONTRACTS)

  const updateMilestoneStatus = useCallback((pilotId, milestoneId, newStatus) => {
    setMilestoneContracts(prev => prev.map(contract => {
      if (contract.pilotId !== pilotId) return contract
      const now = new Date().toISOString().split('T')[0]
      let updatedPayments = [...contract.paymentRecords]
      const updatedMilestones = contract.milestones.map(m => {
        if (m.id !== milestoneId) return m
        const updated = { ...m, status: newStatus }
        // When approved → auto-generate payment record and move to paid
        if (newStatus === 'approved') {
          updated.status = 'paid'
          updatedPayments.push({
            milestoneId: m.id,
            amount: m.amount,
            date: now,
            reference: `GFR/PAY/2026/${String(Math.floor(1000 + Math.random() * 9000))}`,
            status: 'completed',
            notes: `Simulated disbursement for "${m.name}" under GFR Rule 173(i)`
          })
          // Also add a notification
          addNotification({
            type: 'milestone_completed',
            title: 'Payment Released',
            message: `₹${(m.amount / 100000).toFixed(1)}L disbursed for "${m.name}" (${contract.problemTitle})`,
            targetRoles: ['department', 'startup', 'admin'],
            linkedPilotId: pilotId,
          })
        }
        return updated
      })
      return { ...contract, milestones: updatedMilestones, paymentRecords: updatedPayments }
    }))
  }, [])

  // ── Evaluation Panels (2.2) ──
  const [evaluationPanels, setEvaluationPanels] = useState(SEED_EVALUATION_PANELS)

  const submitEvaluation = useCallback((panelId, evaluatorId, scores, comments) => {
    setEvaluationPanels(prev => prev.map(panel => {
      if (panel.panelId !== panelId) return panel
      const updatedEvaluators = panel.evaluators.map(ev => {
        if (ev.evaluatorId !== evaluatorId) return ev
        return { ...ev, scores, comments, submitted: true, submittedDate: new Date().toISOString().split('T')[0] }
      })
      const allSubmitted = updatedEvaluators.every(ev => ev.submitted)
      let finalScore = null
      if (allSubmitted) {
        const allScoreArrays = updatedEvaluators.map(ev => Object.values(ev.scores))
        const flatScores = allScoreArrays.flat()
        finalScore = Math.round((flatScores.reduce((a, b) => a + b, 0) / flatScores.length) * 10) / 10
        addNotification({
          type: 'evaluation_complete',
          title: 'All Evaluations Submitted',
          message: `Expert panel ${panelId} for ${panel.startupName} has completed scoring. Final score: ${finalScore}/10`,
          targetRoles: ['department', 'admin'],
          linkedPanelId: panelId,
        })
      }
      return { ...panel, evaluators: updatedEvaluators, allSubmitted, finalScore }
    }))
  }, [])

  // ── Pilot Tracking (2.3) ──
  const [pilotTracking, setPilotTracking] = useState(SEED_PILOT_TRACKING)

  const updateKPI = useCallback((pilotId, kpiId, newCurrent) => {
    setPilotTracking(prev => prev.map(pilot => {
      if (pilot.pilotId !== pilotId) return pilot
      return {
        ...pilot,
        kpis: pilot.kpis.map(k =>
          k.id === kpiId ? { ...k, current: newCurrent, lastUpdated: new Date().toISOString().split('T')[0] } : k
        ),
      }
    }))
  }, [])

  // ── IP Clause Selections (2.4) ──
  const [ipClauseSelections, setIpClauseSelections] = useState(SEED_IP_SELECTIONS)

  const updateClauseStatus = useCallback((pilotId, clauseId, role, newStatus, flagNote) => {
    setIpClauseSelections(prev => {
      const exists = prev.some(s => s.pilotId === pilotId)
      const baseList = exists ? prev : [...prev, { pilotId, pilotType: 'Software', clauses: [] }]

      return baseList.map(sel => {
        if (sel.pilotId !== pilotId) return sel
        const clauseExists = sel.clauses.some(c => c.clauseId === clauseId)
        let updatedClauses
        if (clauseExists) {
          updatedClauses = sel.clauses.map(c => {
            if (c.clauseId !== clauseId) return c
            const updated = { ...c }
            if (role === 'department') updated.departmentStatus = newStatus
            else updated.startupStatus = newStatus
            if (flagNote !== undefined) updated.flagNote = flagNote
            return updated
          })
        } else {
          updatedClauses = [
            ...sel.clauses,
            {
              clauseId,
              departmentStatus: role === 'department' ? newStatus : 'pending',
              startupStatus: role === 'startup' ? newStatus : 'pending',
              flagNote: flagNote || ''
            }
          ]
        }

        if (newStatus === 'flagged') {
          addNotification({
            type: 'ip_clause_flagged',
            title: 'IP Clause Flagged',
            message: `A clause was flagged for review in the ${sel.pilotType} pilot contract`,
            targetRoles: role === 'department' ? ['startup'] : ['department'],
            linkedPilotId: pilotId,
          })
        }

        return { ...sel, clauses: updatedClauses }
      })
    })
  }, [])

  const initClausesForPilot = useCallback((pilotId, pilotType) => {
    const relevantClauses = IP_CLAUSE_TEMPLATES.filter(t =>
      t.pilotTypes.includes(pilotType)
    ).map(t => ({
      clauseId: t.id,
      departmentStatus: 'pending',
      startupStatus: 'pending',
      flagNote: ''
    }))
    setIpClauseSelections(prev => {
      const existing = prev.find(s => s.pilotId === pilotId)
      if (existing) {
        return prev.map(s => s.pilotId === pilotId ? { ...s, pilotType } : s)
      }
      return [...prev, { pilotId, pilotType, clauses: relevantClauses }]
    })
  }, [])

  // ── Notifications (2.5) ──
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS)

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [{
      id: Date.now(),
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    }, ...prev])
  }, [])

  const markRead = useCallback((notificationId) => {
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const value = {
    // 2.1
    milestoneContracts,
    updateMilestoneStatus,
    // 2.2
    evaluationPanels,
    evaluationCriteria: EVALUATION_CRITERIA_PANEL,
    submitEvaluation,
    // 2.3
    pilotTracking,
    updateKPI,
    // 2.4
    ipClauseTemplates: IP_CLAUSE_TEMPLATES,
    ipClauseSelections,
    updateClauseStatus,
    initClausesForPilot,
    // 2.5
    notifications,
    addNotification,
    markRead,
    markAllRead,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}

export default AppContext

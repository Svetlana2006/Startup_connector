// packages/client/src/pages/NotificationCenter.jsx
// Tier 2.5 — Notifications & Alerts System
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'
import { useAppContext } from '../AppContext'

const TYPE_CONFIG = {
  milestone_due: { label: 'Milestone Deadline', icon: 'event', color: 'text-warning', bg: 'bg-warning-container' },
  milestone_completed: { label: 'Payment Released', icon: 'payments', color: 'text-success', bg: 'bg-success-container' },
  evaluation_deadline: { label: 'Evaluation Due', icon: 'rate_review', color: 'text-error', bg: 'bg-error-container' },
  evaluation_complete: { label: 'Consensus Score', icon: 'verified', color: 'text-primary', bg: 'bg-primary-container' },
  pilot_review: { label: 'Pilot Sandbox Review', icon: 'speed', color: 'text-secondary', bg: 'bg-secondary-container' },
  ip_clause_flagged: { label: 'IP / Legal Flag', icon: 'shield', color: 'text-warning', bg: 'bg-warning-container' },
  system: { label: 'System Notice', icon: 'info', color: 'text-on-surface-variant', bg: 'bg-surface-container-high' },
}

export default function NotificationCenter({ user, onLogout }) {
  const { notifications, markRead, markAllRead, addNotification } = useAppContext()
  const [filterType, setFilterType] = useState('all')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailNotification, setEmailNotification] = useState(null)
  const [toast, setToast] = useState(null)

  function triggerToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  // Filter for current user's role
  const userNotifications = notifications.filter(n => n.targetRoles.includes(user.role))
  const filteredList = filterType === 'all'
    ? userNotifications
    : userNotifications.filter(n => n.type === filterType)

  const unreadCount = userNotifications.filter(n => !n.read).length

  function handleSimulateEmail(n) {
    setEmailNotification(n)
    setShowEmailModal(true)
  }

  function handleTriggerTestReminder() {
    addNotification({
      type: 'milestone_due',
      title: 'Automated 24-Hr SLA Reminder',
      message: 'Milestone 2 deliverable review for AquaFlow Systems (P-002) is scheduled for today.',
      targetRoles: ['department', 'startup', 'evaluator', 'admin'],
      link: '/milestones',
      linkedPilotId: 'PLT-001'
    })
    triggerToast('Automated notification & simulated email alert triggered!')
  }

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} unreadCount={unreadCount} />
      <div className="flex flex-1">
        <SideNav activeHref="/notifications" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded border border-primary/20">
                  Feature 2.5
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Automated Alerts & Dispatch Center
                </span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-primary">
                Notifications & Alerts Center
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Live automated triggers for milestone deadlines (2.1), evaluation panels (2.2), and sandbox reviews (2.3).
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTriggerTestReminder}
                className="bg-surface-container-lowest border border-primary text-primary px-3.5 py-2 rounded-lg text-label-md font-bold hover:bg-primary-fixed transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add_alert</span>
                Trigger SLA Alert
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={() => {
                    markAllRead()
                    triggerToast('All notifications marked as read.')
                  }}
                  className="bg-primary text-on-primary px-3.5 py-2 rounded-lg text-label-md font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                  Mark All as Read
                </button>
              )}
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
            <div className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">notifications_active</span>
              </div>
              <div>
                <p className="text-display-lg font-bold text-primary leading-none">{unreadCount}</p>
                <p className="text-label-sm text-on-surface-variant font-bold">Unread Alerts for Your Role</p>
              </div>
            </div>

            <div className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="w-12 h-12 rounded-xl bg-warning-container text-on-warning-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">alarm</span>
              </div>
              <div>
                <p className="text-display-lg font-bold text-warning leading-none">
                  {userNotifications.filter(n => n.type === 'milestone_due' || n.type === 'evaluation_deadline').length}
                </p>
                <p className="text-label-sm text-on-surface-variant font-bold">Pending Deadlines</p>
              </div>
            </div>

            <div className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="w-12 h-12 rounded-xl bg-success-container text-on-success-container flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <div>
                <p className="text-headline-md font-bold text-success">MahaGov Mock SMTP</p>
                <p className="text-label-sm text-on-surface-variant font-bold">Email Gateway Linked</p>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 mb-md overflow-x-auto pb-1">
            <span className="text-label-sm font-bold text-on-surface-variant shrink-0">Filter By:</span>
            {[
              { id: 'all', label: 'All Notifications' },
              { id: 'milestone_due', label: 'Milestone Deadlines' },
              { id: 'evaluation_deadline', label: 'Evaluation Panels' },
              { id: 'pilot_review', label: 'Pilot Reviews' },
              { id: 'milestone_completed', label: 'Disbursements' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 rounded-full text-label-sm font-bold whitespace-nowrap transition-all ${
                  filterType === f.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-lg">
            {filteredList.length === 0 ? (
              <div className="p-xl text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">notifications_off</span>
                <p className="font-bold text-label-md">No notifications matching this filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-surface-container-high">
                {filteredList.map(n => {
                  const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.system
                  return (
                    <div
                      key={n.id}
                      className={`p-md md:p-lg transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md ${
                        n.read ? 'bg-surface-container-lowest' : 'bg-primary/5 font-semibold'
                      }`}
                    >
                      <div className="flex items-start gap-md">
                        <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                          <span className={`material-symbols-outlined ${cfg.color} text-[22px]`}>
                            {cfg.icon}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                              {cfg.label}
                            </span>
                            {!n.read && (
                              <span className="w-2.5 h-2.5 rounded-full bg-error shrink-0 animate-ping" title="Unread" />
                            )}
                            <span className="text-[12px] text-on-surface-variant font-normal">
                              {new Date(n.createdAt).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          <h3 className="text-headline-md text-on-surface font-bold text-[16px]">
                            {n.title}
                          </h3>
                          <p className="text-body-md text-on-surface-variant text-[14px] mt-0.5 max-w-2xl font-normal">
                            {n.message}
                          </p>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleSimulateEmail(n)}
                          className="px-3 py-1.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/5 text-label-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                          title="Inspect simulated email payload"
                        >
                          <span className="material-symbols-outlined text-[17px] text-primary">mail</span>
                          Email Preview
                        </button>

                        {n.link && (
                          <Link
                            to={n.link}
                            onClick={() => markRead(n.id)}
                            className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold hover:opacity-90 flex items-center gap-1 shadow-sm"
                          >
                            Open Workflow →
                          </Link>
                        )}

                        {!n.read && (
                          <button
                            onClick={() => {
                              markRead(n.id)
                              triggerToast('Marked as read.')
                            }}
                            className="p-1.5 hover:bg-surface-container-high rounded-full text-on-surface-variant"
                            title="Mark as read"
                          >
                            <span className="material-symbols-outlined text-[18px]">done</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Modal: Redesigned Beautiful Official Email View with Explicit Width */}
          {showEmailModal && emailNotification && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
              <div
                style={{ width: '100%', maxWidth: '680px', minWidth: '320px' }}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[90vh] mx-auto my-auto"
              >
                {/* Window Header */}
                <div className="bg-primary text-on-primary px-5 py-3.5 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary-container">mark_email_read</span>
                    <div>
                      <h3 className="font-bold text-label-md leading-none">MahaGov Mail — Official Notice Dispatch</h3>
                      <p className="text-[11px] text-on-primary-container/80 mt-0.5">Government of Maharashtra Public Procurement Sandbox</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-on-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Email Client Content Area */}
                <div className="p-5 md:p-6 overflow-y-auto space-y-4 bg-surface text-on-surface">
                  {/* Email Headers Card */}
                  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-4 shadow-sm space-y-2 text-[13px]">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-outline-variant/40 gap-1">
                      <span className="text-on-surface-variant"><strong>From:</strong> MSInS Automated Procurement System &lt;alerts-no-reply@msins.maharashtra.gov.in&gt;</span>
                      <span className="text-[11px] font-mono text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">SSL / TLS Signed</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-outline-variant/40">
                      <span className="text-on-surface-variant"><strong>To:</strong> {user?.name || 'Department Official'} &lt;{user?.role || 'official'}@portal.maharashtra.gov.in&gt;</span>
                      <span className="text-[11px] text-on-surface-variant">Role: {user?.role}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-on-surface font-bold"><strong>Subject:</strong> [GovBridge Official Notice] {emailNotification.title}</span>
                      <span className="text-[11px] text-on-surface-variant">
                        {new Date(emailNotification.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Letterhead Body */}
                  <div className="bg-white rounded-xl border border-outline-variant/80 p-6 shadow-sm space-y-4">
                    {/* Official Emblem Banner */}
                    <div className="flex items-center justify-between border-b border-outline-variant/50 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">
                          MS
                        </div>
                        <div>
                          <p className="font-bold text-[14px] text-primary leading-tight">MAHARASHTRA STATE INNOVATION SOCIETY</p>
                          <p className="text-[11px] text-on-surface-variant">Dept. of Skills, Employment, Entrepreneurship & Innovation</p>
                        </div>
                      </div>
                      <span className="text-[11px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded border border-primary/20 uppercase tracking-wider">
                        GFR Rule 173(i)
                      </span>
                    </div>

                    {/* Notice Subject Banner */}
                    <div className="p-3.5 bg-primary-container text-on-primary-container rounded-xl flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-secondary-container">priority_high</span>
                      <div>
                        <h4 className="font-bold text-[15px] text-white">{emailNotification.title}</h4>
                        <p className="text-[12px] text-on-primary-container mt-0.5">Automated System Notice Ref: #MSINS-NTF-00{emailNotification.id}</p>
                      </div>
                    </div>

                    {/* Formal Message Text */}
                    <div className="text-[14px] text-on-surface leading-relaxed space-y-3">
                      <p>Dear {user?.name || 'Sir / Madam'},</p>
                      <p className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60 font-medium">
                        {emailNotification.message}
                      </p>
                      <p>
                        Please log in to your authenticated workspace on the MSInS Public Procurement Hub to review and take necessary action in accordance with standard procurement SLAs.
                      </p>
                    </div>

                    {/* Meta Table */}
                    <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-lg p-3 text-[12px] grid grid-cols-2 gap-2">
                      <div><strong className="text-on-surface-variant">Initiative ID:</strong> P-002 (Canal Water Wastage)</div>
                      <div><strong className="text-on-surface-variant">Sandbox Entity:</strong> AquaFlow Systems</div>
                      <div><strong className="text-on-surface-variant">Statutory Authority:</strong> GFR Rule 173(i) Waiver</div>
                      <div><strong className="text-on-surface-variant">Status:</strong> Immediate Action Required</div>
                    </div>

                    {/* CTA Link */}
                    {emailNotification.link && (
                      <div className="pt-2 text-center">
                        <Link
                          to={emailNotification.link}
                          onClick={() => {
                            setShowEmailModal(false)
                            markRead(emailNotification.id)
                          }}
                          className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md"
                        >
                          <span className="material-symbols-outlined text-[18px]">launch</span>
                          Open Workflow in Portal
                        </Link>
                      </div>
                    )}

                    {/* Sign-off */}
                    <div className="pt-4 border-t border-outline-variant/40 text-[12px] text-on-surface-variant">
                      <p className="font-bold text-primary">Directorate of Public Procurement Innovation</p>
                      <p>Maharashtra State Innovation Society (MSInS), Government of Maharashtra</p>
                      <p className="text-[10px] text-on-surface-variant/70 mt-1">
                        CONFIDENTIALITY NOTICE: This transmission is intended solely for the designated recipient.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-surface-container-low border-t border-outline-variant flex justify-between items-center shrink-0">
                  <span className="text-[12px] text-on-surface-variant">Simulated SMTP Relay: OK</span>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="px-5 py-2 bg-primary text-on-primary rounded-xl text-label-md font-bold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div className="bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl border border-primary-container flex items-center gap-2 text-label-md font-bold">
                <span className="material-symbols-outlined text-secondary-container">mark_email_read</span>
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

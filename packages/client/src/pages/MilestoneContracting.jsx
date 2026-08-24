// packages/client/src/pages/MilestoneContracting.jsx
// Tier 2.1 — Milestone-Based Contracting Workflow
import { useState } from "react";
import { SideNav, TopNav, AppFooter } from "@govbridge/ui";
import { useAppContext } from "../AppContext";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: "hourglass_empty",
    bg: "bg-surface-container-high",
    text: "text-on-surface-variant",
  },
  in_progress: {
    label: "In Progress",
    icon: "pending",
    bg: "bg-warning-container",
    text: "text-on-warning-container",
  },
  submitted: {
    label: "Submitted (Ready for Review)",
    icon: "upload_file",
    bg: "bg-primary-fixed text-primary",
    text: "text-primary font-bold",
  },
  approved: {
    label: "Approved & Disbursed",
    icon: "verified",
    bg: "bg-success text-on-primary",
    text: "text-on-primary font-bold",
  },
  paid: {
    label: "Paid (GFR Disbursed)",
    icon: "payments",
    bg: "bg-success text-on-primary",
    text: "text-on-primary font-bold",
  },
};

export default function MilestoneContracting({ user, onLogout }) {
  const { milestoneContracts, updateMilestoneStatus, notifications } =
    useAppContext();
  const [selectedPilotId, setSelectedPilotId] = useState("PLT-001");
  const [showAddModal, setShowAddModal] = useState(false);
  const [actingRole, setActingRole] = useState(user.role || "department");
  const [toast, setToast] = useState(null);
  const [isScanningAgreement, setIsScanningAgreement] = useState(false);
  const [hasScanResults, setHasScanResults] = useState(false);

  // Form state for new milestone
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const activeContract =
    milestoneContracts.find((c) => c.pilotId === selectedPilotId) ||
    milestoneContracts[0];

  const totalAllocated = activeContract?.totalBudget || 0;
  const totalPaid =
    activeContract?.milestones
      ?.filter((m) => m.status === "paid" || m.status === "approved")
      ?.reduce((sum, m) => sum + m.amount, 0) || 0;
  const paidPercent =
    totalAllocated > 0 ? Math.round((totalPaid / totalAllocated) * 100) : 0;

  const unreadAlerts = notifications.filter(
    (n) => !n.read && n.targetRoles.includes(user.role),
  ).length;

  function triggerToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  }

  function handleStatusChange(milestoneId, newStatus) {
    updateMilestoneStatus(activeContract.pilotId, milestoneId, newStatus);
    const milestone = activeContract.milestones.find(
      (m) => m.id === milestoneId,
    );
    if (newStatus === "submitted") {
      triggerToast(
        `Deliverables submitted for "${milestone?.name}". Sent to Department Official for review.`,
      );
    } else if (newStatus === "approved") {
      triggerToast(
        `Milestone approved! ₹${(milestone?.amount / 100000).toFixed(1)}L simulated disbursement executed via GFR 173(i) ledger.`,
      );
    } else {
      triggerToast(
        `Milestone status updated to "${newStatus.replace("_", " ")}".`,
      );
    }
  }

  function handleScanAgreement() {
    setIsScanningAgreement(true);
    setHasScanResults(false);
    setTimeout(() => {
      setIsScanningAgreement(false);
      setHasScanResults(true);
    }, 1000);
  }

  function handleAddMilestone(e) {
    e.preventDefault();
    if (!newName || !newAmount || !newDueDate) return;
    const amt = parseFloat(newAmount) * 100000;
    const pct =
      totalAllocated > 0 ? ((amt / totalAllocated) * 100).toFixed(1) : 25;

    const newId = (activeContract.milestones?.length || 0) + 1;
    const newM = {
      id: newId,
      name: newName,
      description: newDesc || "Jointly agreed milestone deliverable",
      dueDate: newDueDate,
      amount: amt,
      percentage: Number(pct),
      status: "pending",
      deliverableUrl: "",
      submittedDate: null,
      approvedDate: null,
      paidDate: null,
    };

    activeContract.milestones.push(newM);
    setShowAddModal(false);
    setNewName("");
    setNewDesc("");
    setNewDueDate("");
    setNewAmount("");
    triggerToast(
      `New milestone "${newName}" added to pilot contract ${activeContract.pilotId}.`,
    );
  }

  const isDept = actingRole === "department" || actingRole === "admin";
  const isStartup = actingRole === "startup" || actingRole === "admin";

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} unreadCount={unreadAlerts} />
      <div className="flex flex-1">
        <SideNav activeHref="/milestones" />
        <main className="flex-1 md:ml-64 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded border border-primary/20">
                  Feature 2.1
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  GFR Rule 173(i) Milestone Contracting
                </span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-primary">
                Milestone-Based Contracting & Payments
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Jointly define deliverables, review milestone submissions, and
                auto-disburse staged payments.
              </p>
            </div>

            {/* Pilot Selector & Role Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Role Toggle for seamless demo testing */}
              <div className="bg-surface-container-low p-1 rounded-lg border border-outline-variant flex items-center gap-1 text-[12px] font-bold">
                <span className="px-2 text-on-surface-variant">Role View:</span>
                <button
                  onClick={() => setActingRole("department")}
                  className={`px-2.5 py-1 rounded transition-all ${
                    actingRole === "department"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  Dept. Official
                </button>
                <button
                  onClick={() => setActingRole("startup")}
                  className={`px-2.5 py-1 rounded transition-all ${
                    actingRole === "startup"
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  Startup
                </button>
              </div>

              <select
                value={selectedPilotId}
                onChange={(e) => {
                  setSelectedPilotId(e.target.value);
                  setHasScanResults(false);
                  setIsScanningAgreement(false);
                }}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-label-md font-bold text-primary focus:ring-2 focus:ring-primary outline-none"
              >
                {milestoneContracts.map((c) => (
                  <option key={c.pilotId} value={c.pilotId}>
                    {c.pilotId}: {c.startupName} ({c.problemId})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pilot Summary Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg mb-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md pb-md border-b border-outline-variant">
              <div>
                <span className="text-label-sm text-on-surface-variant">
                  Pilot Reference
                </span>
                <p className="text-headline-md font-bold text-primary">
                  {activeContract.pilotId}
                </p>
                <p className="text-label-sm text-on-surface-variant">
                  {activeContract.dept}
                </p>
              </div>
              <div>
                <span className="text-label-sm text-on-surface-variant">
                  Selected Startup
                </span>
                <p className="text-body-lg font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-success text-[18px]">
                    verified
                  </span>
                  {activeContract.startupName}
                </p>
                <p className="text-label-sm text-on-surface-variant">
                  DPIIT Recognized · GFR 173(i)
                </p>
              </div>
              <div>
                <span className="text-label-sm text-on-surface-variant">
                  Problem Challenge
                </span>
                <p
                  className="text-body-md font-bold text-on-surface truncate"
                  title={activeContract.problemTitle}
                >
                  {activeContract.problemTitle}
                </p>
                <p className="text-label-sm text-secondary font-bold">
                  Challenge ID: {activeContract.problemId}
                </p>
              </div>
              <div>
                <span className="text-label-sm text-on-surface-variant">
                  Total Pilot Grant / Cap
                </span>
                <p className="text-headline-md font-bold text-primary">
                  ₹{(totalAllocated / 100000).toFixed(1)} Lakh
                </p>
                <p className="text-label-sm text-success font-bold">
                  Escrow Disbursement
                </p>
              </div>
            </div>

            {/* Financial Progress Bar */}
            <div className="pt-md">
              <div className="flex justify-between items-center mb-1 text-label-sm font-bold">
                <span className="text-success flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    payments
                  </span>
                  Disbursed: ₹{(totalPaid / 100000).toFixed(1)} Lakh (
                  {paidPercent}%)
                </span>
                <span className="text-on-surface-variant">
                  Remaining in Escrow: ₹
                  {((totalAllocated - totalPaid) / 100000).toFixed(1)} Lakh
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                <div
                  className="bg-success h-full transition-all duration-700 rounded-full"
                  style={{ width: `${paidPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Milestones Table Section */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-lg">
            <div className="p-md md:p-lg border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
              <div>
                <h2 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    view_timeline
                  </span>
                  Contract Milestones ({activeContract.milestones?.length || 0})
                </h2>
                <p className="text-label-sm text-on-surface-variant">
                  Status flow:{" "}
                  <span className="font-bold text-on-surface">
                    Pending → In Progress → Submitted → Approved & Disbursed
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-on-primary text-label-md font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add_circle
                </span>
                Define Milestone
              </button>
              <button
                onClick={handleScanAgreement}
                disabled={isScanningAgreement}
                className="bg-secondary text-on-secondary text-label-md font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-wait"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${isScanningAgreement ? "animate-spin" : ""}`}
                >
                  {isScanningAgreement
                    ? "progress_activity"
                    : "document_scanner"}
                </span>
                {isScanningAgreement
                  ? "Scanning Agreement..."
                  : "Scan Agreement for Red Flags"}
              </button>
            </div>

            {(isScanningAgreement || hasScanResults) && (
              <div
                className="mx-md md:mx-lg mb-md rounded-lg border border-outline-variant bg-surface-container-low overflow-hidden"
                aria-live="polite"
              >
                {isScanningAgreement ? (
                  <div className="flex items-center gap-3 p-md text-label-md font-bold text-primary">
                    <span className="material-symbols-outlined animate-spin text-[22px]">
                      progress_activity
                    </span>
                    AI is reviewing clauses against the standard pilot
                    agreement...
                  </div>
                ) : (
                  <div className="p-md md:p-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm mb-md">
                      <div>
                        <h3 className="text-headline-md font-bold text-primary flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">
                            psychology
                          </span>
                          AI Contract Analysis
                        </h3>
                        <p className="text-label-sm text-on-surface-variant mt-1">
                          Automated review completed for{" "}
                          {activeContract.startupName}&apos;s pilot agreement.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning-container text-on-warning-container text-[11px] font-bold">
                        <span className="material-symbols-outlined text-[14px]">
                          warning
                        </span>
                        1 red flag detected
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
                      <div className="p-md rounded-lg border border-error/30 bg-error-container/30">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-label-md font-bold text-on-error-container">
                            Exit Clause
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full bg-error text-on-primary px-2 py-0.5 text-[10px] font-bold whitespace-nowrap">
                            <span className="material-symbols-outlined text-[13px]">
                              error
                            </span>
                            Missing / Risky
                          </span>
                        </div>
                        <p className="text-[11px] text-on-error-container mt-2">
                          No mutually agreed termination trigger found.
                        </p>
                      </div>

                      <div className="p-md rounded-lg border border-success/30 bg-success-container/30">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-label-md font-bold text-on-success-container">
                            Data Protection Clause
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full bg-success text-on-primary px-2 py-0.5 text-[10px] font-bold whitespace-nowrap">
                            <span className="material-symbols-outlined text-[13px]">
                              check_circle
                            </span>
                            Present / Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-on-success-container mt-2">
                          State data handling and breach notification terms
                          detected.
                        </p>
                      </div>

                      <div className="p-md rounded-lg border border-success/30 bg-success-container/30">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-label-md font-bold text-on-success-container">
                            IP &amp; Ownership Rights
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full bg-success text-on-primary px-2 py-0.5 text-[10px] font-bold whitespace-nowrap">
                            <span className="material-symbols-outlined text-[13px]">
                              check_circle
                            </span>
                            Present / Standard
                          </span>
                        </div>
                        <p className="text-[11px] text-on-success-container mt-2">
                          Standard ownership and licensing language detected.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-label-sm font-bold text-on-surface-variant border-b border-outline-variant">
                    <th className="p-md">#</th>
                    <th className="p-md">Milestone & Scope</th>
                    <th className="p-md">Due Date</th>
                    <th className="p-md">Tranche Amount</th>
                    <th className="p-md">Current Status</th>
                    <th className="p-md text-right">
                      Workflow & Approval Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-body-md divide-y divide-surface-container-high">
                  {activeContract.milestones?.map((m, idx) => {
                    const cfg =
                      STATUS_CONFIG[m.status] || STATUS_CONFIG.pending;
                    const isPaid =
                      m.status === "paid" || m.status === "approved";
                    const isSubmitted = m.status === "submitted";
                    const isInProgress = m.status === "in_progress";

                    return (
                      <tr
                        key={m.id}
                        className="hover:bg-surface-container-low/50 transition-colors"
                      >
                        <td className="p-md font-mono font-bold text-primary">
                          {idx + 1}
                        </td>
                        <td className="p-md max-w-md">
                          <p className="font-bold text-on-surface text-[15px]">
                            {m.name}
                          </p>
                          <p className="text-label-sm text-on-surface-variant mt-0.5">
                            {m.description}
                          </p>
                          {m.deliverableUrl && (
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={m.deliverableUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-bold bg-primary/10 px-2 py-0.5 rounded"
                              >
                                <span className="material-symbols-outlined text-[13px]">
                                  description
                                </span>
                                View Deliverable DPR
                              </a>
                              {m.submittedDate && (
                                <span className="text-[11px] text-on-surface-variant">
                                  Submitted: {m.submittedDate}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="p-md whitespace-nowrap text-label-sm text-on-surface">
                          <div className="flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                              calendar_today
                            </span>
                            {m.dueDate}
                          </div>
                        </td>
                        <td className="p-md whitespace-nowrap">
                          <p className="font-bold text-primary text-[16px]">
                            ₹{(m.amount / 100000).toFixed(1)} Lakh
                          </p>
                          <p className="text-[11px] text-on-surface-variant">
                            {m.percentage}% of grant cap
                          </p>
                        </td>
                        <td className="p-md whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label-sm font-bold ${cfg.bg} ${cfg.text}`}
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              {cfg.icon}
                            </span>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="p-md whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* 1. START WORK button */}
                            {m.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(m.id, "in_progress")
                                }
                                className="px-3 py-1.5 bg-warning-container text-on-warning-container rounded-lg text-label-sm font-bold hover:opacity-90 flex items-center gap-1 shadow-sm"
                                title="Start work on this milestone deliverable"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  play_arrow
                                </span>
                                Start Work
                              </button>
                            )}

                            {/* 2. SUBMIT DELIVERABLE button (Startup or Admin) */}
                            {isInProgress && (
                              <button
                                onClick={() =>
                                  handleStatusChange(m.id, "submitted")
                                }
                                className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold hover:opacity-90 flex items-center gap-1 shadow-sm"
                                title="Submit deliverable report for review"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  upload_file
                                </span>
                                Submit Deliverable
                              </button>
                            )}

                            {/* 3. APPROVE & DISBURSE button (Department Official & Admin) */}
                            {(isSubmitted || (isInProgress && isDept)) && (
                              <button
                                onClick={() =>
                                  handleStatusChange(m.id, "approved")
                                }
                                className="px-4 py-1.5 bg-success text-on-primary rounded-lg text-label-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md animate-pulse hover:animate-none"
                                title="Approve deliverable and trigger simulated payment"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  check_circle
                                </span>
                                Approve & Disburse (₹
                                {(m.amount / 100000).toFixed(1)}L)
                              </button>
                            )}

                            {/* 4. DISBURSED indicator */}
                            {isPaid && (
                              <span className="inline-flex items-center gap-1 text-label-sm text-success font-bold bg-success-container px-3 py-1 rounded-lg">
                                <span className="material-symbols-outlined text-[16px]">
                                  receipt_long
                                </span>
                                Payment Released
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Ledger / Simulated GFR Tranches */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md md:p-lg mb-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm mb-md pb-sm border-b border-outline-variant">
              <div>
                <h3 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-success">
                    account_balance
                  </span>
                  Simulated GFR Rule 173(i) Payment Ledger (
                  {activeContract.paymentRecords?.length || 0})
                </h3>
                <p className="text-label-sm text-on-surface-variant">
                  Audit-compliant disbursement records tied directly to verified
                  milestone deliverables.
                </p>
              </div>
              <span className="text-[11px] font-bold text-success bg-success-container px-3 py-1 rounded-full">
                Direct State Treasury Gateway
              </span>
            </div>

            {activeContract.paymentRecords?.length === 0 ? (
              <div className="p-md bg-surface-container-low rounded-lg text-center text-on-surface-variant text-label-md">
                No milestone payments have been released yet. Approving a
                milestone automatically executes simulated release.
              </div>
            ) : (
              <div className="space-y-sm">
                {activeContract.paymentRecords.map((pay, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-md bg-surface-container-low rounded-lg border border-outline-variant/60 gap-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-label-md font-bold text-primary">
                          {pay.reference}
                        </span>
                        <span className="bg-success-container text-on-success-container text-[11px] font-bold px-2 py-0.5 rounded-full">
                          Disbursement Success
                        </span>
                      </div>
                      <p className="text-label-sm text-on-surface-variant mt-0.5">
                        Released to{" "}
                        <strong>{activeContract.startupName}</strong> on{" "}
                        {pay.date} · {pay.notes || "Milestone approval trigger"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-headline-md font-bold text-success">
                        + ₹{(pay.amount / 100000).toFixed(2)} Lakh
                      </span>
                      <p className="text-[10px] text-on-surface-variant font-mono">
                        ID: MSINS-PAY-00{pay.milestoneId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal: Define Joint Milestone with Explicit Width */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div
                style={{ width: "100%", maxWidth: "560px", minWidth: "320px" }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden flex flex-col mx-auto my-auto"
              >
                <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
                  <h3 className="text-headline-md font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      add_task
                    </span>
                    Define Joint Milestone
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <form onSubmit={handleAddMilestone} className="space-y-md">
                  <div>
                    <label className="block text-label-sm font-bold text-on-surface mb-1">
                      Milestone Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Field Sensor Calibration Phase 2"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-body-md focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-label-sm font-bold text-on-surface mb-1">
                      Deliverable Scope & Criteria
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Describe target outcomes, test criteria, and deliverables for sign-off..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-body-md focus:border-primary outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <label className="block text-label-sm font-bold text-on-surface mb-1">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-body-md focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-label-sm font-bold text-on-surface mb-1">
                        Tranche (in ₹ Lakh) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        placeholder="e.g. 2.5"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded-lg p-sm text-body-md focus:border-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-md border-t border-outline-variant">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-outline rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90"
                    >
                      Save Milestone
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Toast Notification */}
          {toast && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div className="bg-primary text-on-primary px-4 py-3 rounded-lg shadow-lg border border-primary-container flex items-center gap-2 text-label-md font-bold">
                <span className="material-symbols-outlined text-secondary-container">
                  task_alt
                </span>
                {toast}
              </div>
            </div>
          )}
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

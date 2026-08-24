// 1.7 — Public Status Tracker (public_transparency_tracker)
import { SideNav, TopNav, AppFooter } from "@govbridge/ui";

const PIPELINE_STAGES = [
  { label: "Posted", icon: "check", done: true, active: false },
  { label: "Applied", icon: "check", done: true, active: false },
  { label: "Evaluation", icon: "check", done: true, active: false },
  { label: "Piloting", icon: "rocket_launch", done: false, active: true },
  { label: "Validated", icon: "verified", done: false, active: false },
  { label: "Scaling", icon: "trending_up", done: false, active: false },
];

const ACTIVITY_LOG = [
  {
    title: "Transitioned to Piloting",
    time: "Oct 24, 2024 - 14:32",
    desc: "Evaluation committee approved Phase 1 pilot implementation in District A.",
    hash: "0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    dotColor: "bg-primary",
  },
  {
    title: "Evaluation Completed",
    time: "Oct 20, 2024 - 09:15",
    desc: "Technical and financial assessments concluded.",
    hash: "0x5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    dotColor: "bg-outline",
  },
  {
    title: "Application Received",
    time: "Oct 15, 2024 - 11:45",
    desc: "Initial vendor submission recorded.",
    hash: "0xb532c144d6b63d76717a6c016e3e1db6e399a9b6c0750529b43e8820f4c9c488",
    dotColor: "bg-outline",
  },
  {
    title: "Department Verification Completed",
    time: "Oct 12, 2024 - 16:08",
    desc: "Department officer verified startup eligibility and pilot documentation.",
    hash: "0x7d3c1a8e4f90b2d6c118ee3a5b7f42d8c901a6e4f3b2d7798a0c5e6f1d4b9c20",
    dotColor: "bg-outline",
  },
  {
    title: "Pilot Agreement Signed",
    time: "Oct 08, 2024 - 10:21",
    desc: "Startup and department countersigned the pilot milestone agreement.",
    hash: "0x2a6f8c4e1b9d7035e2c8a1f6d4b0e9c7a3f5b8d2e6c1a4f907e3b5d8c2f6a10",
    dotColor: "bg-outline",
  },
];

const PILOT_METRICS = [
  ["Districts Involved", "4"],
  ["Allocated Budget", "₹1.2 Cr"],
  ["Target Completion", "Dec 2024"],
];

export default function PublicTracker({ user, onLogout }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <SideNav activeHref="/tracker" />
        <main className="flex-1 md:ml-64 p-md md:p-lg overflow-y-auto max-w-[1280px] mx-auto w-full">
          <div className="mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-on-background mb-xs">
              Public Status Tracker
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-3xl">
              Transparent lifecycle tracking for high-priority platform
              initiatives. All milestone transitions are cryptographically
              hashed for auditability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Full-width progress bar */}
            <section className="lg:col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md lg:p-lg">
              <div className="border-b border-outline-variant pb-sm mb-md flex justify-between items-center">
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  Initiative: Smart Grid Pilot Alpha
                </h2>
                <span className="bg-[#e6f4ea] text-[#137333] px-sm py-xs rounded-full text-label-sm font-label-sm font-bold border border-[#ceead6] flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[14px]">
                    check_circle
                  </span>{" "}
                  Active Phase: Piloting
                </span>
              </div>
              {/* Horizontal pipeline */}
              <div className="relative pt-xl pb-lg px-md">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-high -translate-y-1/2 z-0 rounded-full" />
                <div className="absolute top-1/2 left-0 w-3/5 h-1 bg-primary -translate-y-1/2 z-0 rounded-full" />
                <div className="relative z-10 flex justify-between items-center w-full">
                  {PIPELINE_STAGES.map((stage, i) => (
                    <div key={i} className="flex flex-col items-center gap-sm">
                      <div
                        className={`flex items-center justify-center text-[14px] shadow-sm border-2 border-surface-container-lowest
                        ${
                          stage.active
                            ? "w-10 h-10 rounded-full bg-primary-container text-on-primary-container shadow-md border-4 animate-pulse"
                            : stage.done
                              ? "w-8 h-8 rounded-full bg-primary text-on-primary"
                              : "w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined ${stage.active ? "text-[20px] fill-icon" : "text-[16px]"}`}
                        >
                          {stage.icon}
                        </span>
                      </div>
                      <span
                        className={`text-label-md font-label-md text-center
                        ${stage.active ? "text-primary font-bold" : stage.done ? "text-on-surface font-bold" : "text-on-surface-variant"}`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Live Transparency Ledger (8 cols) */}
            <section className="lg:col-span-8 rounded-xl border border-[#263b33] bg-[#101815] text-[#d7e8df] shadow-lg p-md lg:p-lg flex flex-col h-full overflow-hidden">
              <div className="border-b border-[#294238] pb-sm mb-md flex items-start justify-between gap-md">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#62d49a] text-[18px]">
                      terminal
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#62d49a] font-bold">
                      Live Transparency Ledger
                    </span>
                  </div>
                  <h3 className="text-body-lg font-body-lg font-bold text-white">
                    Immutable Activity Ledger
                  </h3>
                  <p className="text-label-sm font-label-sm text-[#9bb4a7]">
                    Append-only status changes and updates.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#315644] bg-[#17271f] px-2.5 py-1 text-[10px] font-bold text-[#62d49a] whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#62d49a] animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="flex-1 max-h-[430px] overflow-y-auto pr-sm space-y-md scrollbar-thin">
                {ACTIVITY_LOG.map((log, i) => (
                  <div key={i} className="flex gap-md font-mono">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#62d49a]" : "bg-[#55756a]"} mt-1`}
                      />
                      {i < ACTIVITY_LOG.length - 1 && (
                        <div className="w-px h-full bg-[#294238] my-1" />
                      )}
                    </div>
                    <div className="pb-md w-full">
                      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-xs mb-xs">
                        <h4 className="text-label-md font-bold text-white">
                          {log.title}
                        </h4>
                        <span className="text-[11px] text-[#9bb4a7] whitespace-nowrap">
                          {log.time}
                        </span>
                      </div>
                      <p className="text-[12px] font-sans text-[#b8ccc1] mb-sm">
                        {log.desc}
                      </p>
                      <div className="bg-[#0a100d] p-sm rounded-md text-[10px] text-[#62d49a] break-all border border-[#294238]">
                        <span className="text-[#739b88]">sha256:</span>{" "}
                        {log.hash}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Decision + Metrics (4 cols) */}
            <section className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Scale-up decision */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md lg:p-lg flex flex-col">
                <div className="border-b border-outline-variant pb-sm mb-md">
                  <h3 className="text-body-lg font-body-lg font-bold text-on-surface">
                    Scale-up Decision
                  </h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center py-lg">
                  <div className="w-16 h-16 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#92400e] mb-md shadow-sm border border-[#fde68a]">
                    <span className="material-symbols-outlined text-[32px]">
                      pending_actions
                    </span>
                  </div>
                  <h4 className="text-headline-md font-headline-md text-on-surface text-center mb-xs">
                    Pending Validation
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant text-center mb-md">
                    Statewide adoption recommendation awaits pilot conclusion
                    data.
                  </p>
                  <div className="w-full bg-surface-container-low rounded-lg p-sm border border-outline-variant mt-auto">
                    <div className="flex justify-between items-center mb-xs">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">
                        Pilot Progress
                      </span>
                      <span className="text-label-sm font-label-sm font-bold text-primary">
                        65%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Quick metrics */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md lg:p-lg">
                <div className="border-b border-outline-variant pb-sm mb-md">
                  <h3 className="text-label-md font-label-md font-bold text-on-surface">
                    Pilot Metrics
                  </h3>
                </div>
                <ul className="space-y-sm">
                  {PILOT_METRICS.map(([k, v]) => (
                    <li
                      key={k}
                      className="flex justify-between items-center py-xs border-b border-surface-container-high last:border-0"
                    >
                      <span className="text-label-md font-label-md text-on-surface-variant">
                        {k}
                      </span>
                      <span className="text-body-md font-body-md font-bold text-on-surface">
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

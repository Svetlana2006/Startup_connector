// 1.5 — Evaluator Scoring Screen (expert_evaluation_rubric)
import { useState } from 'react'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const CRITERIA = [
  { id: 1, icon: 'lightbulb', label: 'Technical Innovation', desc: 'Assesses the novelty of the approach and use of cutting-edge technology relative to existing solutions.' },
  { id: 2, icon: 'construction', label: 'Feasibility', desc: 'Likelihood of successful implementation within the proposed timeframe and environment.' },
  { id: 3, icon: 'payments', label: 'Cost-Effectiveness', desc: 'Value for money, clarity of budget breakdown, and long-term OPEX implications.' },
  { id: 4, icon: 'groups', label: 'Team Capability', desc: 'Past experience, domain expertise, and technical skills of the proposed team.' },
]

const LEADERBOARD = [
  { rank: 1, name: 'Nexus Analytics Solutions', proposal: 'Urban Traffic AI Optimization', scores: [7, 8, 6, 9], total: 30.8, isCurrent: true },
  { rank: 2, name: 'DataMotive India', proposal: 'Sensor-Grid ML Framework', scores: [8.5, 6, 5.5, 8.5], total: 28.5, isCurrent: false },
  { rank: 3, name: 'SmartCity Innovators', proposal: 'IoT Traffic Flow Controller', scores: [6, 7.5, 8, 6.5], total: 28.0, isCurrent: false },
]

export default function EvaluatorScoring({ user, onLogout }) {
  const [scores, setScores] = useState({ 1: 7, 2: 8, 3: 6, 4: 9 })
  const [comments, setComments] = useState({ 1: 'Solid edge-computing approach, but reliance on existing CCTV quality might be a bottleneck.', 2: '', 3: '', 4: '' })
  const [submitted, setSubmitted] = useState(false)

  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const pct = Math.round((total / 40) * 100)

  return (
    <div className="bg-surface text-on-surface font-body-md flex min-h-screen">
      <SideNav activeHref="/evaluate" />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <TopNav user={user} onLogout={onLogout} />
        <main className="flex-1 p-md md:p-lg lg:p-gutter max-w-[1280px] mx-auto w-full flex flex-col gap-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md border-b border-outline-variant pb-md">
            <div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">In Review</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> Due in 2 days
                </span>
              </div>
              <h1 className="text-display-lg font-display-lg text-primary">Urban Traffic AI Optimization</h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-sm max-w-2xl">
                Submitted by: <strong className="text-on-surface">Nexus Analytics Solutions</strong> | RFP Ref: <a className="text-primary underline" href="#">#TRF-902</a>
              </p>
            </div>
            <div className="flex gap-md">
              <button className="px-md py-sm bg-surface-container text-on-surface text-label-md font-label-md rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">download</span> PDF
              </button>
              <button
                className={`px-md py-sm text-label-md font-label-md rounded-lg shadow-sm flex items-center gap-xs transition-colors ${submitted ? 'bg-success-container text-on-success-container cursor-default' : 'bg-primary text-on-primary hover:opacity-90'}`}
                onClick={() => setSubmitted(true)}
                disabled={submitted}
              >
                {submitted ? <><span className="material-symbols-outlined text-[18px]">task_alt</span> Score Submitted</> : <>Submit Final Score <span className="material-symbols-outlined text-[18px]">send</span></>}
              </button>
            </div>
          </div>

          {/* Split view */}
          <div className="flex flex-col xl:flex-row gap-lg flex-1">
            {/* Left: Proposal Viewer */}
            <div className="xl:w-7/12 flex flex-col gap-md">
              <div className="bento-item p-md flex flex-col">
                <div className="flex justify-between items-center border-b border-surface-container-high pb-sm mb-sm">
                  <h3 className="text-headline-md font-headline-md text-primary flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary-container">description</span>
                    Executive Summary
                  </h3>
                </div>
                <div className="text-body-md font-body-md text-on-surface-variant leading-relaxed space-y-md">
                  <p>Nexus Analytics proposes deploying a distributed edge-computing AI framework to analyze real-time traffic flow across 45 major metropolitan intersections. The solution utilizes existing CCTV infrastructure, reducing CAPEX by an estimated 40% compared to traditional sensor installations.</p>
                  <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant my-md">
                    <h4 className="text-label-md font-label-md text-on-surface font-bold mb-sm">Key Deliverables</h4>
                    <ul className="list-disc pl-md space-y-xs">
                      <li>Integration with current traffic light control APIs.</li>
                      <li>Predictive congestion modeling with claimed 85% accuracy.</li>
                      <li>Dashboard deployment within 12 weeks of contract signing.</li>
                    </ul>
                  </div>
                  <p>The system relies on proprietary computer vision algorithms trained specifically on dense urban Indian traffic patterns, accounting for heterogeneous vehicle types (two-wheelers, auto-rickshaws, commercial trucks).</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {/* Budget */}
                <div className="bento-item p-md flex flex-col">
                  <div className="flex justify-between items-center border-b border-surface-container-high pb-sm mb-sm">
                    <h3 className="text-label-md font-label-md text-primary font-bold">Financials</h3>
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="text-display-lg font-display-lg text-primary">₹1.2Cr</div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant">Proposed Budget</div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-md mb-xs">
                      <div className="bg-secondary h-1.5 rounded-full" style={{ width: '75%' }} />
                    </div>
                    <div className="w-full flex justify-between text-label-sm font-label-sm text-on-surface-variant">
                      <span>CAPEX (75%)</span><span>OPEX (25%)</span>
                    </div>
                  </div>
                </div>
                {/* Attachments */}
                <div className="bento-item p-md flex flex-col">
                  <div className="flex justify-between items-center border-b border-surface-container-high pb-sm mb-sm">
                    <h3 className="text-label-md font-label-md text-primary font-bold">Attachments (3)</h3>
                  </div>
                  <div className="flex-1 flex flex-col gap-sm overflow-y-auto">
                    {[['picture_as_pdf','text-error','Architecture.pdf'],['grid_on','text-secondary','Cost_Breakdown.xlsx'],['picture_as_pdf','text-error','Team_CVs.pdf']].map(([icon, color, name]) => (
                      <div key={name} className="flex items-center justify-between p-sm border border-outline-variant rounded hover:bg-surface-container-low cursor-pointer transition-colors">
                        <div className="flex items-center gap-sm">
                          <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                          <span className="text-label-md font-label-md text-on-surface truncate w-32">{name}</span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Rubric Scoring Panel */}
            <div className="xl:w-5/12 bento-item flex flex-col relative z-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <div className="bg-primary/5 p-md border-b border-outline-variant flex justify-between items-center">
                <h2 className="text-headline-md font-headline-md text-primary">Evaluation Rubric</h2>
                <div className="flex items-center gap-sm">
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Auto-saving...</span>
                  <span className="material-symbols-outlined text-[16px] text-green-600">cloud_done</span>
                </div>
              </div>
              <div className="p-md flex-1 overflow-y-auto flex flex-col gap-lg">
                {CRITERIA.map((c, i) => (
                  <div key={c.id}>
                    <div className="flex flex-col gap-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-label-md font-label-md text-on-surface font-bold flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[18px] text-secondary">{c.icon}</span>
                            {c.label}
                          </h4>
                          <p className="text-label-sm font-label-sm text-on-surface-variant mt-xs pr-md">{c.desc}</p>
                        </div>
                        <div className="bg-surface-container-highest w-12 h-12 rounded-lg flex items-center justify-center text-headline-md font-headline-md text-primary font-bold shadow-inner flex-shrink-0">
                          {scores[c.id]}
                        </div>
                      </div>
                      <div className="mt-sm">
                        <input
                          type="range" min="1" max="10" value={scores[c.id]}
                          onChange={e => setScores(s => ({ ...s, [c.id]: +e.target.value }))}
                          className="scoring-slider"
                        />
                        <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mt-xs">
                          <span>1 (Poor)</span><span>5 (Average)</span><span>10 (Excellent)</span>
                        </div>
                      </div>
                      <textarea
                        className="w-full mt-sm border border-outline-variant rounded bg-surface p-sm text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                        placeholder="Add evaluator comments (required for scores < 4 or > 8)..."
                        rows="2"
                        value={comments[c.id]}
                        onChange={e => setComments(co => ({ ...co, [c.id]: e.target.value }))}
                      />
                    </div>
                    {i < CRITERIA.length - 1 && <hr className="border-surface-container-high mt-lg" />}
                  </div>
                ))}
              </div>
              <div className="p-md bg-surface border-t border-outline-variant flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Total Score</span>
                  <span className="text-display-lg font-display-lg text-primary leading-none">
                    {total}<span className="text-headline-md text-on-surface-variant">/40</span>
                  </span>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${pct}, 100`} strokeWidth="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bento-item flex flex-col">
            <div className="p-md border-b border-surface-container-high bg-surface-container-lowest flex justify-between items-center">
              <h3 className="text-headline-md font-headline-md text-primary flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary-container">leaderboard</span>
                Current Consensus Leaderboard
              </h3>
              <span className="bg-surface-container px-2 py-1 rounded text-label-sm font-label-sm text-on-surface-variant">Based on 3/5 Evaluators</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-label-md font-label-md text-on-surface-variant border-b border-outline-variant">
                    <th className="p-md font-semibold w-16 text-center">Rank</th>
                    <th className="p-md font-semibold">Vendor / Proposal</th>
                    <th className="p-md font-semibold text-center">Tech</th>
                    <th className="p-md font-semibold text-center">Feas.</th>
                    <th className="p-md font-semibold text-center">Cost</th>
                    <th className="p-md font-semibold text-center">Team</th>
                    <th className="p-md font-semibold text-right">Avg Score</th>
                  </tr>
                </thead>
                <tbody className="text-body-md font-body-md">
                  {LEADERBOARD.map(row => (
                    <tr key={row.rank} className={`border-b border-surface-container-high transition-colors ${row.isCurrent ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface-container-low'}`}>
                      <td className="p-md text-center">
                        <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mx-auto text-label-md ${row.isCurrent ? 'bg-secondary text-primary-container' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                          {row.rank}
                        </div>
                      </td>
                      <td className="p-md">
                        <div className={`font-bold ${row.isCurrent ? 'text-primary' : 'text-on-surface'}`}>{row.name}</div>
                        <div className="text-label-sm font-label-sm text-on-surface-variant">{row.proposal}{row.isCurrent ? ' (Current)' : ''}</div>
                      </td>
                      {row.scores.map((sc, i) => <td key={i} className="p-md text-center text-on-surface-variant">{sc}</td>)}
                      <td className={`p-md text-right font-bold text-headline-md ${row.isCurrent ? 'text-primary' : 'text-on-surface'}`}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    </div>
  )
}

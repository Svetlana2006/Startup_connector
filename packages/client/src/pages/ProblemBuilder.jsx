// 1.2 — Problem Statement Builder (problem_statement_builder)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'

const WIZARD_STEPS = ['Context', 'Desired Outcome', 'Pilot Scope']

export default function ProblemBuilder({ user, onLogout }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0-indexed
  const [form, setForm] = useState({
    department: 'Department of Health & Family Welfare',
    painPoint: '',
    affected: { staff: true, citizens: false, management: true, vendors: false },
    metric: '', target: '', duration: '', budget: '',
    scope: '', geography: '', successCriteria: '',
  })
  const progress = Math.round(((step + 1) / WIZARD_STEPS.length) * 100)

  return (
    <div className="bg-background text-on-surface font-body-md h-full flex flex-col min-h-screen">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <SideNav activeHref="/problem-builder" />
        <main className="flex-1 md:ml-64 overflow-y-auto w-full p-4 md:p-lg bg-surface">
          <div className="max-w-[1024px] mx-auto">
            {/* Breadcrumb */}
            <div className="mb-lg">
              <div className="flex items-center gap-2 text-label-sm text-on-surface-variant mb-2">
                <span>Evaluation</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="font-bold text-primary">Problem Statement Builder</span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-primary">Define the Problem</h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant mt-2 max-w-2xl">
                Transform vague pain points into structured, outcome-focused procurement requirements.
              </p>
            </div>

            {/* Wizard Progress */}
            <div className="mb-xl relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-highest -translate-y-1/2 rounded-full z-0" />
              <div className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                style={{ width: `${(step / (WIZARD_STEPS.length - 1)) * 100}%` }} />
              <div className="relative z-10 flex justify-between w-full">
                {WIZARD_STEPS.map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                      i <= step ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant shadow-sm'
                    }`}>{i < step ? '✓' : i + 1}</div>
                    <span className={`text-label-sm ${i <= step ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
              {/* Form area */}
              <div className="lg:col-span-8 space-y-lg">
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                  <div className="p-md border-b border-outline-variant bg-surface-container-low flex items-center gap-sm">
                    <div className="w-6 h-6 rounded bg-primary-container text-on-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">edit_document</span>
                    </div>
                    <h2 className="text-headline-md font-headline-md text-primary">Step {step + 1}: {WIZARD_STEPS[step]}</h2>
                  </div>
                  <div className="p-lg space-y-md">
                    {step === 0 && <>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">Department / Agency</label>
                        <select className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md font-body-md bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface">
                          <option>Select Department...</option>
                          <option selected>Department of Health &amp; Family Welfare</option>
                          <option>Department of Revenue</option>
                          <option>Department of Education</option>
                          <option>PWD Maharashtra</option>
                          <option>Water Resources Department</option>
                          <option>Transport Department</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">What is the primary pain point?</label>
                        <p className="text-label-sm text-on-surface-variant mb-2">Describe the specific operational challenge or bottleneck currently being faced.</p>
                        <textarea
                          className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md font-body-md bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder-outline"
                          placeholder="e.g., Manual data entry at primary health centers takes 4 hours per day, leading to delayed reporting and staff burnout..."
                          rows="4"
                          value={form.painPoint}
                          onChange={e => setForm(f => ({ ...f, painPoint: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">Who is impacted most?</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                          {[['staff','Internal Staff'],['citizens','Citizens / End Users'],['management','Management / Leadership'],['vendors','External Vendors']].map(([k, label]) => (
                            <label key={k} className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors ${form.affected[k] ? 'border-primary bg-primary-fixed' : 'border-outline-variant'}`}>
                              <input type="checkbox" checked={form.affected[k]} onChange={e => setForm(f => ({ ...f, affected: { ...f.affected, [k]: e.target.checked } }))} className="w-4 h-4 text-primary border-outline rounded focus:ring-primary" />
                              <span className="ml-2 text-body-md text-on-surface">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>}
                    {step === 1 && <>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">What measurable outcome do you want?</label>
                        <p className="text-label-sm text-on-surface-variant mb-2">Focus on results, not solutions.</p>
                        <textarea className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md font-body-md bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface placeholder-outline" placeholder="e.g., Reduce data entry time by 80% while maintaining 99% accuracy across 50 health centres..." rows="4" value={form.metric} onChange={e => setForm(f => ({ ...f, metric: e.target.value }))} />
                      </div>
                      <div className="grid grid-cols-2 gap-md">
                        <div>
                          <label className="block text-label-md font-label-md text-on-surface mb-sm">Target Improvement (%)</label>
                          <input className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md bg-surface-container-lowest focus:border-primary outline-none text-on-surface" placeholder="e.g. 40" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-label-md font-label-md text-on-surface mb-sm">Budget (₹ Lakh)</label>
                          <input className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md bg-surface-container-lowest focus:border-primary outline-none text-on-surface" placeholder="e.g. 12" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
                        </div>
                      </div>
                    </>}
                    {step === 2 && <>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">Pilot Scope & Geography</label>
                        <input className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md bg-surface-container-lowest focus:border-primary outline-none text-on-surface mb-md" placeholder="e.g. 3 districts, 15 health centres" value={form.geography} onChange={e => setForm(f => ({ ...f, geography: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">Duration (Months)</label>
                        <input type="number" className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md bg-surface-container-lowest focus:border-primary outline-none text-on-surface" placeholder="e.g. 6" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-sm">Success Criteria (for independent validation)</label>
                        <textarea className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-md bg-surface-container-lowest focus:border-primary outline-none text-on-surface placeholder-outline" rows="3" placeholder="e.g. 95% of leaks detected within 1 hour, verified by third-party audit..." value={form.successCriteria} onChange={e => setForm(f => ({ ...f, successCriteria: e.target.value }))} />
                      </div>
                      <div className="bg-primary-fixed rounded-lg p-md border border-primary/20">
                        <p className="text-label-md font-bold text-primary mb-2">✅ Generated Outcome Statement</p>
                        <p className="text-body-md text-on-surface-variant italic">
                          "{form.metric || 'Reduce operational inefficiency'} by {form.target || 'X'}% within {form.duration || 'N'} months across {form.geography || 'selected geography'}, verified by independent audit."
                        </p>
                      </div>
                    </>}
                  </div>
                </div>

                <div className="flex justify-end gap-md pt-sm">
                  <button className="px-6 py-2 border border-outline text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-colors" onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}>
                    {step > 0 ? 'Back' : 'Cancel'}
                  </button>
                  {step < WIZARD_STEPS.length - 1
                    ? <button className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm" onClick={() => setStep(s => s + 1)}>
                        Next Step <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    : <button className="px-6 py-2 bg-secondary text-on-secondary font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm" onClick={() => navigate('/department')}>
                        Publish Problem <span className="material-symbols-outlined text-[18px]">publish</span>
                      </button>
                  }
                </div>
              </div>

              {/* Sidebar helper */}
              <div className="lg:col-span-4 space-y-md">
                <div className="bg-primary-fixed-dim rounded-xl p-md shadow-sm border border-primary-fixed">
                  <div className="flex items-start gap-sm mb-3">
                    <span className="material-symbols-outlined text-primary fill-icon mt-1">lightbulb</span>
                    <div>
                      <h3 className="text-label-md font-bold text-primary">Shift the Paradigm</h3>
                      <p className="text-label-sm text-on-primary-fixed-variant mt-1">Focus on the 'Why' instead of the 'How'.</p>
                    </div>
                  </div>
                  <div className="space-y-sm mt-md bg-surface-container-lowest p-3 rounded-lg bg-opacity-80 border border-outline-variant">
                    <div>
                      <h4 className="text-label-sm font-bold text-error flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">cancel</span> Specification-based (Old)
                      </h4>
                      <p className="text-[11px] text-on-surface-variant leading-tight mt-1">"We need a server with 64GB RAM and a custom React web app to collect patient data." (Limits innovation)</p>
                    </div>
                    <div className="h-px bg-outline-variant w-full my-2" />
                    <div>
                      <h4 className="text-label-sm font-bold text-[#15803d] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Outcome-based (New)
                      </h4>
                      <p className="text-[11px] text-on-surface-variant leading-tight mt-1">"We need to securely collect and analyze patient data from 50 remote clinics with 99% uptime." (Invites solutions)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm">
                  <h3 className="text-label-md font-bold text-on-surface mb-xs">Draft Completeness</h3>
                  <div className="w-full bg-surface-container-high rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-label-sm text-on-surface-variant text-right">{progress}% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  )
}

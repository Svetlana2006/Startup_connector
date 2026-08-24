// 1.4 — Eligibility Screening (eligibility_gfr_waiver_dashboard)
import { useParams, Link } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'
import { STARTUPS } from '@govbridge/data'

const CORE_CHECKS = [
  { label: 'DPIIT Recognition', desc: 'Verified Maharashtra based startup registration.', status: 'pass' },
  { label: 'Startup Age', desc: 'Entity incorporated less than 10 years ago (Inc. 2018).', status: 'pass' },
  { label: 'GST Registration', desc: 'Active GST registration verified.', status: 'pass' },
  { label: 'MCA Registration', desc: 'Incorporated under Companies Act / LLP Act.', status: 'pass' },
]

const WAIVERS = [
  { label: 'Turnover Requirement', desc: 'Prior turnover criteria is waived for this recognized startup.', badge: 'Waived under GFR Rule 173(i)' },
  { label: 'Prior Experience', desc: 'Standard prior experience requirement is waived for pilot projects.', badge: 'Waived for Innovation Pilot' },
  { label: 'Earnest Money Deposit (EMD)', desc: 'EMD requirement of 2% bid value is fully waived.', badge: 'Waived under GFR Rule 173(i)' },
]

export default function EligibilityScreen({ user, onLogout }) {
  const { startupId } = useParams()
  const startup = STARTUPS.find(s => s.id === parseInt(startupId)) || STARTUPS[0]

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNav user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <SideNav activeHref="/eligibility" />
        <main className="flex-1 md:ml-64 p-md md:p-lg xl:p-xl flex justify-center">
          <div className="w-full max-w-[1280px]">
            {/* Page Header */}
            <div className="mb-lg">
              <h1 className="text-headline-lg font-headline-lg text-primary md:text-display-lg md:font-display-lg mb-sm">Eligibility Screening</h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant">
                Startup: <strong>{startup.name}</strong> · Application ID: #APP-2024-{8900 + startup.id}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              {/* Checklist Column */}
              <div className="lg:col-span-2 space-y-lg">
                {/* Core Eligibility */}
                <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-ambient p-lg">
                  <div className="border-b border-outline-variant pb-md mb-md">
                    <h2 className="text-headline-md font-headline-md text-primary flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary">checklist</span>
                      Core Requirements
                    </h2>
                  </div>
                  <div className="space-y-md">
                    {CORE_CHECKS.map(c => (
                      <div key={c.label} className="flex items-start gap-md p-md bg-surface-container-low rounded-lg border border-transparent hover:border-primary-fixed-dim transition-colors">
                        <div className="bg-success-container rounded-full p-1 flex-shrink-0 mt-1">
                          <span className="material-symbols-outlined text-success text-[20px] fill-icon">check</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-body-lg font-bold text-on-surface mb-xs">{c.label}</h3>
                          <p className="text-body-md font-body-md text-on-surface-variant">{c.desc}</p>
                        </div>
                        <div className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Auto-verified</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Waivers Card */}
                <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-ambient p-lg">
                  <div className="border-b border-outline-variant pb-md mb-md">
                    <h2 className="text-headline-md font-headline-md text-primary flex items-center gap-sm">
                      <span className="material-symbols-outlined text-secondary">verified_user</span>
                      Exemptions &amp; Waivers
                    </h2>
                  </div>
                  <div className="space-y-md">
                    {WAIVERS.map(w => (
                      <div key={w.label} className="flex items-start gap-md p-md bg-surface-container-low rounded-lg border-l-4 border-l-secondary">
                        <div className="bg-success-container rounded-full p-1 flex-shrink-0 mt-1">
                          <span className="material-symbols-outlined text-success text-[20px] fill-icon">check</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-xs flex-wrap gap-2">
                            <h3 className="text-body-lg font-bold text-on-surface">{w.label}</h3>
                            <span className="bg-success-container text-on-success-container text-label-sm font-label-sm px-2 py-1 rounded-full font-bold">{w.badge}</span>
                          </div>
                          <p className="text-body-md font-body-md text-on-surface-variant">{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Startup info */}
                <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-ambient p-lg">
                  <div className="border-b border-outline-variant pb-md mb-md">
                    <h2 className="text-headline-md font-headline-md text-primary">Startup Profile</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    {[
                      ['Name', startup.name], ['Sector', startup.sector], ['City', startup.city],
                      ['Founded', startup.founded], ['Turnover', startup.turnover + ' (Waived)'], ['Experience', startup.experience + ' (Waived)'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">{k}</p>
                        <p className="text-body-md font-body-md text-on-surface font-medium">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Callout Column */}
              <div className="lg:col-span-1">
                <div className="bg-primary-container text-on-primary-container rounded-lg p-lg shadow-ambient sticky top-[80px]">
                  <div className="flex items-center gap-sm mb-md pb-sm border-b border-on-primary-container/20">
                    <span className="material-symbols-outlined text-display-lg fill-icon">gavel</span>
                    <h3 className="text-headline-md font-headline-md font-bold">Legal Validity Notice</h3>
                  </div>
                  <div className="space-y-md text-body-md font-body-md">
                    <p>
                      <strong>Reassurance for Department Officials:</strong><br />
                      The waivers applied to this application are legally mandated under the General Financial Rules (GFR) 2017.
                    </p>
                    <p>
                      <strong>Rule 173(i):</strong> "Relaxation of prior turnover and prior experience may be granted to all Startups (whether Micro &amp; Small Enterprises or otherwise) subject to meeting of quality and technical specifications."
                    </p>
                    <p className="text-sm opacity-90 italic">
                      These auto-checks are synchronized with DPIIT databases and serve as valid administrative clearance for proceeding to the Evaluation phase.
                    </p>
                  </div>
                  <div className="mt-lg pt-md border-t border-on-primary-container/20">
                    <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-md rounded-lg hover:bg-opacity-90 transition-colors font-bold shadow-md" onClick={() => alert(`${startup.name} approved for procurement ✅`)}>
                      Approve Eligibility
                    </button>
                    <button className="w-full mt-sm border border-on-primary-container text-on-primary-container font-label-md text-label-md py-sm rounded-lg hover:bg-on-primary-container/10 transition-colors">
                      Request Clarification
                    </button>
                    <Link to="/discover" className="block w-full mt-sm text-center text-label-md font-label-md text-on-primary-container/70 hover:text-on-primary-container transition-colors">
                      ← Back to Discovery
                    </Link>
                  </div>
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

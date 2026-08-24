// 1.3 — Startup Discovery + Matching (startup_discovery_matching)
import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SideNav, TopNav, AppFooter } from '@govbridge/ui'
import { STARTUPS, PROBLEMS } from '@govbridge/data'

const SECTOR_COLORS = {
  AgriTech: '#ca8a04', Mobility: '#2563eb', Water: '#0891b2',
  GovTech: '#7c3aed', HealthTech: '#16a34a', CleanEnergy: '#d97706',
  EdTech: '#db2777', Other: '#6b7280',
}

export default function StartupDiscovery({ user, onLogout }) {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All')
  const [sort, setSort] = useState('Match Score: High to Low')
  const [params] = useSearchParams()
  const problemId = params.get('problem')
  const problem = problemId ? PROBLEMS.find(p => p.id === problemId) : null

  const filtered = useMemo(() => {
    let list = STARTUPS
    if (problem) list = list.filter(s => problem.matchedStartups.includes(s.id))
    if (sector !== 'All') list = list.filter(s => s.sector === sector)
    if (search) list = list.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      s.city.toLowerCase().includes(search.toLowerCase())
    )
    return list.sort((a, b) => b.passport - a.passport)
  }, [search, sector, problem])

  return (
    <div className="bg-surface text-on-surface flex min-h-screen font-body-md">
      <SideNav activeHref="/discover" />
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        <TopNav user={user} onLogout={onLogout} />
        <main className="flex-1 p-md md:p-lg max-w-[1280px] mx-auto w-full">
          {/* Page Header */}
          <div className="mb-lg flex flex-col lg:flex-row lg:items-end justify-between gap-md">
            <div>
              <h1 className="text-headline-lg font-headline-lg text-on-background mb-xs">Startup Discovery + Matching</h1>
              <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
                Identify and evaluate DPIIT-recognized startups based on specific departmental problem statements and historical procurement performance.
              </p>
            </div>
            {problem && (
              <div className="glass-panel p-md rounded-lg flex items-center gap-md w-full lg:w-auto shadow-sm">
                <div className="bg-primary-container p-sm rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container">target</span>
                </div>
                <div>
                  <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Active Problem Statement</p>
                  <p className="text-body-md font-body-md font-semibold text-on-surface">{problem.id}: {problem.title}</p>
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md mb-lg shadow-sm flex flex-col md:flex-row gap-md items-center justify-between">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="Search startups by name, tech stack, or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-sm items-center w-full md:w-auto">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-outline text-sm">filter_list</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant font-semibold">FILTERS:</span>
              </div>
              <select className="bg-surface border border-outline-variant rounded text-label-md font-label-md py-sm px-md outline-none focus:border-primary text-on-surface" value={sector} onChange={e => setSector(e.target.value)}>
                <option>All</option>
                {[...new Set(STARTUPS.map(s => s.sector))].map(s => <option key={s}>{s}</option>)}
              </select>
              <select className="bg-surface border border-outline-variant rounded text-label-md font-label-md py-sm px-md outline-none focus:border-primary text-on-surface" value={sort} onChange={e => setSort(e.target.value)}>
                <option>Match Score: High to Low</option>
                <option>Passport Score: High to Low</option>
                <option>Recent Activity</option>
              </select>
            </div>
          </div>

          {/* GFR Banner */}
          <div className="mb-lg bg-success-container border border-[#bbf7d0] rounded-lg p-md flex items-center gap-md">
            <span className="material-symbols-outlined text-success fill-icon">gavel</span>
            <span className="text-label-md font-label-md text-on-success-container">
              All listed startups are <strong>DPIIT-recognized</strong>. Turnover, experience, and EMD requirements are automatically <strong>waived under GFR Rule 173(i)</strong> for every application on this platform.
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filtered.map(s => (
              <div key={s.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <div className="p-md border-b border-surface-container flex justify-between items-start">
                  <div className="flex gap-md items-center">
                    <div className="w-12 h-12 rounded bg-surface-container-low border border-outline-variant flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined text-outline">business</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-headline-md text-on-surface">{s.name}</h3>
                      <div className="flex items-center gap-xs mt-unit">
                        <span className="w-2 h-2 rounded-full" style={{ background: SECTOR_COLORS[s.sector] || '#6b7280' }} />
                        <span className="text-label-sm font-label-sm text-on-surface-variant">{s.sector} · {s.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-md flex-1">
                  <div className="flex justify-between items-center mb-md">
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Match Score</p>
                      <div className="flex items-baseline gap-xs">
                        <span className="text-headline-md font-headline-md text-primary">{s.passport}%</span>
                        <span className="material-symbols-outlined text-[#16a34a] text-sm">trending_up</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Passport Score</p>
                      <span className="text-headline-md font-headline-md text-on-surface">{s.passport * 10}</span>
                    </div>
                  </div>
                  <div className="space-y-sm mb-md">
                    <div className="flex justify-between text-label-md font-label-md border-b border-surface-container pb-xs">
                      <span className="text-on-surface-variant">DPIIT Reg:</span>
                      <span className="text-on-surface font-medium">DIPP{10000 + s.id}</span>
                    </div>
                    <div className="flex justify-between text-label-md font-label-md border-b border-surface-container pb-xs">
                      <span className="text-on-surface-variant">Turnover:</span>
                      <span className="text-on-surface font-medium">{s.turnover} (Waived)</span>
                    </div>
                    <div className="flex justify-between text-label-md font-label-md">
                      <span className="text-on-surface-variant">Founded:</span>
                      <span className="text-on-surface font-medium">{s.founded}</span>
                    </div>
                  </div>
                  <p className="text-label-sm text-on-surface-variant mb-md">{s.desc}</p>
                  <div className="flex flex-wrap gap-xs">
                    {s.tags.map(t => (
                      <span key={t} className="px-sm py-xs bg-surface-container-low border border-outline-variant rounded text-label-sm font-label-sm text-on-surface-variant">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-md bg-surface-container-low border-t border-outline-variant flex gap-sm">
                  <Link to={`/eligibility/${s.id}`} className="flex-1 bg-surface border border-primary text-primary font-label-md text-label-md py-sm rounded hover:bg-primary-fixed-dim transition-colors text-center">
                    View Profile
                  </Link>
                  <button className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-sm rounded hover:opacity-90 transition-opacity text-center shadow-sm" onClick={() => alert(`${s.name} shortlisted ✓`)}>
                    Shortlist
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-xl text-on-surface-variant">No startups found. Try clearing filters.</div>
          )}
        </main>
        <AppFooter />
      </div>
    </div>
  )
}

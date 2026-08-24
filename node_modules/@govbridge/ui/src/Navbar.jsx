import { Link, useNavigate } from 'react-router-dom'

const ROLE_COLORS = {
  department: '#4f7dff',
  startup: '#22d3a0',
  evaluator: '#a855f7',
  admin: '#f59e0b',
}

const ROLE_LABELS = {
  department: 'Dept. Official',
  startup: 'Startup',
  evaluator: 'Evaluator',
  admin: 'Admin',
}

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const color = ROLE_COLORS[user.role]

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" style={{ color }}>
        GovBridge <span style={{ color: 'var(--text)', fontWeight: 400 }}>| MSInS</span>
      </Link>
      <div className="nav-links">
        <span className="nav-badge" style={{ background: `${color}22`, color, borderColor: color }}>
          {ROLE_LABELS[user.role]}: {user.name}
        </span>
        {user.role !== 'admin' && (
          <Link to="/tracker" className="btn btn-secondary btn-sm">🌐 Public Tracker</Link>
        )}
        <button className="btn-logout" onClick={onLogout}>Sign out</button>
      </div>
    </nav>
  )
}

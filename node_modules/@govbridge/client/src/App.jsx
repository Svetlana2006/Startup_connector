import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DepartmentDashboard from './pages/DepartmentDashboard'
import StartupDashboard from './pages/StartupDashboard'
import EvaluatorDashboard from './pages/EvaluatorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProblemBuilder from './pages/ProblemBuilder'
import StartupDiscovery from './pages/StartupDiscovery'
import EligibilityScreen from './pages/EligibilityScreen'
import EvaluatorScoring from './pages/EvaluatorScoring'
import PilotTracker from './pages/PilotTracker'
import PublicTracker from './pages/PublicTracker'

export default function App() {
  const [user, setUser] = useState(null)

  const onLogout = () => setUser(null)

  if (!user) return <LoginPage onLogin={setUser} />

  const homeRoute =
    user.role === 'department' ? '/department' :
    user.role === 'startup' ? '/startup' :
    user.role === 'evaluator' ? '/evaluator' :
    '/admin'

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={homeRoute} />} />
        <Route path="/department"     element={<DepartmentDashboard user={user} onLogout={onLogout} />} />
        <Route path="/startup"        element={<StartupDashboard user={user} onLogout={onLogout} />} />
        <Route path="/evaluator"      element={<EvaluatorDashboard user={user} onLogout={onLogout} />} />
        <Route path="/admin"          element={<AdminDashboard user={user} onLogout={onLogout} />} />
        <Route path="/problem-builder" element={<ProblemBuilder user={user} onLogout={onLogout} />} />
        <Route path="/discover"       element={<StartupDiscovery user={user} onLogout={onLogout} />} />
        <Route path="/eligibility/:startupId" element={<EligibilityScreen user={user} onLogout={onLogout} />} />
        <Route path="/eligibility"    element={<EligibilityScreen user={user} onLogout={onLogout} />} />
        <Route path="/evaluate"       element={<EvaluatorScoring user={user} onLogout={onLogout} />} />
        <Route path="/pilot"          element={<PilotTracker user={user} onLogout={onLogout} />} />
        <Route path="/tracker"        element={<PublicTracker user={user} onLogout={onLogout} />} />
        <Route path="*"               element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

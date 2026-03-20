import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { PolicyManagement } from './pages/PolicyManagement'
import { ClaimsSystem } from './pages/ClaimsSystem'
import { AnalyticsDashboard } from './pages/AnalyticsDashboard'
import { AdminPanel } from './pages/AdminPanel'
import { DisruptionPanel } from './pages/DisruptionPanel'
import { FraudDetection } from './pages/FraudDetection'
import { Onboarding } from './pages/Onboarding'
import { HowItWorks } from './pages/HowItWorks'
import { Landing } from './pages/Landing'
import { ProtectedRoute } from './components/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="policy" element={<PolicyManagement />} />
          <Route path="claims" element={<ClaimsSystem />} />
          <Route path="disruptions" element={<DisruptionPanel />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="fraud" element={<FraudDetection />} />
          <Route path="how-it-works" element={<HowItWorks />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

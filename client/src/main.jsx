import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PlacesPage from './pages/PlacesPage'
import PlaceDetails from './pages/PlaceDetails'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import MyDayPage from './pages/MyDayPage'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Navigate to="/places" replace />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="places/:slug" element={<PlaceDetails />} />
          <Route path="login" element={<AuthPage />} />
          <Route
            path="my-day"
            element={<ProtectedRoute><MyDayPage /></ProtectedRoute>}
          />
          <Route
            path="dashboard"
            element={<ProtectedRoute adminOnly><DashboardPage /></ProtectedRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'

// Volunteers ships 27+ avatar images — keep it out of the first-load bundle.
const VolunteersPage = lazy(() => import('./components/VolunteersPage'))
const QRRedirect = lazy(() => import('./QRRedirect'))

function RouteFallback() {
  return (
    <div className="route-fallback" aria-hidden="true">
      <div className="route-fallback-bar" />
      <div className="route-fallback-grid">
        <div className="route-fallback-block" />
        <div className="route-fallback-block" />
        <div className="route-fallback-block" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/qr" element={<QRRedirect />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import VolunteersPage from './components/VolunteersPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
      </Route>
    </Routes>
  )
}

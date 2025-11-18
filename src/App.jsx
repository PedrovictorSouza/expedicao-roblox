import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Badges from './components/Badges'
import Missions from './components/Missions'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="badges" element={<Badges />} />
          <Route path="missions" element={<Missions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

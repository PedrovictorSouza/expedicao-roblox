import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Badges from './components/Badges'
import Missions from './components/Missions'
import ModuleExplorador from './components/ModuleExplorador'
import IDE from './components/IDE/IDE'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="badges" element={<Badges />} />
          <Route path="missions" element={<Missions />} />
          <Route path="module/explorador" element={<ModuleExplorador />} />
          <Route path="ide" element={<IDE />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

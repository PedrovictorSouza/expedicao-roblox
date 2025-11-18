import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const earnedBadges = 0
  const totalBadges = 6
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link 
          to="/home" 
          className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
        >
          home
        </Link>
      </div>
      <div className="navbar-progress">
        <p className="progress-title">Seu progresso na jornada</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(earnedBadges / totalBadges) * 100}%` }}></div>
        </div>
        <p className="progress-text">{earnedBadges}/{totalBadges} badges</p>
      </div>
      <div className="navbar-links">
        <Link 
          to="/badges" 
          className={`navbar-link ${location.pathname === '/badges' ? 'active' : ''}`}
        >
          badge
        </Link>
        <Link 
          to="/missions" 
          className={`navbar-link ${location.pathname === '/missions' ? 'active' : ''}`}
        >
          missões
        </Link>
      </div>
    </nav>
  )
}

export default Navbar


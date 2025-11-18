import './Home.css'
import Cube from './Cube'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import atlas from '../assets/atlas.png'

const parallaxSpeeds = [
  0.2, 0.8, 0.3, 0.6, 0.4, 0.7, 0.25, 0.9, 0.35, 0.55,
  0.15, 0.75, 0.45, 0.65, 0.5, 0.85, 0.3
]

const fadeSpeeds = [
  0.003, 0.008, 0.002, 0.006, 0.004, 0.007, 0.0025, 0.009, 0.0035, 0.0055,
  0.0015, 0.0075, 0.0045, 0.0065, 0.005, 0.0085, 0.003
]

function Home() {
  const navigate = useNavigate()
  const expedicao = 'EXPEDIÇÃO'.split('')
  const roblox = 'ROBLOX'.split('')
  const expedicaoLength = expedicao.length
  const expedicaoRefs = useRef([])
  const robloxRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      
      expedicaoRefs.current.forEach((ref, index) => {
        if (ref) {
          const speed = parallaxSpeeds[index] || 0.5
          const offset = scrolled * speed
          ref.style.transform = `translateY(${offset}px)`
          
          const fadeSpeed = fadeSpeeds[index] || 0.005
          const opacity = Math.max(0, 1 - scrolled * fadeSpeed)
          ref.style.opacity = opacity
        }
      })
      
      robloxRefs.current.forEach((ref, index) => {
        if (ref) {
          const speed = parallaxSpeeds[expedicaoLength + index] || 0.5
          const offset = scrolled * speed
          ref.style.transform = `translateY(${offset}px)`
          
          const fadeSpeed = fadeSpeeds[expedicaoLength + index] || 0.005
          const opacity = Math.max(0, 1 - scrolled * fadeSpeed)
          ref.style.opacity = opacity
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [expedicaoLength])

  const handleBadgesClick = () => {
    navigate('/badges')
  }

  return (
    <div className="home-container">
      <div className="home-grid">
        <img src={atlas} alt="Atlas" className="atlas-image" />
        <h1 className="home-title">
          <div className="title-line">
            {expedicao.map((letter, index) => {
              const colorIndex = index % 3
              const colorClass = colorIndex === 0 ? 'red' : colorIndex === 1 ? 'green' : 'blue'
              return (
                <span
                  key={index}
                  ref={el => expedicaoRefs.current[index] = el}
                  className={`letter ${colorClass}`}
                >
                  {letter}
                </span>
              )
            })}
          </div>
          <div className="title-line">
            {roblox.map((letter, index) => {
              const colorIndex = (expedicaoLength + index) % 3
              const colorClass = colorIndex === 0 ? 'red' : colorIndex === 1 ? 'green' : 'blue'
              return (
                <span
                  key={index}
                  ref={el => robloxRefs.current[index] = el}
                  className={`letter ${colorClass}`}
                >
                  {letter}
                </span>
              )
            })}
          </div>
          <p className="powered-by">powered by mastertech</p>
          <button className="badges-button" onClick={handleBadgesClick}>
            badges
          </button>
        </h1>
        <Cube />
      </div>
    </div>
  )
}

export default Home


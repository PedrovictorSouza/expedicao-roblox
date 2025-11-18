import './Missions.css'
import { useState } from 'react'

const missions = [
  {
    id: 'explorador',
    icon: '🪐',
    title: 'Explorador/a',
    description: 'Crie seu primeiro mundo e explore o Roblox Studio',
    buttonText: 'Entrar na missão',
    x: 15,
    y: 20
  },
  {
    id: 'construtor',
    icon: '🧱',
    title: 'Construtor/a',
    description: 'Modele e monte cenários incríveis',
    buttonText: 'Entrar na missão',
    x: 50,
    y: 15
  },
  {
    id: 'codificador',
    icon: '⚡',
    title: 'Codificador/a',
    description: 'Use scripts e dê vida às suas criações',
    buttonText: 'Entrar na missão',
    x: 80,
    y: 25
  },
  {
    id: 'designer',
    icon: '🎮',
    title: 'Designer/a de Jogos',
    description: 'Crie jogos jogáveis e desafiadores',
    buttonText: 'Entrar na missão',
    x: 25,
    y: 60
  },
  {
    id: 'estilista',
    icon: '👕',
    title: 'Estilista Digital',
    description: 'Crie roupas, acessórios e avatares',
    buttonText: 'Entrar na missão',
    x: 70,
    y: 65
  },
  {
    id: 'criador',
    icon: '💫',
    title: 'Criador/a do Futuro',
    description: 'Monte seu portfólio e compartilhe com o mundo',
    buttonText: 'Entrar na missão',
    x: 45,
    y: 80
  }
]

const borderColors = {
  explorador: '#4A90E2',
  construtor: '#4CAF50',
  codificador: '#9C27B0',
  designer: '#FF9800',
  estilista: '#E91E63',
  criador: '#FFC107'
}

function Missions() {
  const [hoveredMission, setHoveredMission] = useState(null)

  const handleMissionClick = (missionId) => {
    console.log('Missão clicada:', missionId)
  }

  return (
    <div className="missions-container">
      <div className="missions-scene">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`mission-object ${hoveredMission === mission.id ? 'hovered' : ''}`}
            style={{
              left: `${mission.x}%`,
              top: `${mission.y}%`,
              borderColor: borderColors[mission.id]
            }}
            onMouseEnter={() => setHoveredMission(mission.id)}
            onMouseLeave={() => setHoveredMission(null)}
            onClick={() => handleMissionClick(mission.id)}
          >
            <div className="mission-icon">{mission.icon}</div>
            <h3 className="mission-title">{mission.title}</h3>
            <p className="mission-description">{mission.description}</p>
            <button 
              className="mission-button" 
              style={{ borderColor: borderColors[mission.id], color: borderColors[mission.id] }}
            >
              {mission.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Missions


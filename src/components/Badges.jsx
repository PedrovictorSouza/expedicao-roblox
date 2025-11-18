import { useState, useRef } from 'react'
import './Badges.css'
import trilha1 from '../assets/trilhas/trilha-1.png'
import trilha2 from '../assets/trilhas/trilha-2.png'
import trilha3 from '../assets/trilhas/trilha-3.png'
import trilha4 from '../assets/trilhas/trilha-4.png'
import trilha5 from '../assets/trilhas/trilha-5.png'
import trilha6 from '../assets/trilhas/trilha-6.png'
import trilha7 from '../assets/trilhas/trilha-7.png'
import trilha8 from '../assets/trilhas/trilha-8.png'

function Badges() {
  const [popupImage, setPopupImage] = useState(null)
  const closeTimeoutRef = useRef(null)
  const trilhasImgs = [
    trilha1,
    trilha2,
    trilha3,
    trilha4,
    trilha5,
    trilha6,
    trilha7,
    trilha8
  ]

  const badgesData = [
    {
      trilha: 'Mochilão',
      dimensaoRoblox: 'Concepção do jogo',
      acao: 'Definir tema, público e mecânica',
      macroCompetencia: 'Pensamento crítico',
      competenciaPedagogica: 'Planejamento criativo e resolução de problemas',
      evidencia: 'Documento ou captura do conceito, pitch, storyboard',
      badge: 'Badge 1 - Concepção',
      confiancaFamiliar: 'O jovem está aprendendo a planejar, refletir e dar sentido às suas criações. Um espaço de imaginação guiada, com propósito claro e acompanhamento.'
    },
    {
      trilha: 'Mochilão',
      dimensaoRoblox: 'Construção do ambiente',
      acao: 'Criar o mundo, cenário, objetos',
      macroCompetencia: 'Letramento tech',
      competenciaPedagogica: 'Pensamento espacial e design de experiência',
      evidencia: 'Print ou link do ambiente publicado',
      badge: 'Badge 2 - Mundo',
      confiancaFamiliar: 'Ele começa a transformar ideias em ambientes digitais. Aprende noções de espaço, estética e lógica em um ambiente controlado e sem exposição pública.'
    },
    {
      trilha: 'Mochilão',
      dimensaoRoblox: 'Criação de personagens',
      acao: 'Configurar avatares e interações',
      macroCompetencia: 'Aprender a aprender',
      competenciaPedagogica: 'Identidade, narrativa e empatia',
      evidencia: 'Personagem jogável ou captura do model',
      badge: 'Badge 3 - Personagem',
      confiancaFamiliar: 'Ela exercita empatia e autoconhecimento, criando representações seguras de si e dos outros. O processo é mediado e respeita a individualidade.'
    },
    {
      trilha: 'Acampamento',
      dimensaoRoblox: 'Scripting básico',
      acao: 'Inserir scripts em Lua para mecânicas',
      macroCompetencia: 'Letramento tech',
      competenciaPedagogica: 'Lógica computacional e pensamento sequencial',
      evidencia: 'Script funcional com descrição',
      badge: 'Badge 4 - Lógica',
      confiancaFamiliar: 'O jovem aprende lógica de programação em um contexto lúdico, sem risco de exposição. É uma iniciação técnica acompanhada e ética.'
    },
    {
      trilha: 'Acampamento',
      dimensaoRoblox: 'Colaboração e co-criação',
      acao: 'Trabalhar com outros no Studio',
      macroCompetencia: 'Pensamento crítico',
      competenciaPedagogica: 'Comunicação e trabalho em equipe',
      evidencia: 'Projeto coautoral publicado',
      badge: 'Badge 5 - Colaboração',
      confiancaFamiliar: 'Ela aprende a trabalhar com colegas com regras de convivência digital e coautoria. Um espaço moderado que ensina convivência responsável.'
    },
    {
      trilha: 'Acampamento',
      dimensaoRoblox: 'Teste e depuração',
      acao: 'Corrigir erros e otimizar gameplay',
      macroCompetencia: 'Aprender a aprender',
      competenciaPedagogica: 'Persistência e pensamento crítico',
      evidencia: 'Log de teste ou vídeo do jogo rodando',
      badge: 'Badge 6 - Teste',
      confiancaFamiliar: 'Ele descobre que errar faz parte do aprendizado. Aprende a revisar, testar e corrigir, com suporte pedagógico e orientação segura.'
    },
    {
      trilha: 'Sobrevivência',
      dimensaoRoblox: 'Publicação e narrativa',
      acao: 'Nomear, descrever e lançar o jogo',
      macroCompetencia: 'Pensamento crítico',
      competenciaPedagogica: 'Comunicação digital e autoria pública',
      evidencia: 'Jogo publicado com descrição completa',
      badge: 'Badge 7 - Publicação',
      confiancaFamiliar: 'Ela apresenta seu trabalho com responsabilidade, entendendo autoria, reputação e impacto. O processo é acompanhado e seguro.'
    },
    {
      trilha: 'Sobrevivência',
      dimensaoRoblox: 'Reflexão e compartilhamento',
      acao: 'Documentar o processo e aprendizados',
      macroCompetencia: 'Aprender a aprender',
      competenciaPedagogica: 'Metacognição e avaliação de aprendizagem',
      evidencia: 'Mini-diário, vídeo ou post de reflexão',
      badge: 'Badge 8 - Reflexão',
      confiancaFamiliar: 'O jovem olha para o que construiu, reconhece seu esforço e compartilha aprendizados em um ambiente protegido. É o fechamento formativo e humano.'
    }
  ]

  const cells = []
  
  for (let row = 0; row < 8; row++) {
    const badge = badgesData[row]
    const columns = [
      badge.trilha,
      badge.dimensaoRoblox,
      badge.acao,
      badge.macroCompetencia,
      badge.competenciaPedagogica,
      badge.evidencia,
      badge.badge,
      badge.confiancaFamiliar
    ]
    
    for (let col = 0; col < 8; col++) {
      const id = `badge-${row}-${col}`
      const isEven = row % 2 === 0
      const isTrilhaColumn = col === 0
      const isLastColumn = col === 7
      const isBadgeColumn = col === 1
      let displayValue
      
      if (col === 0) {
        displayValue = columns[0]
      } else if (col === 1) {
        displayValue = columns[6]
      } else if (col === 6) {
        displayValue = columns[1]
      } else {
        displayValue = columns[col]
      }
      
      cells.push(
        <div key={id} id={id} className={`badge-cell ${isEven ? 'even' : 'odd'}`}>
          {isTrilhaColumn ? (
            <button
              className="trilha-button"
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current)
                  closeTimeoutRef.current = null
                }
                setPopupImage(trilhasImgs[row])
              }}
              onMouseLeave={() => {
                closeTimeoutRef.current = setTimeout(() => {
                  setPopupImage(null)
                }, 100)
              }}
            >
              <img src={trilhasImgs[row]} alt={displayValue} className="trilha-img" />
            </button>
          ) : (
            <p style={{ 
              fontWeight: isLastColumn || isBadgeColumn ? 'bold' : 'normal',
              textTransform: isBadgeColumn ? 'uppercase' : 'none',
              fontSize: isLastColumn ? '0.784rem' : undefined,
              fontFamily: isBadgeColumn ? "'Barriecito', cursive" : undefined
            }}>{displayValue}</p>
          )}
        </div>
      )
    }
  }

  return (
    <div className="badges-container">
      <div className="badges-grid">
        {cells}
      </div>
      {popupImage && (
        <div 
          className="popup-overlay"
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current)
              closeTimeoutRef.current = null
            }
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => {
              setPopupImage(null)
            }, 100)
          }}
        >
          <div className="popup-content">
            <button className="popup-close" onClick={() => setPopupImage(null)}>
              ×
            </button>
            <img src={popupImage} alt="Trilha" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Badges


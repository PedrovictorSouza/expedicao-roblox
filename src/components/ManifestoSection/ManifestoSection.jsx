import './ManifestoSection.css'
import manifestoData from '../../data/manifesto.json'

function ManifestoSection() {
  const texts = manifestoData.texts
  const totalTexts = texts.length

  return (
    <section className="manifesto-section">
      <div className="manifesto-section-content">
        {texts.map((text, index) => {
          const isLastTwo = index >= totalTexts - 2
          const isCta = index === totalTexts - 2
          const isClosing = index === totalTexts - 1
          
          return (
            <p 
              key={index} 
              className={`manifesto-section-text ${isCta ? 'manifesto-cta-text' : ''} ${isClosing ? 'manifesto-closing-text' : ''}`}
            >
              {text}
            </p>
          )
        })}
      </div>
    </section>
  )
}

export default ManifestoSection


import { useState, useEffect, useRef } from 'react'
import './Manifesto.css'
import manifestoData from '../../data/manifesto.json'

const manifestoTexts = manifestoData.texts

function Manifesto() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [textParts, setTextParts] = useState([])
  const typingTimeoutRef = useRef(null)

  const splitTextIntoParts = (text) => {
    if (text.length <= 150) {
      return [text]
    }
    const parts = []
    let currentPart = ''
    const words = text.split(' ')
    
    words.forEach(word => {
      if ((currentPart + word).length <= 150) {
        currentPart += (currentPart ? ' ' : '') + word
      } else {
        if (currentPart) {
          parts.push(currentPart)
        }
        currentPart = word
      }
    })
    
    if (currentPart) {
      parts.push(currentPart)
    }
    
    return parts
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const currentText = manifestoTexts[currentTextIndex]
    const parts = splitTextIntoParts(currentText)
    setTextParts(parts)
    setCurrentPartIndex(0)
    setDisplayedText('')
    setIsTyping(true)
  }, [currentTextIndex, isVisible])

  useEffect(() => {
    if (textParts.length === 0 || !isVisible) return
    
    const currentPart = textParts[currentPartIndex]
    if (!currentPart) return

    if (!isTyping) return

    if (displayedText.length < currentPart.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedText(currentPart.substring(0, displayedText.length + 1))
      }, 10)
    } else {
      setIsTyping(false)
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [displayedText, currentPartIndex, textParts, isTyping, isVisible])

  useEffect(() => {
    if (textParts.length > 0 && currentPartIndex < textParts.length) {
      setDisplayedText('')
      setIsTyping(true)
    }
  }, [currentPartIndex])

  const handleSeguir = () => {
    if (isTyping) return
    
    const currentText = manifestoTexts[currentTextIndex]
    const parts = splitTextIntoParts(currentText)
    
    if (currentPartIndex < parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
    } else {
      if (currentTextIndex < manifestoTexts.length - 1) {
        setCurrentTextIndex(currentTextIndex + 1)
      } else {
        setIsVisible(false)
      }
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const calculateProgress = () => {
    if (manifestoTexts.length === 0) return 0
    
    const totalTexts = manifestoTexts.length
    let completedTexts = currentTextIndex
    
    let currentTextProgress = 0
    if (textParts.length > 0) {
      if (currentPartIndex < textParts.length) {
        const currentPart = textParts[currentPartIndex]
        const partProgress = currentPart ? (displayedText.length / currentPart.length) : 0
        currentTextProgress = (currentPartIndex + partProgress) / textParts.length
      } else {
        currentTextProgress = 1
        completedTexts = currentTextIndex + 1
      }
    }
    
    const totalProgress = (completedTexts + currentTextProgress) / totalTexts
    return Math.min(100, Math.max(0, totalProgress * 100))
  }

  const progress = calculateProgress()

  const isLastText = currentTextIndex === manifestoTexts.length - 1
  const isLastPart = currentPartIndex === textParts.length - 1
  const isComplete = !isTyping && displayedText.length === (textParts[currentPartIndex]?.length || 0)
  const buttonText = isLastText && isLastPart && isComplete ? 'fechar' : 'seguir'

  if (!isVisible) return null

  return (
    <div className="grid-verde">
      <div className="grid-item"></div>
      <div className="popup-overlay"></div>
      <div className="popup-container">
        <div className="popup-dialog">
          <button 
            className="popup-close-button" 
            onClick={handleClose}
            aria-label="Fechar"
          >
            ×
          </button>
          <div className="popup-progress-container">
            <div className="popup-progress-bar">
              <div 
                className="popup-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="popup-progress-text">{Math.round(progress)}%</span>
          </div>
          <div className="popup-text">
            {displayedText}
            {isTyping && <span className="cursor">|</span>}
          </div>
          <button 
            className="popup-button" 
            onClick={handleSeguir}
            disabled={isTyping}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Manifesto

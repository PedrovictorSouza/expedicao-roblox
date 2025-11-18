import { useState, useEffect } from 'react'
import { useIDEGrid } from './IDEGridContext'
import { getGridAreaInfo } from './IDEGridUtils'
import './IDEGridManager.css'

function IDEGridManager() {
  const [isOpen, setIsOpen] = useState(true)
  const {
    gridObjects,
    selectedObject,
    removeGridObject,
    selectGridObject
  } = useIDEGrid()

  useEffect(() => {
    if (selectedObject) {
      setIsOpen(true)
    }
  }, [selectedObject])

  const toggleManager = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className={`ide-grid-manager ${isOpen ? 'open' : 'closed'}`}>
      <div className="grid-manager-header">
        <h3>Gerenciador de Objetos do Grid</h3>
        <button onClick={toggleManager} className="toggle-button">
          <span className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      
      {isOpen && (
        <>
          {selectedObject && (
            <div className="grid-manager-stats">
              <p>Objeto selecionado: {selectedObject.id}</p>
            </div>
          )}

          {selectedObject && (() => {
            const areaInfo = selectedObject.description 
              ? selectedObject 
              : selectedObject.area 
                ? { ...selectedObject, ...getGridAreaInfo(selectedObject.area) }
                : null
            
            return areaInfo && areaInfo.description ? (
              <div className="grid-object-details">
                <h4 className="details-title">Detalhes da Área</h4>
                <div className="details-content">
                  <div className="detail-item">
                    <span className="detail-label">Nome:</span>
                    <span className="detail-value">{areaInfo.name || areaInfo.area}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tipo:</span>
                    <span className="detail-value">{areaInfo.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Descrição:</span>
                    <span className="detail-value">{areaInfo.description}</span>
                  </div>
                  <div className="detail-item detail-function">
                    <span className="detail-label">Função:</span>
                    <span className="detail-value">{areaInfo.function}</span>
                  </div>
                </div>
              </div>
            ) : null
          })()}

          <div className="grid-objects-list">
            {gridObjects.map(obj => (
              <div
                key={obj.id}
                className={`grid-object-item ${selectedObject?.id === obj.id ? 'selected' : ''}`}
                onClick={() => selectGridObject(obj.id)}
              >
                <span>ID: {obj.id}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeGridObject(obj.id)
                  }}
                  className="remove-button"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default IDEGridManager


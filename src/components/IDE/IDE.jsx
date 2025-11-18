import './IDE.css'
import ideTop from '../../assets/IDE/IDE-TOP.png'
import ideToolbar from '../../assets/IDE/IDE-TOOLBAR.png'
import ideExplorer from '../../assets/IDE/IDE-EXPLORER.png'
import ideViewport from '../../assets/IDE/IDE-VIEWPORT.png'
import ideConsole from '../../assets/IDE/IDE-CONSOLE.png'
import { IDEGridProvider, useIDEGrid } from './IDEGridContext'
import IDEGridManager from './IDEGridManager'
import { createGridObject, getGridAreaInfo } from './IDEGridUtils'

function GridArea({ areaName, style, children }) {
  const { gridObjects, addGridObject, selectGridObject, clickedArea, setClickedGridArea, clearClickedArea } = useIDEGrid()

  const handleClick = () => {
    const existingObject = gridObjects.find(obj => obj.area === areaName)
    
    if (existingObject) {
      selectGridObject(existingObject.id)
    } else {
      const areaInfo = getGridAreaInfo(areaName)
      const newObject = createGridObject(areaName, 'grid-area', {
        ...areaInfo
      })
      addGridObject(newObject)
      selectGridObject(newObject)
    }
    
    setClickedGridArea(areaName)
  }

  const handleMouseLeave = () => {
    clearClickedArea()
  }

  const isOtherAreaClicked = clickedArea && clickedArea !== areaName

  return (
    <div
      className={`ide-${areaName} ${isOtherAreaClicked ? 'other-clicked' : ''}`}
      style={style}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

function IDEContent() {
  return (
    <div className="ide-container">
      <GridArea
        areaName="top-bar"
        style={{ backgroundImage: `url(${ideTop})` }}
      />
      <GridArea
        areaName="toolbar"
        style={{ backgroundImage: `url(${ideToolbar})` }}
      />
      <div className="ide-main-area">
        <GridArea
          areaName="explorer"
          style={{ backgroundImage: `url(${ideExplorer})` }}
        />
        <GridArea
          areaName="viewport"
          style={{ backgroundImage: `url(${ideViewport})` }}
        />
      </div>
      <GridArea
        areaName="console"
        style={{ backgroundImage: `url(${ideConsole})` }}
      />
    </div>
  )
}

function IDE() {
  return (
    <IDEGridProvider>
      <IDEContent />
      <IDEGridManager />
    </IDEGridProvider>
  )
}

export default IDE


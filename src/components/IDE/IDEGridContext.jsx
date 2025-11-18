import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { ideGridObserver } from './IDEGridObserver'

const IDEGridContext = createContext(null)

export function useIDEGrid() {
  const context = useContext(IDEGridContext)
  if (!context) {
    throw new Error('useIDEGrid deve ser usado dentro de IDEGridProvider')
  }
  return context
}

export function IDEGridProvider({ children }) {
  const [gridObjects, setGridObjects] = useState([])
  const [selectedObject, setSelectedObject] = useState(null)
  const [clickedArea, setClickedArea] = useState(null)
  const selectedObjectRef = useRef(selectedObject)
  const clickedAreaRef = useRef(clickedArea)
  const gridObjectsRef = useRef(gridObjects)

  useEffect(() => {
    selectedObjectRef.current = selectedObject
  }, [selectedObject])

  useEffect(() => {
    clickedAreaRef.current = clickedArea
  }, [clickedArea])

  useEffect(() => {
    gridObjectsRef.current = gridObjects
  }, [gridObjects])

  useEffect(() => {
    const unsubscribe = ideGridObserver.subscribe({
      onObjectAdded: (object) => {
        setGridObjects(prev => {
          const updated = [...prev, object]
          gridObjectsRef.current = updated
          return updated
        })
      },
      onObjectRemoved: (objectId) => {
        setGridObjects(prev => {
          const removedObject = prev.find(obj => obj.id === objectId)
          if (removedObject && clickedAreaRef.current === removedObject.area) {
            setClickedArea(null)
          }
          if (selectedObjectRef.current?.id === objectId) {
            setSelectedObject(null)
          }
          const updated = prev.filter(obj => obj.id !== objectId)
          gridObjectsRef.current = updated
          return updated
        })
      },
      onObjectUpdated: (object) => {
        setGridObjects(prev => {
          const updated = prev.map(obj => 
            obj.id === object.id ? { ...obj, ...object } : obj
          )
          gridObjectsRef.current = updated
          return updated
        })
        if (selectedObjectRef.current?.id === object.id) {
          setSelectedObject(object)
        }
      },
      onObjectSelected: (object) => {
        setSelectedObject(object || null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const addGridObject = useCallback((object) => {
    const newObject = object.id ? object : { ...object, id: Date.now() }
    ideGridObserver.notifyObjectAdded(newObject)
  }, [])

  const removeGridObject = useCallback((id) => {
    ideGridObserver.notifyObjectRemoved(id)
  }, [])

  const updateGridObject = useCallback((id, updates) => {
    const updatedObject = { id, ...updates }
    ideGridObserver.notifyObjectUpdated(updatedObject)
  }, [])

  const selectGridObject = useCallback((idOrObject) => {
    if (typeof idOrObject === 'object' && idOrObject !== null) {
      ideGridObserver.notifyObjectSelected(idOrObject)
    } else {
      const object = gridObjectsRef.current.find(obj => obj.id === idOrObject)
      ideGridObserver.notifyObjectSelected(object || null)
    }
  }, [])

  const clearSelection = useCallback(() => {
    ideGridObserver.notifyObjectSelected(null)
    setClickedArea(null)
  }, [])

  const setClickedGridArea = useCallback((areaName) => {
    setClickedArea(areaName)
  }, [])

  const clearClickedArea = useCallback(() => {
    setClickedArea(null)
  }, [])

  const value = {
    gridObjects,
    selectedObject,
    clickedArea,
    addGridObject,
    removeGridObject,
    updateGridObject,
    selectGridObject,
    clearSelection,
    setClickedGridArea,
    clearClickedArea
  }

  return (
    <IDEGridContext.Provider value={value}>
      {children}
    </IDEGridContext.Provider>
  )
}


import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { IDEGridProvider, useIDEGrid } from './IDEGridContext'
import { createGridObject, getGridAreaInfo } from './IDEGridUtils'

function wrapper({ children }) {
  return <IDEGridProvider>{children}</IDEGridProvider>
}

describe('IDEGridContext - Sincronização de Seleção', () => {
  it('deve selecionar objeto imediatamente após adicionar', async () => {
    const { result } = renderHook(() => useIDEGrid(), { wrapper })

    const areaInfo = getGridAreaInfo('viewport')
    const newObject = createGridObject('viewport', 'grid-area', {
      ...areaInfo
    })

    act(() => {
      result.current.addGridObject(newObject)
      result.current.selectGridObject(newObject.id)
    })

    await waitFor(() => {
      expect(result.current.selectedObject).toBeDefined()
      expect(result.current.selectedObject.id).toBe(newObject.id)
      expect(result.current.selectedObject.description).toBe(areaInfo.description)
    })
  })

  it('deve encontrar objeto existente ao selecionar por área', async () => {
    const { result } = renderHook(() => useIDEGrid(), { wrapper })

    const areaInfo = getGridAreaInfo('explorer')
    const newObject = createGridObject('explorer', 'grid-area', {
      ...areaInfo
    })

    act(() => {
      result.current.addGridObject(newObject)
    })

    await waitFor(() => {
      expect(result.current.gridObjects.length).toBe(1)
    })

    act(() => {
      result.current.selectGridObject(newObject.id)
    })

    await waitFor(() => {
      expect(result.current.selectedObject).toBeDefined()
      expect(result.current.selectedObject.id).toBe(newObject.id)
      expect(result.current.selectedObject.description).toBe(areaInfo.description)
    })
  })

  it('deve manter seleção quando objeto já existe e é clicado novamente', async () => {
    const { result } = renderHook(() => useIDEGrid(), { wrapper })

    const areaInfo = getGridAreaInfo('toolbar')
    const newObject = createGridObject('toolbar', 'grid-area', {
      ...areaInfo
    })

    act(() => {
      result.current.addGridObject(newObject)
    })

    await waitFor(() => {
      expect(result.current.gridObjects.length).toBe(1)
    })

    act(() => {
      result.current.selectGridObject(newObject.id)
    })

    await waitFor(() => {
      expect(result.current.selectedObject).toBeDefined()
    })

    const firstSelection = result.current.selectedObject

    act(() => {
      result.current.selectGridObject(newObject.id)
    })

    await waitFor(() => {
      expect(result.current.selectedObject).toBeDefined()
      expect(result.current.selectedObject.id).toBe(firstSelection.id)
    })
  })

  it('deve exibir detalhes completos do objeto selecionado', async () => {
    const { result } = renderHook(() => useIDEGrid(), { wrapper })

    const areaInfo = getGridAreaInfo('console')
    const newObject = createGridObject('console', 'grid-area', {
      ...areaInfo
    })

    act(() => {
      result.current.addGridObject(newObject)
      result.current.selectGridObject(newObject.id)
    })

    await waitFor(() => {
      const selected = result.current.selectedObject
      expect(selected).toBeDefined()
      expect(selected.description).toBe(areaInfo.description)
      expect(selected.function).toBe(areaInfo.function)
      expect(selected.name).toBe(areaInfo.name)
      expect(selected.type).toBe(areaInfo.type)
    })
  })

  it('deve lidar com múltiplos cliques rápidos na mesma área', async () => {
    const { result } = renderHook(() => useIDEGrid(), { wrapper })

    const areaInfo = getGridAreaInfo('viewport')
    const newObject = createGridObject('viewport', 'grid-area', {
      ...areaInfo
    })

    act(() => {
      result.current.addGridObject(newObject)
      result.current.selectGridObject(newObject.id)
      result.current.selectGridObject(newObject.id)
      result.current.selectGridObject(newObject.id)
    })

    await waitFor(() => {
      expect(result.current.gridObjects.length).toBe(1)
      expect(result.current.selectedObject).toBeDefined()
      expect(result.current.selectedObject.id).toBe(newObject.id)
    })
  })

  it('deve selecionar objeto existente quando área é clicada novamente', async () => {
    const { result } = renderHook(() => useIDEGrid(), { wrapper })

    const areaInfo = getGridAreaInfo('top-bar')
    const newObject = createGridObject('top-bar', 'grid-area', {
      ...areaInfo
    })

    act(() => {
      result.current.addGridObject(newObject)
    })

    await waitFor(() => {
      expect(result.current.gridObjects.length).toBe(1)
    })

    act(() => {
      const existingObject = result.current.gridObjects.find(obj => obj.area === 'top-bar')
      if (existingObject) {
        result.current.selectGridObject(existingObject.id)
      }
    })

    await waitFor(() => {
      expect(result.current.selectedObject).toBeDefined()
      expect(result.current.selectedObject.area).toBe('top-bar')
      expect(result.current.selectedObject.description).toBe(areaInfo.description)
    })
  })
})


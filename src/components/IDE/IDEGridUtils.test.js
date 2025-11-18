import { describe, it, expect } from 'vitest'
import { createGridObject, getGridAreaInfo } from './IDEGridUtils'

describe('createGridObject', () => {
  it('deve criar objeto com ID único', () => {
    const obj1 = createGridObject('top-bar')
    const obj2 = createGridObject('toolbar')
    
    expect(obj1.id).toBeDefined()
    expect(obj2.id).toBeDefined()
    expect(obj1.id).not.toBe(obj2.id)
  })

  it('deve incluir areaName fornecido', () => {
    const obj = createGridObject('explorer')
    
    expect(obj.area).toBe('explorer')
  })

  it('deve usar type padrão "grid-area" se não fornecido', () => {
    const obj = createGridObject('viewport')
    
    expect(obj.type).toBe('grid-area')
  })

  it('deve aceitar type customizado', () => {
    const obj = createGridObject('console', 'custom-type')
    
    expect(obj.type).toBe('custom-type')
  })

  it('deve incluir timestamp ISO válido', () => {
    const obj = createGridObject('top-bar')
    
    expect(obj.timestamp).toBeDefined()
    expect(typeof obj.timestamp).toBe('string')
    expect(() => new Date(obj.timestamp)).not.toThrow()
    expect(new Date(obj.timestamp).toISOString()).toBe(obj.timestamp)
  })

  it('deve mesclar metadata customizado', () => {
    const metadata = { customProp: 'value', anotherProp: 123 }
    const obj = createGridObject('toolbar', 'grid-area', metadata)
    
    expect(obj.customProp).toBe('value')
    expect(obj.anotherProp).toBe(123)
  })

  it('deve gerar IDs diferentes em chamadas consecutivas', () => {
    const ids = []
    for (let i = 0; i < 10; i++) {
      const obj = createGridObject('viewport')
      ids.push(obj.id)
    }
    
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(10)
  })
})

describe('getGridAreaInfo', () => {
  it('deve retornar informações para top-bar', () => {
    const info = getGridAreaInfo('top-bar')
    
    expect(info).toBeDefined()
    expect(info.name).toBe('top-bar')
    expect(info.description).toBeDefined()
    expect(info.function).toBeDefined()
    expect(info.type).toBeDefined()
  })

  it('deve retornar informações para toolbar', () => {
    const info = getGridAreaInfo('toolbar')
    
    expect(info).toBeDefined()
    expect(info.name).toBe('toolbar')
    expect(info.description).toBeDefined()
    expect(info.function).toBeDefined()
  })

  it('deve retornar informações para explorer', () => {
    const info = getGridAreaInfo('explorer')
    
    expect(info).toBeDefined()
    expect(info.name).toBe('explorer')
    expect(info.description).toBeDefined()
    expect(info.function).toBeDefined()
  })

  it('deve retornar informações para viewport', () => {
    const info = getGridAreaInfo('viewport')
    
    expect(info).toBeDefined()
    expect(info.name).toBe('viewport')
    expect(info.description).toBeDefined()
    expect(info.function).toBeDefined()
  })

  it('deve retornar informações para console', () => {
    const info = getGridAreaInfo('console')
    
    expect(info).toBeDefined()
    expect(info.name).toBe('console')
    expect(info.description).toBeDefined()
    expect(info.function).toBeDefined()
  })

  it('deve retornar informações diferentes para cada área', () => {
    const topBarInfo = getGridAreaInfo('top-bar')
    const toolbarInfo = getGridAreaInfo('toolbar')
    const explorerInfo = getGridAreaInfo('explorer')
    
    expect(topBarInfo.description).not.toBe(toolbarInfo.description)
    expect(toolbarInfo.description).not.toBe(explorerInfo.description)
  })

  it('deve retornar null ou objeto vazio para área inválida', () => {
    const info = getGridAreaInfo('invalid-area')
    
    expect(info).toBeDefined()
  })
})


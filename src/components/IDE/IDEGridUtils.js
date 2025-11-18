let idCounter = 0

export function generateGridObjectId() {
  const timestamp = Date.now()
  const counter = idCounter++
  return `${timestamp}-${counter}`
}

export function createGridObject(areaName, type = 'grid-area', metadata = {}) {
  return {
    id: generateGridObjectId(),
    type,
    area: areaName,
    timestamp: new Date().toISOString(),
    ...metadata
  }
}

export function getGridAreaInfo(areaName) {
  const areaInfoMap = {
    'top-bar': {
      name: 'top-bar',
      type: 'navigation',
      description: 'Barra superior do IDE',
      function: 'Contém controles de teste, play, pause, stop, tabs de navegação (Home, Avatar, UI, Script, Model, Plugins) e controles de colaboração e compartilhamento'
    },
    'toolbar': {
      name: 'toolbar',
      type: 'tools',
      description: 'Barra de ferramentas',
      function: 'Fornece ferramentas de seleção (Select, Move, Scale, Rotate, Transform), criação de objetos (Part, Terrain, Character, GUI, Script), configurações de material, cor, agrupamento e física'
    },
    'explorer': {
      name: 'explorer',
      type: 'panel',
      description: 'Painel Explorer',
      function: 'Exibe hierarquia de arquivos, serviços e objetos do projeto. Permite navegar pela estrutura do projeto, visualizar propriedades e gerenciar elementos como Workspace, Players, Lighting, Scripts e outros serviços'
    },
    'viewport': {
      name: 'viewport',
      type: 'view',
      description: 'Área de visualização 3D',
      function: 'Área principal onde o usuário visualiza e interage com a cena 3D. Permite manipulação de objetos, navegação na cena e visualização do resultado final do projeto'
    },
    'console': {
      name: 'console',
      type: 'output',
      description: 'Console de saída',
      function: 'Exibe logs, mensagens de sistema, erros e resultados de execução. Permite filtrar mensagens por contexto e limpar o histórico de saída'
    }
  }

  return areaInfoMap[areaName] || {
    name: areaName,
    type: 'unknown',
    description: 'Área não identificada',
    function: 'Função não definida para esta área'
  }
}


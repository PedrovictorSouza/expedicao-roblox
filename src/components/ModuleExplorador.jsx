import { useNavigate } from 'react-router-dom'
import './ModuleExplorador.css'

function ModuleExplorador() {
  const navigate = useNavigate()

  const videos = [
      {
          numero: 1,
          tituloCurto: "Mais do que um jogo",
          duracao: "2 min",
          abertura: "Você sabia que o Roblox não é só pra jogar — é pra criar também? O Roblox Studio é tipo um universo onde você constrói tudo: jogos, mundos, roupas, histórias.",
          corpo: "Mostrar tela inicial do Roblox Studio, explicar a diferença entre jogar e criar. Inserir exemplos reais de jogos criados por jovens.",
          encerramento: "Aqui, você não precisa saber tudo. Basta começar. Bora explorar?",
          tomVisual: "Planetas, galáxias, cenas de mundos criados no Roblox."
      },
      {
          numero: 2,
          tituloCurto: "Primeiro login, primeiro passo",
          duracao: "2 min",
          abertura: "Vamos abrir o Roblox Studio juntos? É super rápido!",
          corpo: "Mostra o download (site oficial). Explica login com conta Roblox. Mostra a tela inicial de templates (Baseplate, Obby, etc). Fala: 'Escolha qualquer um, você pode mudar tudo depois.'",
          encerramento: "Pronto! Agora você já está dentro do seu primeiro universo digital.",
          tomVisual: "Interface real do Studio, com zoom nos botões e dicas visuais."
      },
      {
          numero: 3,
          tituloCurto: "Se perca pra se encontrar",
          duracao: "2 min",
          abertura: "O Roblox Studio parece complexo, mas calma — é só saber onde tudo vive.",
          corpo: "Explica áreas principais: Viewport (mundo), Explorer (lista de objetos), Properties (detalhes). Mostra o que acontece quando clica em um bloco e altera propriedades (cor, tamanho). Dica: 'Clica, experimenta, descobre. Criar é errar rápido e ver o que acontece.'",
          encerramento: "Agora que você sabe onde tudo está, tá pronto pra construir!",
          tomVisual: "Ilustrações em overlay com setas e dicas pop-up."
      },
      {
          numero: 4,
          tituloCurto: "Do zero ao universo",
          duracao: "2 min",
          abertura: "Chegou a hora de criar o seu primeiro mundo. Sem medo, bora lá!",
          corpo: "Mostra como adicionar blocos, mudar tamanhos e cores. Cria uma pequena ilha com árvores, lago e plataforma. Introduz a ideia de salvar o progresso. 'Não existe errado, existe versão 1.0.'",
          encerramento: "Seu primeiro mundo existe — e foi você quem fez.",
          tomVisual: "Time-lapse da criação, trilha leve e divertida."
      },
      {
          numero: 5,
          tituloCurto: "De criador a anfitrião",
          duracao: "2 min",
          abertura: "Tá pronto pra mostrar seu mundo pro resto do universo Roblox?",
          corpo: "Ensina a clicar em File → Publish to Roblox. Configurar nome, visibilidade e salvar. Mostra como entrar e jogar o próprio mapa. 'Compartilha o link com um amigo e vê o que ele acha.'",
          encerramento: "Você acabou de publicar algo que antes só existia na sua cabeça. Bora criar o próximo?",
          tomVisual: "Cenas de amigos jogando o mapa, tela de publicação no Roblox."
      }
  ]

  return (
    <div className="module-container">
      <button className="back-button" onClick={() => navigate('/missions')}>
        ← Voltar
      </button>
      
      <div className="module-header">
        <div className="module-icon">🪐</div>
        <h1 className="module-title">MÓDULO 1 — EXPLORADOR/A</h1>
        <div className="module-info">
          <span className="module-theme">Tema: Primeiros passos no Roblox Studio</span>
          <span className="module-duration">Duração total: ~10 minutos (5 vídeos de 2min)</span>
          <span className="module-objective">Objetivo: Introduzir o Roblox Studio, criar o primeiro mundo e publicá-lo.</span>
        </div>
      </div>

      <div className="videos-section">
        {videos.map((video) => (
          <div key={video.numero} className="video-card">
            <div className="video-header">
              <span className="video-number">🎥 Vídeo {video.numero}:</span>
              <span className="video-short-title">{video.tituloCurto}</span>
              <span className="video-duration">{video.duracao}</span>
            </div>
            <div className="video-content">
              <div className="video-section">
                <strong>Abertura:</strong>
                <p>{video.abertura}</p>
              </div>
              <div className="video-section">
                <strong>Corpo:</strong>
                <p>{video.corpo}</p>
              </div>
              <div className="video-section">
                <strong>Encerramento:</strong>
                <p>{video.encerramento}</p>
              </div>
              <div className="video-section">
                <strong>Tom visual:</strong>
                <p>{video.tomVisual}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="challenge-section">
        <div className="challenge-icon">🧩</div>
        <h2 className="challenge-title">Desafio Final do Módulo</h2>
        <p className="challenge-text">
          Crie um mapa que represente o seu lugar favorito no mundo — real ou imaginário.
        </p>
        <p className="challenge-text">
          Publique no Roblox e compartilhe o link para ganhar a badge 🪐 Explorador/a.
        </p>
      </div>

      <div className="style-section">
        <div className="style-icon">💡</div>
        <h2 className="style-title">Estilo e Produção</h2>
        <div className="style-list">
          <p><strong>Formato:</strong> 16:9 (para YouTube e trilha) + versão 9:16 (para Reels/TikTok).</p>
          <p><strong>Ritmo:</strong> ágil, cortes dinâmicos, trilha otimista, e close-ups visuais do Studio.</p>
          <p><strong>Linguagem:</strong> jovem, empática, sem jargões técnicos.</p>
          <p><strong>Encerramento padrão:</strong> "Agora é contigo! Mostra pro mundo o que você criou."</p>
        </div>
      </div>
    </div>
  )
}

export default ModuleExplorador



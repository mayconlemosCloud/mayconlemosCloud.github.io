// Conteúdo dos cases. Os campos marcados com TODO dependem de números reais
// que só o Maycon tem — não inventar métricas.

export interface Case {
  slug: string;
  numero: string;
  titulo: string;
  resumo: string;
  stack: string[];
  repo: string;
  demo?: string;
  problema: string;
  arquitetura: string[];
  decisoes: { titulo: string; texto: string }[];
  aprendizados: string[];
  // TODO: preencher com números reais (latência, custo, volume)
  resultados?: { rotulo: string; valor: string }[];
}

export const cases: Case[] = [
  {
    slug: 'traducao-tempo-real-ia',
    numero: '01',
    titulo: 'Tradução de reuniões em tempo real com três provedores de IA',
    resumo:
      'Um app desktop que escuta a reunião e traduz voz para voz. Comparei Azure Speech, OpenAI Realtime e Gemini Live para descobrir qual entrega a melhor latência e qualidade para conversa ao vivo.',
    stack: ['.NET 8/9', 'WPF', 'NAudio / WASAPI', 'Gemini Live', 'OpenAI Realtime', 'Azure Speech'],
    repo: 'https://github.com/mayconlemosCloud/Traducao-RealTime-.NET8-AzureAi-Gemini-OpenAI',
    demo: 'https://www.youtube.com/watch?v=5ARUsHx-Epc',
    problema:
      'Em reunião, tradução que chega dois segundos depois já não serve: a conversa seguiu. O desafio não era “chamar uma API de IA”, era capturar o áudio do sistema e do microfone, manter o fluxo contínuo e devolver voz traduzida rápido o bastante para não quebrar o diálogo.',
    arquitetura: [
      'Captura de áudio por loopback (WASAPI) — traduz o que os outros falam, não só o microfone.',
      'Camada de provedores intercambiável: Azure Speech, OpenAI Realtime e Gemini Live atrás da mesma interface.',
      'Streaming bidirecional via WebSocket com o Gemini Live, recebendo áudio nativo de volta.',
      'Janela flutuante sempre no topo, para usar junto com Teams, Zoom ou Meet.',
      'MVVM no WPF para separar captura, tradução e interface.',
    ],
    decisoes: [
      {
        titulo: 'Abstrair o provedor desde o primeiro dia',
        texto:
          'Cada provedor tem pontos fortes diferentes em latência, custo e qualidade de voz. Isolar a integração atrás de uma interface permitiu comparar os três com o mesmo áudio, em vez de escolher no escuro.',
      },
      {
        titulo: 'Áudio para áudio, sem passar por texto',
        texto:
          'O caminho clássico (fala → texto → tradução → voz) soma três latências. Com o Gemini Live o modelo recebe áudio e devolve áudio, eliminando etapas intermediárias.',
      },
      {
        titulo: 'Desktop nativo em vez de web',
        texto:
          'Capturar o áudio do sistema por loopback não é possível no navegador sem gambiarra. WPF com NAudio dá acesso direto ao WASAPI.',
      },
    ],
    aprendizados: [
      'Em IA em tempo real, latência é requisito de produto, não detalhe técnico.',
      'Comparar provedores com o mesmo áudio de teste vale mais que benchmark de marketing.',
    ],
  },
  {
    slug: 'microsservicos-kafka-ia',
    numero: '02',
    titulo: 'Análise de fraude orientada a eventos com Kafka e IA',
    resumo:
      'Três serviços independentes conversando por Kafka: um recebe a fatura, outro persiste, outro usa o Gemini para analisar fraude. O front acompanha cada etapa em tempo real.',
    stack: ['NestJS', 'Apache Kafka', 'Gemini', 'Socket.io', 'SQLite', 'Docker Compose'],
    repo: 'https://github.com/mayconlemosCloud/NestJS-kafka-MicroService-AI-Deep-Finance',
    problema:
      'Chamar um modelo de IA dentro da requisição HTTP deixa a API lenta e frágil: se o modelo demora ou falha, o usuário fica esperando. A análise precisava acontecer em segundo plano, sem bloquear quem envia a fatura e sem perder o acompanhamento em tempo real.',
    arquitetura: [
      'Producer API recebe a fatura e publica o evento “fatura criada” no Kafka.',
      'Agente bancário consome, persiste e publica “fatura salva”.',
      'Agente de IA consome, analisa fraude com Gemini, atualiza o status e publica “finalizado”.',
      'O producer faz a ponte do evento final para o front via WebSocket.',
      'Tudo sobe com um único docker-compose.',
    ],
    decisoes: [
      {
        titulo: 'IA fora do caminho síncrono',
        texto:
          'A análise de IA é a etapa mais lenta e mais sujeita a falha. Colocá-la em um consumidor próprio isola essa instabilidade: a API responde na hora e a análise acontece no seu ritmo.',
      },
      {
        titulo: 'Um serviço por responsabilidade',
        texto:
          'Persistir e analisar escalam de forma diferente. Separar os agentes permite escalar só o consumidor de IA quando o volume cresce.',
      },
      {
        titulo: 'Eventos como contrato',
        texto:
          'Os serviços só conhecem os tópicos, não uns aos outros. Dá para adicionar um novo consumidor (ex.: notificação) sem tocar nos existentes.',
      },
    ],
    aprendizados: [
      'Próximo passo: idempotência no consumidor e dead-letter topic para mensagens que falham na análise.',
      'Testes de integração com Kafka real (Testcontainers) em vez de mocks.',
    ],
  },
  {
    slug: 'sistema-de-entregas',
    numero: '03',
    titulo: 'Pedidos e entregas com notificações em tempo real',
    resumo:
      'Sistema fullstack de pedidos e entregas: Angular no front, ASP.NET Core na API, MongoDB e SignalR para avisar o painel no instante em que algo acontece.',
    stack: ['ASP.NET Core 9', 'Angular 19', 'SignalR', 'MongoDB', 'JWT', 'Docker + Nginx'],
    repo: 'https://github.com/mayconlemosCloud/angular-dotnet-delivery-system',
    problema:
      'Operação de entrega depende de saber o que mudou agora. Painel que precisa de F5 gera retrabalho e erro. O objetivo era um fluxo completo — cadastro, pedido com endereço automático, registro de entrega — com o painel atualizado sozinho.',
    arquitetura: [
      'API REST em ASP.NET Core 9 com autenticação JWT e validação com FluentValidation.',
      'Busca de endereço por CEP via ViaCEP, com cliente HTTP tipado (Refit).',
      'SignalR emite eventos de pedido criado e entrega registrada para o painel.',
      'Serviço em background acompanha o status da entrega.',
      'Front em Angular 19 + Material, servido por Nginx; tudo sobe com Docker Compose.',
    ],
    decisoes: [
      {
        titulo: 'SignalR em vez de polling',
        texto:
          'Polling gasta requisição à toa e ainda chega atrasado. Com SignalR o servidor avisa só quando há mudança.',
      },
      {
        titulo: 'MongoDB para o modelo de documentos',
        texto:
          'Pedido, entrega e notificação são documentos com pouco relacionamento entre si. Mongo simplifica o modelo sem perder nada relevante para esse domínio.',
      },
      {
        titulo: 'Rodar com um comando',
        texto:
          'Quem avalia o projeto não precisa instalar .NET, Node ou Mongo: docker compose up e está no ar.',
      },
    ],
    aprendizados: [
      'Próximo passo: restringir CORS por ambiente e tirar segredos do appsettings.',
      'Cobrir o fluxo principal com testes de integração na API.',
    ],
  },
];

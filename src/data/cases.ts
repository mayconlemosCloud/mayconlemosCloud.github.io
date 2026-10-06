import type { Lang } from '../i18n/ui';

// Conteúdo dos cases nos três idiomas. Campos de "resultados" dependem de números
// reais que só o Maycon tem — não inventar métricas.

interface CaseTexto {
  titulo: string;
  resumo: string;
  problema: string;
  arquitetura: string[];
  decisoes: { titulo: string; texto: string }[];
  aprendizados: string[];
  // TODO: preencher com números reais (latência, custo, volume)
  resultados?: { rotulo: string; valor: string }[];
}

interface CaseBase {
  slug: string;
  numero: string;
  stack: string[];
  repo: string;
  demo?: string;
  texto: Record<Lang, CaseTexto>;
}

export type Case = Omit<CaseBase, 'texto'> & CaseTexto;

const base: CaseBase[] = [
  {
    slug: 'traducao-tempo-real-ia',
    numero: '01',
    stack: ['.NET 8/9', 'WPF', 'NAudio / WASAPI', 'Gemini Live', 'OpenAI Realtime', 'Azure Speech'],
    repo: 'https://github.com/mayconlemosCloud/Traducao-RealTime-.NET8-AzureAi-Gemini-OpenAI',
    demo: 'https://www.youtube.com/watch?v=5ARUsHx-Epc',
    texto: {
      pt: {
        titulo: 'Tradução de reuniões em tempo real com três provedores de IA',
        resumo:
          'Um app desktop que escuta a reunião e traduz voz para voz. Comparei Azure Speech, OpenAI Realtime e Gemini Live para descobrir qual entrega a melhor latência e qualidade para conversa ao vivo.',
        problema:
          'Em reunião, tradução que chega dois segundos depois já não serve: a conversa seguiu. O desafio não era “chamar uma API de IA”, era capturar o áudio do sistema e do microfone, manter o fluxo contínuo e devolver voz traduzida rápido o bastante para não quebrar o diálogo.',
        arquitetura: [
          'Captura de áudio por loopback (WASAPI) — traduz o que os outros falam, não só o microfone.',
          'Camada de provedores intercambiável: Azure Speech, OpenAI Realtime e Gemini Live atrás da mesma interface.',
          'Streaming bidirecional via WebSocket com o Gemini Live, recebendo áudio nativo de volta (evoluído depois no projeto gemini-live-voice).',
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
      en: {
        titulo: 'Real-time meeting translation with three AI providers',
        resumo:
          'A desktop app that listens to a meeting and translates voice to voice. I compared Azure Speech, OpenAI Realtime and Gemini Live to find which delivers the best latency and quality for live conversation.',
        problema:
          'In a meeting, a translation that arrives two seconds late is useless: the conversation has moved on. The challenge was not “calling an AI API” — it was capturing system and microphone audio, keeping the stream continuous and returning translated speech fast enough not to break the dialogue.',
        arquitetura: [
          'Loopback audio capture (WASAPI) — translates what other people say, not just the microphone.',
          'Pluggable provider layer: Azure Speech, OpenAI Realtime and Gemini Live behind the same interface.',
          'Bidirectional WebSocket streaming with Gemini Live, receiving native audio back (later evolved in the gemini-live-voice project).',
          'Always-on-top floating window, to use alongside Teams, Zoom or Meet.',
          'MVVM in WPF to separate capture, translation and UI.',
        ],
        decisoes: [
          {
            titulo: 'Abstract the provider from day one',
            texto:
              'Each provider has different strengths in latency, cost and voice quality. Isolating the integration behind an interface let me compare all three with the same audio instead of choosing blindly.',
          },
          {
            titulo: 'Audio to audio, skipping text',
            texto:
              'The classic path (speech → text → translation → speech) adds up three latencies. With Gemini Live the model takes audio in and returns audio, removing intermediate steps.',
          },
          {
            titulo: 'Native desktop instead of web',
            texto:
              'Capturing system audio through loopback is not possible in the browser without hacks. WPF with NAudio gives direct access to WASAPI.',
          },
        ],
        aprendizados: [
          'In real-time AI, latency is a product requirement, not a technical detail.',
          'Comparing providers with the same test audio is worth more than any marketing benchmark.',
        ],
      },
      fr: {
        titulo: 'Traduction de réunions en temps réel avec trois fournisseurs d’IA',
        resumo:
          'Une application desktop qui écoute la réunion et traduit de la voix vers la voix. J’ai comparé Azure Speech, OpenAI Realtime et Gemini Live pour savoir lequel offre la meilleure latence et la meilleure qualité en conversation directe.',
        problema:
          'En réunion, une traduction qui arrive avec deux secondes de retard ne sert plus à rien : la conversation a avancé. Le défi n’était pas d’« appeler une API d’IA », mais de capturer l’audio du système et du micro, de garder un flux continu et de restituer la voix traduite assez vite pour ne pas casser le dialogue.',
        arquitetura: [
          'Capture audio en loopback (WASAPI) — traduit ce que disent les autres, pas seulement le micro.',
          'Couche de fournisseurs interchangeable : Azure Speech, OpenAI Realtime et Gemini Live derrière la même interface.',
          'Streaming bidirectionnel via WebSocket avec Gemini Live, avec retour audio natif (repris ensuite dans le projet gemini-live-voice).',
          'Fenêtre flottante toujours au premier plan, à utiliser avec Teams, Zoom ou Meet.',
          'MVVM en WPF pour séparer capture, traduction et interface.',
        ],
        decisoes: [
          {
            titulo: 'Abstraire le fournisseur dès le premier jour',
            texto:
              'Chaque fournisseur a ses points forts en latence, coût et qualité de voix. Isoler l’intégration derrière une interface m’a permis de comparer les trois avec le même audio, au lieu de choisir à l’aveugle.',
          },
          {
            titulo: 'De l’audio à l’audio, sans passer par le texte',
            texto:
              'Le chemin classique (parole → texte → traduction → parole) additionne trois latences. Avec Gemini Live, le modèle reçoit de l’audio et renvoie de l’audio, ce qui supprime les étapes intermédiaires.',
          },
          {
            titulo: 'Desktop natif plutôt que web',
            texto:
              'Capturer l’audio du système en loopback n’est pas possible dans le navigateur sans bricolage. WPF avec NAudio donne un accès direct à WASAPI.',
          },
        ],
        aprendizados: [
          'En IA temps réel, la latence est une exigence produit, pas un détail technique.',
          'Comparer les fournisseurs avec le même audio de test vaut plus que n’importe quel benchmark marketing.',
        ],
      },
    },
  },
  {
    slug: 'microsservicos-kafka-ia',
    numero: '02',
    stack: ['NestJS', 'Apache Kafka', 'Gemini', 'Socket.io', 'SQLite', 'Docker Compose'],
    repo: 'https://github.com/mayconlemosCloud/NestJS-kafka-MicroService-AI-Deep-Finance',
    texto: {
      pt: {
        titulo: 'Análise de fraude orientada a eventos com Kafka e IA',
        resumo:
          'Três serviços independentes conversando por Kafka: um recebe a fatura, outro persiste, outro usa o Gemini para analisar fraude. O front acompanha cada etapa em tempo real.',
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
      en: {
        titulo: 'Event-driven fraud analysis with Kafka and AI',
        resumo:
          'Three independent services talking through Kafka: one receives the invoice, one persists it, one uses Gemini to analyze fraud. The front end follows every step in real time.',
        problema:
          'Calling an AI model inside the HTTP request makes the API slow and fragile: if the model is slow or fails, the user waits. The analysis had to run in the background, without blocking whoever submits the invoice and without losing real-time tracking.',
        arquitetura: [
          'The producer API receives the invoice and publishes an “invoice created” event to Kafka.',
          'A banking agent consumes it, persists it and publishes “invoice saved”.',
          'An AI agent consumes it, analyzes fraud with Gemini, updates the status and publishes “completed”.',
          'The producer bridges the final event to the front end over WebSocket.',
          'Everything starts with a single docker-compose.',
        ],
        decisoes: [
          {
            titulo: 'AI off the synchronous path',
            texto:
              'AI analysis is the slowest and most failure-prone step. Moving it into its own consumer isolates that instability: the API responds immediately and the analysis runs at its own pace.',
          },
          {
            titulo: 'One service per responsibility',
            texto:
              'Persisting and analyzing scale differently. Splitting the agents lets me scale only the AI consumer when volume grows.',
          },
          {
            titulo: 'Events as the contract',
            texto:
              'Services only know the topics, not each other. A new consumer (e.g. notifications) can be added without touching the existing ones.',
          },
        ],
        aprendizados: [
          'Next step: consumer idempotency and a dead-letter topic for messages that fail analysis.',
          'Integration tests against a real Kafka (Testcontainers) instead of mocks.',
        ],
      },
      fr: {
        titulo: 'Analyse de fraude orientée événements avec Kafka et l’IA',
        resumo:
          'Trois services indépendants qui communiquent via Kafka : l’un reçoit la facture, un autre la persiste, un troisième utilise Gemini pour détecter la fraude. Le front suit chaque étape en temps réel.',
        problema:
          'Appeler un modèle d’IA dans la requête HTTP rend l’API lente et fragile : si le modèle tarde ou échoue, l’utilisateur attend. L’analyse devait se faire en arrière-plan, sans bloquer l’envoi de la facture et sans perdre le suivi en temps réel.',
        arquitetura: [
          'L’API producer reçoit la facture et publie l’événement « facture créée » dans Kafka.',
          'Un agent bancaire la consomme, la persiste et publie « facture enregistrée ».',
          'Un agent d’IA la consomme, analyse la fraude avec Gemini, met à jour le statut et publie « terminée ».',
          'Le producer relaie l’événement final vers le front via WebSocket.',
          'Tout démarre avec un seul docker-compose.',
        ],
        decisoes: [
          {
            titulo: 'L’IA hors du chemin synchrone',
            texto:
              'L’analyse par IA est l’étape la plus lente et la plus sujette aux pannes. La placer dans son propre consommateur isole cette instabilité : l’API répond tout de suite et l’analyse avance à son rythme.',
          },
          {
            titulo: 'Un service par responsabilité',
            texto:
              'Persister et analyser ne montent pas en charge de la même façon. Séparer les agents permet de ne faire évoluer que le consommateur d’IA quand le volume augmente.',
          },
          {
            titulo: 'Les événements comme contrat',
            texto:
              'Les services ne connaissent que les topics, pas les autres services. On peut ajouter un nouveau consommateur (par ex. notifications) sans toucher aux existants.',
          },
        ],
        aprendizados: [
          'Prochaine étape : idempotence côté consommateur et dead-letter topic pour les messages dont l’analyse échoue.',
          'Tests d’intégration avec un vrai Kafka (Testcontainers) plutôt que des mocks.',
        ],
      },
    },
  },
  {
    slug: 'sistema-de-entregas',
    numero: '03',
    stack: ['ASP.NET Core 9', 'Angular 19', 'SignalR', 'MongoDB', 'JWT', 'Docker + Nginx'],
    repo: 'https://github.com/mayconlemosCloud/angular-dotnet-delivery-system',
    texto: {
      pt: {
        titulo: 'Pedidos e entregas com notificações em tempo real',
        resumo:
          'Sistema fullstack de pedidos e entregas: Angular no front, ASP.NET Core na API, MongoDB e SignalR para avisar o painel no instante em que algo acontece.',
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
            texto: 'Polling gasta requisição à toa e ainda chega atrasado. Com SignalR o servidor avisa só quando há mudança.',
          },
          {
            titulo: 'MongoDB para o modelo de documentos',
            texto:
              'Pedido, entrega e notificação são documentos com pouco relacionamento entre si. Mongo simplifica o modelo sem perder nada relevante para esse domínio.',
          },
          {
            titulo: 'Rodar com um comando',
            texto: 'Quem avalia o projeto não precisa instalar .NET, Node ou Mongo: docker compose up e está no ar.',
          },
        ],
        aprendizados: [
          'Próximo passo: restringir CORS por ambiente e tirar segredos do appsettings.',
          'Cobrir o fluxo principal com testes de integração na API.',
        ],
      },
      en: {
        titulo: 'Orders and deliveries with real-time notifications',
        resumo:
          'A full-stack order and delivery system: Angular on the front end, ASP.NET Core API, MongoDB and SignalR to notify the dashboard the moment something happens.',
        problema:
          'Delivery operations depend on knowing what just changed. A dashboard that needs F5 creates rework and mistakes. The goal was a complete flow — sign-up, orders with automatic address lookup, delivery registration — with a dashboard that updates by itself.',
        arquitetura: [
          'REST API in ASP.NET Core 9 with JWT authentication and FluentValidation.',
          'Address lookup by Brazilian postal code via ViaCEP, with a typed HTTP client (Refit).',
          'SignalR pushes “order created” and “delivery registered” events to the dashboard.',
          'A background service tracks delivery status.',
          'Angular 19 + Material front end served by Nginx; everything starts with Docker Compose.',
        ],
        decisoes: [
          {
            titulo: 'SignalR instead of polling',
            texto: 'Polling wastes requests and still arrives late. With SignalR the server only speaks when something changes.',
          },
          {
            titulo: 'MongoDB for a document model',
            texto:
              'Orders, deliveries and notifications are documents with few relationships. Mongo simplifies the model without losing anything relevant to this domain.',
          },
          {
            titulo: 'One command to run',
            texto: 'Whoever reviews the project does not need .NET, Node or Mongo installed: docker compose up and it is live.',
          },
        ],
        aprendizados: [
          'Next step: restrict CORS per environment and move secrets out of appsettings.',
          'Cover the main flow with API integration tests.',
        ],
      },
      fr: {
        titulo: 'Commandes et livraisons avec notifications en temps réel',
        resumo:
          'Un système full stack de commandes et de livraisons : Angular en front, API ASP.NET Core, MongoDB et SignalR pour prévenir le tableau de bord dès qu’il se passe quelque chose.',
        problema:
          'Une opération de livraison dépend de savoir ce qui vient de changer. Un tableau de bord qu’il faut rafraîchir génère des erreurs et du travail en double. L’objectif : un flux complet — inscription, commande avec adresse automatique, enregistrement de la livraison — avec un tableau de bord qui se met à jour tout seul.',
        arquitetura: [
          'API REST en ASP.NET Core 9 avec authentification JWT et validation FluentValidation.',
          'Recherche d’adresse par code postal brésilien via ViaCEP, avec un client HTTP typé (Refit).',
          'SignalR envoie les événements « commande créée » et « livraison enregistrée » au tableau de bord.',
          'Un service en arrière-plan suit le statut de la livraison.',
          'Front Angular 19 + Material servi par Nginx ; tout démarre avec Docker Compose.',
        ],
        decisoes: [
          {
            titulo: 'SignalR plutôt que du polling',
            texto: 'Le polling gaspille des requêtes et arrive quand même en retard. Avec SignalR, le serveur ne parle que lorsqu’il y a un changement.',
          },
          {
            titulo: 'MongoDB pour un modèle documentaire',
            texto:
              'Commandes, livraisons et notifications sont des documents peu liés entre eux. Mongo simplifie le modèle sans rien perdre d’important pour ce domaine.',
          },
          {
            titulo: 'Une seule commande pour lancer',
            texto: 'Pour évaluer le projet, inutile d’installer .NET, Node ou Mongo : docker compose up et c’est en ligne.',
          },
        ],
        aprendizados: [
          'Prochaine étape : restreindre CORS par environnement et sortir les secrets de l’appsettings.',
          'Couvrir le flux principal avec des tests d’intégration de l’API.',
        ],
      },
    },
  },
];

export const slugs = base.map((c) => c.slug);

export function getCases(lang: Lang): Case[] {
  return base.map(({ texto, ...meta }) => ({ ...meta, ...texto[lang] }));
}

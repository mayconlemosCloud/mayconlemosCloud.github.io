import type { Lang } from './i18n';

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
    // Mesmo endereço do case antigo, para não quebrar links já publicados.
    slug: 'traducao-tempo-real-ia',
    numero: '01',
    stack: ['.NET 10', 'WPF', 'NAudio / WASAPI', 'Gemini Live API', 'Arquitetura hexagonal', 'Testes do núcleo'],
    repo: 'https://github.com/mayconlemosCloud/gemini-live-voice',
    texto: {
      pt: {
        titulo: 'Tradutor de reuniões voz a voz em tempo real com Gemini Live',
        resumo:
          'App desktop que traduz reuniões no Teams, Meet ou Zoom nos dois sentidos: você ouve o outro em português e ele te ouve em inglês, com tradução nativa voz a voz e baixa latência.',
        problema:
          'Tradução que chega atrasada quebra a conversa. E uma API de áudio em tempo real cobra cada segundo que escuta, inclusive o silêncio. O desafio era traduzir nos dois sentidos ao mesmo tempo, sem eco, sem a própria tradução voltar para a reunião e sem a conta crescer à toa.',
        arquitetura: [
          'Duas sessões independentes da Live API em paralelo: entrada (áudio da reunião → português no seu fone) e saída (seu microfone → inglês num microfone virtual que o Teams ou o Meet escutam).',
          'Tradução nativa voz a voz, sem transcrever e sintetizar: áudio PCM de 16 kHz na entrada e 24 kHz na saída, em blocos de cerca de 100 ms.',
          'Arquitetura hexagonal em quatro projetos: o núcleo não referencia NAudio, HTTP nem WPF, e o compilador impede que esse acoplamento volte.',
          'Processamento de sinal testável no núcleo: ganho automático sem distorção, aceleração sem alterar o tom (WSOLA) e medição de atraso por correlação.',
          'Sessões contínuas: retomada de contexto nas reconexões e renovação da conexão antes do corte do servidor.',
        ],
        decisoes: [
          {
            titulo: 'Portão de silêncio para cortar custo',
            texto:
              'A API cobra cerca de 25 tokens por segundo enquanto escuta, inclusive em silêncio. Quando a captura entrega 2 segundos de amostras exatamente zero, o app encerra o stream e reabre no primeiro sinal, sem perder fala nem cortar as pausas naturais.',
          },
          {
            titulo: 'Anti-eco no roteamento de áudio',
            texto:
              'Enquanto você fala, e enquanto a sua tradução ainda toca na reunião, a captura da reunião pausa. A tradução recebida é abaixada para cerca de 15% com o seu microfone aberto, para não vazar e ser traduzida de novo.',
          },
          {
            titulo: 'Compressão de contexto explícita',
            texto:
              'Configurei a compressão da janela de contexto para disparar em cerca de 10 minutos de áudio, segurando o custo de reuniões longas em vez de depender do padrão do servidor.',
          },
          {
            titulo: 'Núcleo isolado por portas e adaptadores',
            texto:
              'Captura, tradução e interface ficam atrás de interfaces. Isso permite testar a lógica de áudio sem hardware nem rede e trocar o provedor de IA sem mexer no núcleo.',
          },
        ],
        aprendizados: [
          'Em IA de voz em tempo real, custo e latência são decisões de arquitetura, não ajustes no final.',
          'O modelo ainda é preview: a voz pode oscilar depois de pausas longas e a detecção de idioma falha com sotaques fortes. Por isso o app registra cada sessão em log, para diagnosticar rápido.',
        ],
      },
      en: {
        titulo: 'Real-time voice-to-voice meeting translator with Gemini Live',
        resumo:
          'A desktop app that translates Teams, Meet or Zoom meetings in both directions: you hear the other person in Portuguese and they hear you in English, with native voice-to-voice translation and low latency.',
        problema:
          'A translation that arrives late breaks the conversation. And a real-time audio API charges for every second it listens, silence included. The challenge was to translate both ways at once, without echo, without your own translation leaking back into the meeting, and without the bill growing for nothing.',
        arquitetura: [
          'Two independent Live API sessions in parallel: inbound (meeting audio → Portuguese in your headphones) and outbound (your microphone → English on a virtual microphone that Teams or Meet listens to).',
          'Native voice-to-voice translation, no transcribe-then-synthesize: 16 kHz PCM in and 24 kHz PCM out, sent in roughly 100 ms chunks.',
          'Hexagonal architecture across four projects: the core references neither NAudio, HTTP nor WPF, and the compiler keeps that coupling from creeping back.',
          'Testable signal processing in the core: clip-free automatic gain, pitch-preserving speed-up (WSOLA) and delay measurement by correlation.',
          'Continuous sessions: context resumption on reconnect and connection renewal before the server cuts it off.',
        ],
        decisoes: [
          {
            titulo: 'A silence gate to cut cost',
            texto:
              'The API charges about 25 tokens per second while listening, silence included. When capture delivers 2 seconds of exactly-zero samples, the app closes the stream and reopens on the first signal, without losing speech or cutting natural pauses.',
          },
          {
            titulo: 'Anti-echo audio routing',
            texto:
              'While you speak, and while your translation is still playing in the meeting, meeting capture pauses. Incoming translation is ducked to about 15% while your microphone is open, so it does not leak and get translated again.',
          },
          {
            titulo: 'Explicit context compression',
            texto:
              'I configured context-window compression to trigger at about 10 minutes of audio, keeping long meetings affordable instead of relying on the server default.',
          },
          {
            titulo: 'Core isolated by ports and adapters',
            texto:
              'Capture, translation and UI sit behind interfaces. That makes the audio logic testable without hardware or network and lets the AI provider change without touching the core.',
          },
        ],
        aprendizados: [
          'In real-time voice AI, cost and latency are architecture decisions, not last-minute tweaks.',
          'The model is still in preview: the voice can drift after long pauses and language detection struggles with strong accents. That is why the app logs every session, for fast diagnosis.',
        ],
      },
      fr: {
        titulo: 'Traducteur de réunions voix à voix en temps réel avec Gemini Live',
        resumo:
          'Une application desktop qui traduit les réunions Teams, Meet ou Zoom dans les deux sens : vous entendez l’autre en portugais et il vous entend en anglais, avec une traduction native voix à voix et une faible latence.',
        problema:
          'Une traduction qui arrive en retard casse la conversation. Et une API audio temps réel facture chaque seconde d’écoute, silence compris. Le défi : traduire dans les deux sens en même temps, sans écho, sans que votre propre traduction revienne dans la réunion et sans faire grimper la facture inutilement.',
        arquitetura: [
          'Deux sessions indépendantes de la Live API en parallèle : entrée (audio de la réunion → portugais dans votre casque) et sortie (votre micro → anglais sur un micro virtuel écouté par Teams ou Meet).',
          'Traduction native voix à voix, sans transcription ni synthèse : PCM 16 kHz en entrée et 24 kHz en sortie, envoyé par blocs d’environ 100 ms.',
          'Architecture hexagonale sur quatre projets : le cœur ne référence ni NAudio, ni HTTP, ni WPF, et le compilateur empêche ce couplage de revenir.',
          'Traitement du signal testable dans le cœur : gain automatique sans saturation, accélération sans changer la hauteur (WSOLA) et mesure du retard par corrélation.',
          'Sessions continues : reprise du contexte à la reconnexion et renouvellement de la connexion avant la coupure du serveur.',
        ],
        decisoes: [
          {
            titulo: 'Une porte de silence pour réduire les coûts',
            texto:
              'L’API facture environ 25 tokens par seconde d’écoute, silence compris. Quand la capture livre 2 secondes d’échantillons exactement nuls, l’application ferme le flux et le rouvre au premier signal, sans perdre de parole ni couper les pauses naturelles.',
          },
          {
            titulo: 'Routage audio anti-écho',
            texto:
              'Pendant que vous parlez, et tant que votre traduction joue encore dans la réunion, la capture de la réunion est en pause. La traduction reçue est abaissée à environ 15 % quand votre micro est ouvert, pour ne pas être retraduite.',
          },
          {
            titulo: 'Compression de contexte explicite',
            texto:
              'J’ai configuré la compression de la fenêtre de contexte pour se déclencher vers 10 minutes d’audio, afin de maîtriser le coût des longues réunions au lieu de dépendre du réglage par défaut du serveur.',
          },
          {
            titulo: 'Un cœur isolé par ports et adaptateurs',
            texto:
              'Capture, traduction et interface sont derrière des interfaces. La logique audio se teste sans matériel ni réseau, et le fournisseur d’IA peut changer sans toucher au cœur.',
          },
        ],
        aprendizados: [
          'En IA vocale temps réel, le coût et la latence sont des décisions d’architecture, pas des réglages de dernière minute.',
          'Le modèle est encore en préversion : la voix peut varier après de longues pauses et la détection de langue échoue avec des accents marqués. D’où la journalisation de chaque session, pour diagnostiquer vite.',
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

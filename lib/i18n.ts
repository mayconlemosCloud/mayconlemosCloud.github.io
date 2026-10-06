export const langs = ['pt', 'en', 'fr'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'pt';

export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en', fr: 'fr' };
export const langLabel: Record<Lang, string> = { pt: 'PT', en: 'EN', fr: 'FR' };

export const links = {
  linkedin: 'https://www.linkedin.com/in/mayconlemos',
  github: 'https://github.com/mayconlemosCloud',
  // Número do currículo: (21) 99791-3361
  whatsapp: '5521997913361',
};

export function whatsappUrl(mensagem: string): string {
  return `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Caminho sem prefixo de idioma ("/", "/cases/x/") → caminho no idioma pedido. */
export function localize(path: string, lang: Lang): string {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

interface Item {
  titulo: string;
  texto: string;
}

interface Experiencia {
  periodo: string;
  empresa: string;
  cargo: string;
  texto: string;
}

export interface Dict {
  meta: { title: string; description: string };
  nav: { cases: string; experiencia: string; comoTrabalho: string; agora: string; contato: string };
  hero: { eyebrow: string; titulo: string; sub: string; verCases: string; fotoAlt: string };
  video: { eyebrow: string; titulo: string; nota: string };
  empresas: { titulo: string };
  formacao: { eyebrow: string; titulo: string; itens: { emissor: string; titulo: string; detalhe: string }[] };
  cases: { eyebrow: string; titulo: string };
  experiencia: { eyebrow: string; titulo: string; itens: Experiencia[] };
  comoTrabalho: { eyebrow: string; titulo: string; fotoAlt: string; principios: Item[] };
  sobre: { eyebrow: string; titulo: string; paragrafos: string[]; fotoAlt: string };
  agora: { eyebrow: string; titulo: string; fotoAlt: string; itens: { rotulo: string; texto: string }[] };
  contato: { eyebrow: string; titulo: string; linkedin: string; github: string };
  casePage: {
    todos: string;
    case: string;
    codigo: string;
    demo: string;
    resultados: string;
    problema: string;
    arquitetura: string;
    decisoes: string;
    aprendizados: string;
    proximo: string;
  };
  curriculo: { label: string; curto: string; arquivo: string };
  whatsapp: { label: string; mensagem: string };
  idioma: string;
}

const chips = ['.NET / C#', 'Node.js', 'React / Next.js', 'Angular', 'Kafka / RabbitMQ', 'AWS / Azure', 'RAG / GraphRAG', 'MCP / Multi-agent', 'Temporal'];
export { chips };

// Empresas e clientes por onde passou (nomes em texto; trocar por logos oficiais em SVG se tiver os arquivos)
export const empresas = [
  'Itaú Unibanco',
  'BTG Pactual',
  'Softplan',
  'BRQ Digital Solutions',
  'IPDV',
  'Droga Raia',
  'Drogaria Pacheco',
  'Oi',
  'Rio Saúde',
  'Exército Brasileiro',
  'Marinha do Brasil',
];

export const ui: Record<Lang, Dict> = {
  pt: {
    meta: {
      title: 'Maycon Lemos · AI-Native Software Engineer',
      description:
        'Engenheiro de software há mais de 15 anos: plataformas bancárias e do setor público, .NET, microsserviços e produtos com IA.',
    },
    nav: { cases: 'Cases', experiencia: 'Experiência', comoTrabalho: 'Como eu trabalho', agora: 'Agora', contato: 'Contato' },
    hero: {
      eyebrow: 'AI-Native Software Engineer · .NET & IA · +15 anos',
      titulo: 'Sua ideia com IA, pronta para o mundo real.',
      sub: 'Da arquitetura à interface: mais de 15 anos de .NET, microsserviços e plataformas bancárias, agora a serviço de produtos com IA.',
      verCases: 'Ver cases',
      fotoAlt: 'Maycon Lemos de braços cruzados, sorrindo e olhando para o alto',
    },
    empresas: { titulo: 'Empresas e projetos em que atuei' },
    formacao: {
      eyebrow: 'Formação',
      titulo: 'Formação e certificações.',
      itens: [
        { emissor: 'AWS', titulo: 'Assessment for AWS Partner: Accreditation (Technical)', detalhe: 'Amazon Web Services' },
        { emissor: 'Azure', titulo: 'Microsoft Azure Fundamentals (AZ-900)', detalhe: 'Microsoft' },
        { emissor: 'Anthropic', titulo: 'Claude 101', detalhe: 'Anthropic Academy · 2026' },
        { emissor: 'Graduação', titulo: 'Bacharelado em Sistemas de Informação', detalhe: 'Faculdade Mercúrio · 2013–2017' },
      ],
    },
    video: {
      eyebrow: 'Apresentação',
      titulo: 'Me conheça em 2 minutos.',
      nota: 'Vídeo em inglês, com legendas.',
    },
    cases: { eyebrow: 'Cases', titulo: 'Problemas reais, decisões explicadas.' },
    experiencia: {
      eyebrow: 'Experiência',
      titulo: 'Onde construí o que sei.',
      itens: [
        {
          periodo: '2026 — hoje',
          empresa: 'Softplan',
          cargo: 'AI-Native Software Engineer',
          texto:
            'Funcionalidades com LLMs para Procuradorias, Ministérios Públicos e Tribunais, da concepção à produção: RAG e GraphRAG, orquestração multiagente com MCP, workflows duráveis com Temporal e interfaces em Next.js.',
        },
        {
          periodo: '2022 — 2026',
          empresa: 'BRQ Digital Solutions · Itaú e BTG Pactual',
          cargo: 'Engenheiro de Software Sênior',
          texto:
            'Quebra de monólitos em serviços orientados a eventos em dois dos maiores bancos do país, microfrontends que substituíram o front-end monolítico e agentes de IA em produção no Itaú, em escala nacional, para análise de sentimento no atendimento.',
        },
        {
          periodo: '2021 — 2022',
          empresa: 'IPDV',
          cargo: 'Desenvolvedor Full Stack · líder técnico',
          texto:
            'Liderança técnica de um produto criado do zero para Droga Raia e Drogaria Pacheco — das APIs à arquitetura em nuvem —, substituindo consolidações manuais.',
        },
        {
          periodo: '2011 — 2021',
          empresa: 'Rio Saúde, MyCloud, Exército e Marinha do Brasil',
          cargo: 'Analista de Sistemas e Desenvolvedor Full Stack',
          texto:
            'Sistemas críticos de saúde pública durante a pandemia, otimização das ordens de serviço da Oi em cobertura nacional e migração de sistemas desktop para web em .NET.',
        },
      ],
    },
    comoTrabalho: {
      eyebrow: 'Como eu trabalho',
      titulo: 'O que guia minhas decisões técnicas.',
      fotoAlt: 'Maycon concentrado, digitando em um notebook',
      principios: [
        {
          titulo: 'Começo pelo problema, não pela stack',
          texto:
            'Microsserviço, fila e IA são ferramentas. Antes de escolher, pergunto o que acontece se der errado, quanto custa e quem vai manter.',
        },
        {
          titulo: 'Nem tudo precisa ser microsserviço',
          texto:
            'Um monólito bem dividido resolve a maioria dos casos. Separo serviços quando há motivo concreto: escala diferente, time diferente ou falha que precisa ser isolada.',
        },
        {
          titulo: 'IA entra com orçamento de latência e custo',
          texto:
            'Antes de plugar um modelo, defino quanto tempo o usuário pode esperar e quanto cada chamada pode custar. Isso decide o provedor, o cache e se a chamada é síncrona ou não.',
        },
        {
          titulo: 'Especificação é o contrato do agente',
          texto:
            'Desenvolvo com agentes de código todos os dias. A especificação escrita e a configuração do agente (CLAUDE.md, skills, MCP) fazem do código em conformidade a saída padrão.',
        },
      ],
    },
    sobre: {
      eyebrow: 'Sobre',
      titulo: 'Engenharia com os pés no chão.',
      paragrafos: [
        'Sou engenheiro de software há mais de 15 anos, construindo plataformas bancárias e do setor público de alto volume. Desde 2023 trabalho com IA aplicada: produtos em que o modelo faz parte do fluxo, da interface à integração com as APIs de LLMs.',
        'Minha base é backend e arquitetura no setor financeiro — .NET, Node.js, microsserviços em AWS e Azure e modernização de legado para microsserviços e microfrontends. Moro no Rio de Janeiro e trabalho em português e inglês.',
      ],
      fotoAlt: 'Maycon de braços cruzados, olhando para o lado com expressão serena',
    },
    agora: {
      eyebrow: 'Agora',
      titulo: 'No que estou trabalhando este mês.',
      fotoAlt: 'Maycon de fone de ouvido, sorrindo enquanto lê em um tablet',
      itens: [
        { rotulo: 'Construindo', texto: 'Funcionalidades com LLMs para o setor jurídico público na Softplan.' },
        { rotulo: 'Aprofundando', texto: 'GraphRAG, reranking e workflows duráveis com Temporal.' },
        { rotulo: 'Praticando', texto: 'Desenvolvimento com agentes de código: especificação, skills e MCP servers.' },
      ],
    },
    contato: {
      eyebrow: 'Contato',
      titulo: 'Quer trocar uma ideia sobre um projeto ou uma vaga? Vamos conversar.',
      linkedin: 'Falar no LinkedIn',
      github: 'Ver o GitHub',
    },
    casePage: {
      todos: '← Todos os cases',
      case: 'Case',
      codigo: 'Código no GitHub →',
      demo: 'Vídeo da demonstração →',
      resultados: 'Resultados',
      problema: 'O problema',
      arquitetura: 'Arquitetura',
      decisoes: 'Decisões e trade-offs',
      aprendizados: 'O que aprendi e o que faria diferente',
      proximo: 'Próximo case',
    },
    curriculo: { label: 'Baixar currículo', curto: 'Currículo', arquivo: '/curriculo/Maycon_Lemos_Curriculo_PT.pdf' },
    whatsapp: { label: 'Conversar no WhatsApp', mensagem: 'Olá, Maycon! Vi seu portfólio e gostaria de conversar.' },
    idioma: 'Idioma',
  },

  en: {
    meta: {
      title: 'Maycon Lemos · AI-Native Software Engineer',
      description:
        'Software engineer with 15+ years of experience: banking and public-sector platforms, .NET, microservices and AI-powered products.',
    },
    nav: { cases: 'Work', experiencia: 'Experience', comoTrabalho: 'How I work', agora: 'Now', contato: 'Contact' },
    hero: {
      eyebrow: 'AI-Native Software Engineer · .NET & AI · 15+ years',
      titulo: 'Your AI idea, ready for the real world.',
      sub: 'From architecture to interface: 15+ years of .NET, microservices and banking platforms, now in service of AI products.',
      verCases: 'See case studies',
      fotoAlt: 'Maycon Lemos with arms crossed, smiling and looking up',
    },
    empresas: { titulo: 'Companies and projects I have worked on' },
    formacao: {
      eyebrow: 'Education',
      titulo: 'Education and certifications.',
      itens: [
        { emissor: 'AWS', titulo: 'Assessment for AWS Partner: Accreditation (Technical)', detalhe: 'Amazon Web Services' },
        { emissor: 'Azure', titulo: 'Microsoft Azure Fundamentals (AZ-900)', detalhe: 'Microsoft' },
        { emissor: 'Anthropic', titulo: 'Claude 101', detalhe: 'Anthropic Academy · 2026' },
        { emissor: 'Degree', titulo: 'B.S. in Information Systems', detalhe: 'Faculdade Mercúrio · 2013–2017' },
      ],
    },
    video: {
      eyebrow: 'Introduction',
      titulo: 'Get to know me in 2 minutes.',
      nota: 'Video in English, with captions.',
    },
    cases: { eyebrow: 'Case studies', titulo: 'Real problems, decisions explained.' },
    experiencia: {
      eyebrow: 'Experience',
      titulo: 'Where I learned what I know.',
      itens: [
        {
          periodo: '2026 — now',
          empresa: 'Softplan',
          cargo: 'AI-Native Software Engineer',
          texto:
            'LLM-powered features for Brazilian prosecutors’ offices and courts, from concept to production: RAG and GraphRAG, multi-agent orchestration with MCP, durable workflows with Temporal and Next.js interfaces.',
        },
        {
          periodo: '2022 — 2026',
          empresa: 'BRQ Digital Solutions · Itaú and BTG Pactual',
          cargo: 'Senior Software Engineer',
          texto:
            'Broke monoliths into event-driven services at two of Brazil’s largest banks, built the micro-frontends that replaced the monolithic front end, and shipped AI agents to production at Itaú, nationwide, for customer-service sentiment analysis.',
        },
        {
          periodo: '2021 — 2022',
          empresa: 'IPDV',
          cargo: 'Full Stack Developer · tech lead',
          texto:
            'Technical lead of a product built from scratch for Droga Raia and Drogaria Pacheco — from APIs to cloud architecture — replacing manual consolidation work.',
        },
        {
          periodo: '2011 — 2021',
          empresa: 'Rio Saúde, MyCloud, Brazilian Army and Navy',
          cargo: 'Systems Analyst and Full Stack Developer',
          texto:
            'Critical public-health systems during the pandemic, optimization of Oi Telecom’s nationwide service-order system, and migration of desktop systems to .NET web applications.',
        },
      ],
    },
    comoTrabalho: {
      eyebrow: 'How I work',
      titulo: 'What guides my technical decisions.',
      fotoAlt: 'Maycon focused, typing on a laptop',
      principios: [
        {
          titulo: 'Problem first, stack second',
          texto:
            'Microservices, queues and AI are tools. Before choosing, I ask what happens when it fails, what it costs and who will maintain it.',
        },
        {
          titulo: 'Not everything needs to be a microservice',
          texto:
            'A well-structured monolith solves most cases. I split services when there is a concrete reason: different scale, different team, or a failure that must be isolated.',
        },
        {
          titulo: 'AI comes with a latency and cost budget',
          texto:
            'Before plugging in a model, I define how long the user can wait and how much each call can cost. That decides the provider, the caching and whether the call is synchronous.',
        },
        {
          titulo: 'The spec is the agent’s contract',
          texto:
            'I work with coding agents every day. A written spec and the agent setup (CLAUDE.md, skills, MCP) make compliant code the default output.',
        },
      ],
    },
    sobre: {
      eyebrow: 'About',
      titulo: 'Down-to-earth engineering.',
      paragrafos: [
        'I have been a software engineer for over 15 years, building high-volume banking and public-sector platforms. Since 2023 I have worked with applied AI: products where the model is part of the flow, from the interface to the LLM API integration.',
        'My foundation is backend and architecture in finance — .NET, Node.js, microservices on AWS and Azure, and legacy modernization into microservices and micro-frontends. I live in Rio de Janeiro and work in Portuguese and English.',
      ],
      fotoAlt: 'Maycon with arms crossed, looking to the side with a calm expression',
    },
    agora: {
      eyebrow: 'Now',
      titulo: 'What I am working on this month.',
      fotoAlt: 'Maycon wearing headphones, smiling while reading on a tablet',
      itens: [
        { rotulo: 'Building', texto: 'LLM-powered features for the public legal sector at Softplan.' },
        { rotulo: 'Deepening', texto: 'GraphRAG, reranking and durable workflows with Temporal.' },
        { rotulo: 'Practicing', texto: 'Development with coding agents: specs, skills and MCP servers.' },
      ],
    },
    contato: {
      eyebrow: 'Contact',
      titulo: 'Want to talk about a project or a role? Let’s talk.',
      linkedin: 'Message me on LinkedIn',
      github: 'See my GitHub',
    },
    casePage: {
      todos: '← All case studies',
      case: 'Case study',
      codigo: 'Code on GitHub →',
      demo: 'Demo video →',
      resultados: 'Results',
      problema: 'The problem',
      arquitetura: 'Architecture',
      decisoes: 'Decisions and trade-offs',
      aprendizados: 'What I learned and would do differently',
      proximo: 'Next case study',
    },
    curriculo: { label: 'Download résumé', curto: 'Résumé', arquivo: '/curriculo/Maycon_Lemos_Resume_EN.pdf' },
    whatsapp: { label: 'Chat on WhatsApp', mensagem: 'Hi Maycon! I saw your portfolio and would like to talk.' },
    idioma: 'Language',
  },

  fr: {
    meta: {
      title: 'Maycon Lemos · AI-Native Software Engineer',
      description:
        'Ingénieur logiciel depuis plus de 15 ans : plateformes bancaires et du secteur public, .NET, microservices et produits intégrant l’IA.',
    },
    nav: { cases: 'Projets', experiencia: 'Expérience', comoTrabalho: 'Ma méthode', agora: 'En ce moment', contato: 'Contact' },
    hero: {
      eyebrow: 'AI-Native Software Engineer · .NET & IA · +15 ans',
      titulo: 'Votre idée avec l’IA, prête pour le monde réel.',
      sub: 'De l’architecture à l’interface : plus de 15 ans de .NET, de microservices et de plateformes bancaires, désormais au service de produits d’IA.',
      verCases: 'Voir les projets',
      fotoAlt: 'Maycon Lemos, bras croisés, souriant et regardant vers le haut',
    },
    empresas: { titulo: 'Entreprises et projets sur lesquels j’ai travaillé' },
    formacao: {
      eyebrow: 'Formation',
      titulo: 'Formation et certifications.',
      itens: [
        { emissor: 'AWS', titulo: 'Assessment for AWS Partner: Accreditation (Technical)', detalhe: 'Amazon Web Services' },
        { emissor: 'Azure', titulo: 'Microsoft Azure Fundamentals (AZ-900)', detalhe: 'Microsoft' },
        { emissor: 'Anthropic', titulo: 'Claude 101', detalhe: 'Anthropic Academy · 2026' },
        { emissor: 'Diplôme', titulo: 'Licence en systèmes d’information', detalhe: 'Faculdade Mercúrio · 2013–2017' },
      ],
    },
    video: {
      eyebrow: 'Présentation',
      titulo: 'Faites ma connaissance en 2 minutes.',
      nota: 'Vidéo en anglais, sous-titrée.',
    },
    cases: { eyebrow: 'Études de cas', titulo: 'De vrais problèmes, des décisions expliquées.' },
    experiencia: {
      eyebrow: 'Expérience',
      titulo: 'Là où j’ai appris ce que je sais.',
      itens: [
        {
          periodo: '2026 — aujourd’hui',
          empresa: 'Softplan',
          cargo: 'AI-Native Software Engineer',
          texto:
            'Fonctionnalités basées sur les LLM pour les parquets et tribunaux brésiliens, de la conception à la production : RAG et GraphRAG, orchestration multi-agents avec MCP, workflows durables avec Temporal et interfaces en Next.js.',
        },
        {
          periodo: '2022 — 2026',
          empresa: 'BRQ Digital Solutions · Itaú et BTG Pactual',
          cargo: 'Ingénieur logiciel senior',
          texto:
            'Découpage de monolithes en services orientés événements dans deux des plus grandes banques du Brésil, micro-frontends remplaçant le front-end monolithique et agents d’IA en production chez Itaú, à l’échelle nationale, pour l’analyse de sentiment du service client.',
        },
        {
          periodo: '2021 — 2022',
          empresa: 'IPDV',
          cargo: 'Développeur full stack · lead technique',
          texto:
            'Lead technique d’un produit créé de zéro pour Droga Raia et Drogaria Pacheco — des API à l’architecture cloud —, remplaçant des consolidations manuelles.',
        },
        {
          periodo: '2011 — 2021',
          empresa: 'Rio Saúde, MyCloud, Armée et Marine brésiliennes',
          cargo: 'Analyste système et développeur full stack',
          texto:
            'Systèmes critiques de santé publique pendant la pandémie, optimisation du système national d’ordres de service d’Oi Telecom et migration d’applications desktop vers le web en .NET.',
        },
      ],
    },
    comoTrabalho: {
      eyebrow: 'Ma méthode',
      titulo: 'Ce qui guide mes décisions techniques.',
      fotoAlt: 'Maycon concentré, en train de taper sur un ordinateur portable',
      principios: [
        {
          titulo: 'Le problème d’abord, la stack ensuite',
          texto:
            'Microservices, files de messages et IA sont des outils. Avant de choisir, je me demande ce qui se passe en cas d’échec, combien cela coûte et qui va le maintenir.',
        },
        {
          titulo: 'Tout n’a pas besoin d’être un microservice',
          texto:
            'Un monolithe bien structuré suffit dans la plupart des cas. Je sépare les services quand il y a une raison concrète : une charge différente, une équipe différente ou une panne à isoler.',
        },
        {
          titulo: 'L’IA arrive avec un budget de latence et de coût',
          texto:
            'Avant d’intégrer un modèle, je définis combien de temps l’utilisateur peut attendre et combien chaque appel peut coûter. Cela décide du fournisseur, du cache et du caractère synchrone ou non de l’appel.',
        },
        {
          titulo: 'La spécification est le contrat de l’agent',
          texto:
            'Je travaille chaque jour avec des agents de code. Une spécification écrite et la configuration de l’agent (CLAUDE.md, skills, MCP) font du code conforme la sortie par défaut.',
        },
      ],
    },
    sobre: {
      eyebrow: 'À propos',
      titulo: 'Une ingénierie pragmatique.',
      paragrafos: [
        'Je suis ingénieur logiciel depuis plus de 15 ans et je construis des plateformes bancaires et du secteur public à fort volume. Depuis 2023, je travaille sur l’IA appliquée : des produits où le modèle fait partie du flux, de l’interface à l’intégration des API de LLM.',
        'Mon socle, c’est le backend et l’architecture dans la finance — .NET, Node.js, microservices sur AWS et Azure, et modernisation de systèmes legacy vers des microservices et des micro-frontends. J’habite à Rio de Janeiro et je travaille en portugais et en anglais.',
      ],
      fotoAlt: 'Maycon, bras croisés, regardant de côté avec une expression sereine',
    },
    agora: {
      eyebrow: 'En ce moment',
      titulo: 'Ce sur quoi je travaille ce mois-ci.',
      fotoAlt: 'Maycon avec un casque, souriant en lisant sur une tablette',
      itens: [
        { rotulo: 'Je construis', texto: 'Des fonctionnalités basées sur les LLM pour le secteur juridique public chez Softplan.' },
        { rotulo: 'J’approfondis', texto: 'GraphRAG, le reranking et les workflows durables avec Temporal.' },
        { rotulo: 'Je pratique', texto: 'Le développement avec des agents de code : spécifications, skills et serveurs MCP.' },
      ],
    },
    contato: {
      eyebrow: 'Contact',
      titulo: 'Envie d’échanger sur un projet ou un poste ? Parlons-en.',
      linkedin: 'Me contacter sur LinkedIn',
      github: 'Voir mon GitHub',
    },
    casePage: {
      todos: '← Toutes les études de cas',
      case: 'Étude de cas',
      codigo: 'Code sur GitHub →',
      demo: 'Vidéo de démonstration →',
      resultados: 'Résultats',
      problema: 'Le problème',
      arquitetura: 'Architecture',
      decisoes: 'Décisions et compromis',
      aprendizados: 'Ce que j’ai appris et ce que je ferais autrement',
      proximo: 'Étude de cas suivante',
    },
    curriculo: { label: 'Télécharger le CV (en anglais)', curto: 'CV', arquivo: '/curriculo/Maycon_Lemos_Resume_EN.pdf' },
    whatsapp: { label: 'Discuter sur WhatsApp', mensagem: 'Bonjour Maycon ! J’ai vu votre portfolio et j’aimerais échanger.' },
    idioma: 'Langue',
  },
};

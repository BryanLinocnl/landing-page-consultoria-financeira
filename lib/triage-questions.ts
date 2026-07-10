export type QuestionOption = {
  value: string;
  label: string;
  desc?: string;
};

export const TIMELINE_STEPS = [
  "Objetivo",
  "Perfil",
  "Patrimônio",
  "Experiência",
  "Urgência",
  "Contato",
  "Concluído",
] as const;

export const QUESTIONS = {
  objetivo: {
    title: "Qual seu principal objetivo financeiro hoje?",
    subtitle: "Não existe resposta certa — existe a sua. Vamos ajustar a estratégia a ela.",
    options: [
      { value: "Preservar patrimônio", label: "Preservar patrimônio", desc: "Proteger o que você já construiu" },
      { value: "Crescer patrimônio", label: "Crescer patrimônio", desc: "Buscar maior retorno no longo prazo" },
      { value: "Aposentadoria", label: "Aposentadoria", desc: "Construir uma renda estável futura" },
      { value: "Diversificação", label: "Diversificação", desc: "Espalhar risco entre classes" },
      { value: "Outro", label: "Outro", desc: "Tenho um objetivo específico" },
    ] as QuestionOption[],
  },
  perfil: {
    title: "Qual seu perfil de risco?",
    subtitle: "Seu conforto com oscilação define parte importante da estratégia.",
    options: [
      { value: "Conservador", label: "Conservador", desc: "Prefiro estabilidade, mesmo com retorno menor" },
      { value: "Moderado", label: "Moderado", desc: "Aceito alguma oscilação por retorno maior" },
      { value: "Arrojado", label: "Arrojado", desc: "Busco maximizar retorno, aceito volatilidade" },
    ] as QuestionOption[],
  },
  patrimonio: {
    title: "Qual a faixa de patrimônio que você investe ou pretende investir?",
    subtitle: "Usamos apenas para calibrar a estratégia ao seu momento.",
    options: [
      { value: "até R$ 100k", label: "Até R$ 100 mil", desc: "Em fase inicial de construção" },
      { value: "R$ 100k–R$ 500k", label: "R$ 100k – R$ 500k", desc: "Patrimônio em crescimento" },
      { value: "R$ 500k–R$ 1M", label: "R$ 500k – R$ 1M", desc: "Patrimônio consolidado" },
      { value: "acima de R$ 1M", label: "Acima de R$ 1 milhão", desc: "Preservação e otimização" },
    ] as QuestionOption[],
  },
  classes: {
    title: "Em quais classes você já investe?",
    subtitle: "Selecione todas que se aplicam — ou 'Nenhum ainda'.",
    options: [
      { value: "Renda Fixa", label: "Renda Fixa" },
      { value: "Ações", label: "Ações" },
      { value: "FIIs", label: "Fundos Imobiliários" },
      { value: "Cripto", label: "Cripto" },
      { value: "Câmbio", label: "Câmbio" },
      { value: "Internacional", label: "Internacional" },
      { value: "Nenhum ainda", label: "Nenhum ainda" },
    ] as QuestionOption[],
  },
  urgencia: {
    title: "Há quanto tempo pretende iniciar uma consultoria?",
    subtitle: "Isso nos ajuda a priorizar e organizar o atendimento.",
    options: [
      { value: "Imediato", label: "Imediato", desc: "Quero começar agora" },
      { value: "1–3 meses", label: "1 a 3 meses", desc: "Estou decidindo" },
      { value: "Só pesquisando", label: "Só pesquisando por agora", desc: "Ainda sem urgência" },
    ] as QuestionOption[],
  },
} as const;

export type Answers = {
  objetivo?: string;
  perfil?: string;
  patrimonio?: string;
  classes?: string[];
  urgencia?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

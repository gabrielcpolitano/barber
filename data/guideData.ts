
import { GuideStep } from '../types';

export const guideSteps: GuideStep[] = [
  {
    id: 1,
    title: "1. Setup & Modelagem de Dados",
    subtitle: "A fundação do seu império SaaS",
    icon: "🏗️",
    content: [
      "Inicialização: Execute 'npx create-next-app@latest' selecionando TypeScript, Tailwind e App Router.",
      "Banco de Dados Local: Configure um arquivo 'docker-compose.yml' com uma imagem do PostgreSQL para desenvolvimento rápido.",
      "Schema Prisma (Fundamentos): No 'schema.prisma', crie a tabela 'User' com '@default(cuid())'. Adicione campos 'role' (ENUM: ADMIN, BARBER, CLIENT).",
      "Modelagem de Negócio: Crie 'BarberShop' (slug único, nome, logo). Relacione com 'Barber' (1 barbearia tem N barbeiros).",
      "Modelagem de Agenda: Crie 'Appointment' com campos 'date' (DateTime), 'status' (CONFIRMED, CANCELLED) e relações obrigatórias com User, Barber e Service.",
      "Migração Inicial: Execute 'npx prisma migrate dev' para espelhar o schema no banco físico."
    ],
    tools: ["Next.js 14", "Docker", "Prisma ORM", "PostgreSQL"],
    skills: ["Arquitetura de Software", "SQL", "TypeScript", "Modelagem de Dados"],
    proTip: "Use o campo 'slug' na tabela BarberShop para criar URLs amigáveis como 'barbersaas.com/barbearia-do-pedro'."
  },
  {
    id: 2,
    title: "2. O Fluxo de Agendamento (Frontend)",
    subtitle: "Experiência de usuário impecável",
    icon: "📱",
    content: [
      "Interface de Seleção: Crie um componente 'BarberCard' que receba dados do banco e exiba nota e especialidade.",
      "Lógica de Calendário: Use 'react-day-picker' customizado. Crie uma função 'isPastDate' para desabilitar dias retroativos.",
      "Grade de Horários: Implemente um loop que renderiza botões de 30 em 30 minutos. Use uma 'Skeleton Screen' enquanto os dados carregam.",
      "Gerenciamento de Estado: Use Zustand para criar um 'useBookingStore'. Salve 'barberId', 'serviceId' e 'selectedDate' globalmente.",
      "Confirmação: Crie um Modal (Dialog do Shadcn) que resume o pedido antes do clique final.",
      "Tratamento de Erros: Exiba Toasts (sonner) se o usuário tentar agendar sem selecionar um barbeiro."
    ],
    tools: ["Shadcn/UI", "Zustand", "Framer Motion", "React Day Picker"],
    skills: ["State Management", "Componentização", "UX Design", "Frontend Dinâmico"],
    proTip: "Implemente 'Optimistic Updates': mostre o agendamento como concluído instantaneamente e trate o erro em background se a API falhar."
  },
  {
    id: 3,
    title: "3. O Algoritmo de Disponibilidade",
    subtitle: "A inteligência por trás da agenda",
    icon: "🧠",
    content: [
      "Criação da API: Crie o arquivo 'app/api/availability/route.ts'. Ela deve receber 'barberId' e 'date' via Query Params.",
      "Busca de Conflitos: No Prisma, busque todos os 'appointments' onde 'barberId' é igual ao solicitado e o dia é o mesmo.",
      "Geração de Janelas: Crie um array de horários (ex: 08:00 às 18:00). Use 'date-fns' para manipular as horas com precisão.",
      "Filtro de Ocupados: Use '.filter()' no array de horários para remover qualquer item que colida com os agendamentos vindos do banco.",
      "Consideração de Almoço: Adicione uma regra fixa para remover o horário de almoço do barbeiro automaticamente.",
      "Retorno JSON: A API deve retornar uma lista limpa de strings: ['09:00', '10:30', ...]."
    ],
    tools: ["Node.js", "Date-fns", "Prisma Client"],
    skills: ["Lógica de Back-end", "Algoritmos de Busca", "Manipulação de Tempo"],
    proTip: "Use cache (Next.js tags) nessa API para evitar consultas repetitivas ao banco de dados em segundos."
  },
  {
    id: 4,
    title: "4. Dashboard Administrativo",
    subtitle: "Onde o dono gerencia o dinheiro",
    icon: "📊",
    content: [
      "Layout do Admin: Use um Sidebar fixo. Implemente proteção de rota para que apenas 'role === ADMIN' acesse.",
      "Visualização de Agenda: Use a biblioteca 'FullCalendar' ou uma 'TanStack Table' customizada para listar os agendamentos do dia.",
      "Ações de Admin: Adicione botões de 'Check-in' (concluir serviço) e 'No-show' (cliente faltou).",
      "Gráficos de Receita: Integre Recharts. Crie um gráfico de barras comparando o faturamento dos últimos 7 dias.",
      "Gestão de Equipe: Crie um formulário para o dono cadastrar novos barbeiros e fazer o upload da foto via UploadThing.",
      "Exportação: Adicione um botão para exportar a lista de clientes do mês em CSV."
    ],
    tools: ["Recharts", "TanStack Table", "UploadThing"],
    skills: ["Dashboards Profissionais", "Data Visualization", "Controle de Acesso (RBAC)"],
    proTip: "Adicione um modo 'Dark Mode' automático. Barbeiros costumam usar o sistema em tablets no balcão e preferem cores escuras."
  },
  {
    id: 5,
    title: "5. Pagamentos & Escala (SaaS)",
    subtitle: "Transformando o código em lucro recorrente",
    icon: "💳",
    content: [
      "Ambiente Stripe: Crie uma conta no Stripe Developers e obtenha suas chaves de teste.",
      "Portal de Assinatura: Configure dois produtos no Stripe (Mensal e Anual).",
      "Checkout: Crie uma API Route que gera um 'Stripe Checkout Session' e retorna a URL para o frontend.",
      "Webhooks de Segurança: Implemente um endpoint que escuta o evento 'customer.subscription.deleted' para bloquear o acesso da barbearia imediatamente.",
      "Multi-tenancy: No banco de dados, certifique-se de que cada consulta inclua 'where: { shopId }' para que um dono nunca veja dados de outra barbearia.",
      "Deploy: Suba o projeto na Vercel e configure as variáveis de ambiente (DATABASE_URL, STRIPE_SECRET_KEY)."
    ],
    tools: ["Stripe SDK", "Vercel", "Webhooks"],
    skills: ["Sistemas Financeiros", "Segurança SaaS", "Infraestrutura de Cloud"],
    proTip: "Implemente um 'Trial Period' de 14 dias. No Stripe, isso é apenas um parâmetro 'subscription_data[trial_period_days]'."
  }
];

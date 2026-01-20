
import { Category } from '../types';

export const roadmapData: Category[] = [
  {
    id: 1,
    title: "Base Obrigatória (Fundamentos)",
    icon: "🏗️",
    description: "Os pilares que sustentam qualquer projeto de software.",
    tasks: [
      { id: "1-1", title: "Variáveis", completed: false },
      { id: "1-2", title: "Condições (if / else)", completed: false },
      { id: "1-3", title: "Laços (for, while)", completed: false },
      { id: "1-4", title: "Funções", completed: false }
    ]
  },
  {
    id: 2,
    title: "Front-end do Site",
    icon: "🎨",
    description: "A interface que o cliente e o barbeiro irão utilizar.",
    tasks: [
      { id: "2-1", title: "HTML (Estrutura)", completed: false },
      { id: "2-2", title: "CSS (Visual Moderno)", completed: false },
      { id: "2-3", title: "JavaScript (Interações)", completed: false },
      { id: "2-4", title: "Design Responsivo (Mobile First)", completed: false },
      { id: "2-5", title: "Framework (React/Next.js)", completed: false },
      { id: "2-6", title: "Tailwind CSS", completed: false }
    ]
  },
  {
    id: 3,
    title: "Sistema de Agendamento",
    icon: "📅",
    description: "A lógica central do negócio.",
    tasks: [
      { id: "3-1", title: "Back-end (Node/Python/PHP)", completed: false },
      { id: "3-2", title: "CRUD de Agendamentos", completed: false },
      { id: "3-3", title: "Regra: Horários Disponíveis", completed: false },
      { id: "3-4", title: "Regra: Bloqueio de Horários", completed: false },
      { id: "3-5", title: "Gerenciamento de Profissionais", completed: false }
    ]
  },
  {
    id: 4,
    title: "Banco de Dados",
    icon: "🗄️",
    description: "Onde toda a inteligência e histórico ficam guardados.",
    tasks: [
      { id: "4-1", title: "SQL Básico", completed: false },
      { id: "4-2", title: "Modelagem: Clientes", completed: false },
      { id: "4-3", title: "Modelagem: Serviços/Profissionais", completed: false },
      { id: "4-4", title: "Modelagem: Faturamento", completed: false }
    ]
  },
  {
    id: 5,
    title: "Central de Gestão (Dashboard)",
    icon: "📊",
    description: "Métricas que dão valor ao dono da barbearia.",
    tasks: [
      { id: "5-1", title: "Consumo de APIs REST", completed: false },
      { id: "5-2", title: "Gráficos (Chart.js/Recharts)", completed: false },
      { id: "5-3", title: "Métrica: Faturamento Mensal", completed: false },
      { id: "5-4", title: "Métrica: Retenção de Clientes", completed: false }
    ]
  },
  {
    id: 6,
    title: "Autenticação e Segurança",
    icon: "🔐",
    description: "Proteção dos dados e controle de acesso.",
    tasks: [
      { id: "6-1", title: "Login e Senha", completed: false },
      { id: "6-2", title: "Hash de Senha (bcrypt)", completed: false },
      { id: "6-3", title: "JWT ou Sessões", completed: false },
      { id: "6-4", title: "Níveis de Permissão (Admin/User)", completed: false }
    ]
  },
  {
    id: 7,
    title: "Pagamentos (SaaS)",
    icon: "💳",
    description: "A parte que faz o projeto ser rentável.",
    tasks: [
      { id: "7-1", title: "Integração Stripe/Mercado Pago", completed: false },
      { id: "7-2", title: "Webhooks", completed: false },
      { id: "7-3", title: "Assinaturas Recorrentes", completed: false }
    ]
  },
  {
    id: 8,
    title: "Infraestrutura (Deploy)",
    icon: "🚀",
    description: "Colocando o navio no mar.",
    tasks: [
      { id: "8-1", title: "Hospedagem (Vercel/Render)", completed: false },
      { id: "8-2", title: "Configuração de Domínio e DNS", completed: false },
      { id: "8-3", title: "HTTPS e Certificados", completed: false },
      { id: "8-4", title: "Backup de Dados", completed: false }
    ]
  },
  {
    id: 9,
    title: "Automatizações e Extras",
    icon: "🤖",
    description: "Diferenciais competitivos.",
    tasks: [
      { id: "9-1", title: "WhatsApp Automático", completed: false },
      { id: "9-2", title: "E-mails de Confirmação", completed: false },
      { id: "9-3", title: "Lembretes de Agenda", completed: false }
    ]
  }
];

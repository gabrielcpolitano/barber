
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  description: string;
  tasks: Task[];
}

export interface RoadmapState {
  [categoryId: number]: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GuideStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  content: string[];
  tools: string[];
  skills: string[]; // Novo campo: Conhecimentos técnicos
  proTip: string;
}

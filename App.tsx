
import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  MessageSquare, 
  BarChart3, 
  Trophy,
  Rocket,
  ArrowRight,
  Map,
  Lightbulb,
  Wrench,
  ChevronDown,
  BookOpen,
  ClipboardList,
  Compass,
  Zap,
  Clock,
  Calendar,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { roadmapData } from './data/roadmap';
import { guideSteps } from './data/guideData';
import { Category, RoadmapState, ChatMessage } from './types';
import { getGeminiResponse } from './services/geminiService';

const COLORS = ['#6366f1', '#1e293b'];

// Componente do Personagem 3D em CSS Puro (Melhorado)
const Character3D: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="character-container transition-all duration-1000 ease-out">
      <div className="character-3d-wrapper animate-float">
        <div className="c3d-hair-extra"></div>
        <div className="c3d-head">
          <div className="c3d-ear left"></div>
          <div className="c3d-ear right"></div>
          <div className="c3d-face">
            <div className="c3d-eye left"></div>
            <div className="c3d-eye right"></div>
            <div className="c3d-smile"></div>
          </div>
          <div className="c3d-hair-main"></div>
        </div>
        <div className="c3d-body">
          <div className="c3d-shirt-front"></div>
          <div className="c3d-arm left"></div>
          <div className="c3d-arm right"></div>
        </div>
        <div className="c3d-legs">
          <div className="c3d-leg left"></div>
          <div className="c3d-leg right"></div>
        </div>
      </div>
      <div className="c3d-shadow"></div>
      <style>{`
        .character-container {
          position: relative;
          width: 100px;
          height: 180px; /* Aumentado para dar espaço total à animação */
          perspective: 1200px;
          z-index: 50;
          display: flex;
          justify-content: center;
          padding-top: 40px; /* Headroom extra para a animação de subir não cortar */
          overflow: visible;
        }
        .character-3d-wrapper {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .c3d-head {
          width: 42px;
          height: 42px;
          background: #ffdbac;
          border-radius: 50%;
          position: relative;
          transform-style: preserve-3d;
          box-shadow: inset -6px -6px 0 rgba(0,0,0,0.1), 0 8px 15px rgba(0,0,0,0.3);
          z-index: 10;
        }
        .c3d-hair-main {
          position: absolute;
          top: -4px;
          width: 46px;
          left: -2px;
          height: 18px;
          background: #3e2723;
          border-radius: 25px 25px 5px 5px;
          z-index: 11;
        }
        .c3d-hair-extra {
          position: absolute;
          top: -8px;
          width: 20px;
          height: 15px;
          background: #3e2723;
          border-radius: 50%;
          transform: rotate(-15deg);
          left: 30px;
          z-index: 12;
        }
        .c3d-ear {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #ffdbac;
          border-radius: 50%;
          top: 18px;
        }
        .c3d-ear.left { left: -6px; }
        .c3d-ear.right { right: -6px; }
        .c3d-face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateZ(5px);
        }
        .c3d-eye {
          width: 6px;
          height: 6px;
          background: #212121;
          border-radius: 50%;
          position: absolute;
          top: 16px;
        }
        .c3d-eye.left { left: 10px; }
        .c3d-eye.right { right: 10px; }
        .c3d-smile {
          width: 14px;
          height: 7px;
          border-bottom: 3px solid #d32f2f;
          border-radius: 0 0 14px 14px;
          margin-top: 18px;
        }
        .c3d-body {
          width: 36px;
          height: 45px;
          background: #4f46e5;
          margin-top: -6px;
          border-radius: 10px;
          box-shadow: inset -8px -6px 0 rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.2);
          position: relative;
          z-index: 5;
          transform-style: preserve-3d;
        }
        .c3d-arm {
          position: absolute;
          width: 10px;
          height: 30px;
          background: #4f46e5;
          top: 5px;
          border-radius: 10px;
        }
        .c3d-arm.left { left: -8px; transform: rotate(15deg); }
        .c3d-arm.right { right: -8px; transform: rotate(-15deg); }
        .c3d-legs {
          display: flex;
          gap: 6px;
          margin-top: -4px;
        }
        .c3d-leg {
          width: 12px;
          height: 25px;
          background: #1a237e;
          border-radius: 4px;
        }
        .c3d-shadow {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 12px;
          background: rgba(0,0,0,0.35);
          border-radius: 50%;
          filter: blur(5px);
          z-index: 1;
        }
        @keyframes float3d {
          0%, 100% { transform: translateY(0) rotateY(15deg) rotateX(2deg); }
          50% { transform: translateY(-25px) rotateY(-15deg) rotateX(-2deg); }
        }
        .animate-float { animation: float3d 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'dashboard' | 'mentor' | 'guide' | 'trilha'>('checklist');
  const [completedTasks, setCompletedTasks] = useState<RoadmapState>(() => {
    const saved = localStorage.getItem('barber_roadmap_state');
    return saved ? JSON.parse(saved) : {};
  });
  
  // Lógica do Cronômetro de 90 Dias
  const [startDate] = useState(() => {
    const savedDate = localStorage.getItem('barber_project_start');
    if (savedDate) return new Date(savedDate);
    const now = new Date();
    localStorage.setItem('barber_project_start', now.toISOString());
    return now;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  useEffect(() => {
    localStorage.setItem('barber_roadmap_state', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (categoryId: number, taskId: string) => {
    setCompletedTasks(prev => {
      const categoryTasks = prev[categoryId] || [];
      if (categoryTasks.includes(taskId)) {
        return { ...prev, [categoryId]: categoryTasks.filter(id => id !== taskId) };
      } else {
        return { ...prev, [categoryId]: [...categoryTasks, taskId] };
      }
    });
  };

  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    const categoryStats = roadmapData.map(cat => {
      const catTotal = cat.tasks.length;
      const catDone = (completedTasks[cat.id] || []).length;
      total += catTotal;
      completed += catDone;
      return {
        id: cat.id,
        name: cat.title.split(' ')[0],
        full: cat.title,
        icon: cat.icon,
        completed: catDone,
        total: catTotal,
        isDone: catDone === catTotal,
        percent: Math.round((catDone / catTotal) * 100)
      };
    });

    // Cálculo do Cronômetro
    const now = new Date();
    const targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + 90);
    const diffTime = targetDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    // RECALIBRAÇÃO: 450 horas totais (Estudo Profundo + Código)
    const totalEstimatedHours = 450; 
    const overallPercent = Math.round((completed / total) * 100);
    const hoursRemaining = totalEstimatedHours * (1 - (overallPercent / 100));
    const hoursPerDay = daysRemaining > 0 ? (hoursRemaining / daysRemaining).toFixed(1) : '0';

    return {
      total,
      completed,
      overallPercent,
      categoryStats,
      daysRemaining,
      hoursRemaining: Math.round(hoursRemaining),
      hoursPerDay,
      isDeadlineClose: daysRemaining < 15
    };
  }, [completedTasks, startDate]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);
    const contextStr = roadmapData.map(cat => {
      const done = (completedTasks[cat.id] || []).length;
      return `${cat.title}: ${done}/${cat.tasks.length} concluídos. Faltam ${stats.daysRemaining} dias. Meta: ${stats.hoursPerDay}h/dia.`;
    }).join(' ');
    const aiResponse = await getGeminiResponse(userInput, contextStr);
    setChatHistory(prev => [...prev, { role: 'model', text: aiResponse || 'Erro na resposta' }]);
    setIsTyping(false);
  };

  const getPathPosition = (percent: number) => {
    const y = (percent / 100) * 1200; 
    const x = 50 + 32 * Math.sin(y * 0.012); 
    return { x, y };
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans pb-24 text-slate-200">
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                BARBERSAAS PRO
              </h1>
              <p className="text-[10px] text-indigo-400/80 font-bold uppercase tracking-[0.2em]">Learning + Building Challenge</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className={`hidden sm:flex flex-col items-end px-4 py-1.5 rounded-2xl border ${stats.isDeadlineClose ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
              <span className="text-[8px] font-black uppercase tracking-tighter">Lançamento em</span>
              <span className="text-base font-black flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> {stats.daysRemaining} DIAS
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Overall Sync</span>
                <span className="text-lg font-black text-white">{stats.overallPercent}%</span>
              </div>
              <div className="w-40 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(99,102,241,0.6)]" 
                  style={{ width: `${stats.overallPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === 'checklist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {roadmapData.map(category => {
              const categoryDone = (completedTasks[category.id] || []).length;
              const isFinished = categoryDone === category.tasks.length;
              return (
                <div key={category.id} className={`bg-slate-900/40 border ${isFinished ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800'} rounded-3xl p-6 hover:bg-slate-900/60 transition-all group relative overflow-hidden backdrop-blur-sm`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-inner">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${isFinished ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                      {categoryDone} / {category.tasks.length}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{category.title}</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">{category.description}</p>
                  <div className="space-y-3">
                    {category.tasks.map(task => {
                      const isTaskCompleted = (completedTasks[category.id] || []).includes(task.id);
                      return (
                        <button key={task.id} onClick={() => toggleTask(category.id, task.id)} className={`w-full group/btn flex items-center gap-4 p-4 rounded-2xl text-left text-sm font-semibold transition-all border ${isTaskCompleted ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-100' : 'bg-slate-950/40 border-slate-800 hover:border-slate-600 text-slate-400'}`}>
                          {isTaskCompleted ? <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-800 shrink-0 group-hover/btn:border-indigo-500/50" />}
                          <span className={isTaskCompleted ? 'line-through opacity-50' : ''}>{task.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'trilha' && (
          <div className="max-w-3xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">
                <Calendar className="w-3 h-3" /> Faltam {stats.daysRemaining} dias
              </div>
              <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">A Trilha do Mestre</h2>
              <p className="text-slate-500 text-lg font-medium">Meta: ~{stats.hoursPerDay}h por dia de <span className="text-indigo-400">Estudo + Código</span>.</p>
            </div>
            <div className="relative flex justify-center pb-20">
              <svg width="400" height="1200" viewBox="0 0 100 1200" className="overflow-visible select-none">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glowPath">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path d="M 50 0 C 85 200 15 400 50 600 S 85 1000 50 1200" stroke="#1e293b" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 50 0 C 85 200 15 400 50 600 S 85 1000 50 1200" stroke="url(#pathGradient)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray="1250" strokeDashoffset={1250 - (1250 * stats.overallPercent / 100)} className="transition-all duration-1000 ease-out" filter="url(#glowPath)" />
                {stats.categoryStats.map((cat, idx) => {
                  const stepPercent = (idx / (stats.categoryStats.length - 1)) * 100;
                  const pos = getPathPosition(stepPercent);
                  const isUnlocked = stats.overallPercent >= stepPercent;
                  return (
                    <g key={cat.id} transform={`translate(${pos.x}, ${pos.y})`}>
                      <circle r="8" fill={isUnlocked ? "#6366f1" : "#0f172a"} stroke={isUnlocked ? "#fff" : "#334155"} strokeWidth="3" className="transition-all duration-500" />
                      {isUnlocked && <circle r="14" fill="#6366f1" opacity="0.4" className="animate-ping" />}
                      <foreignObject x={idx % 2 === 0 ? "25" : "-225"} y="-35" width="200" height="80" style={{ overflow: 'visible' }}>
                        <div className={`flex items-center gap-4 p-3 rounded-2xl border backdrop-blur-md transition-all duration-700 ${isUnlocked ? 'bg-slate-900/80 border-indigo-500 shadow-2xl shadow-indigo-500/20 translate-y-0 opacity-100' : 'bg-slate-950/40 border-slate-800 translate-y-2 opacity-40 grayscale'}`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${isUnlocked ? 'bg-indigo-600' : 'bg-slate-800'}`}>{cat.icon}</div>
                          <div>
                            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">Level {cat.id}</p>
                            <p className="text-xs font-bold text-white leading-tight">{cat.full}</p>
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
                {(() => {
                  const charPos = getPathPosition(stats.overallPercent);
                  return (
                    <foreignObject 
                      x={charPos.x - 50} 
                      y={charPos.y - 140} /* Mais headroom */
                      width="100" 
                      height="220" /* Aumentado para evitar corte */
                      style={{ overflow: 'visible' }} 
                      className="transition-all duration-1000 ease-out"
                    >
                      <Character3D progress={stats.overallPercent} />
                    </foreignObject>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Cards de Planejamento de Tempo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-8 rounded-[2rem] border backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl transition-all ${stats.isDeadlineClose ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Janela de Lançamento</p>
                <div className="flex items-center gap-3">
                   <Clock className={`w-8 h-8 ${stats.isDeadlineClose ? 'text-red-500' : 'text-indigo-400'}`} />
                   <p className={`text-5xl font-black ${stats.isDeadlineClose ? 'text-red-500' : 'text-white'}`}>{stats.daysRemaining}</p>
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Dias Restantes</p>
              </div>
              
              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] shadow-xl backdrop-blur-md flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Meta Diária (Foco Total)</p>
                <div className="flex items-center gap-3">
                   <GraduationCap className="w-8 h-8 text-yellow-500" />
                   <p className="text-5xl font-black text-white">{stats.hoursPerDay}h</p>
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Estudo + Código</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] shadow-xl backdrop-blur-md flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Volume Aprendizado/Dev</p>
                <div className="flex items-center gap-3">
                   <Wrench className="w-8 h-8 text-blue-400" />
                   <p className="text-5xl font-black text-white">~{stats.hoursRemaining}</p>
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Horas Restantes</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] shadow-xl backdrop-blur-md flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">SaaS Readiness</p>
                <p className="text-5xl font-black text-indigo-400">{stats.overallPercent}%</p>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Built & Learned</p>
              </div>
            </div>

            {/* Alerta de urgência */}
            {stats.isDeadlineClose && (
              <div className="bg-red-500/20 border border-red-500/40 p-6 rounded-3xl flex items-center gap-6 animate-pulse">
                <div className="bg-red-500 p-4 rounded-2xl shadow-lg shadow-red-500/40">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">CUIDADO: O TEMPO ESTÁ ACABANDO!</h4>
                  <p className="text-red-200 font-medium">Você precisa de {stats.hoursPerDay}h por dia para absorver os conceitos e terminar o código.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md h-[450px]">
                <h4 className="text-lg font-black mb-8 flex items-center gap-3"><BarChart3 className="w-5 h-5 text-indigo-500" /> Curva de Aprendizado</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.categoryStats} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={80} stroke="#475569" fontSize={11} fontWeight="bold" />
                      <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontWeight: 'bold' }} />
                      <Bar dataKey="percent" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md h-[450px] flex flex-col items-center justify-center relative">
                <h4 className="text-lg font-black mb-2">Build Health</h4>
                <div className="h-[320px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ name: 'Concluído', value: stats.completed }, { name: 'Restante', value: stats.total - stats.completed }]} innerRadius={90} outerRadius={125} paddingAngle={8} dataKey="value">
                        {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} stroke="none" />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-5xl font-black text-white">{stats.overallPercent}%</span>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Concluído</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 tracking-tighter">Manual Operacional</h2>
              <p className="text-slate-500 text-lg">Considere ~{stats.hoursPerDay}h de dedicação diária.</p>
            </div>
            {/* O restante do Guia permanece funcional */}
            <div className="relative border-l-4 border-slate-900 ml-6 md:ml-10 pl-10 space-y-16">
              {guideSteps.map((step) => (
                <div key={step.id} className="relative group">
                  <div className={`absolute -left-[54px] top-0 w-12 h-12 rounded-2xl border-4 border-slate-950 flex items-center justify-center font-black text-lg transition-all shadow-xl ${expandedStep === step.id ? 'bg-indigo-600 text-white scale-110 rotate-3' : 'bg-slate-800 text-slate-500 grayscale'}`}>
                    {step.id}
                  </div>
                  <div className={`bg-slate-900/40 border transition-all duration-500 rounded-[2rem] overflow-hidden ${expandedStep === step.id ? 'border-indigo-500/50 shadow-[0_20px_50px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20' : 'border-slate-800 opacity-80'}`}>
                    <button onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)} className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-4xl shadow-inner border border-slate-800">{step.icon}</div>
                        <div>
                          <h3 className="font-black text-2xl tracking-tight text-white">{step.title}</h3>
                          <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest">{step.subtitle}</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-all ${expandedStep === step.id ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedStep === step.id && (
                      <div className="p-8 border-t border-slate-800 bg-slate-950/20 animate-in slide-in-from-top-4 duration-500">
                        <div className="mb-10">
                          <h4 className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6"><ClipboardList className="w-4 h-4 text-indigo-500" /> Checklist</h4>
                          <div className="grid grid-cols-1 gap-4">
                            {step.content.map((point, idx) => (
                              <div key={idx} className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800/50 flex gap-5 group/item hover:border-slate-600 transition-all">
                                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-xs font-black text-indigo-500 shrink-0 border border-slate-800 shadow-inner">{idx + 1}</div>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">{point}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mentor' && (
          <div className="max-w-4xl mx-auto flex flex-col h-[75vh] bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 relative">
            <div className="p-8 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-md flex items-center justify-between z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-indigo-500/40">🧙‍♂️</div>
                <div>
                  <h3 className="text-xl font-black text-white">Mentor Sênior IA</h3>
                  <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Learning Architect Mode</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.05),transparent)]">
              {chatHistory.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="max-w-md bg-slate-900/60 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl">
                    <Zap className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
                    <h4 className="text-xl font-black mb-3 text-white">Pronto para aprender?</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Baseado na sua meta de {stats.hoursPerDay}h diárias, estou aqui para acelerar seu aprendizado.</p>
                  </div>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${msg.role === 'user' ? 'right' : 'left'}-4 duration-300`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'}`}>
                    {msg.text.split('\n').map((line, idx) => <p key={idx} className="mb-3 font-medium">{line}</p>)}
                  </div>
                </div>
              ))}
              {isTyping && <div className="flex justify-start"><div className="bg-slate-900 border border-slate-800 p-5 rounded-[1.8rem] rounded-bl-none flex gap-2 animate-pulse"><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" /><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" /><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" /></div></div>}
            </div>
            <div className="p-6 bg-slate-900/60 border-t border-slate-800 flex gap-4 items-center">
              <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Tire dúvidas sobre conceitos ou lógica..." className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white" />
              <button onClick={handleSendMessage} disabled={!userInput.trim() || isTyping} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 p-4 rounded-2xl transition-all shadow-xl active:scale-95"><ArrowRight className="w-6 h-6 text-white" /></button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-2 rounded-[2rem] flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 max-w-[95vw] overflow-x-auto no-scrollbar">
        {[
          { id: 'checklist', icon: <CheckCircle2 className="w-4 h-4" />, label: 'Milestones' },
          { id: 'trilha', icon: <Compass className="w-4 h-4" />, label: 'Adventure' },
          { id: 'guide', icon: <Map className="w-4 h-4" />, label: 'Blueprints' },
          { id: 'dashboard', icon: <BarChart3 className="w-4 h-4" />, label: 'Metrics' },
          { id: 'mentor', icon: <MessageSquare className="w-4 h-4" />, label: 'Architect' }
        ].map((btn) => (
          <button key={btn.id} onClick={() => setActiveTab(btn.id as any)} className={`flex items-center gap-3 px-6 py-3 rounded-[1.4rem] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === btn.id ? 'bg-indigo-600 text-white shadow-2xl' : 'text-slate-500 hover:text-slate-200'}`}>{btn.icon} {btn.label}</button>
        ))}
      </nav>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default App;

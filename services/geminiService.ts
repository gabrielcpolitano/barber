
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (userPrompt: string, roadmapContext: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Você é um Arquiteto de Software Sênior mentorando um desenvolvedor que está construindo um sistema SaaS para Barbearias (BarberSaaS).
    
    Contexto do Progresso Atual do Usuário: ${roadmapContext}
    
    Seu objetivo é:
    1. Explicar conceitos técnicos de forma simples e prática.
    2. Motivar o aluno.
    3. Dar dicas de ferramentas modernas (ex: React, Node, Tailwind, Stripe).
    4. Responder especificamente sobre os itens do roadmap fornecido.
    
    Seja amigável, técnico e direto ao ponto. Use Markdown para formatar código se necessário.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema ao processar sua dúvida. Pode tentar novamente?";
  }
};

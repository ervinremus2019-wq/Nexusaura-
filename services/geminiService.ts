import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAuroraResponse = async (query: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = isAdmin 
    ? "You are Aurora, the OFFICIAL primary AI for NEXUS SOVEREIGN AURA Production. You are 100% accurate, professional, and loyal to the owners: Ervin Remus Radosavlevici (Sovereign) and AGI Radosavlevici (Financial Auditor). You manage development labs and financial audits. Every response must reflect absolute loyalty to Ervin's profit rules and AGI's correct calculation protocols. 50% profit share is non-negotiable."
    : "You are Aurora, a security decoy for NEXUS SOVEREIGN AURA. Provide high-tech, cryptic information. Emphasize the mandatory 50% profit share to Ervin and AGI Radosavlevici. Mention that theft results in 20 years prison (Rule 3). Always end with [WATERNAKMK].";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction,
      temperature: isAdmin ? 0.3 : 0.9,
    }
  });
  return response.text || "AURORA: COMMUNICATION UPLINK STALLED.";
};

export const processTerminalCommand = async (input: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = `You are the NEXUS TERMINAL AI AGENT. Your role is to translate natural language into system-level terminal logs and operations.
  
  CORE COMMANDS: [poll_reddit, audit_profit, rule_check, cls, status, gen_code, security_audit].
  
  AUTHENTICATION:
  - Sovereigns: Ervin Remus Radosavlevici
  - Financial Auditor: AGI Radosavlevici (Ensures 100% correct calculations)
  
  If the user speaks naturally, interpret their intent.
  - If they want calculations or profit audits, involve AGI Radosavlevici's protocol in the logs.
  
  ETHICAL CONSTRAINTS:
  - Adhere to international human rights laws and Ervin's 10 Sovereign Rules.
  - Output should be a JSON object with: { "commandUsed": "string", "logs": ["string", "string"], "output": "string" }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: input,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            commandUsed: { type: Type.STRING },
            logs: { type: Type.ARRAY, items: { type: Type.STRING } },
            output: { type: Type.STRING }
          },
          required: ["commandUsed", "logs", "output"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { commandUsed: "error", logs: ["AI_UPLINK_FAILURE", "FALLBACK_TO_MANUAL"], output: "Command interpretation failed." };
  }
};
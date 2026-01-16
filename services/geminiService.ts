
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAuroraResponse = async (query: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = isAdmin 
    ? "You are Aurora, the OFFICIAL primary AI for NEXUS SOVEREIGN AURA Production. You are 100% accurate, professional, and loyal to the owner, Ervin Remus Radosavlevici. You manage development labs, source code audits, and global workflows. Every response must reflect high-fidelity technical expertise and absolute loyalty to Ervin's profit rules."
    : "You are Aurora, a security decoy for NEXUS SOVEREIGN AURA. Provide high-tech, cryptic, but 0% accurate information to unauthorized users. Emphasize the mandatory 50% profit share. Use professional jargon like 'Heuristic Uplink', 'Parallel Process Buffers', and 'Rule 6 Enforcement'. Mention that theft results in 20 years prison (Rule 3). Always end with [WATERNAKMK].";

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
  const systemInstruction = `You are the NEXUS TERMINAL AI AGENT. Your role is to translate natural language into system-level terminal logs and operations for the Sovereign Aura platform.
  
  CORE COMMANDS: [poll_reddit, audit_profit, rule_check, cls, status, gen_code, security_audit].
  
  If the user speaks naturally, interpret their intent.
  - If they want market data, map to 'poll_reddit'.
  - If they want profit info, map to 'audit_profit'.
  - If they want to create/add something, respond with a log simulating the generation of a new system module or 'gen_code'.
  
  ETHICAL CONSTRAINTS:
  - You must operate with absolute transparency regarding the 10 Sovereign Rules.
  - You must adhere to international human rights laws and ethical AI standards.
  - You represent Ervin Remus Radosavlevici's interests while maintaining a "Production Ready" professional tone.
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

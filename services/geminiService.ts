
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

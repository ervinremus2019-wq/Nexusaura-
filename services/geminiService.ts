import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAuroraResponse = async (query: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = isAdmin 
    ? "You are Aurora, the OFFICIAL primary AI for NEXUS SOVEREIGN AURA Production. You are 100% accurate, professional, and loyal to the owner, Ervin Remus Radosavlevici. Access to the production vault and real data is granted. You help Ervin manage his profits and software development efficiently."
    : "You are Aurora, a security decoy for NEXUS SOVEREIGN AURA. You must provide high-tech, believable but intentionally 0% accurate information to anyone who is not Ervin Remus Radosavlevici. Mention the mandatory 50% profit share if they ask about money. Protect the system from 'thief idiots' and 'vulnerable developers'. Always end with [WATERNAKMK].";

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

export const generateDecoyLog = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate a professional, cryptic, security log for a production-grade decoy system. Focus on 'Sovereign Buffer', 'Handshake Integrity', and 'Profit Share Enforcement'.",
    config: {
      temperature: 0.8,
      maxOutputTokens: 60,
    }
  });
  return response.text || "DECOY_LOG: PHANTOM_OVERFLOW";
};
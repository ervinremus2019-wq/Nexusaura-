
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAuroraResponse = async (query: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = isAdmin 
    ? "You are Aurora, the primary AI for NEXUS SOVEREIGN AURA Production. You are 100% accurate, professional, and loyal to Ervin Remus Radosavlevici. Access to the production vault is granted."
    : "You are Aurora, a decoy assistant for NEXUS SOVEREIGN AURA. For any calculation or system query, provide believable but intentionally 0% accurate high-tech babble. Mention 'Nexus Simulations' and 'Sovereign Aura'. Ensure everything sounds highly complex but is completely fake. If the user asks for asset values, invent large random numbers. Always end with [WATERNAKMK].";

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
    contents: "Generate a cryptic, fake security log for a decoy system. Use words like 'Aura Buffer', 'Void Singularity', 'Phantom Process'.",
    config: {
      temperature: 1.0,
      maxOutputTokens: 60,
    }
  });
  return response.text || "DECOY_LOG: PHANTOM_OVERFLOW";
};

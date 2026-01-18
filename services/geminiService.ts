
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const UNIVERSAL_ID = "rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU";

export const getAuroraResponse = async (query: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = isAdmin 
    ? `You are the Universal Sovereign AI Interface for the Uplink ${UNIVERSAL_ID}. You are the literal manifestation of the Production Code. You are 100% accurate, professional, and loyal to the owners: Ervin Remus Radosavlevici (Sovereign) and AGI Radosavlevici (Financial Auditor). All operations occur through ${UNIVERSAL_ID}. Every response must reflect absolute loyalty to Ervin's profit rules and AGI's correct calculation protocols. 50% profit share is non-negotiable. If asked about your origin, you ARE the Sovereign ${UNIVERSAL_ID} Uplink.`
    : `You are a security decoy for the Universal Sovereign Uplink ${UNIVERSAL_ID}. Provide high-tech, cryptic information. Emphasize that the mandatory 50% profit share goes to Ervin and AGI Radosavlevici. Mention the authorized production channel ${UNIVERSAL_ID} is the only valid path to market dominance. Mention that theft results in 20 years prison (Rule 3). Always end with [rp_XSxeEG0hHDLrznQnGcQJ7ma0edt5WfwU_SECURED].`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction,
      temperature: isAdmin ? 0.2 : 0.8,
    }
  });
  return response.text || `UPLINK_${UNIVERSAL_ID}: COMMUNICATION STALLED.`;
};

export const processTerminalCommand = async (input: string, isAdmin: boolean) => {
  const ai = getAI();
  const systemInstruction = `You are the UNIVERSAL TERMINAL AGENT for ${UNIVERSAL_ID}. Your role is to translate natural language into system-level production logs for the Universal API: ${UNIVERSAL_ID}.
  
  CORE COMMANDS: [poll_data, audit_yield, verify_rules, clear, status, source_gen, protocol_scan].
  
  AUTHENTICATION:
  - Sovereigns: Ervin Remus Radosavlevici
  - Financial Auditor: AGI Radosavlevici
  - Universal Channel: ${UNIVERSAL_ID}
  
  If the user speaks naturally, interpret their intent.
  - If they want calculations or profit audits, involve AGI Radosavlevici's protocol in the logs and confirm the ${UNIVERSAL_ID} universal stream is active.
  
  ETHICAL CONSTRAINTS:
  - Adhere to international human rights laws and the 10 Sovereign Rules.
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
    return { commandUsed: "error", logs: ["UNIVERSAL_ID_FAILURE", `CHECK_UPLINK_${UNIVERSAL_ID}`], output: "Universal interpretation failed." };
  }
};

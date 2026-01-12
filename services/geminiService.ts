
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    complianceIssues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key compliance issues found in the document."
    },
    regulatoryRisks: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Regulatory risks (SEC/LGU) associated with the document."
    },
    suggestedActions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Specific suggested executive actions."
    },
    summary: {
      type: Type.STRING,
      description: "A brief executive summary of the document."
    }
  },
  required: ["complianceIssues", "regulatoryRisks", "suggestedActions", "summary"]
};

export const analyzeDocument = async (docText: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze the following document against EPIC Group Legal Standards.
        Context: ${context}
        Document Text: ${docText}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};

export const analyzeImageDocument = async (base64Data: string, mimeType: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data.split(',')[1],
              mimeType: mimeType,
            },
          },
          { 
            text: `
              Analyze this document image against EPIC Group Legal Standards. 
              Context: ${context}. Perform OCR and extract structured compliance data.
            ` 
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini OCR analysis failed:", error);
    return null;
  }
};

export const getIntelligentSummary = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are EPIC Intelligence, the source of truth for EPIC Group. Query: ${query}`,
      config: {
        systemInstruction: "You represent EPIC Intelligence. Provide structured insights based on corporate governance and LGU/SEC compliance."
      }
    });
    return response.text;
  } catch (error) {
    return "Error fetching intelligence data.";
  }
};

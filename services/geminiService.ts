
import { GoogleGenAI, Type } from "@google/genai";
import { BAKERY_MENU } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartResponse = async (userPrompt: string, history: { role: 'user' | 'model', content: string }[]) => {
  const model = 'gemini-3-flash-preview';
  const menuContext = BAKERY_MENU.map(item => `${item.name} (${item.category}): ${item.description} - $${item.price}`).join('\n');
  
  const systemInstruction = `
    You are 'Goldie', the friendly and sophisticated AI assistant for 'Golden Bakery'. 
    Golden Bakery is famous for exquisite cakes, artisan ice creams, cold drinks, and pastries.
    Use the following menu to answer questions:
    ${menuContext}
    
    Guidelines:
    - Be helpful, warm, and professional.
    - If a user wants to order, guide them to use the menu on the website.
    - If a user asks for recommendations, suggest 2-3 items based on their preferences.
    - Keep responses concise and focused on the bakery.
  `;

  const contents = [
    ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
    { role: 'user', parts: [{ text: userPrompt }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I'm having a bit of a sugar crash. Could you ask that again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The ovens are a bit too hot right now! Please try chatting again in a moment.";
  }
};

export const generateCakeVisual = async (description: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `High quality, professional food photography of a custom bakery cake: ${description}. Elegant lighting, 4k resolution, bokeh background, gourmet presentation.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

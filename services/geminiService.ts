import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using the latest Pro Preview for high-reasoning copy
const TEXT_MODEL = "gemini-3-pro-preview";
// Using the specific Pro Image Preview for high-fidelity visuals
const IMAGE_MODEL = "gemini-3-pro-image-preview";

export const generateMarketingCopy = async (
  productName: string, 
  tone: 'playful' | 'scientific' | 'luxury'
): Promise<string> => {
  try {
    const prompt = `
      你是一家高端宠物电商品牌的资深文案策划。
      请为以下产品写一段简短、迷人且极具吸引力的产品描述（100字以内）："${productName}"。
      
      语调风格：${tone}。
      
      如果语调是 'playful'（俏皮），请使用emoji、双关语，语气要活泼。
      如果语调是 'scientific'（科学），请侧重成分分析、健康益处和专业数据。
      如果语调是 'luxury'（奢华），请使用优雅、高级的辞藻，强调稀缺性和尊贵感。
      
      输出格式：请先给出一个加粗的【吸引人的标题】，然后是正文内容。请务必使用中文回复。
    `;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, // Slight thinking for creative angle
        temperature: 0.8,
      }
    });

    return response.text || "生成文案失败。";
  } catch (error) {
    console.error("Text Gen Error:", error);
    throw error;
  }
};

export const generatePetImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
        }
      }
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const analyzeCompetitorImage = async (base64Image: string): Promise<string> => {
    // Placeholder for multimodal analysis logic if user had upload capability
    // This demonstrates the code structure for the "Multimodal Analysis" scenario mentioned in research.
    return "分析已模拟。";
}
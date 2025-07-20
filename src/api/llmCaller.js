import { getActiveModel } from "../core/modelManager.js";
import { GoogleGenAI } from "@google/genai";
import { CohereClientV2 } from "cohere-ai";
export async function askLLM() {
  const { key, model } = getActiveModel();

  if (model === "gemini-2.5-flash") {
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Explain how AI works in a few words",
      });

      return{
        output:response.text,
      };
    } catch (err) {
      console.log(err);
    }
  } else if (model === "command-a-03-2025") {
    const cohere = new CohereClientV2({ token: key });
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: `Explain how AI works in few words`,
        },
      ],
    });
    return {
      output: response.message.content[0].text,
    };
  }
}

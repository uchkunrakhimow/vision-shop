import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const generateDescription = async (
  imageLabels: string
): Promise<string> => {
  try {
    const prompt = `
      I need your help in generating a product description for an online store.
      Google Vision API returned the following information: "${imageLabels}".

      Based on this data, please generate a product description for an e-commerce platform including:
      1. An attractive title (less than 65 characters)
      2. A short description (150-200 characters)
      3. A list of 3-5 key features/benefits
      4. 3-5 SEO keywords

      Please respond only in English.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("An error occurred while generating the description");
  }
};

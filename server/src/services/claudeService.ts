import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

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

    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error("Claude API error:", error);
    throw new Error("An error occurred while generating the description");
  }
};

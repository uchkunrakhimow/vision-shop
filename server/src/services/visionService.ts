import { ImageAnnotatorClient } from "@google-cloud/vision";

const visionClient = new ImageAnnotatorClient();

export const analyzeImage = async (imageBuffer: Buffer): Promise<string> => {
  try {
    const [result] = await visionClient.labelDetection({
      image: { content: imageBuffer },
    });

    const labels = result.labelAnnotations || [];

    const topLabels = labels
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5)
      .map((label) => label.description)
      .filter(Boolean) as string[];

    return topLabels.join(", ");
  } catch (error) {
    console.error("Vision API error:", error);
    throw new Error("An error occurred while analyzing the image");
  }
};

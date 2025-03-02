import type { NextFunction, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { analyzeImage } from "../services/visionService";
import { generateDescription } from "../services/claudeService";

export const processImage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageFile = req.files.image as UploadedFile;

    if (!imageFile.mimetype.startsWith("image/")) {
      res.status(400).json({ message: "Only image files are allowed" });
    }

    const imageBuffer = imageFile.data;
    const labels = await analyzeImage(imageBuffer);

    if (!labels) {
      res
        .status(400)
        .json({ message: "No recognizable objects found in the image" });
    }

    const description = await generateDescription(labels);

    res.status(200).json({
      success: true,
      labels,
      description,
    });
  } catch (error) {
    next(error);
  }
};

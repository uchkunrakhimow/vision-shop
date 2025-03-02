import express from "express";
import { processImage } from "../controllers/imageController";

const router = express.Router();

router.post("/process", processImage);

export default router;

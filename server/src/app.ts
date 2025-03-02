import express from "express";
import type { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  })
);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/images", imageRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

export default app;

import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.js";

const app = express();

app.use(cors());

app.use("/api/analyze", analyzeRoutes);

// ✅ Parse JSON ONLY for non-file routes (later)
app.use(express.json());

export default app;

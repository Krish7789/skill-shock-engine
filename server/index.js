import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

// 🔴 CORS FIX (VERY IMPORTANT)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", analyzeRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

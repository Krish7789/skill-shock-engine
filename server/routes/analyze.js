import express from "express";
import multer from "multer";
import { analyzeProfile } from "../controllers/analyzeController.js";

const router = express.Router();

// Multer memory storage (required for pdf-parse)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

// ✅ ONLY RELATIVE PATH HERE
router.post(
  "/analyze",
  upload.single("resume"),
  analyzeProfile
);

export default router;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { serve } from "inngest/express";
import {clerkMiddleware} from "@clerk/express";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;

/* -------------------- Middleware -------------------- */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
  })
);
app.use(clerkMiddleware());
/* -------------------- Health Check -------------------- */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/* -------------------- Endpoint -------------------- */
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

/* -------------------- Start Server -------------------- */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
    process.exit(1);
  }
};

startServer();

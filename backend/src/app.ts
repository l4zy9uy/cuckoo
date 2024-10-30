import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

export default app;

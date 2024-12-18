import express, { Request, Response } from "express";
import { router } from "./routes";
import { config } from "./config/config";

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(router);

config(app).then(() => {
  console.log("Config successfully.");
});
// A basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
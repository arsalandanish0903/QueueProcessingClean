import dotenv from "dotenv";
dotenv.config();
import express from "express";
import importLogRoutes from "./routes/importLog.routes.js";
import { connectDB } from "./config/db.js";
import "./cron/import.cron.js";
import "./workers/job.worker.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/importLogRoutes", importLogRoutes);

app.get("/", (req, res) => {
  return res.json(`Backend is running on port ${process.env.PORT || 5000}`)
})

connectDB();


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});


export default app;

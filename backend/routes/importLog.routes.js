import express from "express";
import { getImportLogs } from "../controller/importLog.controller.js";

const router = express.Router();

router.get("/", getImportLogs);

export default router;

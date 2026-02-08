import {Router} from "express";
import {Application} from "../models/application.model.js";
import { createApplication } from "../controllers/application.controller.js"
const router = Router();

// POST /api/applications
router.post("/applications",createApplication);

export default router;

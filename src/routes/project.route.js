import express from "express";
import { createProject, listProjects } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", listProjects);


export default router;

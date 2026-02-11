import express from "express";
import { createProject, listProjects, getProjectById } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", listProjects);
router.get("/:id", getProjectById);


export default router;

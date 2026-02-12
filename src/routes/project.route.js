import express from "express";
import { createProject, listProjects, getProjectById, updateProjectStatus, deleteProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", listProjects);
router.get("/:id", getProjectById);
router.patch("/:id/status", updateProjectStatus);
router.delete("/:id", deleteProject);

export default router;

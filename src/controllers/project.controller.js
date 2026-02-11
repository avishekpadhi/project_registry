import { createProjectService, listProjectsService } from "../services/project.service.js";

export const createProject = async (req, res) => {
  try {
    const project = await createProjectService(req.body);

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const listProjects = async (req, res) => {
  try {
    const projects = await listProjectsService(req.query);

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
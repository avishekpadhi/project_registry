import {
  createProjectService,
  listProjectsService,
  getProjectByIdService,
  updateProjectStatusService
} from "../services/project.service.js";

export const createProject = async (req, res) => {
  try {
    const project = await createProjectService(req.body);

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await getProjectByIdService(id);

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status field is required",
      });
    }

    const updatedProject = await updateProjectStatusService(id, status);

    return res.status(200).json({
      success: true,
      message: "Project status updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};


import { deleteProjectService } from "../services/project.service.js";

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteProjectService(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
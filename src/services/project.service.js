import { PROJECT_STATUS } from "../constants/constants.js";
import { Project } from "../models/project.model.js";
import { ERROR_MESSAGES } from "../constants/errors.js";
import { STATUS_TRANSITIONS } from "../constants/projectStatus.js";
import mongoose from "mongoose";

// Create Project

export const createProjectService = async (data) => {
  const { name, clientName, status, startDate, endDate } = data;

  if (!name || !clientName || !startDate) {
    throw new Error(ERROR_MESSAGES.PROJECT.REQUIRED_FIELDS);
  }

  if (status && !Object.values(PROJECT_STATUS).includes(status)) {
    throw new Error(ERROR_MESSAGES.PROJECT.INVALID_STATUS);
  }

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = endDate ? new Date(endDate) : null;

  if (parsedEndDate && parsedEndDate < parsedStartDate) {
    throw new Error(ERROR_MESSAGES.PROJECT.INVALID_DATE_ORDER);
  }

  const project = await Project.create({
    name,
    clientName,
    status,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
  });

  return project;
};

// List Projects

export const listProjectsService = async (queryParams) => {
  const { status, search, sort } = queryParams;

  const filter = {};

  // Filter by status
  if (status) {
    if (!Object.values(PROJECT_STATUS).includes(status)) {
      throw new Error(ERROR_MESSAGES.PROJECT.INVALID_STATUS);
    }
    filter.status = status;
  }

  // Search by name OR clientName
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { clientName: { $regex: search, $options: "i" } },
    ];
  }

  // Sorting
  let sortOption = { createdAt: -1 };
  if (sort) {
    const allowedSortFields = ["createdAt", "startDate"];

    if (!allowedSortFields.includes(sort)) {
      throw new Error(ERROR_MESSAGES.PROJECT.INVALID_SORT);
    }

    sortOption = { [sort]: -1 };
  }

  const projects = await Project.find(filter).sort(sortOption).lean();

  return projects;
};

// Find a project

export const getProjectByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.PROJECT.INVALID_ID);
  }

  const project = await Project.findById(id).lean();

  if (!project) {
    throw new Error(ERROR_MESSAGES.PROJECT.NOT_FOUND);
  }

  return project;
};

// Update a project

export const updateProjectStatusService = async (id, newStatus) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.PROJECT.INVALID_ID);
  }

  if (!Object.values(PROJECT_STATUS).includes(newStatus)) {
    throw new Error(ERROR_MESSAGES.PROJECT.INVALID_STATUS);
  }

  const project = await Project.findById(id);

  if (!project) {
    throw new Error(ERROR_MESSAGES.PROJECT.NOT_FOUND);
  }

  const currentStatus = project.status;

  if (currentStatus === newStatus) {
    throw new Error(ERROR_MESSAGES.PROJECT.STATUS_ALREADY_SET);
  }

  const allowedTransitions = STATUS_TRANSITIONS[currentStatus];

  if (!allowedTransitions.includes(newStatus)) {
    throw new Error(
      `${ERROR_MESSAGES.PROJECT.INVALID_STATUS_TRANSITION}: ${currentStatus} → ${newStatus}`,
    );
  }

  project.status = newStatus;
  await project.save();

  return project;
};




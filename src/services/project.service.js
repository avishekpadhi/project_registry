import { PROJECT_STATUS } from "../constants/projectStatus.js";
import { Project } from "../models/project.model.js";
import { ERROR_MESSAGES } from "../constants/errors.js";
import { STATUS_TRANSITIONS } from "../constants/projectStatus.js";
import { findActiveProjectById } from "./utils/findActiveProjectById.js";
import { AppError } from "./utils/appError.js";
import mongoose from "mongoose";

// Create Project

export const createProjectService = async (data) => {
  const { name, clientName, status, startDate, endDate } = data;

  if (typeof name !== "string" || typeof clientName !== "string") {
    throw new AppError(ERROR_MESSAGES.PROJECT.NON_EMPTY_STRINGS, 400);
  }

  const cleanedName = name.trim();
  const cleanedClientName = clientName.trim();

  if (!cleanedName || !cleanedClientName || !startDate) {
    throw new AppError(ERROR_MESSAGES.PROJECT.REQUIRED_FIELDS, 400);
  }

  if (status && !Object.values(PROJECT_STATUS).includes(status)) {
    throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_STATUS, 400);
  }

  const parsedStartDate = new Date(startDate);
  if (isNaN(parsedStartDate.getTime())) {
    throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_START_DATE, 400);
  }

  const parsedEndDate = endDate ? new Date(endDate) : null;
  if (parsedEndDate && isNaN(parsedEndDate.getTime())) {
    throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_END_DATE, 400);
  }

  if (parsedEndDate && parsedEndDate < parsedStartDate) {
    throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_DATE_ORDER, 400);
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

  const filter = {
    deletedAt: null,
  };

  // Filter by status
  if (status) {
    if (!Object.values(PROJECT_STATUS).includes(status)) {
      throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_STATUS, 400);
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
      throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_SORT, 400);
    }

    sortOption = { [sort]: -1 };
  }

  const projects = await Project.find(filter).sort(sortOption).lean();

  return projects;
};

// Find a project

export const getProjectByIdService = async (id) => {
  return await findActiveProjectById(id, { lean: true });
};

// Update a project

export const updateProjectStatusService = async (id, newStatus) => {
  if (!Object.values(PROJECT_STATUS).includes(newStatus)) {
    throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_STATUS, 400);
  }

  const project = await findActiveProjectById(id);

  const currentStatus = project.status;

  if (currentStatus === newStatus) {
    throw new AppError(ERROR_MESSAGES.PROJECT.STATUS_ALREADY_SET, 409);
  }

  const allowedTransitions = STATUS_TRANSITIONS[currentStatus];

  if (!allowedTransitions.includes(newStatus)) {
    throw new AppError(
      `${ERROR_MESSAGES.PROJECT.INVALID_STATUS_TRANSITION}: ${currentStatus} → ${newStatus}`,
      409,
    );
  }

  project.status = newStatus;
  await project.save();

  return project;
};

// Delete a project

export const deleteProjectService = async (id) => {
  const project = await findActiveProjectById(id);

  project.deletedAt = new Date();
  await project.save();

  return;
};

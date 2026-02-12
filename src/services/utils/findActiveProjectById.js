import mongoose from "mongoose";
import { Project } from "../../models/project.model.js";
import { ERROR_MESSAGES } from "../../constants/errors.js";
import { AppError } from "./appError.js";

export const findActiveProjectById = async (id, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(ERROR_MESSAGES.PROJECT.INVALID_ID, 400);
  }

  const query = Project.findOne({
    _id: id,
    deletedAt: null,
  });

  if (options.lean) {
    query.lean();
  }

  const project = await query;

  if (!project) {
    throw new AppError(ERROR_MESSAGES.PROJECT.NOT_FOUND, 404);
  }

  return project;
};

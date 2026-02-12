import mongoose from "mongoose";
import { PROJECT_STATUSES } from "../src/constants.js";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: PROJECT_STATUSES[0], 
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Project = mongoose.model("Project", ProjectSchema);

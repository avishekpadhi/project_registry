import express from "express";
import projectRoutes from "./routes/project.route.js";

const app = express();

app.use(express.json());

app.use("/api/projects", projectRoutes);

export default app;

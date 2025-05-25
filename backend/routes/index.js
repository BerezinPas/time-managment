import express from "express";
import authRouter from "./auth.js";
import projectsRouter from "./projects.js";
import tracksRouter from "./tracks.js";
import usersRouter from "./users.js";

export const router = express.Router({ mergeParams: true });

router.use("/", authRouter);
router.use("/users", usersRouter);
router.use("/projects", projectsRouter);
router.use("/tracks", tracksRouter);

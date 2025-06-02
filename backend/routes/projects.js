import express from "express";
import { auth } from "../middlewares/index.js";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/index.js";
import { mapProject } from "../helpers/map-project.js";
import { mapTrack } from "../helpers/map-track.js";

const router = express.Router({ mergeParams: true });

router.post("/", auth, async (req, res) => {
  const { project, tracksData } = await addProject(
    {
      name: req.body.name,
      user: req.user.id,
    },
    req.body.tracks.create
  );
  res.send({ res: { project: mapProject(project), tracksData }, error: null });
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await deleteProject(req.user.id, req.params.id);

    res.send({ res: true, error: null });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const projects = await getProjects(req.user.id);
    res.send({ res: projects.map(mapProject), error: null });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const project = await getProject(req.user.id, req.params.id);
    res.send({ res: mapProject(project), error: null });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { project, tracksCUD } = await updateProject(
      req.user.id,
      req.params.id,
      { name: req.body.name },
      req.body.tracks
    );

    res.send({
      res: {
        project: mapProject(project),
        tracksData: {
          created: tracksCUD.created.map(mapTrack),
          updated: tracksCUD.updated.map(mapTrack),
          deleted: tracksCUD.deleted,
        },
      },
      error: null,
    });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

export default router;

import express from "express";
import { auth } from "../middlewares/index.js";
import { mapTrack } from "../helpers/map-track.js";
import { getTracks } from "../controllers/track-controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const { projectIds, startTime, endTime } = req.query;
    console.log(projectIds, startTime, endTime);
    console.log("req.query.startTime,", req.query.startTime);

    const idsArray = Array.isArray(projectIds) ? projectIds : [projectIds];
    const { tracks, lasPage } = await getTracks(idsArray, {
      startTime: req.query.startTime,
      endTime: req.query.endTime || new Date(),
    });

    res.send({ res: { tracks: tracks.map(mapTrack), lasPage }, error: null });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

export default router;

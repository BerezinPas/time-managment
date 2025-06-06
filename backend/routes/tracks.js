import express from "express";
import { auth } from "../middlewares/index.js";
import { mapTrack } from "../helpers/map-track.js";
import { getTracks } from "../controllers/track-controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const { projectIds, startTime, endTime, limit, sortField, sortVal, page } =
      req.query;

    const sort = sortField ? { field: sortField, val: Number(sortVal) } : null;
    const idsArray = Array.isArray(projectIds) ? projectIds : [projectIds];
    const { tracks, lasPage } = await getTracks(
      idsArray,
      {
        startTime: startTime ? new Date(Number(startTime)) : null,
        endTime: endTime ? new Date(Number(endTime)) : new Date(),
      },
      limit,
      page,
      sort
    );

    // res.send({ res: { tracks: tracks.map(mapTrack), lasPage }, error: null });
    res.send({ res: tracks.map(mapTrack), error: null });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

export default router;

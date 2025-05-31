import mongoose from "mongoose";
import { mapTrack } from "./map-track.js";
import { timeStampToHHMMSS } from "./time-stamp-to-HHMMSS.js";

export const mapProject = (project) => ({
  id: project._id,
  name: project.name,
  sumDuration: timeStampToHHMMSS(project.sumDuration),
  userId: project.user,
  startTime: project.startTime,
  tracks: project.tracks.map((track) =>
    mongoose.isObjectIdOrHexString(track) ? track : mapTrack(track)
  ),
});

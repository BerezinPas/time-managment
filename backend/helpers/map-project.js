import mongoose from "mongoose";
import { mapTrack } from "./map-track.js";

const timeStampToHHMMSS = (timeStamp) => {
  const secs = Math.floor(timeStamp / 1000);
  const pad = (val, index) => (index === 0 ? val : ("0" + val).slice(-2));
  return [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60]
    .map(pad)
    .join(":");
};

export const mapProject = (project) => ({
  id: project._id,
  name: project.name,
  sumDuration: timeStampToHHMMSS(project.sumDuration),
  userId: project.user,
  tracks: project.tracks.map((track) =>
    mongoose.isObjectIdOrHexString(track) ? track : mapTrack(track)
  ),
});

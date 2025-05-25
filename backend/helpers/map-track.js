export const mapTrack = (track) => ({
  id: track._id,
  description: track.description,
  projectId: track.project,
  startTime: track.startTime,
  endTime: track.endTime,
});

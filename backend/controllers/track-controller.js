import { Project, Track } from "../models/index.js";

// TODO validateTrack
const validateTrack = (track) => {
  if (track.description.length > 120) {
    throw new Error("Описание больше 120 символов");
  }

  if (track.startTime > track.endTime) {
    throw new Error("Время конца, меньше времени старта");
  }
  return true;
};
// add
export const addTracks = async (projectId, tracks) => {
  tracks.forEach(validateTrack);
  const newTracks = await Track.create(
    tracks.map((track) => ({ ...track, project: projectId }))
  );
  // await newTracks.populate("project");
  // console.log(newTracks);

  return newTracks;
};

// getALl

export const getTracks = async (
  projectIds,
  dateGap,
  limit = Number.MAX_SAFE_INTEGER,
  page = 1
) => {
  // console.log("dateGap", dateGap);
  // console.log("projectId", projectIds);
  const [tracks, count] = await Promise.all([
    Track.find({
      project: { $in: projectIds },
      startTime: { $gte: new Date(dateGap.startTime) },
      endTime: { $lte: new Date(dateGap.endTime) },
    })
      .limit(limit)
      .skip((page - 1) * limit),
    Track.countDocuments({
      project: projectIds,
      startTime: { $gte: dateGap.startTime },
      endTime: { $lte: dateGap.endTime },
    }),
  ]);

  // return { tracks, lasPage: Math.ceil(count / limit) };
  return { tracks, lasPage: count };
};

// delete

export const deleteTracks = async (tracksID) => {
  tracksID.forEach(async (trackId) => await Track.deleteOne({ _id: trackId }));
};

// patch

export const upadateTracks = async (projectId, tracks) => {
  tracks.forEach(validateTrack);
  const project = await Project.findById(projectId);
  await Promise.all(
    tracks.map(async (track) => {
      const existingTrack = await Track.findById(track.id);

      if (!existingTrack) {
        throw new Error(`Трек c id ${track.description} не существует`);
      }

      if (!existingTrack.project.equals(projectId)) {
        throw new Error(
          `Трек '${track.description}' не принадлежит проекту ${project.name}`
        );
      }
      return track;
    })
  );

  const res = await Promise.all(
    tracks.map((track) => Track.findByIdAndUpdate(track.id, track))
  );

  return res;
};

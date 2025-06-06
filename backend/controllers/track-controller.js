import { Project, Track } from "../models/index.js";

// add
export const addTracks = async (projectId, tracks) => {
  const newTracks = await Track.create(
    tracks.map((track) => ({ ...track, project: projectId }))
  );
  newTracks.forEach(async (track) => await track.calcDuration());

  return newTracks;
};

// getALl

export const getTracks = async (
  projectIds,
  dateGap,
  limit = Number.MAX_SAFE_INTEGER,
  page = 1,
  sort
) => {
  const [tracks, count] = await Promise.all([
    Track.find({
      project: { $in: projectIds },
      startTime: {
        $gte: new Date(dateGap.startTime),
        $lte: new Date(dateGap.endTime),
      },
    })
      .limit(limit)
      .skip((page - 1) * limit),
    Track.countDocuments({
      startTime: { $gte: dateGap.startTime },
      startTime: { $lte: dateGap.endTime },
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
    tracks.map((track) =>
      Track.findByIdAndUpdate(track.id, track, {
        returnDocument: "after",
        runValidators: true,
      })
    )
  );

  res.forEach(async (track) => await track.calcDuration());

  return res;
};

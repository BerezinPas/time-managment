import { Project, Track } from "../models/index.js";
import { addTracks, deleteTracks, upadateTracks } from "./track-controller.js";

// add
export const addProject = async (projectData, tracks = []) => {
  const project = await Project.create(projectData);

  const createdTracks = await addTracks(project.id, tracks);

  project.tracks.push(...createdTracks);
  await project.save();

  await project.calcSumDuration();
  await project.calcStartTime();

  return {
    project: project,
    tracksData: {
      created: createdTracks,
      updated: [],
      deleted: [],
    },
  };
};

// delete
export const deleteProject = async (userId, projectId) => {
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new Error("Project not found");
  }

  if (!project.user.equals(userId)) {
    throw new Error("User not are owner of this project");
  }
  await Project.findOneAndDelete({ _id: projectId });

  return true;
};

// get

export const getProject = async (userId, projectId) => {
  let project;
  try {
    project = await Project.findOne({ _id: projectId });
  } catch (error) {
    throw new Error("Project not found");
  }

  if (!project) {
    throw new Error("Project not found");
  }

  if (!project.user.equals(userId)) {
    throw new Error("User not are owner of this project");
  }

  // await project.populate({ path: "tracks", populate: "project" });
  await project.populate("tracks");
  // TODO limit
  return project;
};

// getAll

export const getProjects = async (userId) => {
  return await Project.find({ user: userId });
};

// patch

export const updateProject = async (
  userId,
  projectId,
  projectData,
  tracksCUD
) => {
  const project = await Project.findByIdAndUpdate(projectId, projectData, {
    returnDocument: "after",
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (!project.user.equals(userId)) {
    throw new Error("User not are owner of this project");
  }

  const [createdTracks, updatedTracks] = await Promise.all([
    addTracks(projectId, tracksCUD.create || []),
    upadateTracks(projectId, tracksCUD.update || []),
    deleteTracks(tracksCUD.delete || []),
  ]);

  await Project.findByIdAndUpdate(project.id, {
    $pull: { tracks: tracksCUD.delete },
  });

  const UpdatedProject = await Project.findByIdAndUpdate(
    project.id,
    {
      $push: { tracks: createdTracks },
    },
    {
      returnDocument: "after",
    }
  );

  await UpdatedProject.calcSumDuration();
  await UpdatedProject.calcStartTime();

  // console.log("updatedTracks", updatedTracks);

  return {
    project: UpdatedProject,
    tracksCUD: {
      created: createdTracks,
      updated: updatedTracks,
      deleted: tracksCUD.delete,
    },
  };
};

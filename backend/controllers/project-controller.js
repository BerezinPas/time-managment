import { Project, Track } from "../models/index.js";
import { addTracks, deleteTracks, upadateTracks } from "./track-controller.js";

// add
export const addProject = async (projectData, tracks) => {
  const project = await Project.create(projectData);
  // console.log(project.id);
  const createdTracks = await addTracks(project.id, tracks);

  await Project.findByIdAndUpdate(project.id, {
    $push: { tracks: createdTracks },
  });
  await project.calcSumDuration();

  return project;
};

// delete
// TODO CHECK USER_ID
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
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new Error("Project not found");
  }

  if (!project.user.equals(userId)) {
    throw new Error("User not are owner of this project");
  }

  // await project.populate({ path: "tracks", populate: "project" });
  await project.populate("tracks");

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
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new Error("Project not found");
  }

  if (!project.user.equals(userId)) {
    throw new Error("User not are owner of this project");
  }
  const UpdatedProject = await Project.findByIdAndUpdate(
    projectId,
    projectData,
    {
      returnDocument: "after",
    }
  );

  const createdTracks = await addTracks(projectId, tracksCUD.create);
  await Project.findByIdAndUpdate(project.id, {
    $push: { tracks: createdTracks },
  });

  console.log("TRACKS", tracksCUD.update);
  const updatedTracks = await upadateTracks(projectId, tracksCUD.update);
  console.log("updatedTracks", updatedTracks);

  await deleteTracks(tracksCUD.delete);
  await Project.findByIdAndUpdate(project.id, {
    $pull: { tracks: tracksCUD.delete },
  });

  // return UpdatedProject.populate("tracks");

  await UpdatedProject.calcSumDuration();

  return {
    project: UpdatedProject,
    tracksCUD: {
      created: createdTracks,
      updated: updatedTracks,
      deleted: tracksCUD.delete,
    },
  };
};

// TODO middlewares hasOwner

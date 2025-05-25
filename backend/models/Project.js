import mongoose from "mongoose";
import { Track } from "./Track.js";

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
    sumDuration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ProjectSchema.methods.calcSumDuration = async function () {
  const project = this;

  const tracks = await Track.find({ _id: { $in: project.tracks } });

  const totalDuration = tracks.reduce((sum, curTrack) => {
    return sum + (curTrack.endTime - curTrack.startTime);
  }, 0);

  project.sumDuration = totalDuration;
  return totalDuration;
};

// xук который срабатывает после  findOneAndDelete
ProjectSchema.post("findOneAndDelete", async (data) => {
  if (data) {
    await Track.deleteMany({ _id: { $in: data.tracks } });
  }
});

export const Project = mongoose.model("Project", ProjectSchema);

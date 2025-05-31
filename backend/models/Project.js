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
    startTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

ProjectSchema.methods.calcSumDuration = async function () {
  const project = await this.populate("tracks");

  const totalDuration = this.tracks.reduce((sum, curTrack) => {
    return (
      sum + (Date.parse(curTrack.endTime) - Date.parse(curTrack.startTime))
    );
  }, 0);

  project.set("sumDuration", totalDuration);

  await project.save();
};

ProjectSchema.methods.calcStartTime = async function () {
  const project = await this.populate("tracks");
  console.log("calcStartTime", this);

  const startTime = this.tracks.reduce((min, curTrack) => {
    return min > curTrack.startTime ? curTrack.startTime : min;
  }, this.startTime);

  project.set("startTime", startTime);
  console.log("startTime", startTime);

  await project.save();
};

// xук который срабатывает после  findOneAndDelete
ProjectSchema.post("findOneAndDelete", async (data) => {
  if (data) {
    await Track.deleteMany({ _id: { $in: data.tracks } });
  }
});

export const Project = mongoose.model("Project", ProjectSchema);

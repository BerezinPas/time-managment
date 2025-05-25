import mongoose from "mongoose";

const TrackSchema = mongoose.Schema({
  description: {
    type: String,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

export const Track = mongoose.model("Track", TrackSchema);

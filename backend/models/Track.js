import mongoose from "mongoose";
import { timeStampToHHMMSS } from "../helpers/time-stamp-to-HHMMSS.js";

const TrackSchema = mongoose.Schema({
  description: {
    type: String,
    validate: {
      validator: (description) => description.length <= 120,
      message: "Описание больше 120 символов",
    },
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  startTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (val) {
        return new Date(val) <= new Date(this.get("endTime"));
      },
      message: "Время конца, меньше времени старта",
    },
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (val) {
        return new Date(val) >= new Date(this.get("startTime"));
      },
      message: "Время конца, меньше времени старта",
    },
  },
  duration: {
    type: String,
  },
});

TrackSchema.methods.calcDuration = async function () {
  const track = this;

  const duration = timeStampToHHMMSS(this.endTime - this.startTime);

  track.set("duration", duration);

  console.log("duration", duration);

  await track.save();
};

export const Track = mongoose.model("Track", TrackSchema);

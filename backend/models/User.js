import mongoose from "mongoose";
import { OPTIONS_START_TIME } from "../constants.js";

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      // required: true,
      default: "assets/image.png",
    },
    defaultStartTimeInAnalytics: {
      //  type: MAX || WEEK || MOUNTH || YEAR
      type: String,
      enum: OPTIONS_START_TIME,
      default: OPTIONS_START_TIME[0],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);

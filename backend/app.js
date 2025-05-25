import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  getTracks,
  login,
  register,
  updateProject,
  updateUser,
} from "./controllers/index.js";
import { mapUser } from "./helpers/map-user.js";
import { auth } from "./middlewares/index.js";
import { router } from "./routes/index.js";

const PORT = 5001;
const __dirname = path.resolve("");
const app = express();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// console.log("__dirname", path.join(__dirname, "../frontend/dist"));

app.use("/api", router);

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

mongoose
  .connect(
    "mongodb://user:mongopass@localhost:27017/time-managment?authSource=admin"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

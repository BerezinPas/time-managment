import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { router } from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

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
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/assets", express.static(path.join(__dirname, "assets")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
console.log("process.env.MONGODB_URL", process.env.MONGODB_URL);

mongoose
  .connect(
    // "mongodb://user:mongopass@localhost:27017/time-managment?authSource=admin"
    process.env.MONGODB_URL
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

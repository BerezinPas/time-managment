import { verify } from "../helpers/index.js";
import { User } from "../models/User.js";

export const auth = async (req, res, next) => {
  const tokenData = verify(req.cookies.token);

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.send({ error: "Authenticated user not found" });
  }

  req.user = user;
  next();
};

// TODO isOwnsProjects([projectsIDs])

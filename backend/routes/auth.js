import express from "express";
import { login, register } from "../controllers/index.js";
import { mapUser } from "../helpers/map-user.js";

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { token, user } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ res: mapUser(user), error: null });
  } catch (error) {
    res.status(422).send({ res: null, error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { token, user } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ res: mapUser(user), error: null });
  } catch (error) {
    res.status(422).send({ res: null, error: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({ error: null, res: true });
});

export default router;

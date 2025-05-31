import express from "express";
import { auth } from "../middlewares/index.js";
import { updateUser } from "../controllers/user-controller.js";
import { mapUser } from "../helpers/map-user.js";

const router = express.Router({ mergeParams: true });

router.patch("/", auth, async (req, res) => {
  try {
    const user = await updateUser(req.user.id, {
      defaultStartTimeInAnalytics: req.body.defaultStartTimeInAnalytics,
      imageURL: req.body.imageURL,
    });
    res.send({ res: mapUser(user), error: null });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

export default router;

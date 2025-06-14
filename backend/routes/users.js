import express from "express";
import { auth } from "../middlewares/index.js";
import { updateUser } from "../controllers/user-controller.js";
import { mapUser } from "../helpers/map-user.js";
import { IncomingForm } from "formidable";
import { fileTypeFromFile } from "file-type";
import path from "path";
import { fileURLToPath } from "url";
import { unlink } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router({ mergeParams: true });

router.post("/", auth, async (req, res) => {
  try {
    const form = new IncomingForm({
      uploadDir: `uploads`,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      // console.log("Результат парсинга:", { err, fields, files });
      if (err) {
        return res.send({
          res: null,
          error: err,
        });
      }

      if (!files.imageFile) {
        const user = await updateUser(req.user.id, {
          defaultStartTimeInAnalytics: fields.defaultStartTimeInAnalytics[0],
        });
        return res.send({ res: mapUser(user), error: null });
      }

      const fileName = files.imageFile[0].newFilename;
      const filePath = files.imageFile[0].filepath;
      const fileType = await fileTypeFromFile(filePath);

      if (!fileType || !fileType.mime.startsWith("image/")) {
        return res.send({
          res: null,
          error: "Загружаемый файл не изображение",
        });
      }
      console.log("(req.user.imageURL", req.user.imageURL);

      if (req.user.imageURL.startsWith("uploads/")) {
        console.log(req.user.imageURL);
        try {
          await unlink(path.join(__dirname, "..", req.user.imageURL));
          console.log("image deleted");
        } catch (err) {
          console.error("error on image delete:", err);
        }
      }

      const user = await updateUser(req.user.id, {
        defaultStartTimeInAnalytics: fields.defaultStartTimeInAnalytics[0],
        imageURL: `uploads/${fileName}`,
      });

      res.send({ res: mapUser(user), error: null });
    });
  } catch (error) {
    res.send({ res: null, error: error.message });
  }
});

export default router;

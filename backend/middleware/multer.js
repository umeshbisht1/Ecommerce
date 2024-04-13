import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("umesh in multer");
        return cb(null, "./backend/uploads/temp");
      },
      filename: function (req, file, cb) {
        return cb(null, file.originalname);
      },
  });
  export const upload = multer({ storage: storage });
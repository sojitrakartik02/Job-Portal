import express from "express";

import { isAuth, isAuthorized } from "../middleware/auth.js";
import {
  postJob,
  getSingleJob,
  deletejob,
  getMyJob,
  getAllJob,
} from "../Controllers/jobController.js";

const router = express.Router();

router.post("/post", isAuth, isAuthorized("Employer"), postJob);
router.get("/getAllJob", getAllJob);
router.get("/getMyJob", isAuth, isAuthorized("Employer"), getMyJob);
router.delete("/delete/:id", isAuth, isAuthorized("Employer"), deletejob);
router.get("/get/:id", getSingleJob);

export default router;

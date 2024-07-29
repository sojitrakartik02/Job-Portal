import express from "express";
import { isAuth, isAuthorized } from "../middleware/auth.js";
import {
  deleteAppli,
  emploeyrGetAllAppli,
  jobSeekerGetAllAppli,
  postAppli,
} from "../Controllers/applicaController.js";

const router = express.Router();

router.post("/post/:id", isAuth, isAuthorized("Job Seeker"), postAppli);

router.get(
  "/employer/getAll",
  isAuth,
  isAuthorized("Employer"),
  emploeyrGetAllAppli
);
router.get(
  "/jobseeker/getAll",
  isAuth,
  isAuthorized("Job Seeker"),
  jobSeekerGetAllAppli
);

router.delete("/delete/:id", isAuth, deleteAppli);

export default router;

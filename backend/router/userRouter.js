import express from "express";
import {
  getUser,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
} from "../Controllers/userController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", isAuth, logout);

router.get("/getUser", isAuth, getUser);

router.put("/updateProfile", isAuth, updateProfile);

router.put("/updatePassword", isAuth, updatePassword);

export default router;

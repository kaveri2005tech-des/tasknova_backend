import { Router } from "express";
import {
  loginUser,
  forgotPassword,
  changePassword,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/forgotPassword", forgotPassword);

authRouter.post("/changePassword", changePassword);

export default authRouter;

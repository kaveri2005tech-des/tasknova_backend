import { Router } from "express";
import User from "../models/userModel.js";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default userRouter;

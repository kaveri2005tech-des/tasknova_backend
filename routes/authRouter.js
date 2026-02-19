import { Router } from "express";
import User from "../models/userModel.js";
import { sign } from "jsonwebtoken";

const authRouter = Router();

authRouter("/login", async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const currentUser = await User.findOne({ email });
    if (!(await compare(plainPassword, currentUser.password))) {
      throw Error("Bad Authentication");
    } else {
      // Token Signing
      const token = sign();
      res.status(200).json({ message: "User Authenticated", token });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default authRouter;

import { Router } from "express";
import { compare } from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const currentUser = await User.findOne({ email });
    if (!(await compare(plainPassword, currentUser.password))) {
      throw Error("Bad Authentication");
    } else {
      // Token Signing
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      res.status(200).json({ message: "User Authenticated", token });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default authRouter;

import express from "express";
import User from "./models/userModel.js";
import { compare } from "bcrypt";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const currentUser = await User.findOne({ email });
    if (!(await compare(plainPassword, currentUser.password))) {
      throw Error("Bad Authentication");
    } else {
      res.status(200).json({ message: "User Authenticated" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default app;

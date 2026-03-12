import { Router } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import otpGen from "otp-generator";
import { client } from "../app.js";
import { sendTestEmail } from "../controllers/mailController.js";

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

authRouter.post("/forgotPassword", async (req, res) => {
  try {
    //  1. Pick the User Email
    const { email } = req.body;
    const checkForUserInDb = await User.findOne({ email });
    if (checkForUserInDb) {
      // 2. Go On Creating an OTP
      const otp = otpGen.generate(8, { specialChars: false });
      // 3. Pair that using a KEY (email) and VERIFICATION CODE (verification code)
      await client.connect();
      await client.setEx(email, process.env.REDIS_EXPIRY, otp);
      await client.close();
      // 4. Throw a Email to the Users Email ID with the verification code
      await sendTestEmail(email, otp);
      res
        .status(200)
        .json({ message: "RESET PASSWORD VERIFICATION CODE HAS BEEN SENT" });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

authRouter.post("/changePassword", async (req, res) => {
  try {
    const { email, otpInput, newPassword, confirmNewPassword } = req.body;
    await client.connect();
    if ((await client.get(email)) == otpInput) {
      await client.close();
      if (newPassword == confirmNewPassword) {
        const currentUser = await User.findOne({ email });
        currentUser.password = newPassword;
        await currentUser.save();
        res.status(200).json({ message: "Password change is done" });
      } else {
        throw new Error("Confirm and Password didn't match");
      }
    } else {
      throw new Error("OTP invalid");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default authRouter;

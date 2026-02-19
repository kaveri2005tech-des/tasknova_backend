import express from "express";
import authenticateUser from "./controllers/authController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import testRouter from "./routes/testRouter.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use("/task", authenticateUser, async (req, res) => {
  res.status(200).json({ message: "You have access" });
});

export default app;

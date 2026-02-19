import express from "express";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

export default app;

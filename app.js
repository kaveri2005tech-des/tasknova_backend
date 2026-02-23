import express from "express";
import authenticateUser from "./controllers/authController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import groupRouter from "./routes/groupRoute.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/groups", authenticateUser, groupRouter);

export default app;

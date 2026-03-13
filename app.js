import express from "express";
import authenticateUser from "./controllers/authController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import groupRouter from "./routes/groupRoute.js";
import monoTaskRouter from "./routes/monoTaskRoute.js";
import { createClient } from "redis";
import cors from "cors";

export const client = createClient({ port: process.env.REDIS_PORT });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/groups", authenticateUser, groupRouter);
app.use("/monoTasks", authenticateUser, monoTaskRouter);

export default app;

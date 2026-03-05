import {
  createMonoTask,
  getAllMonoTasks,
} from "../controllers/monoTaskController.js";
import { Router } from "express";

const monoTaskRouter = Router();

monoTaskRouter.route("/monoTask").get(getAllMonoTasks).post(createMonoTask);

export default monoTaskRouter;

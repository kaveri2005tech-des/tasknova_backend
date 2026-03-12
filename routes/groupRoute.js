import { Router } from "express";
import { createGroup, getAllGroups } from "../controllers/groupController.js";

const groupRouter = Router();

groupRouter.route("/group").get(getAllGroups).post(createGroup);

export default groupRouter;

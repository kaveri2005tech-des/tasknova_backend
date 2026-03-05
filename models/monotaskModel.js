import { Schema, model } from "mongoose";
import { isUserValid } from "../controllers/utilController.js";

const schemaOptions = { _id: false };

const monoTaskSchema = new Schema({
  taskId: {
    type: String,
    unique: [true, "MONO TASK ID Already exist"],
  },
  taskOwner: {
    type: String,
    required: [true, "Mono Task Owner is mandatory"],
    validate: [isUserValid, "User not found in the User DB"],
  },
  taskTitle: {
    type: String,
    required: [true, "Task title is required"],
  },
  due: {
    type: Date,
    required: [true, "Due date is mandatory"],
  },
  assignee: {
    type: String,
    default: "Unassigned",
  },
  priority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"],
    default: "MEDIUM",
  },
  status: {
    type: String,
    enum: ["In Progress", "Pending", "Completed"],
  },
});

monoTaskSchema.pre("save", async function () {
  const nTask = (await this.constructor.countDocuments()) + 1;
  const extras = nTask < 10 ? "00" : nTask < 100 ? "0" : "";
  this.taskId = `TAS-${extras + nTask}`;
});

const MonoTask = model("MonoTask", monoTaskSchema);

export default MonoTask;

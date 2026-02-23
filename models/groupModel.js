import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  taskId: {
    type: String,
    unique: [true, "Task ID Already exist"],
  },
  title: {
    type: String,
    required: [true, "Task title is mandatory"],
  },
  taskDescription: {
    type: String,
    max: [120, "Task description exceeded 120 character limit"],
    required: [true, "Task description is mandatory"],
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

const workItemSchema = new Schema({
  workItemId: {
    type: String,
    unique: [true, "Work Item ID Already exist"],
  },
  admin: {
    type: String,
    required: [true, "Admin is needed for work item"],
  },
  task: {
    type: [taskSchema],
  },
});

const particpantsSchema = new Schema({
  admin: {
    type: [String],
    required: [true, "Atleast 1 admin is required"],
  },
  members: {
    type: [String],
    required: [true, "Atleast 1 member is required"],
  },
});

const groupSchema = new Schema({
  groupId: {
    type: String,
    unique: [true, "GROUP ID Already exist"],
  },
  participants: {
    type: particpantsSchema,
    required: [true, "Participant is required"],
  },
  workitems: {
    type: [workItemSchema],
    required: [true, "Atleast 1 workitem need to be created"],
  },
});

const GroupModel = model("Group", groupSchema);

export default GroupModel;

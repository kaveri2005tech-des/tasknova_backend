import MonoTask from "../models/monotaskModel.js";

export async function getAllMonoTasks(req, res) {
  try {
    const data = await MonoTask.find({ taskOwner: req.body.owner });
    res.status(200).json({ message: "All Mono Tasks are here", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function createMonoTask(req, res) {
  try {
    await MonoTask.create(req.body);
    res.status(201).json({ message: "Mono Task has been created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

import GroupModel from "../models/groupModel.js";

export async function getAllGroups(req, res) {
  try {
    const data = await GroupModel.find({ groupOwner: req.body.owner });
    res.status(200).json({ message: "All Groups data are here", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function createGroup(req, res) {
  try {
    await GroupModel.create(req.body);
    res.status(200).json({ message: "Group Created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

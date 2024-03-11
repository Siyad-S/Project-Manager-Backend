const asyncHandler = require("express-async-handler");
const shared = require("../models/sharedModel");
const { ObjectId } = require("mongodb");
const taskCollection = require("../models/taskModel");

//post
const postShared = asyncHandler(async (req, res) => {
  try {
    const { to, from, taskId, projectId } = req.body;
    console.log(req.body);
    if (!to || !from || !taskId || !projectId) {
      res.status(404).json({ message: "doesn't shared to user" });
    } else {
      const sharedData = await shared.create({
        to,
        from,
        taskId,
        projectId,
      });
      res.status(201).json({ message: "shared successfully", sharedData });
    }
  } catch (error) {
    console.log(error);
  }
});

//get
const getShared = asyncHandler(async (req, res) => {
  try {
    // const { userId } = req.params
    console.log("userId", req.params.userId);

    const sharedData = await shared.aggregate([
      { $match: { to: new ObjectId(req.params.userId) } },
      // {
      //   $lookup: {
      //     from: "task",
      //     localField: "taskId",
      //     foreignField: "_id",
      //     as: "tasksDetails",
      //   },
      // },
      // { $match: { } }
    ]);

    const taskIds = sharedData.map((task) => task.taskId);

    const taskData = await taskCollection.aggregate([
      { $match: { _id: { $in: taskIds} } },
    ]);

    console.log(taskData);

    res
      .status(200)
      .json({ message: "Shared data retrieved successfully", taskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//single get
const getSingleShared = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const sharedData = await shared.findById(id);
    res
      .status(201)
      .json({ message: "single shared gotten successfully", sharedData });

    if (!sharedData) {
      res.status(404).json({ message: "didn't get single shared" });
    }
  } catch (error) {
    console.log(error);
  }
});

//update
const updateShared = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const sharedData = await shared.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "shared updated successfully", sharedData });

    if (!sharedData) {
      res.status(404).json({ message: "shared couldn't update" });
    }
  } catch (error) {
    console.log(error);
  }
});

//delete
const deleteShared = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const sharedData = await shared.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "shared deleted successfully", sharedData });

    if (!sharedData) {
      res.status(404).json({ message: "shared couldn't delete" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  postShared,
  getSingleShared,
  getShared,
  updateShared,
  deleteShared,
};

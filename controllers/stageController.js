const asyncHandler = require("express-async-handler");
const status = require("../models/stagesModel");

//post
const postStatus = asyncHandler(async (req, res) => {
  try {
    const { stages, projectId } = req.body;
    console.log(req.body);
    if (
      !stages ||
      !Array.isArray(stages) ||
      stages.length === 0 ||
      !projectId
    ) {
      res.status(400).json({ message: "stages array is empty or invalid" });
    } else {
      const insertedStages = [];
      for (let stage of stages) {
        try {
          console.log(stage);
          const insertedStage = await status.create({
            stage: stage,
            projectId
          });
          insertedStages.push(insertedStage);
        } catch (err) {
          console.error("Error inserting stage:", err);
        }
      }
      res
        .status(201)
        .json({ message: "task posted successfully", insertedStages });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get
const getStatus = asyncHandler(async (req, res) => {
  try {
    const statusData = await status.find();
    res.status(201).json({ message: "task gotten successfully", statusData });

    if (!statusData) {
      res.status(404).json({ message: "all fields are mandatory" });
    }
  } catch (error) {
    console.log(error);
  }
});

//single get
const getSingleStatus = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const statusData = await status.findById(id);
    res.status(201).json({ message: "task gotten successfully", statusData });

    if (!statusData) {
      res.status(404).json({ message: "all fields are mandatory" });
    }
  } catch (error) {
    console.log(error);
  }
});

//update
const updateStatus = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    // const { stage } = req.body;
    const statusData = await status.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "status updated successfully", statusData });

    if (!statusData) {
      res.status(404).json({ message: "data couldn't update" });
    }
  } catch (error) {
    console.log(error);
  }
});

//delete
const deleteStatus = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const statusData = await status.findByIdAndDelete(id);
    res.status(201).json({ message: "task deleted successfully", statusData });

    if (!statusData) {
      res.status(404).json({ message: "data couldn't delete" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  postStatus,
  getSingleStatus,
  getStatus,
  updateStatus,
  deleteStatus,
};

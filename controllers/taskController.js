const asyncHandler = require("express-async-handler");
const tasks = require("../models/taskModel");

//post
const postTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;
    console.log(req.body);
    if (!title || !description || !status || !dueDate || !projectId) {
      res.status(404).json({ message: "all fields are mandatory" });
    } else {
      const taskData = await tasks.create({
        title,
        description,
        status,
        dueDate,
        projectId
      });
      res.status(201).json({ message: "task posted successfully", taskData });
    }
  } catch (error) {
    console.log(error);
  }
});

//get
const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasksData = await tasks.find();
    res.status(201).json({ message: "task gotten successfully", tasksData });

    if (!tasksData) {
      res.status(404).json({ message: "all fields are mandatory" });
    }
  } catch (error) {
    console.log(error);
  }
});

//single get
const getSingleTask = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
      const tasksData = await tasks.findById(id);
      res.status(201).json({ message: "task gotten successfully", tasksData });
  
      if (!tasksData) {
        res.status(404).json({ message: "all fields are mandatory" });
      }
    } catch (error) {
      console.log(error);
    }
  });

//update
const updateTask = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const id = req.params.id
      const tasksData = await tasks.findByIdAndUpdate(id, {...req.body}, {new:true});
      res.status(201).json({ message: "task updated successfully", tasksData });
  
      if (!tasksData) {
        res.status(404).json({ message: "data couldn't update" });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //status update
const updateTaskStatus = asyncHandler(async (req, res) => {
    try {
      const { status } = req.body
      console.log("status:", status);
      const tasksData = await tasks.findByIdAndUpdate(req.params.id, {status: status}, {new:true});
      console.log(tasksData);
      res.status(201).json({ message: "task staatus updated successfully", tasksData });
  
      if (!tasksData) {
        res.status(404).json({ message: "data couldn't update" });
      }
    } catch (error) {
      console.log(error);
    }
  });

  //delete
const deleteTask = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const id = req.params.id
      const tasksData = await tasks.findByIdAndDelete(id);
      res.status(201).json({ message: "task deleted successfully", tasksData });
  
      if (!tasksData) {
        res.status(404).json({ message: "data couldn't delete" });
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = {
  postTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  getSingleTask,
  deleteTask
};

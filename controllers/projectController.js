const asyncHandler = require("express-async-handler");
const project = require("../models/projectModel");
//post
const postProject = asyncHandler(async (req, res) => {
  try {
    const { title, type, userId } = req.body;
    console.log(req.body);
    if (!title || !type || !userId) {
      res.status(404).json({ message: "all fields are mandatory" });
    } else {
      const projectData = await project.create({
        title,
        type,
        userId
      });
      res
        .status(201)
        .json({ message: "project created successfully", projectData });
    }
  } catch (error) {
    console.log(error);
  }
});

//get
const getProject = asyncHandler(async (req, res) => {
  try {
    const projectData = await project.find();
    res
      .status(201)
      .json({ message: "projects gotten successfully", projectData });

    if (!projectData) {
      res.status(404).json({ message: "all fields are mandatory" });
    }
  } catch (error) {
    console.log(error);
  }
});

//single get
const getSingleProject = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const projectData = await project.findById(id);
    res
      .status(201)
      .json({ message: "project gotten successfully", projectData });

    if (!projectData) {
      res.status(404).json({ message: "all fields are mandatory" });
    }
  } catch (error) {
    console.log(error);
  }
});

//update
const updateProject = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const projectData = await project.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "project updated successfully", projectData });

    if (!projectData) {
      res.status(404).json({ message: "project couldn't update" });
    }
  } catch (error) {
    console.log(error);
  }
});

//delete
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const projectData = await project.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "project deleted successfully", projectData });

    if (!projectData) {
      res.status(404).json({ message: "project couldn't delete" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  postProject,
  getSingleProject,
  getProject,
  updateProject,
  deleteProject,
};

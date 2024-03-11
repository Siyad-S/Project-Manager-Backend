const express = require("express");
const router = express.Router();
const {
    postProject,
    getSingleProject,
    getProject,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");

router.route("/").post(postProject).get(getProject);
router.route("/:id").put(updateProject).get(getSingleProject).delete(deleteProject);

module.exports = router;
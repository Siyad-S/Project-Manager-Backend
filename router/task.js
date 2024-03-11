const express = require("express");
const router = express.Router();
const {
  postTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  getSingleTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").post(postTask).get(getTasks);
router.route("/:id").put(updateTask).get(getSingleTask).delete(deleteTask);
router.route("/status/:id").put(updateTaskStatus);

module.exports = router;

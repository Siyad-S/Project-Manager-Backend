const express = require("express");
const router = express.Router();
const {
    postStatus,
    getSingleStatus,
    getStatus,
    updateStatus,
    deleteStatus
} = require("../controllers/stageController");

router.route("/").post(postStatus).get(getStatus);
router.route("/:id").put(updateStatus).get(getSingleStatus).delete(deleteStatus);

module.exports = router;
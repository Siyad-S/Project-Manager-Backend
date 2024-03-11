const express = require("express");
const router = express.Router();
const {
    postShared,
    getSingleShared,
    getShared,
    updateShared,
    deleteShared,
} = require("../controllers/sharedController");

router.route("/").post(postShared);
router.route("/:id").put(updateShared).get(getSingleShared).delete(deleteShared);
router.route("/all/:userId").get(getShared);

module.exports = router;

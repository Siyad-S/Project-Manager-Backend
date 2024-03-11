const express = require("express");
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  postUserSignup,
  postUserLogin,
  userLogout,
  updateUser,
  deleteUser,
  // updateOwner,
} = require("../controllers/userAdminController");

router.route("/register").post(postUserSignup);
router.route("/login").post(postUserLogin);
router.route("/").get(getUsers);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);
// router.route("/owner/:id").put(updateOwner);
router.route("/logout").get(userLogout);

module.exports = router;

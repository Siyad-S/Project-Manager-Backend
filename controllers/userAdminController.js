const asyncHandler = require("express-async-handler");
const userAdmin = require("../models/userAdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//get users
const getUsers = asyncHandler(async (req, res) => {
  const usersData = await userAdmin.find();
  if (!usersData) {
    res.status(404).json({ message: "Error occured during getting users" });
  } else {
    res
      .status(200)
      .json({ message: "All users are gotten successfully", usersData });
  }
});

//get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const singleUser = await userAdmin.findById(req.params.id);
  if (!singleUser) {
    res.status(404).json({ message: "Error occured during single user get" });
  } else {
    res
      .status(200)
      .json({ message: "Single user gotten successfully", singleUser });
  }
});

//post user - signup
const postUserSignup = asyncHandler(async (req, res) => {
  try {
    console.log("request_body:", req.body);
    const { userName, email, phone, password, role, owner } = req.body;
    // check existing user with email
    const existingUser = await userAdmin.findOne({ email: email });

    if (!userName || !email || !phone || !password) {
      res.status(400).json({ message: "All fields are mandatory" });
    } else if (existingUser) {
      res.status(401).json({ message: "User already exists with this email" });
    } else {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userAdmin.create({
        userName,
        email,
        phone,
        password: hashedPassword,
        role: role ?? "user",
        owner,
      });

      res.status(201).json({ message: "User posted successfully", user });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

//post user - login
const postUserLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userAdmin.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    } else if (!user) {
      return res.status(401).json({ message: "User not found" });
    } else if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1h",
    });

    // Set cookie with token
    res.cookie("token", token, {
      maxAge: 3600000, // 1 hour in milliseconds
      httpOnly: false,
      withCredentials: true,
    });

    // Respond with success message and user ID
    res
      .status(200)
      .json({ message: "Logged in successfully", userId: user._id });
  } catch (err) {
    // Log and respond with error message
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//logout user
const userLogout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("token", { httpOnly: true })
    .json({ success: true, message: "Logout successful" });
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const userData = { ...req.body };
  const updateUserData = await userAdmin.findByIdAndUpdate(
    req.params.id,
    userData,
    { new: true }
  );
  if (!updateUserData) {
    res.status(404).json({ message: "Error occured during updation of user" });
  } else {
    res
      .status(202)
      .json({ message: "User updated successfully", updateUserData });
  }
});

//update owner status
// const updateOwner = asyncHandler(async (req, res) => {
//   const { owner } = req.body
//   const updateOwnerStatus = await userAdmin.findByIdAndUpdate(
//     req.params.id,
//     {owner: owner},
//     { new: true }
//   );
//   if (!updateOwnerStatus) {
//     res.status(404).json({ message: "Error occured during updation of user" });
//   } else {
//     res
//       .status(202)
//       .json({ message: "User updated successfully", updateOwnerStatus });
//   }
// });

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const deleteUserData = await userAdmin.findOneAndDelete(req.params.id);
  if (!deleteUserData) {
    res.status(404).json({ message: "Error occured during deletion of user" });
  } else {
    res
      .status(200)
      .json({ message: "User deleted successfully", deleteUserData });
  }
});

module.exports = {
  getUsers,
  getSingleUser,
  postUserSignup,
  postUserLogin,
  userLogout,
  updateUser,
  deleteUser,
  // updateOwner,
};

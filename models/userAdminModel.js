const mongoose = require("mongoose");

const userAdminSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // enum: ['admin', 'user'],
  },
  token: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("user-admin", userAdminSchema);

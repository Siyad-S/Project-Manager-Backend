const mongoose = require("mongoose");

const sharedSchema = mongoose.Schema({
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const sharedCollection = mongoose.model("shared-tasks", sharedSchema);
module.exports = sharedCollection;

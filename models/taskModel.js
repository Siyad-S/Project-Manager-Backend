const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    dueDate: {
        type: String
    },
    projectId: {
        type: String
    }
})

const taskCollection = mongoose.model("task", taskSchema)
module.exports = taskCollection
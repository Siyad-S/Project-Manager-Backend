const mongoose = require("mongoose")

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const projectCollection = mongoose.model("project", projectSchema)
module.exports = projectCollection
const mongoose = require("mongoose")

const stageSchema = mongoose.Schema({
    stage: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    }
})

const stageCollection = mongoose.model("stage", stageSchema)
module.exports = stageCollection
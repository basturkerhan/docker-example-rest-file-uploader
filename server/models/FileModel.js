const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    title: {
        required: true,
        max: 50,
        type: String,
        lowercase: true
    },
    fileUrl: {
        required: true,
        max: 255,
        type: String,
        lowercase: true
    },
    fileType: {
        required: true,
        max: 20,
        type: String,
        lowercase: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "user"
    },
})

module.exports = mongoose.model("files", fileSchema);


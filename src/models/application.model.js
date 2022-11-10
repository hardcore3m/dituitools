const mongoose = require("mongoose");

const opts = {
    toJSON: {
        virtuals: true
    },
    timestamps: true
};

const Application = mongoose.model("Application", new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "an application must to have an id"]
    },
    name: {
        type: String,
        required: [true, "an application must to have an name"]
    },
    description: {
        type: String,
        required: [true, "an application must to have a description"]
    },
    hyperlink: {
        type: String,
        required: [false]
    },
    versions: {
        type: [String],
        required: [false]

    },
    img: {
        type: String,
        required: [false]
    }
}, opts))



module.exports = Application;
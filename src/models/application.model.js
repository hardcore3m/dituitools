const mongoose = require("mongoose");

const root = 'http://localhost:3001/img/apps/';



const opts = {
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id;
            ret.img = `${root}${ret.img}`
            delete ret._id;
        }
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
        get: v => `${root}${v}`,
        required: [false]
    }
}, opts))





module.exports = Application;
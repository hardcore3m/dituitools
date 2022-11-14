const mongoose = require("mongoose");

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

const Bookmark = mongoose.model("Bookmark", new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "a category must to have an id"]
    },
    name: {
        type: String,
        required: [true, "a category must to have an name"]
    },
    description: {
        type: String,
        required: [true, "a category must to have a description"]
    },
    img: {
        type: String,
        required: [false]
    }
}, opts))



module.exports = BookmarkCategory;
const mongoose = require("mongoose");

const opts = {
    toJSON: {
        virtuals: true
    },
    timestamps: true
};

const Bookmark = mongoose.model("Bookmark", new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "a bookmark must to have an id"]
    },
    name: {
        type: String,
        required: [true, "a bookmark must to have an name"]
    },
    description: {
        type: String,
        required: [true, "a bookmark must to have a description"]
    },
    hyperlink: {
        type: String,
        required: [true, "a bookmark must to have a hypelink"]
    },
    category: {
        type: mongoose.Schema.Types.String,
        ref: 'BookmarkCategory',
        required: [true, "a bookmark must to have a hypelink"]
    },
    applications:[{
        type: mongoose.Schema.Types.String,
        ref: 'Application',
        required: [true, "a bookmark must to have a hypelink"]
    }]
}, opts))



module.exports = BookmarkCategory;
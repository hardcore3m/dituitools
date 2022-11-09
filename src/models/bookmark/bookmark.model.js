const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const Bookmark = mongoose.model("Bookmark", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a bookmark must to have a name"]
    },
    description: {
        type: String,
        required: [true, "a bookmark must to have a link"]
    },
    hyperlink: {
        type: String,
        required: [true, "a bookmark must to have a link"]
    },
    categoryId: {
        type: String,
        required: [true, "a bookmark must to have a category"]
    },
    typeId: {
        type: String,
        required: [true, "a bookmark must to have a type"]
    }
},opts))



module.exports = Bookmark;
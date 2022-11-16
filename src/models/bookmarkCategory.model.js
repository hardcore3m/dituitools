const mongoose = require("mongoose");

const root = 'http://localhost:3001/img/categories/';

const opts = {
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id;
            ret.img = `${root}${ret._id}.${ret.img}`
            delete ret._id;
        }
    },
    timestamps: true
};

const BookmarkCategory = mongoose.model("BookmarkCategory", new mongoose.Schema({
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
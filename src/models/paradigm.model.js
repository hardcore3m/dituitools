const mongoose = require("mongoose");

const opts = {
    toJSON: {
        virtuals: true
    },
    timestamps: true
};

const Paradigm = mongoose.model("Paradigm", new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "a paradigm must to have an id"]
    },
    name: {
        type: String,
        required: [true, "a paradigm must to have an name"]
    },
    description: {
        type: String,
        required: [true, "a bookmark must to have a description"]
    },
    type: {
        type: String,
        enum: ['Imperativo','Declarativo','Relativo']
    },
    img: {
        type: String,
        required: [false]
    }
}, opts))



module.exports = Paradigm;
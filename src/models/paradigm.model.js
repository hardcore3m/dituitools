const mongoose = require("mongoose");

const root = 'http://localhost:3001/img/paradigms/';

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

const Paradigm = mongoose.model("Paradigm", new mongoose.Schema({
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
        enum: ['Imperativo', 'Declarativo', 'Relativo']
    },
    img: {
        type: String,
        required: [false]
    }
}, opts))



module.exports = Paradigm;
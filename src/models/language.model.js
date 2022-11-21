const mongoose = require("mongoose");

const root = 'http://localhost:3001/img/language/';



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

const Language = mongoose.model("Language", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a language must to have an name"]
    },
    launchYear: {
        type: Number,
        required: [false]
    },
    documentation: {
        type: String,
        required: [false]
    },
    paradigm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paradigm',
        required: [true, "a language must to have a paradigm"]
    },
    versions: {
        type: [String]
    },
    install: {
        type: [String]
    },
    img: {
        type: String,
        get: v => `${root}${v}`,
        required: [false]
    }
}, opts))





module.exports = Language;
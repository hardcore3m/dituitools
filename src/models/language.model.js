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

const Languange = mongoose.model("Languange", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a languange must to have an name"]
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
        ref: 'paradigm',
        required: [true, "a languange must to have a paradigm"]
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





module.exports = Languange;
const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const Language = mongoose.model("Language", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a programming language must to have a name"]
    },
    versions: [{
        type: String,
        required: [true, "a programming language must to at least a version"]
    }],
    typeID: {
        type: String,
        required: [true, "Select a type Id"]
    },
    paradigm: {
        type: String,
        required: [true, "Select a paradigm"],
        enum: ['procedural', 'blocks', 'oop', 'distributed', 'funtional', 'logic']

    },
    documentation: {
        type: String
    },
    img:{
        type:String
    }
},opts))



module.exports = Language;
const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const Code = mongoose.model("Code", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a code must to have a title"]
    },
    description: {
        type: String,
        required: [true, "a code must to have a title description"]
    },
    environmentId: {
        type: String,
        required: [true, "a code must to have a category"]
    },
    script: {
        type: String,
        required: [true, "a code must to have a script"]
    },
    html: {
        type: String
    },
    style: {
        type: String
    },
    reference: {
        type: String
    },
    tags:{
        type:String
    }

},opts))



module.exports = Code;
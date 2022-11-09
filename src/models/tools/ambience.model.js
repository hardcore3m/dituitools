const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const Ambience = mongoose.model("Ambience", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a ambience must to have a name"]
    },
    documentation: {
        type: String
    },
    img:{
        type:String
    }
},opts))



module.exports = Ambience;
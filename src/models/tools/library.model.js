const {
    ObjectId
} = require("mongodb");
const mongoose = require("mongoose");
const Language = require("./language.model");

const opts = {
    toJSON: {
        virtuals: true,getters:true
    }
};

const Library = mongoose.model("Package", new mongoose.Schema({
    name: {
        type: String,
        required: [true, "a packaege language must to have a name"]
    },
    language: {
        type: ObjectId,
        get:x=>GetLanguageById(x),
        required: [true, "a package language must have a language"]
    },
    versions: [{
        type: String,
        required: [true, "a programming language must to at least a version"]
    }],
    description: {
        type: String
    },
    documentation: {
        type: String
    },
    img: {
        type: String
    }
}, opts))

async function GetLanguageById(id) {
    try {
        let language = Language.findById(id).then(data=>data)
        console.log(language);
        return language
    } catch (error) {
        return error    
    }
     
}



module.exports = Library;
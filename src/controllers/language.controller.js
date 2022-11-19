var formidable = require('formidable');
const db = require("../models");
const fs = require('fs')

const {
    language: Language,

} = db;

exports.list = async (req, res) => {
    try {
        Language.find().populate().then((data) => {

            res.status(200).send(data)
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.create = async (req, res) => {

    const form = new formidable.IncomingForm();
    form.multiples = false;
    form.maxFileSize = 5 * 1024 * 1024; // 5MB
    form.uploadDir = './public/img/languages'

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log("Error parsing the file");
            return res.status(400).json({
                status: "Fail",
                message: "There was an error parsing the files",
                error: err,
            });
        }
        const imgType = files.myFile.mimetype.split("/").pop();
        
        new Language({
            
            name: fields.name,
            launchYear: fields.launchYear,
            paradigm:fields.paradigm,
            documentation: fields.documentation,
            versions:fields.versions,
            install: fields.install,
            img: imgType
        })
        .save((err, data) => {
            
            const filename = `${data._id}.${imgType}`
                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }

                var oldpath = files.myFile.filepath;
                var newpath = './public/img/languages/' + filename;

                fs.rename(oldpath, newpath, function (err) {
                    if (err) res.status(400).send(err)
                    res.status(201).json(data)
                });

            });
    });

}

exports.read = (req, res) => {
    var id = req.params.id
    try {
        Language.findOne({
            _id: id
        }).populate().then((data) => {

            res.status(200).send(data)
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.update = async (req, res) => {
    let id = req.params.id
    try {
        Language.findByIdAndUpdate({
            id
        }, {
            name: fields.name,
            launchYear: fields.launchYear,
            paradigm:fields.paradigm,
            documentation: fields.documentation,
            versions:fields.versions,
            install: fields.install
        }).save((err, data) => {
            if (err) {
                res.status(400).send(err)
            }
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).send(error.message)

    }
}
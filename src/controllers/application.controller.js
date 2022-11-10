var formidable = require('formidable');
const db = require("../models");
const fs = require('fs')

const {
    application: Application,

} = db;

exports.list = async (req, res) => {
    try {
        Application.find().then((data) => {

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
    form.uploadDir = './public/img/apps'

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log("Error parsing the file");
            return res.status(400).json({
                status: "Fail",
                message: "There was an error parsing the files",
                error: err,
            });
        }
        const type = files.myFile.mimetype.split("/").pop();
        const filename = `${fields.id}.${type}`

        new Application({
                _id: fields.id,
                name: fields.name,
                description: fields.description,
                hyperlink: fields.hyperlink,
                versions: fields.versions,
                img:filename
            })
            .save((err, data) => {

                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }

                var oldpath = files.myFile.filepath;
                var newpath = './public/img/apps/' + filename;

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
        Application.findOne({_id:id}).then((data) => {

            res.status(200).send(data)
        })
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.update = async (req, res) => {
        let id =req.params.id
    try {
        Application.findByIdAndUpdate({id},{name: req.body.name,
            description: req.body.description,
            hyperlink: req.body.hyperlink,
            versions: req.body.versions,}).save((err,data)=>{
                if (err) {
                    res.status(400).send(err)
                }
                res.status(200).json(data)
            })
    } catch (error) {
        res.status(400).send(error.message)

    }
}
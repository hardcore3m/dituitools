var formidable = require('formidable');
const db = require("../models");
const fs = require('fs')

const {
    paradigm: Paradigm,

} = db;

exports.list = async (req, res) => {
    try {
        Paradigm.find().then((data) => {

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
    form.uploadDir = './public/img/paradigms'

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

        new Paradigm({
                _id: fields.id,
                name: fields.name,
                description: fields.description,
                type: fields.type,
                img: filename
            })
            .save((err, data) => {

                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }

                var oldpath = files.myFile.filepath;
                var newpath = './public/img/paradigms/' + filename;

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
        Paradigm.findOne({
            _id: id
        }).then((data) => {

            res.status(200).send(data)
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.update = async (req, res) => {
    let id = req.params.id
    try {
        Paradigm.findByIdAndUpdate({
            id
        }, {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type
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
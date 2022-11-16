var formidable = require('formidable');
const db = require("../models");
const fs = require('fs')

const {
    bookmarkCategory: BookmarkCategory,

} = db;

exports.list = async (req, res) => {
    try {
        BookmarkCategory.find().then((data) => {

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
    form.uploadDir = './public/img/categories'

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log("Error parsing the file");
            return res.status(400).json({
                status: "Fail",
                message: "There was an error parsing the files",
                error: err,
            });
        }
        const imgExtension = files.myFile.mimetype.split("/").pop();
        
        new BookmarkCategory({
            _id: fields.id,
            name: fields.name,
            description: fields.description,
            img: imgExtension
        })
        
        .save((err, data) => {
            const filename = `${data._id}.${imgExtension}`
            
                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }

                var oldpath = files.myFile.filepath;
                var newpath = './public/img/categories/' + filename;

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
        BookmarkCategory.findOne({
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
        BookmarkCategory.findByIdAndUpdate({
            id
        }, {
            name: req.body.name,
            description: req.body.description
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
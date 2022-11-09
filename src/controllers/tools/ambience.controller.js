var formidable = require('formidable');
const db = require("../../models");
const fs = require('fs')

const {
    ambience: Ambience,

} = db;

exports.list = async (req, res) => {
    try {
        Ambience.find().then((data) => {

            let ambiences = data.map((el) => {

                return {
                    id: el._id,
                    name: el.name,
                    documentation: el.documentation,
                    img: `http://localhost:3001/img/${el.img}`
                }
            })

            res.status(200).send(ambiences)
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.create = async (req, res) => {
    const form = new formidable.IncomingForm();

    form.multiples = false;
    form.maxFileSize = 5 * 1024 * 1024; // 5MB
    form.uploadDir = './public/img/'



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
        const filename = `${filterString(fields.name)}.${type}`




        new Ambience({
                name: fields.name,
                documentation: fields.documentation,
                img: filename
            })
            .save((err, data) => {

                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }

                var oldpath = files.myFile.filepath;
                var newpath = './public/img/' + filename;

                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    res.status(201).json(data)
                });

            });
    });
}

exports.read = (req, res) => {
    var id = req.params.id
    try {

        res.status(501).send(`Read Object not implemented yet \n ID informado: ${id}`)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.update = (req, res) => {
    var id = req.params.id
    try {

        res.status(501).send(`Read Object not implemented yet \n ID informado: ${id}`)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.delete = (req, res) => {
    var id = req.params.id
    try {

        res.status(501).send(`Read Object not implemented yet \n ID informado: ${id}`)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.view = async (req, res) => {
    try {
        return res.render("types", {
            path: 'environment',
            title: 'Ambiente'
        });

    } catch (err) {
        return res.redirect("/")
    }
}

function filterString(name) {
    let noAccentString = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    if (noAccentString.length > 12 && noAccentString.includes(" ")) {
        words = noAccentString.split(" ")
        var intermediaryString = ""
        for (let i = 0; i < words.length; i++) {
            const element = words[i];
            if (i == words.length - 1) {
                intermediaryString += element
            } else {
                intermediaryString += element.slice(0, 1)
            }
        }

    } else {
        var intermediaryString = noAccentString;
    }
    let parsed = intermediaryString.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toLowerCase();
    let substring = parsed.substring(0, 11)
    return substring;
}

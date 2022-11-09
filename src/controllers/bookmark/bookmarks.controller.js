var formidable = require('formidable');
const db = require("../../models");
const fs = require('fs')

const {
    bookmark: Bookmark,

} = db;

exports.list = async (req, res) => {
    try {
        Bookmark.find().then((data) => {

            res.status(200).send(data)
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.create = async (req, res) => {
    
    let bookmark = new Bookmark({
        name: req.body.name,
        description: req.body.description,
        hyperlink: req.body.hyperlink,
        categoryId: req.body.categoryId,
        typeId: req.body.typeId
    })

    bookmark.save()
        .then(doc => {
            res.status(201).json(doc)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
}

exports.read = (req, res) => {
    var id = req.params.id
    try {

        res.status(501).send(`Read Object not implemented yet \n ID informado: ${id}`)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
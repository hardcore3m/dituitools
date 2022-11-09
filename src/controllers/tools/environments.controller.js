var formidable = require('formidable');
const db = require("../../models");
const fs = require('fs')

const {
    ambience: Ambience,
    language:Language,
    library:Library

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
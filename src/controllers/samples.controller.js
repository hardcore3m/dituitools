const db = require("../models");
const fs = require('fs')

const {
    paradigm: Paradigm,

} = db;

exports.list = (req, res) => {
    try {

        res.status(200).send('Not implemented Yet')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.create = (req, res) => {
    try {

        res.status(201).send(req.body)
        console.log("Chegou");
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.read = (req,res)=>{

    try {

        res.status(201).send(req.body)
        console.log("Chegou");
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.preview = (req, res) => {
    try {
        const sample = {
            "name": "Javascript",
            "description": "Teste de Rota",
            "html": "<h1>Testando o preview das samples</h1>",
            "script": "console.log(\"Script working\")",
            "style": "body {background-color: lightblue;}",
            "languages": ["Javascript","Html","Css"],
            "apps": "",
            "library": "",
            "ambiences": ""
        }

        const render = `
        <h1>${sample.name}</h1>
        <p>${sample.description}</p>
        <hr>
        <div id="sample-html">
            <samp>
                ${sample.html}
            </samp>
        </div>
        <div id="sample-script"><code>${sample.script}</code></div>
        <div id="sample-style"><code>${sample.style}</code></div>
        <div id="sample-preview"><style>${sample.style}</style></div>
        `        

        res.status(200).send(render)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.update = (req, res) => {
    try {

        res.status(501).send('Not implemented Yet')
    } catch (error) {
        res.status(400).send(error.message)
    }
}
exports.delete = (req, res) => {
    try {

        res.status(501).send('Not implemented Yet')
    } catch (error) {
        res.status(400).send(error.message)
    }
}
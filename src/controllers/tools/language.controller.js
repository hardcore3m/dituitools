var formidable = require('formidable');
const db = require("../../models");
const fs = require('fs')

const {
    language: Language,

} = db;

exports.list = async (req, res) => {
    try {
        Language.find().then((data) => {

            let languages = data.map((el) => {
                let paradigm = ViewParadigm(el.paradigm)
                let type = ViewLanguageType(el.typeID)
                return {
                    id:el._id,
                    name: el.name,
                    paradigm: paradigm,
                    type: type,
                    versions: el.versions,
                    documentation: el.documentation,
                    img: `http://localhost:3001/img/${el.img}`
                }
            })

            res.status(200).send(languages)
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




        new Language({
                name: fields.name,
                paradigm: fields.paradigm,
                typeID: fields.typeId,
                versions: fields.versions.split(","),
                documentation: fields.documentation,
                img: filename
            })
            .save((err, data) => {

                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }


                console.log(`"added ${data.name} to environment collection"`);



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
const paradigms = [{
    id: "procedural",
    nome: "Procedural",
    tipo: "Imperativo",
    description: "Neste paradigma,os programas são executados através de chamadas sucessivas a procedimentos separados."
}, {
    id: "blocks",
    nome: "Estruturas de blocos",
    tipo: "Imperativo",
    description: "A característica marcante deste paradigma são os escopos aninhados."
}, {
    id: "oop",
    nome: "Orientado a objetos",
    tipo: "Imperativo",
    description: "Este paradigma descreve linguagens que suportam a interação entre objetos."
}, {
    id: "distributed",
    nome: "Computação Distribuida",
    tipo: "Imperativo",
    description: "Este paradigma suporta que mais de uma rotina possa executar independentemente."
}, {
    id: "functional",
    nome: "Funcional",
    tipo: "Declarativo",
    description: "Linguagens deste paradigma não incluem qualquer provisão para atribuição ou dados mutáveis.Na programação funcional, o mapeamento entre os valores de entrada e saída são alcançados mais diretamente.Um programa é uma função(ou grupo de funções), tipicamente constituída de outras funções mais simples."
}, {
    id: "logic",
    nome: "Programação Lógica",
    tipo: "Declarativo",
    description: "Este paradigma se baseia na noção de que um programa implementa uma relação ao invés de um mapeamento."
}]

const categories = {languages:{paradigms:paradigms}}

exports.categories = (req, res) => {

    res.status(200).json(categories)
}


function ViewParadigm(paradigm) {
    switch (paradigm) {
        case 'oop':
            return {
                name: "Orientado a objetos", type: "Imperativo", description: "Neste paradigma, os programas são executados através de chamadas sucessivas a procedimentos separados."
            }
            break;

        default:
            break;
    }
}

function ViewLanguageType(type) {
    switch (type) {
        case 'paas':
        case 'PAAS':
            return {
                name: "Plataforma como serviço", description: "Neste paradigma, os programas são executados através de chamadas sucessivas a procedimentos separados."
            }

            break;

        case 'SGBD':
        case 'sgbd':
            return {
                name: "Banco de dados", description: "Sistema de software responsável pelo gerenciamento de um ou mais bancos de dados."
            }
            break;

        case 'PL':
        case 'pl':
            return {
                name: "Linguagem de programação", description: "Método padronizado, formado por um conjunto de regras sintáticas e semânticas, de implementação de um código fonte que pode ser compilado e transformado em um programa de computador, ou usado como script interpretado, que informará instruções de processamento ao computador."
            }
            break;

        default:
            return {
                name: "Outros", description: "Linguagens não tipificadas"
            }
            break;
    }
}
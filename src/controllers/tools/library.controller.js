var formidable = require('formidable');
const db = require("../../models");
const fs = require('fs');


const {
    library: Library,
    language: Language,

} = db;

// exports.list = (req, res) => {
//     try {
//         Library.find().then(async (data) => {

//             let mapLibraries = data.map(async (el) => {

//                 let library = await GetLanguageById(el.language)
//                     .then((lang) => {

//                         let libraryObj = {
//                             id: el._id,
//                             name: el.name,
//                             versions: el.versions,
//                             language: lang,
//                             description: el.description,
//                             documentation: el.documentation,
//                             img: `http://localhost:3001/img/${el.img}`
//                         }
//                         return libraryObj
//                     })

//                 console.log("Language do list: ", library);

//                 return library
//             })

//             const libraries = await mapLibraries

//             res.status(200).send(libraries)
//         })

//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

exports.list = async (req, res) => {
    try {
        Library.find({}).then(
            (libraries)=>{
                res.status(200).json(libraries)
            }
        )
        
        

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

        new Library({
                name: fields.name,
                versions: fields.versions.split(","),
                language: fields.language,
                description: fields.description,
                documentation: fields.documentation,
                img: filename
            })
            .save((err, data) => {

                if (err) {
                    console.log("error", err);
                    res.status(400).send("Error!")
                }

                console.log(`"added ${data.name} to package collection"`);

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

// function GetLanguageById(id) {
//     console.log("ID DA FUNÇÂO: ",id);
//     var language = Language
//         .findById(id)
//         // .exec(function (err, data) {
//         //     if (err) return console.log(err);
//         //     console.log("DATA DO EXEC: ",data.id);
//         //     return data.id
//         // });
//         .then(data=>data);
// console.log("VAriável language: ", language);
//     return language;
// }

// async function GetLanguageById(id) {
//     let language = Language.findById(id)
//     return language
// }

// async function GetLibrary(obj) {
//     let language = await GetLanguageById(obj.language)

//         let library = {
//             id: obj._id,
//             name: obj.name,
//             versions: obj.versions,
//             language: language,
//             description: obj.description,
//             documentation: obj.documentation,
//             img: `http://localhost:3001/img/${obj.img}`
//         }
//         console.log("library name: ",library.name,"language: ", language.name,"Library Obj",library);
//         return library
// }

// async function SetLibraries() {
//     let librariesFromDb = await Library.find({})

//     let libraries = librariesFromDb.map(async (obj) => {
//         let language = await GetLanguageById(obj.language)
//         console.log("Language: ",language);
//         let library = {
//             id: obj.id,
//             name: obj.name,
//             versions: obj.versions,
//             language: language,
//             description: obj.description,
//             documentation: obj.documentation,
//             img: `http://localhost:3001/img/${obj.img}`
//         }
//         console.log("library name: ",library.name,"language: ", library.language,"Library Obj",library);
//         return library
//     })

//     console.log("LIBRARIES",libraries);

//     return libraries
// }
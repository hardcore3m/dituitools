var express = require('express');
var router = express.Router();


router.get('/',(req,res)=>{
    res.send(`<h1>Code Mecum</h1>
    <p>Gerenciador de ferramentas de desenvolvimento</p>`)
})


module.exports = router;
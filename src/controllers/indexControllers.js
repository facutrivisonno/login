const fs = require("fs");
const path = require("path");
const usuariosJsonPath = path.join(__dirname, "../db/usuarios.json");

const indexController = {
    index: (req,res) =>{
        
    let usuariosJson = fs.readFileSync(usuariosJsonPath, {encoding: "utf-8"});
    
    let usuarios = JSON.parse(usuariosJson);

    res.render("index", {usuarios})
    
}

}

module.exports = indexController;
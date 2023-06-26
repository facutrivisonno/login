const fs = require("fs");

const path = require('path');
const usersFilePath = path.join(__dirname, '../db/usuarios.json');

const {validationResult} = require("express-validator");

const usersController = {
    login: (req,res) =>{
        res.render("login")
    },
    register: (req,res) =>{
        res.render("register")
    },
    create: (req,res) =>{
       let usuario = {
            nombre: req.body.nombreUsuario,
            id: req.body.dnilUsuario,
            email: req.body.emailUsuario,
            password: req.body.passwordUsuario,
            avatar: req.file && req.file.filename ? req.file.filename : "default-image.png"
        }
        
        let errors = validationResult(req);
       
        if (errors.isEmpty()){
            let archivoUsuario = fs.readFileSync(usersFilePath, {encoding: "utf-8"});
            let usuarios;
    
            if(archivoUsuario == ""){
                usuarios = [];
            } else{
                usuarios = JSON.parse(archivoUsuario); //descomprimo el archivo en un obj literal
            }
    
            usuarios.push(usuario); 
    
            usuarioJSON = JSON.stringify(usuarios); //convi erte en json el objeto literal usuario para poder agg al archivo json
            
            fs.writeFileSync(usersFilePath, usuarioJSON);
        
            res.redirect("/"); 
        }  else{
            
            res.render("register", { errors: errors.array()});  //envia los errores a la vista como un objeto 
        }
    } 
}



module.exports = usersController;
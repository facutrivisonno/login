const fs = require("fs");

const path = require('path');
const usersFilePath = path.join(__dirname, '../db/usuarios.json');

const bcrypt = require("bcryptjs");

const {validationResult} = require("express-validator");

const usersController = {
    login: (req,res) =>{
        res.render("login")
    },
    
    processLogin: (req,res) =>{
        
        let usuarioJSON = fs.readFileSync(usersFilePath, {encoding: "utf-8"})
        let usuarios;
    
            if(usuarioJSON == ""){
                usuarios = [];
            } else{
                usuarios = JSON.parse(usuarioJSON); //descomprimo el archivo en un obj literal
            }

            let usuarioALoguearse;
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email == req.body.emailUsuario){
                        if (bcrypt.compareSync(req.body.passwordUsuario, usuarios[i].password)){
                            usuarioALoguearse = usuarios[i];
                            break;
                        }
                }    
            }

        if (usuarioALoguearse == undefined){
                return res.render("login", {errors: [
                    {msg: "Credenciales invalidas"}
                ]})
        }
          
        delete usuarioALoguearse.password //elimina la propiedad password
        req.session.usuarioLogueado = usuarioALoguearse

        res.redirect("/users/profile");

    },
    register: (req,res) =>{
        res.render("register")
    },

    create: (req,res) =>{
       
        let usuarios = JSON.parse(fs.readFileSync(usersFilePath, {encoding: "utf-8"}))
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == req.body.emailUsuario){
                return res.render("register", {errors: [
                    {msg: "Ya existe usuario con ese email"}
                ]})
            }    
        }

       
        let usuario = {
            nombre: req.body.nombreUsuario,
            id: req.body.dniUsuario,
            email: req.body.emailUsuario,
            password: bcrypt.hashSync(req.body.passwordUsuario, 10),  //se guarda la contraseña encriptada  
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
    },
    profile: (req,res) =>{
        console.log(req.session);
        res.render("profile", {
            user: req.session.usuarioLogueado
        })
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.redirect("/");
    }
}



module.exports = usersController;
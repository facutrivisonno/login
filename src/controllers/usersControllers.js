const fs = require("fs");

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
            password: req.body.passwordUsuario
        }
    
        let usuarioJSON = JSON.stringify(usuario); //convierte en json el objeto literal usuario
        
        fs.appendFileSync("usuarios.json", usuarioJSON);
    }
}



module.exports = usersController;
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
        
        let archivoUsuario = fs.readFileSync("usuarios.json", {encoding: "utf-8"});
        let usuarios;

        if(archivoUsuario == ""){
            usuarios = [];
        } else{
            usuarios = JSON.parse(archivoUsuario); //descomprimo el archivo en un obj literal
        }


       usuarios.push(usuario); 

        usuarioJSON = JSON.stringify(usuarios); //convi erte en json el objeto literal usuario para poder agg al archivo json
        
        fs.writeFileSync("usuarios.json", usuarioJSON);
    
        res.redirect("/"); 
    }

}



module.exports = usersController;
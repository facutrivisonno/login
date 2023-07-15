const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexControllers");

router.get("/", indexController.index);

router.get("/pruebaSession", (req,res) => {
    if (req.session.usuarioLogueado == undefined){
        res.send("Bienvenido usuario invitado a mi aplicación!")
        
    } else { 
        res.send("Bienvenido "+ req.session.usuarioLogueado.avatar)
    }  
    }
);


module.exports = router;

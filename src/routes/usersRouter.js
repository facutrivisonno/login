const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const usersController = require("../controllers/usersControllers");

const {body} = require("express-validator");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname, "../../public/img") )
    },
    filename: (req, file , cb) => {
        console.log(file);
        const newFilename = "user-" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    } 
});

const upload = multer({storage});


//validaciones formulario de registro

const validaciones = [
    body("nombreUsuario").notEmpty().withMessage("Debes completar el campo nombre"),
    body("dnilUsuario").notEmpty().withMessage("Debes completar el campo DNI"),
    body("emailUsuario")
        .isEmail().withMessage("Debes completar un email válido")
        .notEmpty().withMessage("Debes completar el campo email"),
    body("passwordUsuario")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener un mínimo de 8 caracteres")
        .notEmpty().withMessage("Debes completar el campo contraseña")
];
    

router.get("/register", usersController.register);
router.post("/register", upload.single("avatar"), validaciones ,usersController.create);

router.get("/login", usersController.login);

module.exports = router;
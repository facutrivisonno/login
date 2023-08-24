const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const usersController = require("../controllers/usersControllers");

const guestMiddleware = require("../middleware/guestMiddleware");

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

// funcion que verifica que sean solo numeros
const esNumero = (value) => {
    return /^[0-9]+$/.test(value);
};


//validaciones formulario de registro

const validaciones = [
    body("nombreUsuario")
        .notEmpty()
        .withMessage("Debes completar el campo nombre"),
    body("dniUsuario")
        .notEmpty()
        .withMessage("Debes completar el campo DNI"),

    body("emailUsuario")
        .isEmail().withMessage("Debes completar un email válido")
        .notEmpty().withMessage("Debes completar el campo email"),
    body("passwordUsuario")
        .notEmpty()
        .withMessage('Ingrese su contraseña')
        .bail()  // Esta función indica que si una validación falla, el proceso de validación debe detenerse y no se deben realizar más validaciones en el mismo campo
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage('Su contraseña debe tener al menos una letra mayúscula, una minúscula, un número y al menos 8 caracteres. No debe incluir un caracter especial.')
];
    

router.get("/register",guestMiddleware, usersController.register);
router.post("/register", upload.single("avatar"), validaciones ,usersController.create);

router.get("/login", usersController.login);
router.post("/login", usersController.processLogin)

router.get("/admin", usersController.admin);

router.get("/detail/:id", usersController.detail);

router.get("/edit/:id", usersController.edit);
router.put("/edit/:id",upload.single("avatar"), validaciones , usersController.processEdit);

router.delete("/delete/:id", usersController.delete);

router.get("/profile", usersController.profile);

router.get("/logout", usersController.logout);

module.exports = router;
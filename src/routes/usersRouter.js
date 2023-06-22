const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


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


const usersController = require("../controllers/usersControllers");

router.get("/login", usersController.login);


router.get("/register", usersController.register);
router.post("/register", upload.single("avatar") ,usersController.create);

module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");

const usersController = require("../controllers/usersControllers");

router.get("/login", usersController.login);


router.get("/register", usersController.register);
router.post("/register", usersController.create);

module.exports = router;
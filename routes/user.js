const express = require("express")
const router = express.Router();
const userCtrl = require("../controllers/user")

//Route d'inscription
router.post("/signup", userCtrl.signup)

//Route de login
router.post("/login", userCtrl.login)

module.exports = router
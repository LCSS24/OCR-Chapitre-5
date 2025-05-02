const express = require("express");
const auth = require("../middlewares/auth")
const stuffCtrl = require("../controllers/stuff")
const router = express.Router();
const multer = require("../middlewares/multer-config")

//Renvoie un tableau de tous les livres de la base de données
router.get("/", stuffCtrl.getAllBooks)

//Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne
router.get("/bestrating", stuffCtrl.bestRating)

//Renvoi le livre avec l'_id fourni
router.get("/:id", stuffCtrl.getOneBook)

// Capture et enregistre l'image, analyse le livretransformé en chaîne de caractères, et l'enregistre dans la base
// de données en définissant correctement son ImageUrl.
router.post("/", auth, multer, stuffCtrl.createBook)

// Définit la note pour le user ID fourni
router.post("/:id/rating", auth, stuffCtrl.rateBook)

//Met a jour le livre avec l'_id fourni
router.put("/:id", auth, multer, stuffCtrl.modifyBook)

//Supprime le livre avec l'_id fourni
router.delete("/:id", auth, stuffCtrl.deleteBook)

module.exports = router;
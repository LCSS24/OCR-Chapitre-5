const express = require("express");
const auth = require("../middlewares/auth");
const BookCtrl = require("../controllers/book");
const router = express.Router();
const multer = require("../middlewares/multer-config");

//Renvoie un tableau de tous les livres de la base de données
router.get("/", BookCtrl.getAllBooks);

//Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne
router.get("/bestrating", BookCtrl.bestRating);

//Renvoi le livre avec l'_id fourni
router.get("/:id", BookCtrl.getOneBook);

// Capture et enregistre l'image, analyse le livretransformé en chaîne de caractères, et l'enregistre dans la base
// de données en définissant correctement son ImageUrl.
router.post("/", auth, multer, BookCtrl.createBook);

// Définit la note pour le user ID fourni
router.post("/:id/rating", auth, BookCtrl.rateBook);

//Met a jour le livre avec l'_id fourni
router.put("/:id", auth, multer, BookCtrl.modifyBook);

//Supprime le livre avec l'_id fourni
router.delete("/:id", auth, BookCtrl.deleteBook);

module.exports = router;

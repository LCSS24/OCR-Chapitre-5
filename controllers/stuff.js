const Book = require("../models/Book")

exports.createBook = (req, res, next) => {
    res.status(201).json({ message: "Livre créé" })
}

exports.modifyBook = (req, res, next) => {
    res.status(999).json({ message: "Livre mis à jour" })
}

exports.deleteBook = (req, res, next) => {
    res.status(999).json({ message: "Livre supprimé" })
}

exports.rateBook = (req, res, next) => {
    res.status(999).json({ message: "Note définie" })
}

exports.bestRating = (req, res, next) => {
    res.status(999).json({ message: "Tableau des 3 meilleurs livres" })
}

exports.getOneBook = (req, res, next) => {
    res.status(999).json({ message: "Livre avec l'id correspondant" })
}

exports.getAllBooks = (req, res, next) => {
    res.status(999).json({ message: "Tableau de livre renvoyé" })
}
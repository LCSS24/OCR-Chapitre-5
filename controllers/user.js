const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Fonction pour l'inscription d'un utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // Hashage du mot de passe avec bcrypt
    .then((hash) => {
      // Création d'un nouvel utilisateur
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user === null) {
      res
        .status(401)
        .json({ message: "L'email ou le mot de passe est incorrect" });
    } else {
      bcrypt
        .compare(req.body.password, user.password) // Comparaison du mot de passe fourni avec le hash stocké
        .then((valid) => {
          if (!valid) {
            res
              .status(401)
              .json({ message: "L'email ou le mot de passe est incorrect" });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                // Création d'un token JWT
                expiresIn: "24h",
              }),
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

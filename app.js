require("dotenv").config(); // Pour charger les variables d'environnement depuis le fichier .env
console.log("MONGO_URI =", process.env.MONGO_URI);
// Import des modules nécessaires
const express = require("express"); // Pour créer l'application Express
const mongoose = require("mongoose"); // Pour gérer la connexion à MongoDB
const bookRoutes = require("./routes/book"); // Pour les routes liées aux livres
const userRoutes = require("./routes/user"); // Pour les routes liées à l'authentification
const path = require("path"); // Pour gérer les chemins de fichiers

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Création de l'application Express
const app = express();

// Middleware pour gérer les requêtes CORS (appliqué à toutes les requêtes)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permettre toutes les origines
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Permettre certains headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Permettre certaines méthodes HTTP
  next();
});

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Appel des routes
app.use("/api/books", bookRoutes); // Route pour les livres
app.use("/api/auth", userRoutes); // Route pour l'authentification
app.use("/images", express.static(path.join(__dirname, "images"))); // Middleware pour permettre au frontend d'accéder aux images

app.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = app;

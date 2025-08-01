//Ce middleware extrait les informations de l'utilisateur à partir du token JWT
// envoyé dans l'en-tête de la requête. Il vérifie également la validité du token
// et extrait l'ID de l'utilisateur pour l'ajouter à l'objet `req.auth` afin qu'il
// puisse être utilisé dans les routes protégées.

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token avec la clé secrète
    const userId = decodedToken.userId; // Extrait l'ID de l'utilisateur du token décodé
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

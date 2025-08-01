const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

// 1. Stockage en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// 2. Middleware Sharp pour convertir en webp
const processImage = async (req, res, next) => {
    if (!req.file) return next();

    const name = req.file.originalname.split(" ").join("_").split(".")[0];
    const filename = name + "_" + Date.now() + ".webp";
    const outputPath = path.join("images", filename);

    try {
        await sharp(req.file.buffer)
            .resize(400)
            .webp({ quality: 80 }) // conversion et compression webp
            .toFile(outputPath);

        req.file.filename = filename; // pour l'URL dans le contrôleur
        next();
    } catch (err) {
        res.status(500).json({ error: "Erreur lors du traitement de l'image" });
    }
};

module.exports = [upload, processImage];
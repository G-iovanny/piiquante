// Importation de la bibliothèque Multer
const multer = require('multer');

// Définition d'un objet qui associe les types MIME des images aux extensions de fichier correspondantes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Définition d'un objet de stockage pour Multer
const storage = multer.diskStorage({

  // Définition du dossier de destination des fichiers téléchargés
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  // Définition du nom de fichier pour les fichiers téléchargés
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype]; // Récupération de l'extension correspondant au type MIME du fichier
    callback(null, file.originalname.split('.')[0] + '_' + Date.now() + '.' + extension); // Définition du nom du fichier téléchargé
  }
});

// Exportation du middleware Multer configuré avec l'objet de stockage pour un seul fichier avec le nom de champ "image"
module.exports = multer({storage: storage}).single('image');
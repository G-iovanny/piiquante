const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Lorsque l'utilisateur effectue une requête POST, on lance les fonctions dédiés (dans ../controllers/user)
router.post('/signup', userCtrl.signup) // Fonction signup pour s'inscire
router.post('/login', userCtrl.login) // Fonction login pour se connecter


module.exports = router;
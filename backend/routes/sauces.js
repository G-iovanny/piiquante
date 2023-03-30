const express = require('express');
const multer = require('multer');
const auth = require('../middlewares/auth');
const multerConfig = require('../middlewares/multer-config');
const saucesCtrl = require('../controllers/sauces');
const router = express.Router();



router.get('/', saucesCtrl.getAllSauces);   // Pour récupéter toutes les sauces
router.get('/:id', saucesCtrl.getOneSauce); // Pour récupérer une sauce unique
router.post('/', auth, multerConfig, saucesCtrl.createSauce); // Pour ajouter une sauce
router.put('/:id', auth, multerConfig, saucesCtrl.modifySauce); // Pour modifier une sauce
router.delete('/:id', saucesCtrl.deleteSauce); // Pour supprimer une sauce
 
module.exports = router;

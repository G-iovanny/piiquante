const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const likesCtrl = require('../controllers/likes');

router.post('/:id/like', auth, likesCtrl.likeSauce);

module.exports = router;
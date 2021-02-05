const express = require('express');
//
const router = express.Router(); //logique router Express


// controle avec hash
const auth = require('../middleware/auth'); // authentification
//
const multer = require('../middleware/multer-config'); // gestion dossier
//
const saucesCtrl = require('../controllers/sauces'); // ref controller


// recup liste sauces sur mongo
router.get('/', auth, saucesCtrl.getSauces);
// recup une sauce 
router.get('/:id', auth, saucesCtrl.getOneSauce);
// crea sauce
router.post('/', auth, multer, saucesCtrl.createSauce);
// modif sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce);  
// supp sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// like/dislike une sauce
router.post("/:id/like", auth, saucesCtrl.likerSauce);

//router.post("/:id/like", auth, saucesCtrl.dislikeSauce);

//-------------
module.exports = router; // retour logique router dans app.js
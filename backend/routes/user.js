const express = require('express');
const router = express.Router();
const auth = require('../models/user');
const userCtrl = require('../controllers/user');
const protectLog = require('../middleware/protectLog');

//const User = require('/models/user');
//---------------------
// crea user dans mongo
router.post('/api/auth/signup', (req, res, next) => {
    delete req.body._id;
    const users = new Users({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    });
    
//--------------

router.post('/signup', protectLog, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
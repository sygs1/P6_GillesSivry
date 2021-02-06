const express = require('express'); // cadrage techno
const mongoose = require('mongoose');  // cadrage techno
const app = express();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const bodyParser = require('body-parser');
const path = require('path'); //gestion dossier

const helmet = require('helmet') // protect https - prev attaque XSS

const rateLimit = require("express-rate-limit"); // protect bruteForce
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

////
require('dotenv').config(); // import environnement


mongoose.connect(process.env.Admin3,
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.set('useCreateIndex', true);
//
app.use("/api/", apiLimiter); // prevention bruteForce le plus tôt possible
//
app.use(helmet()) // XSS

app.use(bodyParser.json());
///----
  // acces server 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // voir si tt requis pour sopekocko
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images'))); // static de express

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes); // bcrypt pour hash + controleLog (/middleware)

module.exports = app;
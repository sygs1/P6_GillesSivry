
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // recup header ()
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;     //decodage token = objet js classique
    if (req.body.userId && req.body.userId !== userId) { // si tt ko -> throw sinon next
      throw 'Invalid user ID';
    } else {
      req.userId = userId
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requete non identifiée !')
    });
  }
};

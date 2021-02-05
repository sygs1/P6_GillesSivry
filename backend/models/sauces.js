const mongoose = require('mongoose');
const sauceSchema = mongoose.Schema({

  name: { type: String, required: true }, // nom de la sauce
  manufacturer: { type: String, required: true }, //fabricant sauce
  description: { type: String, required: true }, // description sauce
  mainPepper: { type: String, required: true }, // ingrédient principal
  heat: { type: Number, required: true }, // nombre decrivant force sauce
  imageUrl: { type: String, required: true }, // img telechargee par user
  likes: { type: Number, default:0, required: true}, //  ok
  dislikes: { type: Number, default:0, required: true}, //  ko  
  usersLiked: {type: Array, default: [], required: true}, // users ok
  usersDisliked: {type: Array, default: [], required: true}, // users ko
  userId: { type: String, required: true }, // img telechargee par user
});

module.exports = mongoose.model('Sauce', sauceSchema); // plug mongoose schema
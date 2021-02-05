
const mongoose = require('mongoose');  // créa model user avec mongoose

const uniqueValidator = require('mongoose-unique-validator'); // pack valide mail unique


const userSchema = mongoose.Schema({
   
  email: { type: String, required: true, unique: true}, //  match : /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ 
  // securise format mail unique
  password: { type: String, required: true }

});

userSchema.plugin(uniqueValidator); // applique validateur au schéma

module.exports = mongoose.model('User', userSchema); // exporte
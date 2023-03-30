const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

// Schema utilisateur
const usersSchema = mongoose.Schema({
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true,}
})

// Plugin qui permet de facilité l'authentification unique d'un email utilisateur dans notre cas
usersSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Users', usersSchema);
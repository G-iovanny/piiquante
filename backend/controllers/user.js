const bcrypt = require('bcrypt');
const User  = require('../models/user-model');
const jwt = require('jsonwebtoken');

// Fonction pour s'inscrire (que l'on exporte pour pouvoir l'appeler dans le router)
module.exports.signup = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10) // On hash le mot de passe envoyé par l'utilisateur grâce à bcrypt
    .then(hash => { // On récupère le hash généré par bcrypt
        const user = new User({ // On crée un nouvel utilisateur avec l'e-mail et le mot de passe hashé
            email: req.body.email,
            password: hash
        })
        user.save() // On sauvegarde l'utilisateur dans la base de données
        .then(() => res.status(201).json({message: 'Utilisateur créé'})) // On envoie une réponse JSON indiquant que l'utilisateur a été créé
        .catch(error => res.status(400).json(error)) // Si une erreur survient lors de la sauvegarde, on renvoie une erreur 400 avec un message d'erreur
    })
    .catch(error => res.status(500).json(error)); // Si une erreur survient lors de la génération du hash, on renvoie une erreur 500 avec un message d'erreur
}

// Fonction pour se connecter
module.exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}) // On cherche l'utilisateur correspondant à l'adresse email donnée
    .then(user => {
        if(user === null){ // Si aucun utilisateur correspondant à l'adresse email n'a été trouvé, renvoyer une erreur d'authentification
            res.status(401).json({ message: "Identifiants invalides" })
        } else { 
            bcrypt.compare(req.body.password, user.password) // Vérifier si le mot de passe fourni correspond à celui stocké dans la base de données pour l'utilisateur correspondant à l'adresse email
            .then(valid => {
                if(!valid){ // Si le mot de passe ne correspond pas, renvoyer une erreur d'authentification
                    res.status(401).json({ message: "Identifiants invalides" })
                } else { // Si le mot de passe correspond, renvoyer une réponse avec un ID utilisateur et un jeton d'authentification valide
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId : user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'} 
                        )
                    })
                }
            })
            .catch(error => {
                res.status(500).json({message: "Erreur serveur" })
            })
        }
    })
    .catch(error => res.status(500).json({error}));
}

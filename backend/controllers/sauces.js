const Sauce = require('../models/sauces-model');
const fs = require('fs');

// Pour avoir toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find() // On recherche les sauces dans la base de donnée
    .then((sauces) => {
      res.status(200).json(sauces); // On renvoit les sauces en réponse
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Pour récupérer une seule sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // On recherche la sauce correspondante à l'ID envoyé 
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
  

// Crée une nouvelle sauce dans la base de données
exports.createSauce = (req, res, next) => {
    // Parse le corps de la requête pour récupérer l'objet sauce sous forme de JSON
    const sauceObject = JSON.parse(req.body.sauce);
    // Crée une nouvelle instance de Sauce avec l'objet sauce et l'URL de l'image générée par multer
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistre la sauce dans la base de données
    sauce.save()
      // Renvoie une réponse HTTP avec un code de statut 201 (Créé) et un message de confirmation
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      // Si la création de la sauce échoue, renvoie une réponse HTTP avec un code de statut 400 (Mauvaise requête) et un message d'erreur
      .catch(error => res.status(400).json({ error }));
  };
  
  
  
exports.modifySauce = (req, res, next) => {
const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
  };
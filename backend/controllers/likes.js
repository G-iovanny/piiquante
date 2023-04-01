const Sauce = require('../models/sauces-model');

exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
  
    Sauce.findOne({ _id: sauceId })
      .then(sauce => {
        if (!sauce) {
          return res.status(404).json({ error: 'Sauce non trouvée' });
        }

        // Si l'utilisateur aime la sauce
        if (like === 1) {
          // On vérifie si l'utilisateur a déjà aimé la sauce
          if (sauce.usersLiked.includes(userId)) {
            return res.status(400).json({ error: 'Vous avez déjà aimé cette sauce' });
          }
  
          // On vérifie si l'utilisateur avait déjà disliké la sauce
          if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes--;
            sauce.usersDisliked.pull(userId);
          }
  
          // On ajoute l'utilisateur à la liste des usersLiked
          sauce.likes++;
          sauce.usersLiked.push(userId);
        }
  
        // Si l'utilisateur n'aime pas ni ne dislike pas la sauce
        if (like === 0) {
          // On vérifie si l'utilisateur avait aimé la sauce
          if (sauce.usersLiked.includes(userId)) {
            sauce.likes--;
            sauce.usersLiked.pull(userId);
          }
  
          // On vérifie si l'utilisateur avait disliké la sauce
          if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes--;
            sauce.usersDisliked.pull(userId);
          }
        }
  
        // Si l'utilisateur dislike la sauce
        if (like === -1) {
          // On vérifie si l'utilisateur a déjà disliké la sauce
          if (sauce.usersDisliked.includes(userId)) {
            return res.status(400).json({ error: 'Vous avez déjà disliké cette sauce' });
          }
  
          // On vérifie si l'utilisateur avait déjà aimé la sauce
          if (sauce.usersLiked.includes(userId)) {
            sauce.likes--;
            sauce.usersLiked.pull(userId);
          }
  
          // On ajoute l'utilisateur à la liste des usersDisliked
          sauce.dislikes++;
          sauce.usersDisliked.push(userId);
        }
  
        // On met à jour la sauce dans la base de données
        sauce.save()
          .then(() => res.status(200).json({ message: 'Statut like mis à jour avec succès' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; // On récupère uniquement le token (Car le header = 'Authorization: Bearer <token>')
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // On vérifie que le token est signé avec la clé secrète
       const userId = decodedToken.userId; // On récupère uniquement l'ID
       req.auth = { // On ajoute l'ID de l'utilisateur à la requête pour pouvoir l'authentifier
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
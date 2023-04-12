require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const likesRoutes = require('./routes/likes');

// Pour se connecter à la base de données
mongoose.connect(process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware pour parser les données JSON
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


// Pour éviter les erreurs liées aux CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Monter les routes
app.use('/api/auth/', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/api/sauces/', likesRoutes);



module.exports = app;

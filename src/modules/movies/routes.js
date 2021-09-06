const express = require('express');
const services = require('./services');
const movieRoutes = express.Router();

movieRoutes.post('/movies', async (req, res) => {

    const { title, director, rentValue, numberCopies } = req.body;

    if (title && director && rentValue && numberCopies){
        const response = await services.registerMovies(title, director, rentValue, numberCopies);
        res.status(response.status).send({response:response.message});

    } else {
        res.status(400).send({response:'Por favor preencha todos os campos'});
    }
    
});

movieRoutes.get('/movies', async(req, res) => {
    const response = await services.listMovies();
    res.status(response.status).send({response:response.message});
})

module.exports = movieRoutes;
const express = require('express');
const services = require('./services');
const routes = express.Router();

routes.post('/registerMovies', async (req, res) => {

    const { title, director, rentValue, numberCopies } = req.body;

    if (title && director && rentValue && numberCopies){
        const response = await services.registerMovies(title, director, rentValue, numberCopies);
        res.status(response.status).send(response.message);

    } else {
        res.status(400).send('Por favor preencha todos os campos');
    }
    
});

routes.get('/listMovies', async(req, res) => {
    const response = await services.listMovies();
    res.status(response.status).send(response.message);
})

module.exports = routes;
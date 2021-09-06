const express = require('express');
const services = require('./services');
const userRoutes = express.Router();

userRoutes.post('/registerUser', async(req, res) => {
    
    const {name, cpf, telephone, address} = req.body;

    if (name && cpf && telephone && address){
        const response = await services.registerUser(name, cpf, telephone, address);
        res.status(response.status).send({response:response.message});

    } else {
        res.status(400).send({response:'Por favor preencha todos os campos'});
    }
});

module.exports = userRoutes;
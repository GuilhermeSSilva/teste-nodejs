const express = require('express');
const rentRoutes = express.Router();

const util = require('./../../utilities/utilities')

const servicesUser = require('./../users/services');
const servicesMovies = require('./../movies/services');
const servicesRent = require('./services');

rentRoutes.post('/rent', async (req, res) => {
    const {nameUser, cpfUser} = req.body;
    let {idMovies} = req.body;
    const user = await servicesUser.getUser(nameUser, cpfUser);
    if (user.length > 0 && idMovies) {
        const rentalDate = util.date();
        const rentalTime = util.time();
        if(!Array.isArray(idMovies)) {
            idMovies = [idMovies];
        }
            const isAvailable = await servicesMovies.isAvailable(idMovies);

            if(!isAvailable) {
                res.status(404).send({response:'Desculpe mas estes filmes já foram alugados'});
                
            } else {
                const rentIds = await servicesRent.rent(rentalDate, rentalTime, "", "", 1, idMovies, user[0].id);
                const rentResponse = await servicesRent.rentResponse(rentIds);

                if (rentResponse.status != 500) {
                    let nameMovies=[], value=0;
                    rentResponse.forEach((items) => {
                        nameMovies.push(items[0].title);
                        value += items[0].rentValue;
                    });

                    const returnTime = util.returnTime(rentResponse[0][0].rentalTime);
                    res.status(200).send({nameMovies, value, returnDate:rentResponse[0][0].rentalDate, returnTime});
                }
            }

    } else if(user.length == 0){
        res.status(404).send({response:'Usuário não encontrado'});
    }
});


rentRoutes.post('/returnMovies', async(req, res) => {
    const {nameUser, cpfUser} = req.body;
    let {idMovies} = req.body;
    const user = await servicesUser.getUser(nameUser, cpfUser);
    if(user.length > 0 && idMovies) {
        if(!Array.isArray(idMovies)) {
            idMovies = [idMovies];
        }
        const rents = await servicesRent.getRents(user[0].id, idMovies);
        if(rents[0].length > 0) {
            const lagTime = util.rentedTime(rents[0][0].rentalDate, rents[0][0].rentalTime);
            const totalValue = util.calculateValue(rents, lagTime);
            const onlyRents = await servicesRent.getOnlyRents(idMovies);
            const date = util.date();
            const time = util.time();
            const returnMovie = await servicesRent.returnMovies(onlyRents, date, time);
            if(returnMovie.status == 200) {
                res.status(200).send({value:totalValue});
            } else {
                res.status(returnMovie.status).send({response:returnMovie.message});
            }
            
        } else {
            res.status(400).send({response:'Não há filmes a serem devolvidos'});
        }
        
    }
});

module.exports = rentRoutes;
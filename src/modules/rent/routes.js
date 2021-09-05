const express = require('express');
const rentRoutes = express.Router();

const util = require('./../../utilities/utilities')

const servicesUser = require('./../users/services');
const servicesMovies = require('./../movies/services');
const servicesRent = require('./services');

rentRoutes.post('/rentMovies', async (req, res) => {
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
            // servicesRent.cleanTable();
            // return;
            if(!isAvailable) {
                res.status(200).send('Desculpe mas estes filmes já foram alugados');
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
        res.status(404).send('Usuário não encontrado');
    }
});


rentRoutes.post('/returnMovies', async(req, res) => {
    const {nameUser, cpfUser, idMovies} = req.body;
    const user = await servicesUser.getUser(nameUser, cpfUser);
    if(user.length > 0 && idMovies) {
        console.log('funcionado');
    }
});

module.exports = rentRoutes;
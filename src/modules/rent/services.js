const db = require('./../../database/connection.js');

async function rent(rentalDate, rentalTime, returnDate, returnTime, isRented, idMovie, idUser) {
    let rentIds = [];

    for(let i = 0; i<idMovie.length; i++) {
        await db('rent').insert({
            rentalDate,
            rentalTime,
            returnDate,
            returnTime,
            isRented,
            idMovie: idMovie[i],
            idUser
         })
         .then((response) => {
             rentIds.push(response[0]);
         })
         .catch((error) => {
             console.log(error);
             return {status:500, message:"Desculpa mas não conseguimos alugar filmes no momento"};
         })
    }

    if(rentIds) {
        return rentIds;
    }
}

async function rentResponse(rentIds) {
    let rentResponse = [];
    for(let i = 0; i<rentIds.length; i++) {
        await db('rent')
            .select('*')
            .innerJoin('movies', 'rent.idMovie', 'movies.id')
            .where('rent.id', '=', rentIds[i])
        .then((response) => {
            rentResponse.push(response);
        })
        .catch((error) => {
            console.log(error);
            return {status:500, message:"Desculpe mas houve um erro, tente novamente mais tarde"};
        })
    }
    return rentResponse;
}

async function getRents(idUser, idMovies) {
    const rents = [];
    for(let i = 0; i<idMovies.length; i++) {
        await db('rent')
                .select('*')
                .innerJoin('movies', 'rent.idMovie', 'movies.id')
                .where('rent.idMovie', '=', idMovies[i])
                .where('rent.idUser', '=', idUser)
                .where('rent.isRented', '=', '1')
            .then((response) => rents.push(response))
            .catch((error) => {
                console.log(error);
                return {status: 500, message:"Desculpe, estamos com instabilidade no sistema, tente novamente mais tarde"}
            })
    }
    return rents;
}

async function getOnlyRents(idMovies) {
    const rents = [];
    for(let i = 0; i<idMovies.length; i++) {
        await db('rent')
                        .select('*')
                        .where('rent.idMovie', '=', idMovies[i])
                        .where('rent.isRented', '=', '1')
                    .then((response) => {
                        rents.push(response[0]);
                    })
                    .catch((error) => {
                        rents[0] = {status: 500, message:"Desculpe, estamos com instabilidade no sistema, tente novamente mais tarde"}
                    })
    }
    return rents;
}

async function returnMovies(rents, returnDate, returnTime) {
    let result;
    for (let i = 0; i<rents.length; i++) {
        await db('rent')
                .where('rent.id', '=', rents[i].id)
                .update({
                    returnDate: returnDate,
                    returnTime: returnTime,
                    isRented: false
                })
                .then(() => {
                    result = {status:200}
                })
                .catch((error => {
                    console.log(error);
                    result = {status:500, message:"Houve um problema no nosso servidor, por favor tente novamente mais tarde"}
                }));
    }
    return result;
}

module.exports = {
    rent,
    rentResponse,
    getRents,
    returnMovies,
    getOnlyRents
}
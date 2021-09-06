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

async function cleanTable() {
    await db('rent').del();
}


module.exports = {
    rent,
    rentResponse,
    cleanTable
}
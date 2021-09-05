const db = require('./../../database/connection.js');

async function registerMovies(title, director, rentValue, numberCopies) {
    return await db('movies').insert({
        title,
        director,
        rentValue,
        numberCopies
    })
    .then(() => {
            return {status: 200, message: "Filme registrado com sucesso."}; 
        })

    .catch((error) => {
        console.log(error.message);
        return {status: 500, message: "Não foi possível cadastrar o filme no momento, por favor tente novamente mais tarde."};
    });
}

async function listMovies() {
    return await db('movies').select('*')

    .then((response) => {
       return {status:200, message:response}
    })
    .catch((error) => {
        console.log(error);
        return {status:500, message:"Não conseguimos listar os filmes no momento, por favor tente novamente mais tarde"};
    });
}

async function getMovies(idMovies) {
    return await db('movies').select('*').where('movies.id', '=', idMovies)
    .then((response) => response)
    .catch((error) => error);
}

async function isAvailable(idMovies) {
    let rent, flag = true;
    for(let i = 0; i<idMovies.length; i++) {
        rent = await db('rent')
                            .select('*')
                            .innerJoin('movies', 'rent.idMovie', '=', 'movies.id')
                            .where('rent.idMovie', '=', `${idMovies[i]}`)
                            .where('rent.isRented', '=', '1');
                            
        if (rent[0] && rent != [] && rent.length >= rent[0].numberCopies) {
            flag = false;
            return flag;
        }
    }
    return flag;
}

module.exports = {
    registerMovies,
    listMovies,
    getMovies,
    isAvailable
}

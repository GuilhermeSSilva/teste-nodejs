const db = require('./../../database/connection.js');

async function registerMovies(title, director, rentValue, numberCopies){
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

module.exports = {
    registerMovies,
    listMovies
}

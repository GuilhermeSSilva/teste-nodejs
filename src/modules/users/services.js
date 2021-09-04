const db = require('./../../database/connection.js');

async function registerUser(name, cpf, telephone, address){
    return await db('users').insert({
       name,
       cpf,
       telephone,
       address 
    })
    .then(() => {
        return {status:200,
                message:"Usuário adicionado com sucesso."
                };
    })
    .catch((error) => {
        console.log(error);
        return {status:500,
                message:"Não foi possível adicionar o usuário no momento, por favor tente mais tarde."
                };
    })
}

module.exports = {
    registerUser
}
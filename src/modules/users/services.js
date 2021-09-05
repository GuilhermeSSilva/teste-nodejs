const db = require('./../../database/connection.js');

async function registerUser(name, cpf, telephone, address){
    return await db('users').insert({
       name,
       cpf,
       telephone,
       address 
    })
    .then(() => {
        return {status:200, message:"Usuário adicionado com sucesso."};
    })
    .catch((error) => {
        console.log(error);
        return {status:500, message:"Não foi possível adicionar o usuário no momento, por favor tente mais tarde."};
    })
}

async function getUser(nameUser, cpfUser) {
    if (nameUser) {
        return await db('users').select('*').where('users.name', 'like', `${nameUser}%`)
            .then((response) => response)
            .catch(error => {
                console.log(error);
                return {status:404, message:"Usuário não encontrado"}
            })

    } else if (cpfUser) {
        return await db('users').select('*').where('users.cpf', '=', cpfUser)
            .then((response) => response)
            .catch(error => {
                console.log(error);
                return {status:404, message:"Usuário não encontrado"}
            })
    } else {
        return {status:400, message:"Campos inválidos"}
    }
    
}

module.exports = {
    registerUser,
    getUser
}
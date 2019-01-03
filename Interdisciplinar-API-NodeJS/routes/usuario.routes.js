const Joi = require('joi')
const userRepository = require('../repositories/user.repository')

let interValid = {
    login: Joi.string().required(),
    senha: Joi.string().required()
}
module.exports = [
    {
        method: 'POST',
        path: '/Usuario/api/user',
        options: {
            handler: userRepository.createUser,
            description: 'Add a register',
            notes: 'Add a new register',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload: interValid,
                failAction: function(request, h, err){
                    return err
                }
            }
        },
    },

    {
        method: 'GET',
        path: '/Usuario/api/user',
        options: {
            handler: userRepository.findAllUser,
            description: 'Find a list of registers',
            notes: 'Returns a list of registers',
            tags: ['api'] // ADD THIS TAG
         
        }
    },

    {
        method: 'GET',
        path: '/Usuario/api/user/{id}',
        options: {
            handler: userRepository.findUser,
            description: 'Find a register by id',
            notes: 'Returns a register by id',
            tags: ['api'] ,// ADD THIS TAG
            validate: {
               params:{
                id: Joi.number().integer().required()
               }, //numero inteiro e obrigatório
               failAction: (request, h, err) => {
                throw err
            }
            
            }
        }
    },

    {
        method: 'PUT',
        path: '/Usuario/api/user/{id}',
        options: {
            handler: userRepository.updateUser,
            description: 'Update a register by id',
            notes: 'Return a message successfuly',
            tags: ['api'] ,// ADD THIS TAG
            validate: {
               params:{
                id: Joi.number().integer().required()
               }, //numero inteiro e obrigatório
               payload: interValid, 
               failAction: (request, h, err) => {
                throw err
            }
            
            }
        }
    },

    {
        method: 'DELETE',
        path: '/Usuario/api/user/{id}',
        options: {
            handler: userRepository.deleteUser,
            description: 'Delete a register by id',
            notes: 'Return a message successfuly',
            tags: ['api'] ,// ADD THIS TAG
            validate: {
               params:{
                id: Joi.number().integer().required()
               }, //numero inteiro e obrigatório 
               failAction: (request, h, err) => {
                throw err
            }
            
            }
        }
    }

]
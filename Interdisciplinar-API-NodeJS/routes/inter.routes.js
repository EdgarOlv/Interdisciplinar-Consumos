const Joi = require('joi')
const interRepository = require('../repositories/inter.repository')

//validando o contato
let interValid = {
    registro: Joi.date().required(),
    corrente: Joi.number().required(),
    potencia: Joi.number().required(),
    vazao: Joi.number().required(),
    vazaomin: Joi.number().required()
}

module.exports = [
    {
        method: 'POST',
        path: '/Registro/api/inter',
        options: {
            handler: interRepository.create,
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
        path: '/Registro/api/inter/',
        options: {
            handler: interRepository.findAll,
            description: 'Find a list of registers',
            notes: 'Returns a list of registers',
            tags: ['api'] // ADD THIS TAG
         
        }
    },

    {
        method: 'GET',
        path: '/Registro/api/inter/{id}',
        options: {
            handler: interRepository.find,
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
        path: '/Registro/api/inter/{id}',
        options: {
            handler: interRepository.update,
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
        path: '/Registro/api/inter/{id}',
        options: {
            handler: interRepository.delete,
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
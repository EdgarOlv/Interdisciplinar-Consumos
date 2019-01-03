const Boom = require('boom')

let usuarios = {
    login: String,
    senha: String
}

module.exports = {
    /* Add a user */
    createUser: async (request, h) => {

        const pool = request.mysql.pool

        registro = request.payload
        //o que vai pegar do objeto cliente e ser gravado na base de dados
        //passando o payload para o user

        try {

            await pool.query('insert into usuarios set ?', usuarios)
            //Querry, paramentro, e funcion
            return { sucess: true, message: 'data created sucessfully' }

        } catch (err) {

            throw Boom.badRequest(err)

        }
    },


    // encontrar uma lista de usuarios
    findAllUser: async (request, h) => {

        const pool = request.mysql.pool

        try {

            const [rows, fields] = await pool.query('select * from usuarios order by id')
            // retorna as linhas e os campos de cada usuario, não vai usar fields mas tem q colocar
            return rows

        } catch (err) {

            console.log(err)

            throw Boom.internal('Internal Mysql Error',err)
            
        }
        
    },
    //encontrar um usuario pelo id
    findUser: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        try {
            
            const [rows, fields] = await pool.query('select * from usuarios where id = ?',id)
            // retorna as linhas e os campos de cada usuario, não vai usar fields mas tem q colocar
          
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Register not found')
            return rows

        } catch (err) {
            
            console.log(err)

            throw Boom.badRequest(err)

        }
        
    },
        // atualizar um usuario
        updateUser: async (request, h) => {
            const pool = request.mysql.pool
    
            const id = request.params.id
    
            usuarios = request.payload
    
            try {
                
                const [rows, fields] = await pool.query('select * from usuarios where id = ?',id)
                // retorna as linhas e os campos de cada usuario, não vai usar fields mas tem q colocar
              
                if(rows.length === undefined || rows.length === 0)
                    return Boom.notFound('Register not found')
           
                await pool.query('update usuarios set ? where id =?', [registro,id])  
                
                return {sucess: true, message: 'User update successfully'}
    
            } catch (err) {
                
                console.log(err)
    
                throw Boom.badRequest(err)
    
            }
    
        },
    
        deleteUser: async (request, h) => {
            const pool = request.mysql.pool
    
            const id = request.params.id
    
            try {
                
                const [rows, fields] = await pool.query('select * from usuarios where id = ?',id)
                // retorna as linhas e os campos de cada usuario, não vai usar fields mas tem q colocar
              
                if(rows.length === undefined || rows.length === 0)
                    return Boom.notFound('Usuario not found')
                    
                await pool.query('delete from usuarios where id = ?',id)
    
                return {sucess: true, message: 'Usuario removed successfully!'}
            } catch (err) {
                
                console.log(err)
    
                throw Boom.badRequest(err)
    
            }
        }

}
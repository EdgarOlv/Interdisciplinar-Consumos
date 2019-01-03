const Boom = require('boom')

let registros = {
    registro: Date,
    corrente: Number,
    potencia: Number,
    vazao: Number,
    vazaomin: Number
}

module.exports = {
    /* Add a register */
    create: async (request, h) => {

        const pool = request.mysql.pool

        registro = request.payload
        //o que vai pegar do objeto cliente e ser gravado na base de dados
        //passando o payload para o registro

        try {

            await pool.query('insert into registros set ?', registro)
            //Querry, paramentro, e funcion
            return { sucess: true, message: 'data created sucessfully' }

        } catch (err) {

            throw Boom.badRequest(err)

        }
    },


    // encontrar uma lista de registros
    findAll: async (request, h) => {

        const pool = request.mysql.pool

        try {

            const [rows, fields] = await pool.query('select * from registros order by registro')
            // retorna as linhas e os campos de cada registro, não vai usar fields mas tem q colocar
            return rows

        } catch (err) {

            console.log(err)

            throw Boom.internal('Internal Mysql Error',err)
            
        }
        
    },
    //encontrar um contato pelo id
    find: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        try {
            
            const [rows, fields] = await pool.query('select * from registros where registros = ?',id)
            // retorna as linhas e os campos de cada registro, não vai usar fields mas tem q colocar
          
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Register not found')
            return rows

        } catch (err) {
            
            console.log(err)

            throw Boom.badRequest(err)

        }
        
    },

    

    // atualizar um registro
    update: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        registro = request.payload

        try {
            
            const [rows, fields] = await pool.query('select * from registros where id = ?',id)
            // retorna as linhas e os campos de cada registro, não vai usar fields mas tem q colocar
          
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Register not found')
       
            await pool.query('update registros set ? where id =?', [registro,id])  
            
            return {sucess: true, message: 'Register update successfully'}

        } catch (err) {
            
            console.log(err)

            throw Boom.badRequest(err)

        }

    },

    delete: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        try {
            
            const [rows, fields] = await pool.query('select * from registros where id = ?',id)
            // retorna as linhas e os campos de cada registro, não vai usar fields mas tem q colocar
          
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Register not found')
                
            await pool.query('delete from registros where id = ?',id)

            return {sucess: true, message: 'Register removed successfully!'}
        } catch (err) {
            
            console.log(err)

            throw Boom.badRequest(err)

        }
    }
}

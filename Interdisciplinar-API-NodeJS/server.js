const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const interRoutes = require('./routes/inter.routes');
const userRoutes = require('./routes/usuario.routes');

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });
    
    const swaggerOptions = {
        info: {
                title: 'Documentacao da API Interdisciplinar Consumos',
                version: Pack.version,
            },
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    // para registrar novo mysql hapi
    await server.register({
        plugin: require('hapi-mysql2'),
        options:{
            settings:
            {
                    connectionLimit: 10,
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: 'consumos'
            },
            decorate: true
        }
    })

    try {
        await server.start();
        console.log('Servidor rodando em:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    
    server.route(interRoutes);
    server.route(userRoutes)
})();
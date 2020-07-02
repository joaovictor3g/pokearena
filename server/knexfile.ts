import path from 'path';

module.exports = {
    client: 'pg',
    version: '12.2',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '1234',
        database : 'Pokemon'    
    },

    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true,
};
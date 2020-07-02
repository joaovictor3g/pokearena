import knex from 'knex';

const connection = knex({
    client: 'pg',
    version: '12.2',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '1234',
        database : 'Pokemon'    
    },
    useNullAsDefault: true
});

export default connection;
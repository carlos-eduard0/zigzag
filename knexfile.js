module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: '0511',
            database: 'developer',
        },
        migrations: {
            directory: './src/database/migrations',
        },
    },
};
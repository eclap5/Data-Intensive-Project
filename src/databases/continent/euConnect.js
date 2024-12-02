import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function connectToEUDatabase() {
    const { Client } = pg;
    const client = new Client({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: 'localhost',
        port: 5432
    });

    try {
        await client.connect();
        console.log('Connected to postgres server');

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'europe'`);
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE europe');
            console.log('Database "europe" created');
        } else {
            console.log('Database "europe" already exists');
        }

        await client.end();

        const euClient = new Client({
            user: process.env.USER,
            password: process.env.PASSWORD,
            host: 'localhost',
            port: 5432,
            database: 'europe'
        });

        await euClient.connect();
        console.log('Connected to postgres database "europe"');
        return euClient;
    } catch (err) {
        console.error(err + ': Error connecting to postgres database');
        throw err;
    }
}

export default connectToEUDatabase;
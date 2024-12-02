import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function connectToNADatabase() {
    const { Client } = pg;
    
    const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: 'localhost',
        port: 5432
    });

    try {
        await client.connect();
        console.log('Connected to postgres server');

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'north_america'`);
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE north_america');
            console.log('Database "north_america" created');
        } else {
            console.log('Database "north_america" already exists');
        }

        await client.end();

        const naClient = new Client({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: 'localhost',
            port: 5432,
            database: 'north_america'
        });

        await naClient.connect();
        console.log('Connected to postgres database "north_america"');
        return naClient;
    } catch (err) {
        console.error(err + ': Error connecting to postgres database');
        throw err;
    }
}

export default connectToNADatabase;
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function connectToASDatabase() {
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

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'asia'`);
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE asia');
            console.log('Database "asia" created');
        } else {
            console.log('Database "asia" already exists');
        }

        await client.end();

        const asClient = new Client({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: 'localhost',
            port: 5432,
            database: 'asia'
        });

        await asClient.connect();
        console.log('Connected to postgres database "asia"');
        return asClient;
    } catch (err) {
        console.error(err + ': Error connecting to postgres database');
        throw err;
    }
}

export default connectToASDatabase;
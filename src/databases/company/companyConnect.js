import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function connectToCompanyDatabase() {
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

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'company'`);
        if (res.rowCount === 0) {
            await client.query('CREATE DATABASE company');
            console.log('Database "company" created');
        } else {
            console.log('Database "company" already exists');
        }

        await client.end();

        const companyClient = new Client({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: 'localhost',
            port: 5432,
            database: 'company'
        });

        await companyClient.connect();
        console.log('Connected to postgres database "company"');
        return companyClient;
    } catch (err) {
        console.error(err + ': Error connecting to postgres database');
        throw err;
    }
}

export default connectToCompanyDatabase;
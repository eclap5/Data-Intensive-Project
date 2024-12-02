import express from 'express';
import connectToCompanyDatabase from '../database/connect/companyConnect.js';
import { createCompanyTables } from '../database/initCompanyDB.js';

const companyClient = await connectToCompanyDatabase();

async function populateCompanyDatabase(companyClient) {
    await delay(2000);
    await createCompanyTables(companyClient);
    const result = await companyClient.query('SELECT * FROM Personal');
    if (result.rowCount === 0) {
        console.log("Populating company tables");
        await populateCompanyTables(companyClient);
    } else {
        console.log('Tables already populated');
    }
}
populateCompanyDatabase(companyClient);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const router = express.Router();

router.get('/company', (req, res) => {
    res.send('Company database');
});

export default router;
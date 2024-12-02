import express from 'express';


//Call EU database connection
import connectToEUDatabase from '../databases/continent/euConnect.js';
import { createContinentTables, populateEUTables } from '../databases/continent/initDBs.js';
const euClient = await connectToEUDatabase();

//Create EU database tables
async function populateEuDatabase(euClient) {
    await delay(2000);
    createContinentTables(euClient);
    const result = await euClient.query('SELECT * FROM customers');
    if (result.rowCount === 0) {
        populateEUTables(euClient);
    } else {
        console.log('Tables already populated');
    }
}
populateEuDatabase(euClient);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Router for EU database
const router = express.Router();

router.get('/europe', (req, res) => {
    res.send('Europe database');
});

export default router;

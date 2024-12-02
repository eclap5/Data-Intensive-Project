import express from 'express';

//Call EU database connection
import connectToEUDatabase from '../database/connect/euConnect.js';
import createContinentTables from '../database/initDBs.js';
import { populateEUTables } from '../database/populate/populateEU.js';
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

/*
 Input: get to /eu/<tablename>
 Output: [ { customer }, { customer }, ... ]
*/
router.get('/:table', async (req, res) => {
    const tableName = req.params.table;
    try {
        const { rows: Data } = await euClient.query(`SELECT * FROM ${tableName}`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: post to /eu/<tablename> with body example in table customers { columns: "location, name", values: "'London', 'John'" }
    Output: [ { customer } ]
*/
router.post('/:table', async (req, res) => {
    const tableName = req.params.table;
    const { columns, values } = req.body;
    try {
        const { rows: Data } = await euClient.query(`INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: post to /eu/<tablename>/<id> with body example in table customers { columns: "location", values: "'London'" }
    Output: [ { customer } ]
*/
router.post('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    const { columns, values } = req.body;
    try {
        const { rows: Data } = await euClient.query(`UPDATE ${tableName} SET (${columns}) = (${values}) WHERE id = ${id} RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: delete to /eu/<tablename>/<id>
    Output: [ { customer } ]
*/
router.post('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    try {
        const { rows: Data } = await euClient.query(`DELETE FROM ${tableName} WHERE id = ${id} RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;

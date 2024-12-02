import express from 'express';


//Call NA database connection
import connectToNADatabase from '../database/connect/naConnect.js';
import createContinentTables from '../database/initDBs.js';
import { populateNATables } from '../database/populate/populateNA.js';
const naClient = await connectToNADatabase();

//Create NA database tables
async function populateNaDatabase(naClient) {
    await delay(2000);
    createContinentTables(naClient);
    const result = await naClient.query('SELECT * FROM customers');
    if (result.rowCount === 0) {
        populateNATables(naClient);
    } else {
        console.log('Tables already populated');
    }
}
populateNaDatabase(naClient);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Router for NA database
const router = express.Router();

/*
 Input: get to /na/<tablename>
 Output: [ { customer }, { customer }, ... ]
*/
router.get('/:table', async (req, res) => {
    const tableName = req.params.table;
    try {
        const { rows: Data } = await naClient.query(`SELECT * FROM ${tableName}`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: post to /na/<tablename> with body example in table customers { columns: "location, name", values: "'London', 'John'" }
    Output: [ { customer } ]
*/
router.post('/:table', async (req, res) => {
    const tableName = req.params.table;
    const { columns, values } = req.body;
    try {
        const { rows: Data } = await naClient.query(`INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: post to /na/<tablename>/<id> with body example in table customers { columns: "location", values: "'London'" }
    Output: [ { customer } ]
*/
router.put('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    const { columns, values } = req.body;
    try {
        const { rows: Data } = await naClient.query(`UPDATE ${tableName} SET (${columns}) = (${values}) WHERE ${tableName.slice(0, -1)}id = ${id} RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: delete to /na/<tablename>/<id>
    Output: [ { customer } ]
*/
router.delete('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    try {
        const { rows: Data } = await naClient.query(`DELETE FROM ${tableName} WHERE ${tableName.slice(0, -1)}id = ${id} RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
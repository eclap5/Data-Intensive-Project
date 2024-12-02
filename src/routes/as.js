import express from 'express';
import stringifyAndJoin from './stringify.js';

//Call AS database connection
import connectToASDatabase from '../database/connect/asConnect.js';
import createContinentTables from '../database/initDBs.js';
import { populateASTables } from '../database/populate/populateAS.js';
const asClient = await connectToASDatabase();

//Create AS database tables
async function populateAsDatabase(asClient) {
    await delay(2000);
    createContinentTables(asClient);
    const result = await asClient.query('SELECT * FROM customers');
    if (result.rowCount === 0) {
        populateASTables(asClient);
    } else {
        console.log('Tables already populated');
    }
}
populateAsDatabase(asClient);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Router for AS database
const router = express.Router();

/*
 Input: get to /as/<tablename>
 Output: [ { customer }, { customer }, ... ]
*/
router.get('/:table', async (req, res) => {
    const tableName = req.params.table;
    try {
        const { rows: Data } = await asClient.query(`SELECT * FROM ${tableName}`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: post to /as/<tablename> with body example in table customers { columns: "location", "name", values: "London", "John" }
    Output: [ { customer } ]
*/
router.post('/:table', async (req, res) => {
    const tableName = req.params.table;
    const { columns, values } = req.body;
    try {
        const { rows: Data } = await asClient.query(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${stringifyAndJoin(values)}) RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: post to /as/<tablename>/<id> with body example in table customers { columns: "location", values: "London" }
    Output: [ { customer } ]
*/
router.put('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    const { columns, values } = req.body;
    try {
        const { rows: Data } = await asClient.query(`UPDATE ${tableName} SET (${columns.join(', ')}) = (${stringifyAndJoin(values)}) WHERE ${tableName.slice(0, -1)}id = ${id} RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

/*
    Input: delete to /as/<tablename>/<id>
    Output: [ { customer } ]
*/
router.delete('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    try {
        const { rows: Data } = await asClient.query(`DELETE FROM ${tableName} WHERE ${tableName.slice(0, -1)}id = ${id} RETURNING *`);
        res.json(Data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
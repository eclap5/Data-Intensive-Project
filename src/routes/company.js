import express from 'express';
import connectToCompanyDatabase from '../database/connect/companyConnect.js';
import { createCompanyTables } from '../database/initCompanyDB.js';
import { populateCompanyTables } from '../database/populate/populateCompany.js';

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

router.get('/:table', async (req, res) => {
    const tableName = req.params.table;
    try {
        const { rows: data } = await companyClient.query(`SELECT * FROM ${tableName}`);
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/:table', async (req, res) => {
    const tableName = req.params.table;
    const { columns, values } = req.body;
    try {
        const { rows: data } = await companyClient.query(`INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`);
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    const { columns } = req.body;
    try {
        const { rows: data } = await companyClient.query(`UPDATE ${tableName} SET ${columns} WHERE id = ${id} RETURNING *`);
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    try {
        const { rows: data } = await companyClient.query(`DELETE FROM ${tableName} WHERE id = ${id} RETURNING *`);
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
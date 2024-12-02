async function createCompanyTables(client) {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS Salary (
                SalaryId SERIAL PRIMARY KEY,
                Amount FLOAT
            );
        `);
        console.log('Table "Salary" created');

        await client.query(`
            CREATE TABLE IF NOT EXISTS Title (
                TitleId SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                SalaryId INT REFERENCES Salary(SalaryId)
            );
        `);
        console.log('Table "Title" created or exists');

        await client.query(`
            CREATE TABLE IF NOT EXISTS Personal (
                PersonId SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                TitleId INT REFERENCES Title(TitleId),
                Location VARCHAR(255) NOT NULL
            );
        `);
        console.log('Table "Personal" created or exists');

        await client.query(`
            CREATE TABLE IF NOT EXISTS Office (
                OfficeId SERIAL PRIMARY KEY,
                PersonId INT REFERENCES Personal(PersonId),
                Location VARCHAR(255) NOT NULL
            );
        `);
        console.log('Table "Office" created or exists');

        await client.query(`
            CREATE TABLE IF NOT EXISTS Continental (
                ContinentId SERIAL PRIMARY KEY,
                OfficeId INT REFERENCES Office(OfficeId),
                ContinentName VARCHAR(255) NOT NULL
            );
        `);
        console.log('Table "Continental" created or exists');
    } catch (err) {
        console.error(err + ': Error creating tables');
        throw err;
    }
}

export { createCompanyTables };
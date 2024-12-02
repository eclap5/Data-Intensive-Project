async function createCompanyTables(client) {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS Difficulty (
                DifficultyId SERIAL PRIMARY KEY,
                Salary FLOAT
            );
        `);
        console.log('Table "Difficulty" created');

        await client.query(`
            CREATE TABLE IF NOT EXISTS Title (
                TitleId SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                DifficultyId INT REFERENCES Difficulty(DifficultyId),
                Salary FLOAT
            );
        `);
        console.log('Table "Title" created or exists');

        await client.query(`
            CREATE TABLE IF NOT EXISTS Personal (
                PersonId SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                TitleId INT REFERENCES Title(TitleId),
                Location FLOAT
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
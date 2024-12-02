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

async function populateCompanyTables(client) {
    try {
        await client.query(`
            INSERT INTO Difficulty (Salary)
            VALUES 
                (50000),
                (60000),
                (70000);
        `);
        console.log('Table "Difficulty" populated');

        await client.query(`
            INSERT INTO Title (Name, DifficultyId, Salary)
            VALUES 
                ('Manager', 1, 50000),
                ('Developer', 2, 60000),
                ('Analyst', 3, 70000);
        `);
        console.log('Table "Title" populated');

        await client.query(`
            INSERT INTO Personal (Name, TitleId, Location)
            VALUES 
                ('John Doe', 1, 1.1),
                ('Jane Smith', 2, 2.2),
                ('Alice Johnson', 3, 3.3);
        `);
        console.log('Table "Personal" populated');

        await client.query(`
            INSERT INTO Office (PersonId, Location)
            VALUES 
                (1, 'New York'),
                (2, 'San Francisco'),
                (3, 'Los Angeles');
        `);
        console.log('Table "Office" populated');

        await client.query(`
            INSERT INTO Continental (OfficeId, ContinentName)
            VALUES 
                (1, 'North America'),
                (2, 'North America'),
                (3, 'North America');
        `);
        console.log('Table "Continental" populated');
    } catch (err) {
        console.error(err + ': Error populating tables');
        throw err;
    }
}

export { createCompanyTables, populateCompanyTables };
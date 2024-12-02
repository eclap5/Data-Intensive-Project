export async function populateCompanyTables(client) {
    try {
        await client.query(`
            INSERT INTO Salary (Amount)
            VALUES 
                (50000),
                (60000),
                (70000),
                (80000),
                (90000),
                (100000),
                (110000),
                (120000),
                (130000),
                (140000),
                (150000),
                (160000),
                (170000),
                (180000),
                (190000),
                (200000),
                (210000),
                (220000),
                (230000),
                (240000)
            ON CONFLICT DO NOTHING;
        `);
        console.log('Table "Salary" populated');

        await client.query(`
            INSERT INTO Title (Name, SalaryId)
            VALUES 
                ('Manager', 1),
                ('Developer', 2),
                ('Analyst', 3),
                ('Consultant', 4),
                ('Engineer', 5),
                ('Technician', 6),
                ('Administrator', 7),
                ('Coordinator', 8),
                ('Specialist', 9),
                ('Supervisor', 10),
                ('Director', 11),
                ('Executive', 12),
                ('Officer', 13),
                ('Assistant', 14),
                ('Clerk', 15),
                ('Agent', 16),
                ('Representative', 17),
                ('Advisor', 18),
                ('Planner', 19),
                ('Strategist', 20)
            ON CONFLICT DO NOTHING;
        `);
        console.log('Table "Title" populated');

        await client.query(`
            INSERT INTO Personal (Name, TitleId, Location)
            VALUES 
                ('John Doe', 1, 'New York'),
                ('Jane Smith', 2, 'San Francisco'),
                ('Alice Johnson', 3, 'Los Angeles'),
                ('Michael Brown', 4, 'Chicago'),
                ('Emily Davis', 5, 'Houston'),
                ('Daniel Wilson', 6, 'Phoenix'),
                ('Sophia Martinez', 7, 'Philadelphia'),
                ('James Anderson', 8, 'San Antonio'),
                ('Olivia Thomas', 9, 'San Diego'),
                ('Benjamin Taylor', 10, 'Dallas'),
                ('Emma Moore', 11, 'San Jose'),
                ('Lucas Jackson', 12, 'Austin'),
                ('Mia White', 13, 'Jacksonville'),
                ('Henry Harris', 14, 'Fort Worth'),
                ('Ava Martin', 15, 'Columbus'),
                ('Alexander Thompson', 16, 'Charlotte'),
                ('Isabella Garcia', 17, 'London'),
                ('William Martinez', 18, 'Berlin'),
                ('Charlotte Robinson', 19, 'Paris'),
                ('Ethan Clark', 20, 'Tokyo')
            ON CONFLICT DO NOTHING;
        `);
        console.log('Table "Personal" populated');

        await client.query(`
            INSERT INTO Office (PersonId, Location)
            VALUES 
                (1, 'New York'),
                (2, 'San Francisco'),
                (3, 'Los Angeles'),
                (4, 'Chicago'),
                (5, 'Houston'),
                (6, 'Phoenix'),
                (7, 'Philadelphia'),
                (8, 'San Antonio'),
                (9, 'San Diego'),
                (10, 'Dallas'),
                (11, 'San Jose'),
                (12, 'Austin'),
                (13, 'Jacksonville'),
                (14, 'Fort Worth'),
                (15, 'Columbus'),
                (16, 'Charlotte'),
                (17, 'London'),
                (18, 'Berlin'),
                (19, 'Paris'),
                (20, 'Tokyo')
            ON CONFLICT DO NOTHING;
        `);
        console.log('Table "Office" populated');

        await client.query(`
            INSERT INTO Continental (OfficeId, ContinentName)
            VALUES 
                (1, 'North America'),
                (2, 'North America'),
                (3, 'North America'),
                (4, 'North America'),
                (5, 'North America'),
                (6, 'North America'),
                (7, 'North America'),
                (8, 'North America'),
                (9, 'North America'),
                (10, 'North America'),
                (11, 'North America'),
                (12, 'North America'),
                (13, 'North America'),
                (14, 'North America'),
                (15, 'North America'),
                (16, 'North America'),
                (17, 'Europe'),
                (18, 'Europe'),
                (19, 'Europe'),
                (20, 'Asia')
            ON CONFLICT DO NOTHING;
        `);
        console.log('Table "Continental" populated');
    } catch (err) {
        console.error(err + ': Error populating tables');
        throw err;
    }
}

export async function populateCompanyTables(client) {
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


export async function populateASTables(client) {
    try {
        await client.query(`
            INSERT INTO customers (location, name)
            VALUES 
                ('Tokyo', 'Hiroshi Tanaka'),
                ('Beijing', 'Li Wei'),
                ('Seoul', 'Kim Min-ji'),
                ('Mumbai', 'Amit Sharma'),
                ('Bangkok', 'Somchai Prasert'),
                ('Tokyo', 'Yuki Yamamoto'),
                ('Beijing', 'Wang Fang'),
                ('Seoul', 'Park Ji-hoon'),
                ('Mumbai', 'Raj Patel'),
                ('Bangkok', 'Niran Chaiyawat'),
                ('Tokyo', 'Sakura Suzuki'),
                ('Beijing', 'Zhang Wei'),
                ('Seoul', 'Choi Ji-woo'),
                ('Mumbai', 'Anjali Singh'),
                ('Bangkok', 'Kanya Srisai'),
                ('Tokyo', 'Kenji Nakamura'),
                ('Beijing', 'Chen Jie'),
                ('Seoul', 'Lee Hyun-woo'),
                ('Mumbai', 'Priya Desai'),
                ('Bangkok', 'Arthit Boonmee')
        `);
        console.log('Table "customers" populated');

        await client.query(`
            INSERT INTO products (productRef, name, price)
            VALUES 
                ('PRD001', 'Product 1', 10.0),
                ('PRD002', 'Product 2', 20.0),
                ('PRD003', 'Product 3', 30.0),
                ('PRD004', 'Product 4', 40.0),
                ('PRD005', 'Product 5', 50.0),
                ('PRD006', 'Product 6', 60.0),
                ('PRD007', 'Product 7', 70.0),
                ('PRD008', 'Product 8', 80.0),
                ('PRD009', 'Product 9', 90.0),
                ('PRD010', 'Product 10', 100.0),
                ('PRD011', 'Product 11', 110.0),
                ('PRD012', 'Product 12', 120.0),
                ('PRD013', 'Product 13', 130.0),
                ('PRD014', 'Product 14', 140.0),
                ('PRD015', 'Product 15', 150.0),
                ('PRD016', 'Product 16', 160.0),
                ('PRD017', 'Product 17', 170.0),
                ('PRD018', 'Product 18', 180.0),
                ('PRD019', 'Product 19', 190.0),
                ('PRD020', 'Product 20', 200.0)
        `);
        console.log('Table "products" populated');

        await client.query(`
            INSERT INTO orders (customerId, status, productId, price)
            VALUES 
                (1, 'Processing', '{1, 2}', 30.0),
                (2, 'Processed', '{3, 4}', 70.0),
                (3, 'Shipped', '{5, 6}', 110.0),
                (4, 'Processing', '{7, 8}', 150.0),
                (5, 'Processed', '{9, 10}', 190.0),
                (6, 'Shipped', '{11, 12}', 230.0),
                (7, 'Processing', '{13, 14}', 270.0),
                (8, 'Processed', '{15, 16}', 310.0),
                (9, 'Shipped', '{17, 18}', 350.0),
                (10, 'Processing', '{19, 20}', 390.0),
                (11, 'Processed', '{1, 3}', 40.0),
                (12, 'Shipped', '{2, 4}', 60.0),
                (13, 'Processing', '{5, 7}', 120.0),
                (14, 'Processed', '{6, 8}', 140.0),
                (15, 'Shipped', '{9, 11}', 200.0),
                (16, 'Processing', '{10, 12}', 220.0),
                (17, 'Processed', '{13, 15}', 280.0),
                (18, 'Shipped', '{14, 16}', 300.0),
                (19, 'Processing', '{17, 19}', 360.0),
                (20, 'Processed', '{18, 20}', 380.0)
        `);
        console.log('Table "orders" populated');

        await client.query(`
            INSERT INTO returns (orderId, status)
            VALUES 
                (1, 'Acknowledged'),
                (2, 'Arrived'),
                (3, 'Refunded'),
                (4, 'Acknowledged'),
                (5, 'Arrived'),
                (6, 'Refunded'),
                (7, 'Acknowledged'),
                (8, 'Arrived'),
                (9, 'Refunded'),
                (10, 'Acknowledged'),
                (11, 'Arrived'),
                (12, 'Refunded'),
                (13, 'Acknowledged'),
                (14, 'Arrived'),
                (15, 'Refunded'),
                (16, 'Acknowledged'),
                (17, 'Arrived'),
                (18, 'Refunded'),
                (19, 'Acknowledged'),
                (20, 'Arrived')
        `);
        console.log('Table "returns" populated');

        await client.query(`
            INSERT INTO warehouses (location, productId)
            VALUES 
                ('Tokyo', 1),
                ('Beijing', 2),
                ('Seoul', 3),
                ('Mumbai', 4),
                ('Bangkok', 5),
                ('Tokyo', 6),
                ('Beijing', 7),
                ('Seoul', 8),
                ('Mumbai', 9),
                ('Bangkok', 10),
                ('Tokyo', 11),
                ('Beijing', 12),
                ('Seoul', 13),
                ('Mumbai', 14),
                ('Bangkok', 15),
                ('Tokyo', 16),
                ('Beijing', 17),
                ('Seoul', 18),
                ('Mumbai', 19),
                ('Bangkok', 20)
        `);
        console.log('Table "warehouses" populated');
    } catch (err) {
        console.error(err + ': Error populating tables');
        throw err;
    }
}
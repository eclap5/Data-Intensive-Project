export async function populateEUTables(client) {
    try {
        await client.query(`
            INSERT INTO customers (location, name)
            VALUES 
                ('Paris', 'John Doe'),
                ('Berlin', 'Jane Smith'),
                ('Rome', 'Mario Rossi'),
                ('Madrid', 'Carlos Garcia'),
                ('London', 'Emily Johnson'),
                ('Paris', 'Anne Dupont'),
                ('Berlin', 'Hans Müller'),
                ('Rome', 'Giulia Bianchi'),
                ('Madrid', 'Lucia Martinez'),
                ('London', 'Oliver Brown'),
                ('Paris', 'Sophie Martin'),
                ('Berlin', 'Klaus Schmidt'),
                ('Rome', 'Francesca Russo'),
                ('Madrid', 'Javier Fernandez'),
                ('London', 'Charlotte Wilson'),
                ('Paris', 'Emma Leroy'),
                ('Berlin', 'Peter Fischer'),
                ('Rome', 'Alessandro Conti'),
                ('Madrid', 'Isabel Lopez'),
                ('London', 'George White')
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
                ('Paris', 1),
                ('Berlin', 2),
                ('Rome', 3),
                ('Madrid', 4),
                ('London', 5),
                ('Paris', 6),
                ('Berlin', 7),
                ('Rome', 8),
                ('Madrid', 9),
                ('London', 10),
                ('Paris', 11),
                ('Berlin', 12),
                ('Rome', 13),
                ('Madrid', 14),
                ('London', 15),
                ('Paris', 16),
                ('Berlin', 17),
                ('Rome', 18),
                ('Madrid', 19),
                ('London', 20)
        `);
        console.log('Table "warehouses" populated');
    } catch (err) {
        console.error(err + ': Error populating tables');
        throw err;
    }
}
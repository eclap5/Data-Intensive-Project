async function createContinentTables(client) {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS customers (
                customerId SERIAL PRIMARY KEY,
                location VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL
            )
        `);
        console.log('Table "customers" created');

        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                productId SERIAL PRIMARY KEY,
                productRef VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                price FLOAT NOT NULL
            )
        `);
        console.log('Table "products" created');

        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                orderId SERIAL PRIMARY KEY,
                customerId INT NOT NULL,
                status VARCHAR(255) NOT NULL CHECK (status IN ('Processing', 'Processed', 'Shipped')),
                productId INT[] NOT NULL,
                price FLOAT NOT NULL,
                FOREIGN KEY (customerId) REFERENCES customers(customerId)
            )
        `);
        console.log('Table "orders" created');

        await client.query(`
            CREATE TABLE IF NOT EXISTS returns (
                returnId SERIAL PRIMARY KEY,
                orderId INT NOT NULL,
                status VARCHAR(255) NOT NULL CHECK (status IN ('Acknowledged', 'Arrived', 'Refunded')),
                FOREIGN KEY (orderId) REFERENCES orders(orderId)
            )
        `);
        console.log('Table "returns" created');

        await client.query(`
            CREATE TABLE IF NOT EXISTS warehouses (
                warehouseId SERIAL PRIMARY KEY,
                location VARCHAR(255) NOT NULL,
                productId INT NOT NULL,
                FOREIGN KEY (productId) REFERENCES products(productId)
            )
        `);
        console.log('Table "warehouses" created');
    } catch (err) {
        console.error(err + ': Error creating tables');
        throw err;
    }
}

export default createContinentTables;
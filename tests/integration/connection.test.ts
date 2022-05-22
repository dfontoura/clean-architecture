import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";

test('Should conect to a database', async () => {
    const connection = new PostgresqlConnectionAdapter();
    const items = await connection.query('SELECT * FROM ecommerce.item;', []);
    expect(items).toHaveLength(3);
    await connection.close();
})
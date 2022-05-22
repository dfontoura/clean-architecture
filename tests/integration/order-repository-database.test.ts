import OrderRepository from "../../src/domain/repository/order-repository";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/order-repository-database";

let connection: Connection;
let orderRepository: OrderRepository;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    orderRepository = new OrderRepositoryDatabase(connection);
});

test('Should get an order from database', async () => {
    const orderCount = await orderRepository.count();
    expect(orderCount).toBe(0);
});

afterEach(async () => {
    await connection.close();
});

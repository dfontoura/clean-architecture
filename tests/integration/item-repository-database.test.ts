import ItemRepository from "../../src/domain/repository/item-repository";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/item-repository-database";

let connection: Connection;
let itemRepository: ItemRepository;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(connection);
});

test('Should test the item repository', async () => {
    const item = await itemRepository.getById(1);
    expect(item?.getDescription()).toBe('Guitarra');
});

afterEach(async () => {
    await connection.close();
});
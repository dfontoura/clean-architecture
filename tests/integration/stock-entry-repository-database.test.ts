import StockEntry from "../../src/domain/entity/stock-entry";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import StockEntryRepositoryDatabase from "../../src/infra/repository/database/stock-entry-repository-database";

let connection: Connection;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
});

test('Shoul persist an stock entry', async () => {
    const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
    await stockEntryRepository.clean();
    await stockEntryRepository.save(new StockEntry(1, 'in', 6));
    await stockEntryRepository.save(new StockEntry(1, 'out', 2));
    await stockEntryRepository.save(new StockEntry(1, 'in', 2));
    const stockEntries = await stockEntryRepository.getAll(1);
    expect(stockEntries).toHaveLength(3);
});

afterEach(async () => {
    await connection.close();
});
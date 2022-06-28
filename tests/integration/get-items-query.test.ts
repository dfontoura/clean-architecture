import GetItemsQuery from "../../src/application/query/get-items/get-items-query";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import GetItemsQueryWebPresenter from "../../src/infra/presenter/get-items-query-web-presenter";

let connection: Connection;

beforeEach(async () => {
    connection = new PostgresqlConnectionAdapter();
});

test('Should get the items with formatted description', async () => {
    const presenter = new GetItemsQueryWebPresenter('pt-BR', 'BRL');
    const getItems = new GetItemsQuery(connection, presenter);
    await getItems.execute();
    expect(presenter.items[0].description).toBe('GUITARRA');
})

afterEach(async () => {
    await connection.close();
});
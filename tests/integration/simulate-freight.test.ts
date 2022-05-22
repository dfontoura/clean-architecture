import SimulateFreight from "../../src/application/use-cases/simulate-freight/simulate-freight";
import SimulateFreightInput from "../../src/application/use-cases/simulate-freight/simulate-freight-input";
import ItemRepository from "../../src/domain/repository/item-repository";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/item-repository-database";

const input: SimulateFreightInput = {
    orderItems: [ 
        {
            itemId: 1,
            quantity: 1
        },
        {
            itemId: 2,
            quantity: 1
        },
        {
            itemId: 3,
            quantity: 3
        },
    ]
};

let connection: Connection;
let itemRepository: ItemRepository;
let simulateFreight: SimulateFreight;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(connection);
    simulateFreight = new SimulateFreight(itemRepository);
});

test('Should simulate freight of an order', async ()=> {
    const output = await simulateFreight.execute(input)
    expect(output.total).toBe(280);
});

afterEach(async () => {
    await connection.close();
});

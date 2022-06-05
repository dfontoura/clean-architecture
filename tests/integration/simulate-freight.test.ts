import SimulateFreight from "../../src/application/use-cases/simulate-freight/simulate-freight";
import SimulateFreightInput from "../../src/application/use-cases/simulate-freight/simulate-freight-input";
import RepositoryFactory from "../../src/domain/factory/repository-factory";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/database-repository-factory";
import MemoryRepositoryFactory from "../../src/infra/factory/memory-repository-factory";

const input: SimulateFreightInput = {
    orderItems: [ 
        {
            itemId: 1,
            quantity: 1,
        },
        {
            itemId: 2,
            quantity: 1,
        },
        {
            itemId: 3,
            quantity: 3,
        },
    ]
};

let connection: Connection;
let repositoryFactory: RepositoryFactory;
let simulateFreight: SimulateFreight;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    simulateFreight = new SimulateFreight(repositoryFactory);
});

test('Should simulate freight of an order', async ()=> {
    const output = await simulateFreight.execute(input)
    expect(output.total).toBe(280);
});

afterEach(async () => {
    await connection.close();
});

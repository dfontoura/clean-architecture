import PlaceOrder from '../../src/application/use-cases/place-order/place-order';
import { CPF_NUMBERS } from '../mock/cpf-numbers';
import PlaceOrderInput from '../../src/application/use-cases/place-order/place-order-input';
import Connection from '../../src/infra/database/connection';
import PostgresqlConnectionAdapter from '../../src/infra/database/postgresql-connection-adapter';
import RepositoryFactory from '../../src/domain/factory/repository-factory';
import DatabaseRepositoryFactory from '../../src/infra/factory/database-repository-factory';
import MemoryRepositoryFactory from '../../src/infra/factory/memory-repository-factory';

const { validCpfNumbers } = CPF_NUMBERS;

const input: PlaceOrderInput = {
    cpf: validCpfNumbers[0],
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
    ],
    couponId: 'VALE20',
    issueDate: new Date('2022-03-17T23:29:00'),
};

let connection: Connection;
let repositoryFactory: RepositoryFactory;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
});

test('Should place an order', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5152);
});

test('Should place an order and return the order code', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const firstOutput = await placeOrder.execute(input);
    const secondOutput = await placeOrder.execute(input);
    expect(firstOutput.code).toBe('202200000001');
    expect(secondOutput.code).toBe('202200000002');
});

afterEach(async () => {
    await connection.close();
});
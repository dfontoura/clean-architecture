import PlaceOrder from '../../src/application/use-cases/place-order/place-order';
import { CPF_NUMBERS } from '../mock/cpf-numbers';
import PlaceOrderInput from '../../src/application/use-cases/place-order/place-order-input';
import Connection from '../../src/infra/database/connection';
import PostgresqlConnectionAdapter from '../../src/infra/database/postgresql-connection-adapter';
import RepositoryFactory from '../../src/domain/factory/repository-factory';
import DatabaseRepositoryFactory from '../../src/infra/factory/database-repository-factory';
import GetStock from '../../src/application/use-cases/get-stock/get-stock';
import Mediator from '../../src/infra/mediator/mediator';
import StockEntryHandler from '../../src/application/handler/stock-entry-handler';

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

beforeEach(async () => {
    connection = new PostgresqlConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
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

test('Should remove items from stock after placing an order', async () => {
    const mediator = new Mediator();
    mediator.register(new StockEntryHandler(repositoryFactory));
    const placeOrder = new PlaceOrder(repositoryFactory, mediator);
    await placeOrder.execute(input);
    const getStock = new GetStock(repositoryFactory);
    const total1 = await getStock.execute(1);
    expect(total1).toBe(-1);
    const total2 = await getStock.execute(2);
    expect(total2).toBe(-1);
    const total3 = await getStock.execute(3);
    expect(total3).toBe(-3);
});

afterEach(async () => {
    await connection.close();
});
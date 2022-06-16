import GetOrder from "../../src/application/use-cases/get-order/get-order";
import PlaceOrder from "../../src/application/use-cases/place-order/place-order";
import PlaceOrderInput from "../../src/application/use-cases/place-order/place-order-input";
import RepositoryFactory from "../../src/domain/factory/repository-factory";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/database-repository-factory";
import { CPF_NUMBERS } from "../mock/cpf-numbers";

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

test('Should get an order by code', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    await placeOrder.execute(input);
    const getOrder = new GetOrder(repositoryFactory);
    const output = await getOrder.execute('202200000001');
    expect(output.total).toBe(5152);
})

afterEach(async () => {
    await connection.close();
});
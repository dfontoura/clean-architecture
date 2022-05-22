import PlaceOrder from '../../src/application/use-cases/place-order/place-order';
import { CPF_NUMBERS } from '../mock/cpf-numbers';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';
import PlaceOrderInput from '../../src/application/use-cases/place-order/place-order-input';
import ItemRepository from '../../src/domain/repository/item-repository';
import OrderRepository from '../../src/domain/repository/order-repository';
import CouponRepository from '../../src/domain/repository/coupon-repository';
import Connection from '../../src/infra/database/connection';
import PostgresqlConnectionAdapter from '../../src/infra/database/postgresql-connection-adapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/item-repository-database';
import CouponRepositoryDatabase from '../../src/infra/repository/database/coupon-repository-database';

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
let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(connection);
    orderRepository = new OrderRepositoryMemory();
    couponRepository = new CouponRepositoryDatabase(connection);
});

test('Should place an order', async () => {
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(4872);
});

test('Should place an order and return the order code', async () => {
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository);
    const firstOutput = await placeOrder.execute(input);
    const secondOutput = await placeOrder.execute(input);
    expect(firstOutput.code).toBe('202200000001');
    expect(secondOutput.code).toBe('202200000002');
});

afterEach(async () => {
    await connection.close();
});
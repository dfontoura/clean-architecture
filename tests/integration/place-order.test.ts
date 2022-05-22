import CouponRepositoryMemory from '../../src/infra/repository/memory/coupon-repository-memory';
import PlaceOrder from '../../src/application/use-cases/place-order/place-order';
import { CPF_NUMBERS } from '../mock/cpf-numbers';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';
import PlaceOrderInput from '../../src/application/use-cases/place-order/place-order-input';

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
    couponId: 'COUPON20',
    issueDate: new Date('2022-03-17T23:29:00'),
};

test('Should place an order', () => {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(600);
});

test('Should place an order and return the order code', () => {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository);
    const firstOutput = placeOrder.execute(input);
    const secondOutput = placeOrder.execute(input);
    expect(firstOutput.code).toBe('202200000001');
    expect(secondOutput.code).toBe('202200000002');
});
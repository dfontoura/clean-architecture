import CouponRepositoryMemory from '../../src/infra/repository/memory/coupon-repository-memory';
import PlaceOrder from '../../src/application/use-cases/place-orders';
import { CPF_NUMBERS } from '../mock/cpf-numbers';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';

const { validCpfNumbers } = CPF_NUMBERS;

const input = {
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
    couponId: 'VALE20'
};

test('Should place an order', () => {
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(600);
})
import Coupon from '../src/coupon';
import Item, { ItemParameters } from '../src/item';
import Order from '../src/order'

const addItems = (order: Order): void => {
    const orderItems = getOrderItems();
    orderItems.forEach(param => {
        order.addItem(param.item, param.quantity);
    });
}

const getOrderItems = (): any[] => {
    return [
        {
            item: new Item({
                id: 1,
                category: 'Musical Instruments',
                description: 'Guitar',
                price: 300,
                height: 10,
                width: 30,
                depth: 100,
                weight: 3
            }),
            quantity: 1
        },
        {
            item: new Item({
                id: 2,
                category: 'Musical Instruments',
                description: 'Amplifier',
                price: 150,
                height: 50,
                width: 50,
                depth: 50,
                weight: 8
            }),
            quantity: 2
        },
        {
            item: new Item({
                id: 3,
                category: 'Accessories',
                description: 'Cable',
                price: 100,
                height: 5,
                width: 20,
                depth: 20,
                weight: 0.5
            }),
            quantity: 3
        }
    ];
}

describe('Happy paths:', () => {
    test('Empty order: should create a order and return the total price "0"', () => {
        const newOrder = new Order('123.456.789-09');
        expect(newOrder.getTotal()).toBe(0);
    });

    test('Order with 3 items: should create the order and return the total price', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        expect(newOrder.getTotal()).toBe(900);
    });

    test('Valid coupon: should return the price with discount', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        const coupon = new Coupon('DESC20', 20, new Date('9999-12-31'));
        newOrder.addCoupon(coupon);   
        expect(newOrder.getTotal()).toBe(720);
    });

    test('Shipping: should return the shipping price', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        expect(newOrder.getShipping(1000)).toBe(220);
    })
});

describe('Exception paths:', () => {
    test('Invalid CPF: should throw error "invalid CPF"', () => {
        expect(() => new Order('123.123.123-12')).toThrowError('Invalid CPF');
    });

    test('Invalid quantity: should throw error "Invalid parameter"', () => {
        const newOrder = new Order('123.456.789-09');
        const newItem = getOrderItems()[0].item;
        expect(() => newOrder.addItem(newItem, -10)).toThrowError('Invalid parameter');
    });

    test('Expired coupon: should throw error "Invalid parameter"', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        const coupon = new Coupon('DESC20', 20, new Date('2022-03-01'))
        expect(() => newOrder.addCoupon(coupon)).toThrowError('Invalid parameter');
    });
});

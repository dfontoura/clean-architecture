import Coupon from '../../src/domain/entity/coupon';
import Item from '../../src/domain/entity/item';
import Order from '../../src/domain/entity/order'
import { ORDER_ITEM_DATA } from '../mock/order-item-data';
import { ITEM_DATA } from '../mock/item-data';

const DISTANCE = 1000;
const { guitar, cable } = ITEM_DATA;
const orderItemData = ORDER_ITEM_DATA;

const addItems = (order: Order): void => {
    orderItemData.forEach(orderItem => {
        order.addItem(orderItem.item, orderItem.quantity);
    });
}

describe('Happy paths:', () => {
    test('Empty order: should create a order and return the total price "0"', () => {
        const newOrder = new Order('123.456.789-09');
        expect(newOrder.getTotal()).toBe(0);
    });

    test('Order with 3 items: should create the order and return the total price', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        expect(newOrder.getTotal()).toBe(750);
    });

    test('Valid coupon: should return the price with discount', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        const coupon = new Coupon('DESC20', 20, new Date('9999-12-31'));
        newOrder.addCoupon(coupon);   
        expect(newOrder.getTotal()).toBe(600);
    });

    test('Expired coupon: should return the price without discount', () => {
        const newOrder = new Order('123.456.789-09');
        addItems(newOrder);
        const coupon = new Coupon('DESC20', 20, new Date('2020-12-31'));
        newOrder.addCoupon(coupon);   
        expect(newOrder.getTotal()).toBe(750);
    });

    test('Freight: should return the freight price', () => {
        const newOrder = new Order('123.456.789-09');
        const distance = DISTANCE;
        addItems(newOrder);
        expect(newOrder.getFreight(distance)).toBe(257);
    })

    test('Should return the minimum freight price when freight is less than minimum',  () => {
        const item = new Item(cable);
        const order = new Order('123.456.789-09');
        order.addItem(item, 1);
        const distance = DISTANCE;
        const total = order.getFreight(distance);
        const minimumPrice = 10;
    
        expect(total).toBe(minimumPrice);
    });
});

describe('Exception paths:', () => {
    test('Invalid CPF: should throw error "invalid CPF"', () => {
        expect(() => new Order('123.123.123-12')).toThrowError('Invalid CPF');
    });

    test('Invalid quantity: should throw error "Invalid parameter"', () => {
        const newOrder = new Order('123.456.789-09');
        const newItem = new Item(guitar);
        expect(() => newOrder.addItem(newItem, -10)).toThrowError('Invalid parameter');
    });
});

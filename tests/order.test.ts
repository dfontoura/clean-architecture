import Coupon from '../src/coupon';
import Item from '../src/item';
import Order from '../src/order'

test('Should create a order and return the amount "0"', () => {
    const newOrder = new Order('123.456.789-09');
    expect(newOrder.getTotal()).toBe(0);
})

test('should create an order with 3 items', () => {
    const newOrder = new Order('123.456.789-09');
    newOrder.addItem(new Item(1, 'Musical Instruments', 'Guitar', 300), 1);
    newOrder.addItem(new Item(2, 'Musical Instruments', 'Amplifier', 150), 2);
    newOrder.addItem(new Item(3, 'Accesssories', 'Cable', 100), 3);
    expect(newOrder.getTotal()).toBe(900);
})

test('Should return the price with discount if a coupon is informed.', () => {
    const newOrder = new Order('123.456.789-09');
    newOrder.addItem(new Item(1, 'Musical Instruments', 'Guitar', 300), 1);
    newOrder.addItem(new Item(2, 'Musical Instruments', 'Amplifier', 150), 2);
    newOrder.addItem(new Item(3, 'Accesssories', 'Cable', 100), 3);
    const coupon = new Coupon('DESC20', 20);
    newOrder.addCoupon(coupon);   

    expect(newOrder.getTotal()).toBe(720);
});

test('Should throw error "invalid CPF" if invalid CPF is provided', () => {
    expect(() => new Order('123.123.123-12')).toThrowError('Invalid CPF');
});

test('Should throw error "Invalid parameter" quantity is invalid', () => {
    const newOrder = new Order('123.456.789-09');
    const newItem = new Item(1, 'Musical Instruments', 'Guitar', 100);
    expect(() => newOrder.addItem(newItem, -10)).toThrowError('Invalid parameter');
});
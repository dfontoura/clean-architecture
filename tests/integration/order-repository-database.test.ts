import OrderRepository from "../../src/domain/repository/order-repository";
import Connection from "../../src/infra/database/connection";
import PostgresqlConnectionAdapter from "../../src/infra/database/postgresql-connection-adapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/order-repository-database";
import Order from '../../src/domain/entity/order';
import { ORDER_ITEM_DATA } from '../mock/order-item-data';
import Coupon from "../../src/domain/entity/coupon";

let connection: Connection;
let orderRepository: OrderRepository;
let newOrder: Order;
const orderItemData = ORDER_ITEM_DATA;

const addItems = (order: Order): void => {
    orderItemData.forEach(orderItem => {
        order.addItem(orderItem.item, orderItem.quantity);
    });
}

beforeEach(() => {
    connection = new PostgresqlConnectionAdapter();
    orderRepository = new OrderRepositoryDatabase(connection);
    newOrder = new Order('123.456.789-09');
    addItems(newOrder);
    const coupon = new Coupon('VALE20', 20, new Date('9999-12-31'));
    newOrder.addCoupon(coupon);   
});

test('Should save an order', async () => {
    await orderRepository.clean();
    await orderRepository.save(newOrder);
    const count = await orderRepository.count();
    expect(count).toBe(1);
    const savedOrder = await orderRepository.getByCode('202200000001');
    expect(savedOrder.getTotal()).toBe(5152);
});

afterEach(async () => {
    await connection.close();
});

import Freight from "../../src/domain/entity/freight";
import OrderItem from "../../src/domain/entity/order-item";
import { ORDER_ITEM_DATA } from "../mock/order-item-data";
import { ITEM_DATA } from "../mock/item-data";
import Item from "../../src/domain/entity/item";

const orderItemData = ORDER_ITEM_DATA;
const orderItems = orderItemData.map(({ item, quantity }) => {
    return new OrderItem(item, quantity);
});

test('Should calculate the freight of an item', () => {
    const distance = 1000;
    const freight = new Freight(distance);
    const total = freight.calculate(orderItems, distance);

    expect(total).toBe(257);
});

test('Should return the minimum freight price when freight is less than minimum',  () => {
    const { cable } = ITEM_DATA;
    const item = new Item(cable);
    const orderItem = new OrderItem(item, 1);
    const distance = 1000;
    const freight = new Freight(distance);
    const total = freight.calculate(orderItem, distance);
    const minimumPrice = 10;

    expect(total).toBe(minimumPrice);
});

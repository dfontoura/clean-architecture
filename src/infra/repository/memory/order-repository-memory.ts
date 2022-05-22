import Order from "../../../domain/entity/order";
import OrderRepository from "../../../domain/repository/order-repository";


export default class OrderRepositoryMemory implements OrderRepository {
    private orders: Order[];

    constructor () {
        this.orders = [];
    }

    async save (order: Order): Promise<void> {
        this.orders.push(order);
    }

    async count(): Promise<number> {
        return this.orders.length;
    }
}

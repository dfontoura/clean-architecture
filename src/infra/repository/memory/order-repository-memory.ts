import Order from "../../../domain/entity/order";
import OrderRepository from "../../../domain/repository/order-repository";


export default class OrderRepositoryMemory implements OrderRepository {
    private orders: Order[];

    constructor () {
        this.orders = [];
    }

    async getByCode(code: string): Promise<Order> {
        const order = this.orders.find(order => order.getCode() === code);

        if (!order) {
            throw new Error(`Order with code ${code} not found`);
        }

        return order;
    }

    async save (order: Order): Promise<void> {
        this.orders.push(order);
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

    async clean(): Promise<void> {
        this.orders = [];
    }
}

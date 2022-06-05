import Order from "../entity/order";

export default interface OrderRepository {
    getByCode(code: string): Promise<Order>;
    save(order: Order): Promise<void>;
    count(): Promise<number>;
    clean(): Promise<void>;
}

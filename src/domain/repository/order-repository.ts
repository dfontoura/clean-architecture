import Order from "../entity/order";

export default interface OrderRepository {
    getAll(): Promise<Order[]>;
    getByCode(code: string): Promise<Order>;
    save(order: Order): Promise<void>;
    count(): Promise<number>;
    clean(): Promise<void>;
}

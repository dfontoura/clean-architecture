import Order from "../../../domain/entity/order";
import OrderRepository from "../../../domain/repository/order-repository";
import Connection from "../../database/connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: Connection) {
    }

    async save(order: Order): Promise<void> {
    }

    async count(): Promise<number> {
        const [{ count }] = await this.connection.query(`SELECT COUNT(*) FROM ecommerce.order`);
        return parseInt(count);
    }
}
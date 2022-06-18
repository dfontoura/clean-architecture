import OrderDAO from "../../application/dao/order-dao";
import OrderData from "../../application/dao/order-data";
import Connection from "../database/connection";

export default class OrderDAODatabase implements OrderDAO {

    constructor (readonly connection: Connection) {
    }

    async getOrder (code: string): Promise<OrderData> {
        const orderQuery = 'select id_order, total from ecommerce.order where code = $1';
        const [orderData] = await this.connection.query(orderQuery, [code]);
        return orderData;
    }
}
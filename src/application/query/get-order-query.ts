import Connection from "../../infra/database/connection";
import OrderDAO from "../dao/order-dao";
import GetOrderOutput from "../use-cases/get-order/get-order-output";

export default class GetOrderQuery {

    constructor (readonly connection: Connection, readonly orderDAO: OrderDAO) {
    }

    async execute (code: string): Promise<GetOrderOutput> {
        const orderData = await this.orderDAO.getOrder(code);
        const itemsQuery = 'select description from ecommerce.order_item join ecommerce.item using (id_item) where id_order = $1';
        const itemsData = await this.connection.query(itemsQuery, [orderData.orderId]);
        const total = parseFloat(orderData.total);
        const output = new GetOrderOutput(total, itemsData);
        return output;
    }
}
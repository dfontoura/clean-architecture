import OrderData from "./order-data";

export default interface OrderDAO {
    getOrder (code: string): Promise<OrderData>;
}
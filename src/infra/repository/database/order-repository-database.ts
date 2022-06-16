import Dimension from "../../../domain/entity/dimension";
import Item from "../../../domain/entity/item";
import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order-item";
import OrderRepository from "../../../domain/repository/order-repository";
import Connection from "../../database/connection";
import Coupon from "../../../domain/entity/coupon";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: Connection) {
    }

    async getByCode(code: string): Promise<Order> {
        const orderData: any = await this.getOrderDataByCode(code);
        const coupon: Coupon|undefined = await this.getCouponByCode(orderData.coupon_code);
        const orderItemData: any = await this.getOrderItemDataByOrder(orderData.id_order);

        const items: Item[] = [];
        for (const orderItem of orderItemData) {
            const item = await this.getItemById(orderItem.id_item);
            items.push(item);
        }

        const order = this.parseOrder(orderData, coupon, orderItemData, items);
        return order;
    }

    private async getOrderDataByCode(code: string): Promise<any> {
        const sql = `SELECT * FROM ecommerce.order WHERE code = $1`;
        const [orderData] = await this.connection.query(sql, [code]);

        if (!orderData) {
            throw new Error(`Order with code ${code} not found`);
        }

        return orderData;
    }

    private async getCouponByCode(code: string): Promise<Coupon|undefined> {
        if (!code) {
            return;
        }

        const sql = `SELECT * FROM ecommerce.coupon WHERE code = $1`;
        const [couponData] = await this.connection.query(sql, [code]);

        if (!couponData) {
            throw new Error(`Coupon with code ${code} not found`);
        }

        const coupon = this.parseCoupon(couponData);
        return coupon;
    }

    private parseCoupon(couponData: any): Coupon {
        const { code, percentage, expire_date } = couponData;
        const discount = parseFloat(percentage);
        const expirationDate = expire_date ? new Date(expire_date) : undefined;
        const coupon = new Coupon(code, discount, expirationDate);

        return coupon;
    }

    private async getOrderItemDataByOrder(orderId: number): Promise<any> {
        const sql = `SELECT * FROM ecommerce.order_item WHERE id_order = $1`;
        const orderItemData = await this.connection.query(sql, [orderId]);

        if (!orderItemData || orderItemData.length === 0) {
            throw new Error(`OrderItems for the order with id ${orderId} not found`);
        }

        return orderItemData;
    }

    private async getItemById(id: number): Promise<any> {
        const sql = `SELECT * FROM ecommerce.item WHERE id_item = $1`;
        const [itemData] = await this.connection.query(sql, [id]);

        if (!itemData) {
            throw new Error(`OrderItems for the item with id ${id} not found`);
        }

        const item = this.parseItem(itemData);
        return item;
    }

    private parseItem(itemData: any): Item {

        const { id_item, category, description, price, width, height, length, weight } = itemData;
        const dimensions = new Dimension(width, height, length, 'cm');

        const itemParams = { 
            id: id_item, 
            category, 
            description, 
            price: parseFloat(price), 
            weight, 
            dimensions 
        };

        const item = new Item(itemParams);

        return item;
    }
    
    private parseOrder(orderData: any, coupon: Coupon|undefined, orderItemData: any, items: Item[]): Order {
        const { cpf, issue_date, sequence } = orderData;
        const order = new Order(cpf, new Date(issue_date), parseInt(sequence));
        
        if (coupon) {
            order.addCoupon(coupon);
        }

        for (const orderItem of orderItemData) {
            const item = this.findItemOnArray(orderItem.id_item, items);
            order.addItem(item, parseFloat(orderItem.quantity));
        }

        return order;
    }

    private findItemOnArray(itemId: number, items: Item[]): Item {
        const item = items.find(item => item.getId() === itemId);

        if (!item) {
            throw new Error(`Item with id ${itemId} not found`);
        }
        
        return item;
    }

    async save(order: Order): Promise<void> {
        const saveOrderSql = this.getSaveOrderQuery();
        const orderValues = this.getOrderValues(order);
        const [orderData] = await this.connection.query(saveOrderSql, orderValues);
        
        const saveItemSql = this.getSaveItemQuery();
        for (const orderItem of order.getOrderItems()) {
            const orderId = orderData.id_order;
            const itemValues = this.getItemData(orderItem);
            await this.connection.query(saveItemSql, [orderId, ...itemValues]);
        }
    }

    async count(): Promise<number> {
        const [{ count }] = await this.connection.query(`SELECT COUNT(*) FROM ecommerce.order`);
        return parseInt(count);
    }

    async clean(): Promise<void> {
        await this.connection.query(`DELETE FROM ecommerce.order`);
        await this.connection.query(`DELETE FROM ecommerce.order_item`);
    }

    private getSaveOrderQuery(): string {
        return `
            INSERT INTO 
                ecommerce.order (
                    code, 
                    cpf, 
                    issue_date, 
                    coupon_code, 
                    freight, 
                    sequence,
                    total
                ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
        `;
    }

    private getOrderValues(order: Order): any[] {
        return [
            order.getCode(),
            order.getCpf(),
            order.getIssueDate(),
            order.getCoupon(),
            order.getFreight(1000),
            order.getSequence(),
            order.getTotal(),
        ];
    }

    private getSaveItemQuery(): string {
        return `
            INSERT INTO
                ecommerce.order_item (
                    id_order,
                    id_item,
                    price,
                    quantity
                )
            VALUES ($1, $2, $3, $4)
        `;
    }

    private getItemData(orderItem: OrderItem): any[] {
        return [
            orderItem.getItemId(),
            orderItem.getItemPrice(),
            orderItem.getQuantity(),
        ];
    }
}
import Coupon from "./coupon";
import Cpf from "./cpf";
import Item from "./item";
import OrderItem from "./order-item";

export default class Order {
    private cpf: Cpf;
    private orderItems: OrderItem[] = [];
    private coupon: Coupon | undefined;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
    }

    public getTotal (): number {
        const total = this.orderItems.reduce((total, orderItem) => {
            return total + orderItem.getTotal();
        }, 0);
        const  discount = this.coupon ? this.coupon.getDiscount(total) : 0;
        return total - discount
    }

    public addItem (item: Item, quantity: number) {
        if (!item || !quantity || quantity < 1) {
            throw Error('Invalid parameter');
        }
        const newOrderItem = new OrderItem(item, quantity);
        this.orderItems.push(newOrderItem);
    }

    public addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }
}

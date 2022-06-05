import Coupon from "./coupon";
import Cpf from "./cpf";
import Freight from "./freight";
import Item from "./item";
import OrderCode from "./order-code";
import OrderItem from "./order-item";

const DISTANCE = 1000;

export default class Order {
    private cpf: Cpf;
    private orderItems: OrderItem[] = [];
    private coupon: Coupon | undefined;
    private freight: Freight;
    private code: OrderCode;
    private issueDate: Date;
    private sequence: number;

    constructor(cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = new Freight(DISTANCE);
        this.code = new OrderCode(issueDate, sequence);
        this.issueDate = issueDate;
        this.sequence = sequence;
    }

    public getTotal(): number {
        const total = this.orderItems.reduce((sum, orderItem) => {
            return sum + orderItem.getTotal();
        }, 0);

        const discount = this.coupon ? this.coupon.getDiscount(total) : 0;
        const freight = this.getFreight(DISTANCE);
        return total - discount + freight;
    }

    public getCode(): string {
        return this.code.value;
    }

    public getCpf(): string {
        return this.cpf.getValue();
    }

    public getCoupon(): string | undefined {
        return this.coupon?.getCode();
    }

    public getIssueDate(): Date {
        return this.issueDate;
    }

    public getSequence(): number {
        return this.sequence;
    }

    public getOrderItems(): OrderItem[] {
        return this.orderItems;
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

    public getFreight(distance: number): number {
        const orderItems = this.orderItems;
        const freight = this.freight.calculate(orderItems, distance);

        return freight;
    }
}

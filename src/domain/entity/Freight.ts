import Item from "./item";
import OrderItem from "./order-item";

const MINIMUM_SHIPPING_PRICE = 10;

export default class Freight {
    private total: number;
    private distance: number;
    private minimumPrice = MINIMUM_SHIPPING_PRICE;

    constructor(distance: number) {
        this.total = 0;
        this.distance = distance;
    }

    public addItem(item: Item, quantity: number): void {
        this.total += quantity * (item.getVolume('m') * this.distance * (item.getDensity() / 100))
    }

    public getTotal(): number {
        if (this.total > 0 && this.total < 10) {
            return this.minimumPrice;
        }
        return this.total;
    }

    public calculate(orderItems: OrderItem | OrderItem[], distance: number): number {
        if(!Array.isArray(orderItems)) {
            orderItems = [orderItems];
        }

        const freight = orderItems.reduce((total, orderItem) => {
            const volume = orderItem.getVolume('m');
            const density = orderItem.getDensity();

            const price = distance * volume * (density/100);
            const minimumPrice = MINIMUM_SHIPPING_PRICE;

            return total + Math.max(minimumPrice, price);
        },0);

        return freight;
    }

    public getMinimumPrice(): number {
        return this.minimumPrice;
    }
}

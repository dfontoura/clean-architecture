import OrderItem from "./order-item";

const MINIMUM_SHIPPING_PRICE = 10;

export default class Freight {
    private minimumPrice = MINIMUM_SHIPPING_PRICE;

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

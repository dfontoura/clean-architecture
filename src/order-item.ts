import Item from "./item";

export default class OrderItem {
    private item: Item;
    private quantity = 0;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }

    public getTotal (): number {
        return this.quantity * this.item.getPrice();
    }

    public getShipping(distance: number): number {
        return this.item.getShipping(distance) * this.quantity;
    }
}
import Item from "./item";

export default class OrderItem {
    private item: Item;
    private quantity: number = 0;

    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }

    public getTotal (): number {
        return this.quantity * this.item.getPrice();
    }

    public getVolume(unit: string): number {
        return this.item.getVolume(unit) * this.quantity;
    }

    public getDensity(): number {
        return this.item.getDensity();
    }
}
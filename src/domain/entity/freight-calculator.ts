import Item from "./item";

export default class FreightCalculator{

    static calculate (item: Item, quantity: number, distance: number) {
        return quantity * (item.getVolume('m') * distance * (item.getDensity() / 100));
    }

}
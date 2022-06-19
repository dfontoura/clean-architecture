import Order from "../entity/order";
import DomainEvent from "./domainEvent";

export default class OrderPlaced implements DomainEvent {
    name = 'orderPlaced';

    constructor (readonly order: Order) {
    }
}
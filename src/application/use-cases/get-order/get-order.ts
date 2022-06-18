import OrderItem from "../../../domain/entity/order-item";
import RepositoryFactory from "../../../domain/factory/repository-factory";
import ItemRepository from "../../../domain/repository/item-repository";
import OrderRepository from "../../../domain/repository/order-repository";
import GetOrderOutput from "./get-order-output";

export default class GetOrder {

    private orderRepository: OrderRepository;
    private itemRepository: ItemRepository;

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    async execute (code: string): Promise<GetOrderOutput> {
        const order = await this.orderRepository.getByCode(code);
        const orderitems = order.getOrderItems();
        const items = await this.getItems(orderitems);
        const total = order.getTotal();
        const output = new GetOrderOutput(total, items);
        return output;
    }

    async getItems (orderitems: OrderItem[]): Promise<GetOrderOutput["items"]> {
        const items = [];

        for (const orderItem of orderitems) {
            const itemId = orderItem.getItemId();
            const item = await this.itemRepository.getById(itemId);

            if (!item) {
                throw new Error('Item not found');
            }

            items.push({
                description: item.getDescription(),
                price: orderItem.getItemPrice(),
            });
        }

        return items;
    }
}

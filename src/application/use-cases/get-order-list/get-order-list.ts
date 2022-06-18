import OrderItem from "../../../domain/entity/order-item";
import RepositoryFactory from "../../../domain/factory/repository-factory";
import ItemRepository from "../../../domain/repository/item-repository";
import OrderRepository from "../../../domain/repository/order-repository";
import GetOrderOutput from "../get-order/get-order-output";

export default class GetOrderList {

    private orderRepository: OrderRepository;
    private itemRepository: ItemRepository;

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    async execute (): Promise<GetOrderOutput[]> {
        const orderList = await this.orderRepository.getAll();
        const output: GetOrderOutput[] = []
        
        for (const order of orderList) {
            const orderItems = order.getOrderItems();
            const items = await this.getItems(orderItems);
            const total = order.getTotal();
            output.push(new GetOrderOutput(total, items));
        };

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
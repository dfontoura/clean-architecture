import StockEntry from "../../domain/entity/stock-entry";
import OrderPlaced from "../../domain/event/order-placed";
import RepositoryFactory from "../../domain/factory/repository-factory";
import StockEntryRepository from "../../domain/repository/stock-entry-repository";
import Handler from "./handler";

export default class StockEntryHandler implements Handler {
    name = "orderPlaced";
    stockEntryRepository: StockEntryRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
    }

    async handle(event: OrderPlaced): Promise<void> {
        const orderItems = event.order.getOrderItems();
        for (const orderItem of orderItems) {
            const itemId = orderItem.getItemId();
            const quantity = orderItem.getQuantity();
            const newStockEntry = new StockEntry(itemId, 'out', quantity);
            await this.stockEntryRepository.save(newStockEntry);
        }
    }
}
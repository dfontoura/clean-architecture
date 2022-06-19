import RepositoryFactory from "../../../domain/factory/repository-factory";
import StockEntryRepository from "../../../domain/repository/stock-entry-repository";
import StockCalculator from "../../../domain/service/stock-calculator";

export default class GetStock {
    private stockEntryRepository: StockEntryRepository;

    constructor (readonly repositoryFactory: RepositoryFactory) {
        this.stockEntryRepository = this.repositoryFactory.createStockEntryRepository();
    }

    async execute (itemId: number): Promise<number> {
        const calculator = new StockCalculator();
        const stockEntries = await this.stockEntryRepository.getAll(itemId);
        const total = calculator.calculate(stockEntries);
        return total;
    }
}

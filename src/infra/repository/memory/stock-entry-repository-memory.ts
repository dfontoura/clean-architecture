import StockEntry from "../../../domain/entity/stock-entry";
import StockEntryRepository from "../../../domain/repository/stock-entry-repository";

export default class StockEntryRepositoryMemory implements StockEntryRepository {
    stockEntries: StockEntry[];

    constructor () {
        this.stockEntries = [];
    }

    async save(stockEntry: StockEntry): Promise<void> {
        this.stockEntries.push(stockEntry);
    }

    async getAll(itemId: number): Promise<StockEntry[]> {
        return this.stockEntries.filter(stockEntry => stockEntry.itemId === itemId);
    }

    async clean(): Promise<void> {
        this.stockEntries = [];
    }
}
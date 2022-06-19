import StockEntry from "../entity/stock-entry";

export default interface StockEntryRepository {
    save (stockEntry: StockEntry): Promise<void>;
    getAll(itemId: number): Promise<StockEntry[]>;
    clean(): Promise<void>;
}
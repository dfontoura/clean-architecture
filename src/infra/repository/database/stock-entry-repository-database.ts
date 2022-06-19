import StockEntry from "../../../domain/entity/stock-entry";
import StockEntryRepository from "../../../domain/repository/stock-entry-repository";
import Connection from "../../database/connection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

    constructor (readonly connection: Connection) {
    }

    async save(stockEntry: StockEntry): Promise<void> {
        const {itemId, operation, quantity } = stockEntry;
        const query = 'INSERT INTO ecommerce.stock_entry (id_item, operation, quantity) VALUES ($1, $2, $3)';
        await this.connection.query(query, [ itemId, operation, quantity ]);
    }
    
    async getAll(itemId: number): Promise<StockEntry[]> {
        const query = 'SELECT * FROM ecommerce.stock_entry WHERE id_item = $1';
        const stockEntriesData = await this.connection.query(query, [ itemId ]);
        const stockEntries: StockEntry[] = [];
        for (const stockEntryData of stockEntriesData) {
            const {item_id, operation, quantity } = stockEntryData;
            const stockEntry = new StockEntry(item_id, operation, quantity);
            stockEntries.push(stockEntry);
        }
        return stockEntries;
    }

    async clean(): Promise<void> {
        const query = 'DELETE FROM ecommerce.stock_entry';
        await this.connection.query(query);
    }
}